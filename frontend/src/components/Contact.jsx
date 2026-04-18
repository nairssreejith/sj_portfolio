import { useState } from 'react'
import { MapPin, Github, Linkedin, Mail, Phone } from 'lucide-react'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sreejithsnair', icon: Linkedin, testId: 'contact-linkedin' },
  { label: 'GitHub',   href: 'https://github.com/nairssreejith',         icon: Github,   testId: 'contact-github'   },
  { label: 'Email',    href: 'mailto:sreejithsnair.sj@gmail.com',        icon: Mail,     testId: 'contact-mail'     },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-24 md:py-32 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p
          data-testid="contact-label"
          className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-4"
        >
          04 — Contact
        </p>
        <h2
          data-testid="contact-heading"
          className="font-heading font-medium text-3xl md:text-5xl tracking-tight text-primary mb-4 leading-[1.05]"
        >
          Got a project that needs<br />
          <span className="text-accent">a senior engineer?</span>
        </h2>
        <p className="font-body text-base md:text-lg leading-relaxed text-secondary mb-14 max-w-xl">
          Hiring, collaborating, or just comparing notes on Android / AR / AWS?
          I reply to every serious message within 1–2 business days.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact form */}
          {submitted ? (
            <div
              data-testid="contact-success"
              className="flex flex-col justify-center items-start p-8 border border-accent bg-white"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Message Sent</p>
              <p className="font-heading font-medium text-2xl text-primary mb-2">Thanks for reaching out!</p>
              <p className="font-body text-base text-secondary">I'll get back to you within 1–2 business days.</p>
              <button
                data-testid="contact-send-another"
                onClick={() => setSubmitted(false)}
                className="mt-6 font-mono text-xs uppercase tracking-widest text-secondary hover:text-primary underline underline-offset-4 transition-colors duration-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              data-testid="contact-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
            >
              <div>
                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-secondary mb-2">Your Name</label>
                <input
                  id="name" name="name" type="text" required
                  value={form.name} onChange={handleChange}
                  data-testid="contact-input-name"
                  placeholder="e.g. Priya Menon"
                  className="w-full border border-border bg-bg-secondary px-4 py-3 font-body text-sm text-primary placeholder-secondary focus:outline-none focus:border-primary transition-colors duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-secondary mb-2">Email Address</label>
                <input
                  id="email" name="email" type="email" required
                  value={form.email} onChange={handleChange}
                  data-testid="contact-input-email"
                  placeholder="you@company.com"
                  className="w-full border border-border bg-bg-secondary px-4 py-3 font-body text-sm text-primary placeholder-secondary focus:outline-none focus:border-primary transition-colors duration-300"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-secondary mb-2">Message</label>
                <textarea
                  id="message" name="message" rows={6} required
                  value={form.message} onChange={handleChange}
                  data-testid="contact-input-message"
                  placeholder="Tell me about the team, the stack, and the problem you'd like me to solve..."
                  className="w-full border border-border bg-bg-secondary px-4 py-3 font-body text-sm text-primary placeholder-secondary focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                data-testid="contact-submit-btn"
                className="self-start px-8 py-3 bg-primary text-white font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors duration-300"
              >
                Send Message →
              </button>
            </form>
          )}

          {/* Info block */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-5">
                Direct Contact
              </p>
              <a
                href="mailto:sreejithsnair.sj@gmail.com"
                data-testid="contact-email-link"
                className="font-heading font-light text-2xl md:text-3xl tracking-tight text-primary hover:text-accent transition-colors duration-300 break-all"
              >
                sreejithsnair.sj@gmail.com
              </a>
              <a
                href="tel:+918848791837"
                data-testid="contact-phone-link"
                className="mt-3 flex items-center gap-2 font-mono text-sm text-secondary hover:text-primary transition-colors duration-300"
              >
                <Phone size={14} />
                +91 884 8791837
              </a>
            </div>

            <div className="border-t border-border pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-4">
                Location
              </p>
              <div className="flex items-center gap-2 text-secondary">
                <MapPin size={15} />
                <span className="font-body text-base">Trivandrum, Kerala — Open to Remote · Global</span>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-5">
                On the Web
              </p>
              <div className="flex items-center gap-5">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon, testId }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={testId}
                    aria-label={label}
                    className="text-secondary hover:text-primary transition-colors duration-300"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary mb-2">
                Availability
              </p>
              <div className="flex items-center gap-2" data-testid="availability-badge">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-body text-sm text-secondary">Open to senior / lead engineering roles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
