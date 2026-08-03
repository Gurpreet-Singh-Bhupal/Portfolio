import { basics } from '../data/resume'

/** Preferred inbox for Contact (primary then fallback). */
export const CONTACT_INBOX = [
  'gurpreetOfficial0596@gmail.com',
  'gsingh5496@gmail.com',
] as const

export function getPreferredContactEmail(): string {
  const fromResume = basics?.emails?.find((email) =>
    CONTACT_INBOX.some((preferred) => preferred.toLowerCase() === email?.toLowerCase?.()),
  )
  return fromResume ?? basics?.email?.trim() ?? CONTACT_INBOX[0]
}

export type ContactPayload = {
  fromName: string
  fromEmail: string
  subject: string
  message: string
  toName?: string
}

export type SendContactResult =
  | { ok: true; method: 'emailjs' | 'mailto' | 'gmail' }
  | { ok: false; reason: 'missing_config' | 'send_failed'; message: string }

export type ContactSendChannel = 'mailto' | 'gmail'

function getEmailJsConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()

  if (!serviceId || !templateId || !publicKey) {
    return null
  }

  return { serviceId, templateId, publicKey }
}

export function isEmailJsConfigured(): boolean {
  return getEmailJsConfig() !== null
}

function buildMessageBody(payload: ContactPayload): string {
  return `Name: ${payload.fromName}\nFrom email: ${payload.fromEmail}\n\n${payload.message}`
}

/** mailto: → OS “Select an app” picker (Outlook etc.). Chrome usually will NOT open Gmail from this. */
export function buildContactMailto(payload: ContactPayload, toEmail?: string): string {
  const to = toEmail?.trim() || getPreferredContactEmail()
  const subject = payload.subject?.trim() || `Portfolio contact from ${payload.fromName}`
  const params = new URLSearchParams({
    subject,
    body: buildMessageBody(payload),
  })
  return `mailto:${to}?${params.toString()}`
}

/** Gmail web compose — use this when the visitor wants Gmail in the browser (Chrome). */
export function buildGmailComposeUrl(payload: ContactPayload, toEmail?: string): string {
  const to = toEmail?.trim() || getPreferredContactEmail()
  const subject = payload.subject?.trim() || `Portfolio contact from ${payload.fromName}`
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to,
    su: subject,
    body: buildMessageBody(payload),
  })
  return `https://mail.google.com/mail/?${params.toString()}`
}

/**
 * Send contact message.
 * - EmailJS when configured
 * - channel 'mailto' → OS app picker
 * - channel 'gmail' → Gmail compose in browser (works in Chrome)
 */
export async function sendContactEmail(
  payload: ContactPayload,
  channel: ContactSendChannel = 'mailto',
): Promise<SendContactResult> {
  const config = getEmailJsConfig()
  const toEmail = getPreferredContactEmail()

  if (config) {
    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        config.serviceId,
        config.templateId,
        {
          from_name: payload.fromName,
          from_email: payload.fromEmail,
          subject: payload.subject,
          message: payload.message,
          to_name: payload.toName ?? 'Gurpreet',
          to_email: toEmail,
          reply_to: payload.fromEmail,
        },
        { publicKey: config.publicKey },
      )
      return { ok: true, method: 'emailjs' }
    } catch {
      return {
        ok: false,
        reason: 'send_failed',
        message: 'Could not send your message. Please try again or use the email link below.',
      }
    }
  }

  if (typeof window === 'undefined') {
    return {
      ok: false,
      reason: 'missing_config',
      message: 'Unable to open email from this environment. Please use the email links below.',
    }
  }

  if (channel === 'gmail') {
    try {
      const opened = window.open(buildGmailComposeUrl(payload, toEmail), '_blank', 'noopener,noreferrer')
      if (opened) return { ok: true, method: 'gmail' }
      return {
        ok: false,
        reason: 'send_failed',
        message: 'Popup blocked. Allow popups for this site, or use “Send via email app”.',
      }
    } catch {
      return {
        ok: false,
        reason: 'send_failed',
        message: `Could not open Gmail. Please email ${toEmail} using the links below.`,
      }
    }
  }

  try {
    window.location.href = buildContactMailto(payload, toEmail)
    return { ok: true, method: 'mailto' }
  } catch {
    return {
      ok: false,
      reason: 'send_failed',
      message: `Could not open the email picker. Please email ${toEmail} using the links below.`,
    }
  }
}
