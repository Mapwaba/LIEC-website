import nodemailer from "nodemailer";

export interface SendEmailOptions {
  to?: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}

export interface MailerResult {
  sent: boolean;
  method: string;
  recipient: string;
  error?: string;
  resendDiag?: any;
}

export async function sendNotificationEmail(options: SendEmailOptions): Promise<MailerResult> {
  const targetRecipient = options.to || process.env.NOTIFICATION_EMAIL || "contacts@liecconsulting.com";
  const fallbackRecipient = "bmapwabantoro@liecconsulting.com";
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM || "LIEC Website <onboarding@resend.dev>";

  let resendDiag: any = null;

  // 1. Essai d'envoi via Resend API
  if (resendApiKey) {
    try {
      const sendViaResend = async (toAddress: string) => {
        return fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey.trim()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toAddress],
            reply_to: options.replyTo,
            subject: options.subject,
            html: options.html,
            text: options.text,
          }),
        });
      };

      const res = await sendViaResend(targetRecipient);
      if (res.ok) {
        return {
          sent: true,
          method: "resend",
          recipient: targetRecipient,
        };
      }

      resendDiag = await res.json().catch(() => ({}));
      // Si le domaine n'est pas encore vérifié sur Resend, basculer sur l'adresse propriétaire
      if (resendDiag?.statusCode === 403 && targetRecipient !== fallbackRecipient) {
        console.warn("Resend test mode: redirection automatique vers le compte propriétaire", fallbackRecipient);
        const fallbackRes = await sendViaResend(fallbackRecipient);
        if (fallbackRes.ok) {
          return {
            sent: true,
            method: "resend-fallback",
            recipient: fallbackRecipient,
            resendDiag,
          };
        }
      }
      console.error("Resend API error:", resendDiag);
    } catch (err: any) {
      resendDiag = { exception: err?.message };
      console.error("Resend fetch exception:", err?.message);
    }
  }

  // 2. Essai d'envoi via SMTP (Google Workspace / Gmail / Hostinger / OVH)
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"LIEC Web" <${smtpUser}>`,
        to: targetRecipient,
        replyTo: options.replyTo,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      return {
        sent: true,
        method: "smtp",
        recipient: targetRecipient,
      };
    } catch (smtpErr: any) {
      console.error("SMTP send error:", smtpErr?.message);
      return {
        sent: false,
        method: "failed",
        recipient: targetRecipient,
        error: smtpErr?.message,
        resendDiag,
      };
    }
  }

  // 3. Fallback client si aucun transport d'email n'est configuré
  return {
    sent: false,
    method: "fallback",
    recipient: targetRecipient,
    resendDiag,
  };
}
