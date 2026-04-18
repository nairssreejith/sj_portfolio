# PRD — SJ Portfolio (nairssreejith)

## Original Problem Statement
Fetch portfolio code from https://github.com/nairssreejith/sj_portfolio/tree/dev and refactor the portfolio layout to introduce a background animation layer. The background is intended for a future day-to-night sky gradient scroll transition.

## Architecture
- **Framework**: React + Vite + Tailwind CSS + Framer Motion v12
- **Design System**: Swiss / High-Contrast — flat colors, JetBrains Mono, Outfit, IBM Plex Sans
- **Backend**: FastAPI + MongoDB (not used by frontend currently)

## Layer Structure (Key Refactor — Completed)
```
#page-root (position: relative)
├── BackgroundLayer (position: fixed, inset-0, z-0, pointer-events-none)
│   └── [sky gradient slots — empty until animation phase]
└── #content-layer (position: relative, z-10, scrolls normally)
    ├── Navbar (sticky top-0 z-50)
    ├── Hero (#hero, bg-bg-primary #FAFAFA)
    ├── About (#about, bg-bg-secondary #FFFFFF)
    ├── Skills (#skills, bg-bg-primary #FAFAFA)
    ├── Projects (#projects, bg-bg-secondary #FFFFFF)
    ├── Contact (#contact, bg-bg-primary #FAFAFA)
    └── Footer (bg-primary #0A0A0A)
```

## Color Tokens
| Token         | Value    |
|---------------|----------|
| primary       | #0A0A0A  |
| secondary     | #525252  |
| accent        | #FF3300  |
| border        | #E5E5E5  |
| bg-primary    | #FAFAFA  |
| bg-secondary  | #FFFFFF  |

## What's Been Implemented
- [x] 2026-04-18 — Background animation layer structure introduced
  - `App.jsx` refactored: page-root (relative) > BackgroundLayer (fixed z-0) + content-layer (relative z-10)
  - `BackgroundLayer.jsx` created: fixed, inset-0, z-0, pointer-events-none, aria-hidden — reserved slot for sky gradient
  - `useScroll()` from Framer Motion wired up — logs scroll progress (0–100%) to console, ready for animation phase
  - 100% test pass rate (11/11 Playwright tests)

## Backlog / Next Steps

### P0 — Animation Phase (Next)
- Add sky gradient layers (dawn, day, dusk, night divs) inside BackgroundLayer
- Pass scrollYProgress MotionValue from App.jsx to BackgroundLayer as prop
- Make section backgrounds transparent/semi-transparent so sky shows through
- Wire scroll position to gradient opacity transitions

### P1 — Content Personalisation
- Replace placeholder name/email/links with real details
- Add actual profile photo and project data

### P2 — Enhancements
- Staggered section entrance animations
- Wire contact form to backend API or email service
- SEO meta tags (og:image, Twitter card)
- Resume PDF at /public/resume.pdf
