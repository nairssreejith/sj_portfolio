# Portfolio Website — PRD

## Overview
A modern, minimal, professional single-page portfolio website built with Vite + React + Tailwind CSS.

## Architecture
- **Frontend**: Vite 5 + React 18 + Tailwind CSS 3
- **Backend**: FastAPI (minimal, health endpoint only)
- **Styling**: Tailwind CSS with Swiss Brutalist design system
- **Icons**: lucide-react
- **Fonts**: Outfit (headings), IBM Plex Sans (body), JetBrains Mono (mono)

## Folder Structure
```
/app/
├── frontend/
│   ├── index.html                  # Entry with Google Fonts
│   ├── vite.config.js             # Vite config (port 3000, allowedHosts)
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── src/
│   │   ├── main.jsx               # React entry point
│   │   ├── App.jsx                # Root component
│   │   ├── index.css              # Global styles + Tailwind
│   │   └── components/
│   │       ├── Navbar.jsx         # Sticky nav + mobile hamburger
│   │       ├── Hero.jsx           # Hero section (name, bio, portrait, CTAs)
│   │       ├── About.jsx          # Bio + 4-stat grid + resume button
│   │       ├── Skills.jsx         # 6-category skills grid
│   │       ├── Projects.jsx       # 4 project cards with links
│   │       ├── Contact.jsx        # Contact form + info + social links
│   │       └── Footer.jsx         # Copyright footer
└── backend/
    ├── server.py                  # FastAPI minimal (health check)
    └── requirements.txt

## Design System
- Theme: Light (#FAFAFA background)
- Accent: #FF3300 (red-orange)
- Primary text: #0A0A0A
- Secondary text: #525252
- Style: Swiss Brutalist — sharp corners, grid borders, high contrast

## Implemented Features (Feb 2026)
- [x] Hero section — name, title badge, bio, portrait image, 2 CTAs
- [x] About section — bio paragraphs, 4 stats (Years, Projects, Clients, Uptime), Resume button
- [x] Skills section — 6 grid categories (Frontend, Backend, Database, DevOps, Tools, Soft Skills)
- [x] Projects section — 4 placeholder project cards (image, title, tags, Live Demo + Source Code links)
- [x] Contact section — form with name/email/message, success state, email link, location, social links, availability
- [x] Navbar — sticky, blur effect, desktop nav links + mobile hamburger menu
- [x] Footer — copyright
- [x] Responsive layout (mobile + desktop)
- [x] Semantic HTML throughout
- [x] data-testid on all interactive elements
- [x] Git initialized on `dev` branch
- [x] No animations / no external animation libraries (CSS transitions only)

## Backlog / P1 Features
- [ ] Connect to GitHub repo remote and push to dev branch (user needs to provide repo URL)
- [ ] Replace placeholder content with real data
- [ ] Add dark mode toggle
- [ ] Add smooth scroll progress indicator
- [ ] Add micro-animations (once user approves)
- [ ] Blog section
- [ ] Testimonials section
