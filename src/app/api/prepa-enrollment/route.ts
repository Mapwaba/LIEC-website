import { NextRequest, NextResponse } from 'next/server';
import { sendNotificationEmail } from '@/lib/mailer';

const LIEC_HEAVN_URL = (
  process.env.LIEC_HEAVN_API_URL ||
  process.env.DASHBOARD_API_URL ||
  'https://liec-heav-n-workspace-git-main-bmapwabantoro-7094.vercel.app'
).replace(/\/$/, '');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Server-side validation
    const fullName = (body.full_name || body.nom_complet || body.fullName || '').trim();
    const email = (body.email || body.adresse_email || '').trim();
    const phone = (body.phone || body.telephone || '').trim();

    if (!fullName) {
      return NextResponse.json(
        { error: 'Le nom complet de l’étudiant est obligatoire.' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Une adresse e-mail valide est obligatoire.' },
        { status: 400 }
      );
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length > 14) {
      return NextResponse.json(
        { error: 'Le numéro de téléphone / WhatsApp ne peut pas dépasser 14 chiffres.' },
        { status: 400 }
      );
    }

    const parentPhone = (body.parent_phone || body.telephone_parent || '').trim();
    if (parentPhone) {
      const parentPhoneDigits = parentPhone.replace(/\D/g, '');
      if (parentPhoneDigits.length > 14) {
        return NextResponse.json(
          { error: 'Le numéro de téléphone du parent ne peut pas dépasser 14 chiffres.' },
          { status: 400 }
        );
      }
    }

    // Format standardized payload for LIEC Heav'n
    const countryName = body.country_name || (body.country && body.country.includes('Brazza') ? 'Congo-Brazzaville' : 'RDC');
    const program = body.program || body.ecole_partenaire || 'LIEC - France Prépa (2027–2028)';
    const destination = body.destination || 'France';
    const budgetRange = body.budget_range || body.budget_annuel || 'Non renseigné';
    const parentName = body.parent_full_name || body.parent_name || '';
    const parentEmail = body.parent_email || '';
    const city = body.city || body.ville_origine || '';
    const graduationYear = body.graduation_year || body.annee_diplome || '';
    const currentActivity = body.current_activity || body.activite_actuelle || '';
    const finalYearUniversity = body.final_year_university || body.derniere_annee_univ || '';
    const submissionTime = new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Kinshasa' });

    const payload = {
      ...body,
      full_name: fullName,
      email,
      phone,
      country_name: countryName,
      service_pole: 'LIEC - France Prépa',
      academic_intake: '2027–2028',
      source: 'LIEC - France Prépa ENROLLMENT FORM • 2027–2028 (Public Website)',
    };

    // 1. Submit to LIEC Heav'n /api/demandes (persists in Neon database)
    let assignedRef = '#DEM-2027-NEW';
    let assignedCandidatRef: string | undefined = undefined;
    let dbSuccess = false;

    try {
      const response = await fetch(`${LIEC_HEAVN_URL}/api/demandes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'public-portal@liecconsulting.com',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        dbSuccess = true;
        assignedRef = data.ref || data.demande?.ref || data.candidatRef || assignedRef;
        assignedCandidatRef = data.candidatRef || data.demande?.candidat_ref;
      } else {
        console.warn('Erreur réponse LIEC Heav’n:', data.error);
      }
    } catch (dbErr: any) {
      console.error('Connexion impossible à LIEC Heav’n Workspace:', dbErr?.message);
    }

    // 2. Transmettre la notification email complète à l'adresse de contact (contacts@liecconsulting.com)
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'contacts@liecconsulting.com';

    const textContent = `
Nouvelle candidature en ligne — Programme LIEC - France Prépa (2027–2028)
Référence : ${assignedRef}

• Candidat : ${fullName}
• WhatsApp / Tél : ${phone}
• Email : ${email}
• Pays de recrutement : ${countryName}
• Ville d'origine : ${city || 'Non renseigné'}
• Programme / École : ${program}
• Destination : ${destination}
• Budget garanti : ${budgetRange}
• Activité actuelle : ${currentActivity || 'Non renseigné'}
• Année de diplôme / Bac : ${graduationYear || 'Non renseigné'}
• Dernière année d'université : ${finalYearUniversity || 'Non renseigné'}
• Parent / Tuteur : ${parentName || 'Non renseigné'}
• WhatsApp / Tél Parent : ${parentPhone || 'Non renseigné'}
• Email Parent : ${parentEmail || 'Non renseigné'}
• Date de soumission : ${submissionTime} (heure de Kinshasa)
    `.trim();

    const htmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
  <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #002452;">
    <h2 style="color: #002452; margin: 0 0 6px 0;">LIEC — Lyon International Education Consulting</h2>
    <p style="color: #006a61; margin: 0; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
      Nouvelle Candidature en Ligne • LIEC - France Prépa (2027–2028)
    </p>
    <div style="display: inline-block; margin-top: 10px; background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 9999px; font-weight: bold; font-size: 13px; font-family: monospace;">
      Dossier N° : ${assignedRef}
    </div>
  </div>

  <div style="padding: 24px 0;">
    <h3 style="color: #002452; font-size: 15px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">
      Informations Candidat
    </h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0; width: 38%;">Nom complet :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${fullName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Téléphone / WhatsApp :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">
          <a href="https://wa.me/${phoneDigits}" style="color: #006a61; font-weight: bold; text-decoration: none;">
            ${phone} (Ouvrir sur WhatsApp)
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Adresse Email :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">
          <a href="mailto:${email}" style="color: #002452; text-decoration: underline;">${email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Pays &amp; Ville :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${city ? `${city}, ` : ''}${countryName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Programme / École :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0; font-weight: 600;">${program}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Destination :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${destination}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Budget annuel garanti :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${budgetRange}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Activité actuelle :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${currentActivity || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Année d'obtention Diplôme :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${graduationYear || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Dernière année université :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${finalYearUniversity || 'Non renseigné'}</td>
      </tr>
    </table>

    <h3 style="color: #002452; font-size: 15px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">
      Informations Parent / Tuteur
    </h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0; width: 38%;">Nom du parent :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${parentName || 'Non renseigné'}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Téléphone Parent :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">
          ${parentPhone ? `<a href="https://wa.me/${parentPhone.replace(/\\D/g, '')}" style="color: #006a61; font-weight: bold; text-decoration: none;">${parentPhone}</a>` : 'Non renseigné'}
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; font-weight: bold; color: #002452; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">Email Parent :</td>
        <td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">
          ${parentEmail ? `<a href="mailto:${parentEmail}" style="color: #002452;">${parentEmail}</a>` : 'Non renseigné'}
        </td>
      </tr>
    </table>
  </div>

  <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; font-size: 12px; color: #64748b;">
    <p style="margin: 0 0 4px 0;">Destiné au Bureau d'orientation LIEC (Lyon & Kinshasa) • <a href="mailto:${recipientEmail}" style="color: #002452;">${recipientEmail}</a></p>
    <p style="margin: 0; font-size: 11px;">Enregistré le ${submissionTime} (heure de Kinshasa)</p>
  </div>
</div>
    `.trim();

    const mailResult = await sendNotificationEmail({
      to: recipientEmail,
      replyTo: email,
      subject: `[LIEC Prépa 2027–2028] Nouvelle candidature en ligne — ${fullName} (${assignedRef})`,
      html: htmlContent,
      text: textContent,
    });

    return NextResponse.json({
      ok: true,
      success: true,
      ref: assignedRef,
      demRef: assignedRef,
      candidatRef: assignedCandidatRef,
      fullName,
      program,
      academicIntake: '2027–2028',
      emailSent: mailResult.sent,
      emailMethod: mailResult.method,
      recipient: mailResult.recipient,
      message: 'Votre candidature pour LIEC - France Prépa (2027–2028) a été enregistrée avec succès.',
    });
  } catch (error: any) {
    console.error('Erreur générale API prepa-enrollment:', error);
    return NextResponse.json(
      {
        error: 'Une erreur est survenue lors du traitement de votre candidature. Veuillez réessayer.',
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
