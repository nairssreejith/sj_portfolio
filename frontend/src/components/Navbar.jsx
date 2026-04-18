import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      data-testid="navbar"
      className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border"
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center py-4">
        <a
          href="#hero"
          data-testid="nav-logo"
          className="font-heading font-medium text-primary text-lg tracking-tight flex items-center gap-2"
        >
          <span className="inline-block w-2 h-2 bg-accent" />
          Sreejith <span className="text-secondary font-light">S Nair</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className="font-mono text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hire me CTA */}
        <a
          href="#contact"
          data-testid="nav-cta"
          className="hidden md:inline-flex items-center px-5 py-2 border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden bg-bg-primary border-t border-border px-6 py-6 flex flex-col gap-5"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`mobile-link-${link.label.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            data-testid="mobile-cta"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex justify-center px-5 py-3 bg-primary text-white font-mono text-xs uppercase tracking-widest"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  )
}
