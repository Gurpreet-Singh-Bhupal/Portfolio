import { useState, type FormEvent } from 'react'
import { basics } from '../../data/resume'
import { BTN_PRIMARY_CLASS } from '../../constants'
import {
  getPreferredContactEmail,
  isEmailJsConfigured,
  sendContactEmail,
  type ContactSendChannel,
} from '../../services/email'
import { isUsableSocialUrl } from '../../utils/socialLinks'
import { Reveal } from '../Common'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const initialForm: FormState = { name: '', email: '', subject: '', message: '' }

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const configured = isEmailJsConfigured()
  const preferredInbox = getPreferredContactEmail()
  const emails =
    basics?.emails?.length > 0
      ? basics.emails
      : basics?.email
        ? [basics.email]
        : [preferredInbox]

  function validate(): string | null {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      return 'Please fill in name, email, subject, and message.'
    }
    if (!isValidEmail(form.email.trim())) {
      return 'Please enter a valid email address.'
    }
    return null
  }

  async function send(channel: ContactSendChannel) {
    const error = validate()
    if (error) {
      setStatus('error')
      setFeedback(error)
      return
    }

    setStatus('sending')
    setFeedback('')

    const result = await sendContactEmail(
      {
        fromName: form.name.trim(),
        fromEmail: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        toName: basics?.name,
      },
      channel,
    )

    if (result.ok) {
      setStatus('success')
      if (result.method === 'mailto') {
        setFeedback(
          `System email-app picker opened. Prefer Outlook for compose. Chrome usually does not open Gmail from that list — use “Open in Gmail” below instead.`,
        )
      } else if (result.method === 'gmail') {
        setFeedback(
          `Gmail compose opened for ${preferredInbox} with Subject and message filled. Sign in if needed, then click Send.`,
        )
      } else {
        setFeedback('Message sent. Thank you — I will get back to you soon.')
        setForm(initialForm)
      }
      return
    }

    setStatus('error')
    setFeedback(result.message)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void send('mailto')
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-b border-line bg-surface/60 py-14 sm:py-20"
    >
      <Reveal className="mx-auto grid max-w-6xl gap-8 px-4 sm:gap-10 sm:px-5 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 id="contact-heading" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Contact
          </h2>
          <p className="mt-3 text-base font-medium leading-relaxed text-ink/80 sm:text-lg">
            Fill your name, email (from), subject, and message. Preferred inbox:{' '}
            <span className="font-semibold text-ink">{preferredInbox}</span>.
          </p>
          <div className="mt-6 space-y-2 text-base">
            {emails.map((address) => (
              <p key={address}>
                <a
                  href={`mailto:${address}`}
                  className="break-all font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {address}
                </a>
              </p>
            ))}
            {basics?.phones?.map((phone) => (
              <p key={phone} className="text-ink/80">
                <a
                  href={`tel:${phone?.replace?.(/\s+/g, '') ?? ''}`}
                  className="font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {phone}
                </a>
              </p>
            ))}
            {isUsableSocialUrl(basics?.linkedin) ? (
              <p>
                <a
                  href={basics.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  LinkedIn
                </a>
              </p>
            ) : null}
            {isUsableSocialUrl(basics?.github) ? (
              <p>
                <a
                  href={basics.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  GitHub
                </a>
              </p>
            ) : null}
          </div>
          {!configured ? (
            <p
              className="mt-6 rounded-md border border-line bg-canvas px-3 py-3 text-sm font-medium text-ink/80 sm:text-base"
              role="status"
            >
              <strong>Send via email app</strong> shows the Windows app picker (Outlook works best).{' '}
              <strong>Open in Gmail</strong> opens Gmail compose in Chrome with To, Subject, and body
              filled — use this if you want Gmail in the browser (Chrome in the mailto picker usually
              does not open Gmail).
            </p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="contact-name" className="block text-base font-semibold text-ink">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1 w-full rounded-md border border-line bg-canvas px-3 py-2.5 text-base text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-base font-semibold text-ink">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="mt-1 w-full rounded-md border border-line bg-canvas px-3 py-2.5 text-base text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className="block text-base font-semibold text-ink">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              autoComplete="off"
              required
              value={form.subject}
              onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
              className="mt-1 w-full rounded-md border border-line bg-canvas px-3 py-2.5 text-base text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
              placeholder="Subject"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-base font-semibold text-ink">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              className="mt-1 w-full resize-y rounded-md border border-line bg-canvas px-3 py-2.5 text-base text-ink outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button type="submit" disabled={status === 'sending'} className={BTN_PRIMARY_CLASS}>
              {status === 'sending' ? 'Opening…' : 'Send via email app'}
            </button>
            <button
              type="button"
              disabled={status === 'sending'}
              onClick={() => void send('gmail')}
              className="rounded-md border border-accent bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open in Gmail
            </button>
          </div>
          {feedback ? (
            <p
              role="status"
              className={`text-base font-medium ${status === 'success' ? 'text-accent' : 'text-red-700 dark:text-red-400'}`}
            >
              {feedback}
            </p>
          ) : null}
        </form>
      </Reveal>
    </section>
  )
}
