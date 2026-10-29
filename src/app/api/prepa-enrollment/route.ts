import { NextRequest, NextResponse } from 'next/server';

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
    const payload = {
      ...body,
      full_name: fullName,
      email,
      phone,
      country_name: body.country_name || (body.country && body.country.includes('Brazza') ? 'Congo-Brazzaville' : 'RDC'),
      service_pole: 'LIEC - France Prépa',
      academic_intake: '2027–2028',
      source: 'LIEC - France Prépa ENROLLMENT FORM • 2027–2028 (Public Website)',
    };

    // 1. Submit to LIEC Heav'n /api/demandes (feeds Public Student Application Form & Received Applications queue)
    const response = await fetch(`${LIEC_HEAVN_URL}/api/demandes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-email': 'public-portal@liecconsulting.com',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Erreur lors de la transmission du dossier à LIEC Heav’n' },
        { status: response.status }
      );
    }

    const assignedRef = data.ref || data.demande?.ref || data.candidatRef || '#DEM-2027-NEW';
    const assignedCandidatRef = data.candidatRef || data.demande?.candidat_ref;

    return NextResponse.json({
      ok: true,
      success: true,
      ref: assignedRef,
      demRef: data.ref || data.demande?.ref,
      candidatRef: assignedCandidatRef,
      fullName: data.demande?.full_name || fullName,
      program: data.demande?.program || payload.program,
      academicIntake: '2027–2028',
      message: 'Votre candidature pour LIEC - France Prépa (2027–2028) a été enregistrée avec succès.',
    });
  } catch (error: any) {
    console.error('Erreur API prepa-enrollment:', error);
    return NextResponse.json(
      {
        error: 'Impossible de joindre le serveur LIEC Heav’n. Veuillez vérifier votre connexion.',
        details: error?.message,
      },
      { status: 502 }
    );
  }
}
