# Hunn Digital Solutions — Website Design

**Date:** 2026-05-30
**Status:** Approved design, pending implementation plan

## Overview

A professional marketing website for Hunn Digital Solutions, a software solutions
business. The site serves lead generation, portfolio/credibility, online presence,
and a path to the company's own SaaS product — anchored on lead generation, with the
other goals in support.

Starting fresh: no existing brand assets or copy. Placeholder branding (a styled
wordmark), draft copy, and placeholder product details will be generated and clearly
marked for later replacement.

## Audience

- Small/medium businesses (non-technical owners/managers; speak in business outcomes)
- Startups / founders (seeking a dev partner or MVP build)
- End consumers (potential SaaS sign-ups)

Tone: approachable and outcome-focused, while still credible. Avoid heavy jargon.

## Goals

1. **Lead generation (primary)** — drive visitors to "Book a call" / contact.
2. **Credibility / presence** — legitimate, professional company face.
3. **Product path** — present the SaaS product with its own "Try / Sign up" CTA,
   kept distinct from the "Hire us" lead-gen path.

## Tech Approach

- **Framework:** Astro (static output).
- **Styling:** Tailwind CSS, with the palette and fonts as theme tokens.
- **Fonts:** Self-hosted via Fontsource — **Plus Jakarta Sans** (headings),
  **Inter** (body). No external font requests.
- **Contact form:** Web3Forms (form service). Access key stored in an environment
  variable, never hardcoded.
- **Deployment:** Static output; target (Railway / Netlify / Vercel) decided at
  deploy time. Railway is the default recommendation (already configured).

Rationale: a content-driven marketing site favors a static-first stack for speed,
SEO, and low maintenance. A backend (e.g. Go) would be more machinery than the job
needs; any future SaaS app lives in a separate codebase, which keeps the marketing
site cleanly decoupled.

## Information Architecture

Pages (v1):

- **Home** — hero + value prop, services preview (3 cards), product teaser,
  social-proof placeholder, primary lead-gen CTA.
- **Services** — three pillars expanded, each with outcomes-focused copy:
  1. Custom Software Development
  2. Consulting / Advisory
  3. Products / SaaS
- **Products** — the SaaS product presented with its own "Try / Sign up" CTA,
  separate from "Hire us".
- **About** — story, approach, values; builds trust for the SMB/founder audience.
- **Contact** — Web3Forms form + direct email/contact details.

Navigation: Home / Services / Products / About / Contact, with a persistent gold
"Contact" button as the standing CTA. Out of scope for v1: blog/insights, dedicated
portfolio/case-studies (can be added later).

## Project Structure

```
src/
  layouts/Base.astro        # shared <head>, header, footer, theme
  components/
    Header.astro            # sticky nav + logo wordmark, mobile hamburger
    Footer.astro            # contact info, links (dark forest band)
    Hero.astro
    ServiceCard.astro
    ProductCard.astro
    CTASection.astro        # reusable dark "let's talk" band
    ContactForm.astro       # Web3Forms-backed
  pages/
    index.astro             # Home
    services.astro
    products.astro
    about.astro
    contact.astro
  styles/                   # Tailwind config / theme tokens
public/                     # favicon, OG image, placeholder assets, robots.txt
```

## Visual System

**Locked direction:** bold dark-forest hero ("Direction B" combined). Dark forest
"bands" (hero, CTA sections, footer) alternate with light content sections.

**Hero composition:**
- Background: forest gradient `#23440c → #2f5911 (55%) → #3f7717`.
- Gold vertical accent bar on the left edge: `linear-gradient(#c18215, #80570e)`.
- Eyebrow label in gold-light `#e0a83f`, uppercase, letter-spaced.
- Headline with one keyword highlighted in gold-light `#e0a83f`.
- Primary CTA "Book a call": solid bronze `#a06c11`.
- Secondary CTA: gold-light `#e0a83f` outline, light text. Labeled **"View services"**
  and linking to the Services page for v1 (since a portfolio/work page is out of scope).
  The "Our work" label used in mockups is reserved for when case studies are added later.
- Nav "Contact" button: bronze `#a06c11`.

**Theme tokens:**

| Token          | Hex       | Use                                  |
|----------------|-----------|--------------------------------------|
| forest-900     | `#23440c` | darkest gradient stop, deep bands    |
| forest-800     | `#2f5911` | gradient mid, dark bands             |
| forest-700     | `#3f7717` | primary brand green                  |
| green-600      | `#466c22` | supporting green                     |
| green-650      | `#4d701e` | supporting green                     |
| gold-bright    | `#c18215` | bright gold accents, logo dot        |
| gold           | `#a06c11` | primary CTA / bronze actions         |
| gold-light     | `#e0a83f` | eyebrow, highlighted words, outlines |
| gold-deep      | `#80570e` | deep bronze, gradient end            |
| cream          | `#fbfaf6` | light section background             |
| ink            | `#1f2b14` | headings/body on light               |

## Components & Behavior

- **Header:** sticky; desktop nav inline; mobile collapses to a hamburger menu.
- **CTASection:** reusable dark forest band with a single clear CTA ("Book a call"),
  used near the bottom of content pages.
- **ContactForm (Web3Forms):**
  - Fields: name, email, message (+ hidden honeypot for spam).
  - Validation: required fields + email format; inline error states.
  - Success: inline confirmation message after submit.
  - Access key from env var.
- **ProductCard / Products page:** distinct "Try / Sign up" CTA styling so the
  product path reads differently from the lead-gen path.

## Quality, SEO & Accessibility

- **Responsive:** mobile-first; verified at mobile / tablet / desktop breakpoints.
- **Accessibility:** semantic HTML, alt text, visible focus states, and contrast
  checks on gold-on-green combinations (use gold-light `#e0a83f` for text on dark
  forest; reserve darker golds for solid fills, not small text on green).
- **SEO:** per-page title + meta description, Open Graph tags, `sitemap.xml`,
  `robots.txt`, favicon, OG share image.

## Testing / Done Criteria

- `astro build` succeeds and `astro check` (type check) passes.
- All internal links resolve; nav works on mobile and desktop.
- Contact form submits successfully to Web3Forms and shows the success state;
  validation errors display correctly.
- Lighthouse: strong scores on Performance, SEO, and Accessibility.
- Visual spot-check against the locked hero/theme on key pages.

## Out of Scope (v1)

- Blog / insights section.
- Dedicated portfolio / case-studies pages.
- The SaaS application itself (separate codebase).
- CMS integration (content lives in the repo for v1).
