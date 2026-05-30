# Hunn Digital Solutions Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, professional marketing website for Hunn Digital Solutions (Home, Services, Products, About, Contact) with a forest-green + gold visual system and a Web3Forms-backed contact form.

**Architecture:** Astro static site. A single `Base.astro` layout owns `<head>`/SEO, fonts, and the global stylesheet. Reusable presentational components (Header, Footer, Hero, CTASection, ServiceCard, ProductCard, ContactForm) are composed by five page files. All copy/content lives in one `src/data/site.ts` module so content and presentation stay separated (content and components change for different reasons).

**Tech Stack:** Astro 5 (static output), Tailwind CSS v4 (via `@tailwindcss/vite`, CSS-first `@theme` config), self-hosted fonts via Fontsource (Plus Jakarta Sans + Inter), `@astrojs/sitemap`, `@astrojs/check` + TypeScript for type checking, Web3Forms for the contact form.

**Conventions for the executing engineer:**
- All shell commands run from the project root: `/Users/leah/code/hunn-digital-solutions`.
- The repo already exists with `README.md`, `.gitignore` (contains `.superpowers/`), and `docs/`. Do **not** re-init git.
- Placeholder copy and the SaaS product ("Hunnvoice") are intentional stand-ins — they are clearly real-looking but meant to be replaced. Do not invent client logos or fake testimonials beyond the neutral placeholders specified.
- Build script is `astro check && astro build`; "verify build passes" always means that combined command succeeds with zero errors.
- Tailwind v4 has **no** `tailwind.config.js`; theme tokens are defined in CSS via `@theme`.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `astro.config.mjs` | Astro config: `site` URL, Tailwind Vite plugin, sitemap integration |
| `package.json` | Scripts (`dev`, `build` = check+build, `preview`), deps |
| `.env.example` | Documents `PUBLIC_WEB3FORMS_KEY` |
| `src/styles/global.css` | Tailwind import, `@theme` tokens (colors + fonts), base body font, hero/accent-bar utility classes |
| `src/data/site.ts` | All content: company info, nav links, services, product, value props |
| `src/layouts/Base.astro` | `<head>`, SEO meta/OG, font + CSS imports, Header + Footer wrapper, `<slot/>` |
| `src/components/Header.astro` | Sticky nav, wordmark, desktop links + gold Contact button, mobile hamburger |
| `src/components/Footer.astro` | Dark forest footer band: company blurb, nav, contact email |
| `src/components/Hero.astro` | Dark-forest gradient hero with accent bar, eyebrow, highlighted headline, two CTAs |
| `src/components/CTASection.astro` | Reusable dark forest "let's talk" band with a single CTA |
| `src/components/ServiceCard.astro` | One service pillar card (icon, title, outcome copy) |
| `src/components/ProductCard.astro` | SaaS product card with distinct "Try / Sign up" CTA styling |
| `src/components/ContactForm.astro` | Web3Forms form: fields, honeypot, validation, success/error states |
| `src/pages/index.astro` | Home |
| `src/pages/services.astro` | Services (3 pillars) |
| `src/pages/products.astro` | Products / SaaS |
| `src/pages/about.astro` | About |
| `src/pages/contact.astro` | Contact (form + details) |
| `public/favicon.svg` | Forest-green + gold favicon |
| `public/robots.txt` | Allow all + sitemap reference |

---

## Task 1: Scaffold the Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` (scaffold output)

- [ ] **Step 1: Scaffold Astro into the existing directory**

The repo root already has files, so scaffold into a temp dir and move contents in (create-astro refuses a non-empty target).

Run:
```bash
cd /Users/leah/code/hunn-digital-solutions
npm create astro@latest .astro-scaffold -- --template minimal --install --no-git --skip-houston --yes
```
Expected: a `.astro-scaffold/` directory with `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, and `node_modules/`.

- [ ] **Step 2: Move scaffold contents into the repo root**

Run:
```bash
cd /Users/leah/code/hunn-digital-solutions
cp -R .astro-scaffold/. . && rm -rf .astro-scaffold
ls
```
Expected: root now contains `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`, `node_modules/`, `public/`, plus the pre-existing `README.md`, `docs/`, `.gitignore`.

- [ ] **Step 3: Add build artifacts and env to .gitignore**

Append to `.gitignore` (it currently contains only `.superpowers/`):
```
# Astro / Node
node_modules/
dist/
.astro/
.env
.DS_Store
```

- [ ] **Step 4: Verify the dev server runs**

Run:
```bash
npm run dev
```
Expected: Astro dev server starts and prints a `http://localhost:4321` URL with no errors. Stop it with Ctrl-C after confirming.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro minimal project"
```

---

## Task 2: Add Tailwind v4 and define the theme tokens

**Files:**
- Modify: `astro.config.mjs`
- Create: `src/styles/global.css`

- [ ] **Step 1: Add Tailwind v4 via the Astro integration**

Run:
```bash
npx astro add tailwind --yes
```
Expected: installs `tailwindcss` + `@tailwindcss/vite`, adds the Vite plugin to `astro.config.mjs`, and creates `src/styles/global.css` containing `@import "tailwindcss";`.

- [ ] **Step 2: Replace `src/styles/global.css` with the full theme**

Overwrite `src/styles/global.css` with:
```css
@import "tailwindcss";

/* Brand theme tokens. Each --color-* / --font-* generates matching utilities
   (e.g. bg-forest-700, text-gold-light, font-heading). */
@theme {
  --color-forest-900: #23440c;
  --color-forest-800: #2f5911;
  --color-forest-700: #3f7717;
  --color-leaf-600: #466c22;
  --color-leaf-700: #4d701e;

  --color-gold-bright: #c18215;
  --color-gold: #a06c11;
  --color-gold-light: #e0a83f;
  --color-gold-deep: #80570e;

  --color-cream: #fbfaf6;
  --color-ink: #1f2b14;

  --font-heading: "Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
}

/* Site-wide defaults */
body {
  font-family: var(--font-body);
  color: var(--color-ink);
  background: #ffffff;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
}

/* Locked visual-system gradients (exact values from the approved design) */
.hero-forest {
  background: linear-gradient(160deg, var(--color-forest-900), var(--color-forest-800) 55%, var(--color-forest-700));
}
.accent-bar {
  background: linear-gradient(var(--color-gold-bright), var(--color-gold-deep));
}

/* Token note: spec's green-600 / green-650 map to leaf-600 / leaf-700 here to
   avoid colliding with Tailwind's default green-* palette. */
```

- [ ] **Step 3: Verify Tailwind compiles**

Run:
```bash
npm run dev
```
Expected: dev server starts with no CSS/build errors. Stop with Ctrl-C. (The page won't use these tokens yet — that happens in Task 4.)

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs src/styles/global.css package.json package-lock.json
git commit -m "feat: add Tailwind v4 and brand theme tokens"
```

---

## Task 3: Install fonts and create the Base layout

**Files:**
- Create: `src/layouts/Base.astro`
- Modify: `astro.config.mjs` (add `site`)

- [ ] **Step 1: Install Fontsource variable fonts**

Run:
```bash
npm install @fontsource-variable/plus-jakarta-sans @fontsource-variable/inter
```
Expected: both packages added to `dependencies`.

- [ ] **Step 2: Set the `site` URL in `astro.config.mjs`**

Edit `astro.config.mjs` so the config object includes a `site` key (needed for sitemap + absolute OG URLs). Result should look like:
```js
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.hunndigital.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
```
(The `site` value is a placeholder domain; it only affects generated absolute URLs and can be changed at deploy time.)

- [ ] **Step 3: Create `src/layouts/Base.astro`**

```astro
---
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/inter";
import "../styles/global.css";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site).toString();
const ogImageUrl = ogImage ? new URL(ogImage, Astro.site).toString() : undefined;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonical} />

    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </head>
  <body class="flex min-h-screen flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```
Note: this imports `Header` and `Footer`, created in Tasks 5–6. The build will fail until those exist — that is expected; we verify Base at the end of Task 6.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json astro.config.mjs src/layouts/Base.astro
git commit -m "feat: add fonts, site URL, and Base layout"
```

---

## Task 4: Create the site content data module

**Files:**
- Create: `src/data/site.ts`

- [ ] **Step 1: Write `src/data/site.ts`**

```ts
// Single source of truth for all site content. Replace placeholder copy /
// the "Hunnvoice" product details with real content when available.

export const company = {
  name: "Hunn Digital Solutions",
  wordmark: "Hunn", // the "." after it is styled gold in the UI
  tagline: "Software that grows your business.",
  email: "hello@hunndigital.com", // placeholder — replace with real inbox
  blurb:
    "We design, build, and ship digital products for startups and growing teams — from first MVP to scaling SaaS.",
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
];

export interface Service {
  title: string;
  outcome: string;
  description: string;
}

export const services: Service[] = [
  {
    title: "Custom Software Development",
    outcome: "Turn an idea into a working product.",
    description:
      "Web and mobile applications built to fit your business — from first MVP to a production system your team can rely on. Pragmatic tech choices, clean handover, no lock-in.",
  },
  {
    title: "Consulting & Advisory",
    outcome: "Make confident technical decisions.",
    description:
      "Architecture reviews, technology strategy, and fractional CTO support. We help you choose the right approach, de-risk the build, and keep delivery on track.",
  },
  {
    title: "Products & SaaS",
    outcome: "Launch and grow your own software.",
    description:
      "End-to-end product development for SaaS founders — design, build, and iterate on a subscription product, with the scalability and reliability to grow into it.",
  },
];

export interface Product {
  name: string;
  pitch: string;
  description: string;
  features: string[];
  signupHref: string; // "Try / Sign up" destination — placeholder for now
}

export const product: Product = {
  name: "Hunnvoice", // placeholder product name — replace with real product
  pitch: "Effortless client invoicing for small service businesses.",
  description:
    "Hunnvoice is our own SaaS product: send polished invoices, track payments, and get paid faster — without the spreadsheet juggling. Built for freelancers and small teams.",
  features: [
    "Branded invoices in seconds",
    "Automatic payment reminders",
    "Real-time payment tracking",
    "Simple, transparent pricing",
  ],
  signupHref: "#", // placeholder — point at the real signup/app URL later
};

export interface ValueProp {
  title: string;
  description: string;
}

export const valueProps: ValueProp[] = [
  {
    title: "Outcome-focused",
    description:
      "We measure success by your business results, not lines of code.",
  },
  {
    title: "Senior, hands-on team",
    description:
      "You work directly with experienced engineers — no layers, no hand-offs.",
  },
  {
    title: "Built to last",
    description:
      "Clean, maintainable software with clear documentation and no lock-in.",
  },
];
```

- [ ] **Step 2: Verify it type-checks**

This module is imported in later tasks; confirm there are no TypeScript errors now by running the type checker (it will also report the missing components, which is fine — confirm there are no errors *in this file*).

Run:
```bash
npx astro check 2>&1 | grep -i "site.ts" || echo "no site.ts errors"
```
Expected: `no site.ts errors`.

- [ ] **Step 3: Commit**

```bash
git add src/data/site.ts
git commit -m "feat: add site content data module"
```

---

## Task 5: Header component

**Files:**
- Create: `src/components/Header.astro`

- [ ] **Step 1: Write `src/components/Header.astro`**

```astro
---
import { company, navLinks } from "../data/site";
---

<header class="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
    <a href="/" class="font-heading text-xl font-extrabold text-forest-700">
      {company.wordmark}<span class="text-gold-bright">.</span>
    </a>

    <!-- Desktop nav -->
    <nav class="hidden items-center gap-7 md:flex" aria-label="Primary">
      {
        navLinks.map((link) => (
          <a
            href={link.href}
            class="text-sm font-medium text-ink/80 transition-colors hover:text-forest-700"
          >
            {link.label}
          </a>
        ))
      }
      <a
        href="/contact"
        class="rounded-md bg-gold px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gold-deep"
      >
        Contact
      </a>
    </nav>

    <!-- Mobile hamburger -->
    <button
      id="menu-toggle"
      class="md:hidden"
      aria-label="Toggle menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-forest-700">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
  </div>

  <!-- Mobile menu panel -->
  <nav
    id="mobile-menu"
    class="hidden border-t border-black/5 bg-white px-5 py-4 md:hidden"
    aria-label="Mobile"
  >
    <ul class="flex flex-col gap-3">
      {
        navLinks.map((link) => (
          <li>
            <a href={link.href} class="block py-1 text-base font-medium text-ink/80">
              {link.label}
            </a>
          </li>
        ))
      }
      <li>
        <a
          href="/contact"
          class="mt-1 inline-block rounded-md bg-gold px-4 py-2 text-base font-bold text-white"
        >
          Contact
        </a>
      </li>
    </ul>
  </nav>
</header>

<script>
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  toggle?.addEventListener("click", () => {
    const isOpen = menu?.classList.toggle("hidden") === false;
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add Header with responsive nav"
```

---

## Task 6: Footer component (and verify Base renders)

**Files:**
- Create: `src/components/Footer.astro`
- Temporarily touch: `src/pages/index.astro` (smoke render)

- [ ] **Step 1: Write `src/components/Footer.astro`**

```astro
---
import { company, navLinks } from "../data/site";
const year = new Date().getFullYear();
---

<footer class="hero-forest text-cream">
  <div class="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
    <div>
      <p class="font-heading text-lg font-extrabold text-white">
        {company.wordmark}<span class="text-gold-light">.</span>
      </p>
      <p class="mt-3 max-w-xs text-sm text-cream/80">{company.blurb}</p>
    </div>

    <div>
      <p class="text-xs font-bold uppercase tracking-wider text-gold-light">Explore</p>
      <ul class="mt-3 flex flex-col gap-2 text-sm">
        <li><a href="/" class="text-cream/80 hover:text-white">Home</a></li>
        {
          navLinks.map((link) => (
            <li>
              <a href={link.href} class="text-cream/80 hover:text-white">
                {link.label}
              </a>
            </li>
          ))
        }
        <li><a href="/contact" class="text-cream/80 hover:text-white">Contact</a></li>
      </ul>
    </div>

    <div>
      <p class="text-xs font-bold uppercase tracking-wider text-gold-light">Get in touch</p>
      <a
        href={`mailto:${company.email}`}
        class="mt-3 inline-block text-sm text-cream/90 hover:text-white"
      >
        {company.email}
      </a>
    </div>
  </div>

  <div class="border-t border-white/10">
    <p class="mx-auto max-w-6xl px-5 py-5 text-xs text-cream/60">
      © {year} {company.name}. All rights reserved.
    </p>
  </div>
</footer>
```

- [ ] **Step 2: Add a temporary smoke body to `index.astro`**

Replace the scaffolded `src/pages/index.astro` with:
```astro
---
import Base from "../layouts/Base.astro";
---

<Base title="Hunn Digital Solutions" description="Software that grows your business.">
  <section class="mx-auto max-w-6xl px-5 py-16">
    <h1 class="font-heading text-3xl font-extrabold text-forest-700">Header + Footer smoke test</h1>
  </section>
</Base>
```

- [ ] **Step 3: Verify the full layout builds and renders**

Run:
```bash
npm run dev
```
Expected: dev server starts with no errors. Open `http://localhost:4321` and confirm: sticky white header with `Hunn.` wordmark + nav + gold Contact button; dark forest footer with three columns and the copyright line. Resize narrow to confirm the hamburger appears and toggles the mobile menu. Stop with Ctrl-C.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add Footer and verify Base layout renders"
```

---

## Task 7: Hero component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Write `src/components/Hero.astro`**

Implements the locked hero: forest gradient (`.hero-forest`), gold left accent bar (`.accent-bar`), gold eyebrow, headline with a gold-highlighted keyword, bronze primary CTA, gold-outline secondary CTA.

```astro
---
interface Props {
  eyebrow: string;
  headlineLead: string; // e.g. "Software that grows your"
  headlineHighlight: string; // e.g. "business." — rendered in gold
  subtext: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

const {
  eyebrow,
  headlineLead,
  headlineHighlight,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
} = Astro.props;
---

<section class="hero-forest relative text-white">
  <div class="accent-bar absolute left-0 top-0 bottom-0 w-[7px]"></div>
  <div class="mx-auto max-w-6xl px-7 py-20 md:py-28">
    <p class="text-xs font-bold uppercase tracking-[0.15em] text-gold-light">
      {eyebrow}
    </p>
    <h1 class="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.12] md:text-6xl">
      {headlineLead} <span class="text-gold-light">{headlineHighlight}</span>
    </h1>
    <p class="mt-5 max-w-xl text-base text-cream/85 md:text-lg">{subtext}</p>
    <div class="mt-8 flex flex-wrap gap-4">
      <a
        href={primaryHref}
        class="rounded-lg bg-gold px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-gold-deep"
      >
        {primaryLabel}
      </a>
      <a
        href={secondaryHref}
        class="rounded-lg border-[1.5px] border-gold-light px-6 py-3 text-sm font-bold text-cream transition-colors hover:bg-white/10"
      >
        {secondaryLabel}
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero component (locked visual direction)"
```

---

## Task 8: CTASection component

**Files:**
- Create: `src/components/CTASection.astro`

- [ ] **Step 1: Write `src/components/CTASection.astro`**

```astro
---
interface Props {
  heading: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const {
  heading,
  subtext = "Tell us what you're building. We'll tell you how we can help.",
  ctaLabel = "Book a call",
  ctaHref = "/contact",
} = Astro.props;
---

<section class="hero-forest text-white">
  <div class="mx-auto flex max-w-6xl flex-col items-start gap-6 px-7 py-16 md:flex-row md:items-center md:justify-between">
    <div>
      <h2 class="max-w-xl text-2xl font-extrabold md:text-3xl">{heading}</h2>
      <p class="mt-2 max-w-lg text-cream/80">{subtext}</p>
    </div>
    <a
      href={ctaHref}
      class="shrink-0 rounded-lg bg-gold px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-gold-deep"
    >
      {ctaLabel}
    </a>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CTASection.astro
git commit -m "feat: add reusable CTASection band"
```

---

## Task 9: ServiceCard component

**Files:**
- Create: `src/components/ServiceCard.astro`

- [ ] **Step 1: Write `src/components/ServiceCard.astro`**

```astro
---
import type { Service } from "../data/site";

interface Props {
  service: Service;
}

const { service } = Astro.props;
---

<article class="rounded-xl border border-black/5 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
  <div class="accent-bar h-1 w-10 rounded-full"></div>
  <h3 class="mt-5 text-xl font-extrabold text-forest-700">{service.title}</h3>
  <p class="mt-2 font-semibold text-gold-deep">{service.outcome}</p>
  <p class="mt-3 text-sm leading-relaxed text-ink/75">{service.description}</p>
</article>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ServiceCard.astro
git commit -m "feat: add ServiceCard component"
```

---

## Task 10: ProductCard component

**Files:**
- Create: `src/components/ProductCard.astro`

- [ ] **Step 1: Write `src/components/ProductCard.astro`**

Distinct from services: a light card with a gold-outline "Try / Sign up" CTA so the product path reads differently from the lead-gen path.

```astro
---
import { product } from "../data/site";
---

<article class="overflow-hidden rounded-2xl border border-black/5 bg-cream shadow-sm">
  <div class="grid gap-8 p-8 md:grid-cols-2 md:p-10">
    <div>
      <p class="text-xs font-bold uppercase tracking-wider text-gold-deep">Our Product</p>
      <h3 class="mt-3 text-2xl font-extrabold text-forest-700">{product.name}</h3>
      <p class="mt-2 font-semibold text-ink/90">{product.pitch}</p>
      <p class="mt-4 text-sm leading-relaxed text-ink/75">{product.description}</p>
      <a
        href={product.signupHref}
        class="mt-6 inline-block rounded-lg border-[1.5px] border-gold bg-white px-6 py-3 text-sm font-extrabold text-gold-deep transition-colors hover:bg-gold hover:text-white"
      >
        Try {product.name} — Sign up
      </a>
    </div>
    <ul class="flex flex-col justify-center gap-3">
      {
        product.features.map((feature) => (
          <li class="flex items-start gap-3 text-sm text-ink/85">
            <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold"></span>
            {feature}
          </li>
        ))
      }
    </ul>
  </div>
</article>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProductCard.astro
git commit -m "feat: add ProductCard with distinct signup CTA"
```

---

## Task 11: ContactForm component (Web3Forms)

**Files:**
- Create: `src/components/ContactForm.astro`
- Create: `.env.example`
- Create: `.env` (local, gitignored)

- [ ] **Step 1: Create `.env.example`**

```
# Web3Forms public access key (https://web3forms.com). This is a public token
# that ships to the browser, hence the PUBLIC_ prefix.
PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key
```

- [ ] **Step 2: Create a local `.env` for testing**

```
PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key
```
(Replace with a real key from web3forms.com to test live submission. `.env` is gitignored.)

- [ ] **Step 3: Write `src/components/ContactForm.astro`**

```astro
---
const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY;
---

<form id="contact-form" class="flex max-w-xl flex-col gap-5">
  <input type="hidden" name="access_key" value={accessKey} />
  <!-- Honeypot: bots fill this; humans never see it -->
  <input type="checkbox" name="botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off" />

  <div>
    <label for="name" class="block text-sm font-semibold text-ink">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      class="mt-1 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20"
    />
  </div>

  <div>
    <label for="email" class="block text-sm font-semibold text-ink">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      class="mt-1 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20"
    />
  </div>

  <div>
    <label for="message" class="block text-sm font-semibold text-ink">How can we help?</label>
    <textarea
      id="message"
      name="message"
      rows="5"
      required
      class="mt-1 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20"
    ></textarea>
  </div>

  <button
    type="submit"
    class="rounded-lg bg-gold px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-gold-deep"
  >
    Send message
  </button>

  <p id="form-result" class="hidden text-sm font-semibold" role="status" aria-live="polite"></p>
</form>

<script>
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  const result = document.getElementById("form-result");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!result) return;

    const formData = new FormData(form);
    const payload = JSON.stringify(Object.fromEntries(formData));

    result.className = "text-sm font-semibold text-ink/70";
    result.textContent = "Sending…";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: payload,
      });
      const data = await response.json();

      if (response.ok && data.success) {
        form.reset();
        result.className = "text-sm font-semibold text-forest-700";
        result.textContent = "Thanks — your message is on its way. We'll be in touch soon.";
      } else {
        result.className = "text-sm font-semibold text-red-600";
        result.textContent = data.message || "Something went wrong. Please email us directly.";
      }
    } catch {
      result.className = "text-sm font-semibold text-red-600";
      result.textContent = "Network error. Please email us directly.";
    }
  });
</script>
```

- [ ] **Step 4: Commit** (note `.env` is gitignored and must NOT be committed)

```bash
git add src/components/ContactForm.astro .env.example
git commit -m "feat: add Web3Forms contact form"
```

---

## Task 12: Home page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace `src/pages/index.astro` with the full home page**

```astro
---
import Base from "../layouts/Base.astro";
import Hero from "../components/Hero.astro";
import ServiceCard from "../components/ServiceCard.astro";
import CTASection from "../components/CTASection.astro";
import { company, services, product, valueProps } from "../data/site";
---

<Base
  title="Hunn Digital Solutions — Custom Software, Consulting & SaaS"
  description="We design, build, and ship digital products for startups and growing teams. Custom software development, technical consulting, and our own SaaS."
>
  <Hero
    eyebrow="Custom Software · Consulting · SaaS"
    headlineLead="Software that grows your"
    headlineHighlight="business."
    subtext={company.blurb}
    primaryLabel="Book a call"
    primaryHref="/contact"
    secondaryLabel="View services"
    secondaryHref="/services"
  />

  <!-- Value props -->
  <section class="mx-auto max-w-6xl px-5 py-16">
    <div class="grid gap-8 md:grid-cols-3">
      {
        valueProps.map((vp) => (
          <div>
            <h2 class="text-lg font-extrabold text-forest-700">{vp.title}</h2>
            <p class="mt-2 text-sm leading-relaxed text-ink/75">{vp.description}</p>
          </div>
        ))
      }
    </div>
  </section>

  <!-- Services preview -->
  <section class="bg-cream">
    <div class="mx-auto max-w-6xl px-5 py-16">
      <p class="text-xs font-bold uppercase tracking-wider text-gold-deep">What we do</p>
      <h2 class="mt-2 text-3xl font-extrabold text-forest-700">Three ways we help</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        {services.map((service) => <ServiceCard service={service} />)}
      </div>
      <a href="/services" class="mt-8 inline-block font-bold text-gold-deep hover:underline">
        Explore our services →
      </a>
    </div>
  </section>

  <!-- Product teaser -->
  <section class="mx-auto max-w-6xl px-5 py-16">
    <div class="rounded-2xl border border-black/5 p-8 md:p-10">
      <p class="text-xs font-bold uppercase tracking-wider text-gold-deep">Our product</p>
      <h2 class="mt-2 text-2xl font-extrabold text-forest-700">{product.name}</h2>
      <p class="mt-2 max-w-2xl text-ink/80">{product.pitch}</p>
      <a href="/products" class="mt-5 inline-block font-bold text-gold-deep hover:underline">
        See {product.name} →
      </a>
    </div>
  </section>

  <!-- Social proof placeholder -->
  <section class="bg-cream">
    <div class="mx-auto max-w-6xl px-5 py-12 text-center">
      <p class="text-sm font-semibold uppercase tracking-wider text-ink/50">
        Trusted by growing teams
      </p>
      <p class="mx-auto mt-3 max-w-xl text-sm text-ink/50">
        [Placeholder] Client logos and testimonials will appear here once available.
      </p>
    </div>
  </section>

  <CTASection heading="Ready to build something that lasts?" />
</Base>
```

- [ ] **Step 2: Verify the home page renders**

Run:
```bash
npm run dev
```
Expected: home page shows hero (forest gradient, gold accent bar, "business." in gold, bronze "Book a call", gold-outline "View services"), value props, services preview cards, product teaser, social-proof placeholder, and the dark CTA band. Click "View services" / "Book a call" — they 404 for now (pages not built yet); that's expected. Stop with Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build home page"
```

---

## Task 13: Services page

**Files:**
- Create: `src/pages/services.astro`

- [ ] **Step 1: Write `src/pages/services.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import ServiceCard from "../components/ServiceCard.astro";
import CTASection from "../components/CTASection.astro";
import { services } from "../data/site";
---

<Base
  title="Services — Hunn Digital Solutions"
  description="Custom software development, technical consulting and advisory, and end-to-end SaaS product development for startups and growing teams."
>
  <section class="hero-forest relative text-white">
    <div class="accent-bar absolute left-0 top-0 bottom-0 w-[7px]"></div>
    <div class="mx-auto max-w-6xl px-7 py-16 md:py-20">
      <p class="text-xs font-bold uppercase tracking-[0.15em] text-gold-light">Services</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
        How we help you <span class="text-gold-light">ship.</span>
      </h1>
      <p class="mt-5 max-w-xl text-cream/85">
        Three focused ways we partner with you — from first build to scaling product.
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-5 py-16">
    <div class="grid gap-6 md:grid-cols-3">
      {services.map((service) => <ServiceCard service={service} />)}
    </div>
  </section>

  <CTASection heading="Not sure which fits? Let's talk it through." />
</Base>
```

- [ ] **Step 2: Verify**

Run `npm run dev`, open `/services`, confirm the forest header + three service cards + CTA band render. The home page "View services" link now resolves. Stop with Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add src/pages/services.astro
git commit -m "feat: build services page"
```

---

## Task 14: Products page

**Files:**
- Create: `src/pages/products.astro`

- [ ] **Step 1: Write `src/pages/products.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import ProductCard from "../components/ProductCard.astro";
import { product } from "../data/site";
---

<Base
  title={`${product.name} — Hunn Digital Solutions`}
  description={product.pitch}
>
  <section class="hero-forest relative text-white">
    <div class="accent-bar absolute left-0 top-0 bottom-0 w-[7px]"></div>
    <div class="mx-auto max-w-6xl px-7 py-16 md:py-20">
      <p class="text-xs font-bold uppercase tracking-[0.15em] text-gold-light">Our Product</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
        {product.name}<span class="text-gold-light">.</span>
      </h1>
      <p class="mt-5 max-w-xl text-cream/85">{product.pitch}</p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-5 py-16">
    <ProductCard />
  </section>
</Base>
```

- [ ] **Step 2: Verify**

Run `npm run dev`, open `/products`, confirm the forest header + product card with the gold-outline "Try … — Sign up" CTA + feature list. Stop with Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add src/pages/products.astro
git commit -m "feat: build products page"
```

---

## Task 15: About page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Write `src/pages/about.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import CTASection from "../components/CTASection.astro";
import { company, valueProps } from "../data/site";
---

<Base
  title="About — Hunn Digital Solutions"
  description="Hunn Digital Solutions is a software studio helping startups and growing businesses design, build, and ship products that last."
>
  <section class="hero-forest relative text-white">
    <div class="accent-bar absolute left-0 top-0 bottom-0 w-[7px]"></div>
    <div class="mx-auto max-w-6xl px-7 py-16 md:py-20">
      <p class="text-xs font-bold uppercase tracking-[0.15em] text-gold-light">About</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
        A partner that builds <span class="text-gold-light">with you.</span>
      </h1>
    </div>
  </section>

  <section class="mx-auto max-w-3xl px-5 py-16">
    <p class="text-lg leading-relaxed text-ink/80">
      {company.name} is a software studio for startups and growing businesses. We
      design, build, and ship digital products — and we sweat the details so your
      software is something you can rely on and grow into.
    </p>
    <p class="mt-5 leading-relaxed text-ink/75">
      [Placeholder] Replace this with your founding story, experience, and what makes
      your approach different. Keep it warm, concrete, and outcome-focused for an
      audience of business owners and founders.
    </p>

    <div class="mt-12 grid gap-8 sm:grid-cols-3">
      {
        valueProps.map((vp) => (
          <div>
            <div class="accent-bar h-1 w-10 rounded-full"></div>
            <h2 class="mt-4 text-base font-extrabold text-forest-700">{vp.title}</h2>
            <p class="mt-2 text-sm leading-relaxed text-ink/75">{vp.description}</p>
          </div>
        ))
      }
    </div>
  </section>

  <CTASection heading="Let's build the next thing together." />
</Base>
```

- [ ] **Step 2: Verify**

Run `npm run dev`, open `/about`, confirm header + story + three value props + CTA band. Stop with Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: build about page"
```

---

## Task 16: Contact page

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Write `src/pages/contact.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import ContactForm from "../components/ContactForm.astro";
import { company } from "../data/site";
---

<Base
  title="Contact — Hunn Digital Solutions"
  description="Tell us what you're building. Book a call or send a message and we'll be in touch."
>
  <section class="hero-forest relative text-white">
    <div class="accent-bar absolute left-0 top-0 bottom-0 w-[7px]"></div>
    <div class="mx-auto max-w-6xl px-7 py-16 md:py-20">
      <p class="text-xs font-bold uppercase tracking-[0.15em] text-gold-light">Contact</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
        Let's talk about your <span class="text-gold-light">project.</span>
      </h1>
    </div>
  </section>

  <section class="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2">
    <div>
      <h2 class="text-xl font-extrabold text-forest-700">Send us a message</h2>
      <p class="mt-2 text-sm text-ink/70">
        We typically reply within one business day.
      </p>
      <div class="mt-6">
        <ContactForm />
      </div>
    </div>
    <div>
      <h2 class="text-xl font-extrabold text-forest-700">Prefer email?</h2>
      <p class="mt-2 text-sm text-ink/75">Reach us directly anytime:</p>
      <a
        href={`mailto:${company.email}`}
        class="mt-2 inline-block font-bold text-gold-deep hover:underline"
      >
        {company.email}
      </a>
    </div>
  </section>
</Base>
```

- [ ] **Step 2: Verify the form renders and validates**

Run `npm run dev`, open `/contact`. Confirm the form renders. Click "Send message" with empty fields — native required-field validation should block submit. Fill in valid values; with a real `PUBLIC_WEB3FORMS_KEY` in `.env` the success message appears (with the placeholder key it returns an error message, which confirms the error path renders). Stop with Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: build contact page"
```

---

## Task 17: SEO assets — favicon, robots, sitemap

**Files:**
- Create: `public/favicon.svg`
- Create: `public/robots.txt`
- Modify: `astro.config.mjs` (add sitemap integration)

- [ ] **Step 1: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#3f7717"/>
  <text x="50%" y="52%" dominant-baseline="central" text-anchor="middle"
        font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#ffffff">H</text>
  <circle cx="49" cy="44" r="5" fill="#c18215"/>
</svg>
```

- [ ] **Step 2: Add the sitemap integration**

Run:
```bash
npx astro add sitemap --yes
```
Expected: installs `@astrojs/sitemap` and adds it to `integrations` in `astro.config.mjs`. Confirm the config now reads similar to:
```js
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.hunndigital.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://www.hunndigital.com/sitemap-index.xml
```

- [ ] **Step 4: Verify sitemap generates on build**

Run:
```bash
npm run build
ls dist/sitemap-index.xml dist/favicon.svg
```
Expected: build succeeds; both files exist in `dist/`. (`astro check` runs first via the build script — see Task 18 if it errors.)

- [ ] **Step 5: Commit**

```bash
git add public/favicon.svg public/robots.txt astro.config.mjs package.json package-lock.json
git commit -m "feat: add favicon, robots.txt, and sitemap"
```

---

## Task 18: Final wiring, type check, and full verification

**Files:**
- Modify: `package.json` (ensure build script runs the type check)
- Modify: `README.md`

- [ ] **Step 1: Ensure `@astrojs/check` + TypeScript are installed and pinned**

Run:
```bash
npx astro add check --yes
npm ls typescript @astrojs/check
```
Expected: `@astrojs/check` and `typescript` (v5.x) are installed. If npm reports a peer conflict, pin TypeScript to v5: `npm install -D typescript@^5`.

- [ ] **Step 2: Make the build script run the type check first**

Edit `package.json` `scripts` so `build` is:
```json
"build": "astro check && astro build",
```
Leave `dev` (`astro dev`) and `preview` (`astro preview`) as scaffolded.

- [ ] **Step 3: Run the full build (type check + build)**

Run:
```bash
npm run build
```
Expected: `astro check` reports 0 errors, 0 warnings; `astro build` completes and writes `dist/` with `index.html`, `services/index.html`, `products/index.html`, `about/index.html`, `contact/index.html`, `sitemap-index.xml`, `favicon.svg`, `robots.txt`. Fix any reported type errors before continuing.

- [ ] **Step 4: Smoke-test the production build and check internal links**

Run:
```bash
npm run preview
```
Open `http://localhost:4321` and click through every nav item (Home, Services, Products, About, Contact) plus the in-page links ("View services", "Explore our services", "See <product>", footer links, Contact button). Confirm none 404 and the mobile hamburger works. Stop with Ctrl-C.

- [ ] **Step 5: Run a Lighthouse check**

With `npm run preview` running, run Lighthouse against the home page (Chrome DevTools → Lighthouse, or CLI):
```bash
npx lighthouse http://localhost:4321 --only-categories=performance,accessibility,seo --quiet --chrome-flags="--headless" --output=json --output-path=./lighthouse-home.json
```
Expected: strong scores (target ≥ 90) for Performance, Accessibility, and SEO. Note any flagged contrast issues on gold-on-green text and adjust to use `gold-light` (`#e0a83f`) for text on dark forest if needed. Delete the report when done: `rm lighthouse-home.json`. Stop preview with Ctrl-C.

- [ ] **Step 6: Update the README with run/deploy instructions**

Replace `README.md` with:
```markdown
# Hunn Digital Solutions Website

Marketing website for Hunn Digital Solutions. Built with Astro + Tailwind CSS v4 (static output).

## Setup

```bash
npm install
cp .env.example .env   # then add your Web3Forms access key
```

## Develop

```bash
npm run dev       # local dev server at http://localhost:4321
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
```

## Configuration

- **Contact form:** set `PUBLIC_WEB3FORMS_KEY` in `.env` (get a key at https://web3forms.com).
- **Site URL:** update `site` in `astro.config.mjs` to the production domain (used for sitemap + canonical/OG URLs).

## Content

All copy lives in `src/data/site.ts`. Placeholder content (company email, the
"Hunnvoice" product, social-proof section, About story) is marked and meant to be
replaced.

## Deploy

Static output in `dist/`. Deploy to Railway (static), Netlify, or Vercel. Set
`PUBLIC_WEB3FORMS_KEY` as an environment variable in the host.
```

- [ ] **Step 7: Final commit**

```bash
git add package.json package-lock.json README.md tsconfig.json
git commit -m "chore: type-check build script, docs, and final verification"
```

---

## Self-Review (completed by plan author)

**Spec coverage:**
- Tech approach (Astro/Tailwind v4/Fontsource/Web3Forms/static) → Tasks 1–3, 11. ✓
- All five pages → Tasks 12–16. ✓
- Nav with persistent gold Contact button → Task 5. ✓
- Locked visual system (gradient, accent bar, highlighted keyword, bronze/gold CTAs, dark bands) → Tasks 2 (tokens + gradient classes), 7 (Hero), 8 (CTASection), 6 (Footer). ✓
- Theme tokens table → Task 2 `@theme` block (with documented green-600/650 → leaf-600/700 rename). ✓
- Fonts Plus Jakarta Sans + Inter self-hosted → Task 3. ✓
- ContactForm: fields, honeypot, validation, success/error, env key → Task 11. ✓
- Product distinct "Try / Sign up" CTA → Task 10. ✓
- Hero secondary CTA "View services" (not "Our work") → Task 12. ✓ (matches spec fix)
- SEO: per-page title/description, OG tags, sitemap, robots, favicon → Base (Task 3), Task 17. ✓
- Responsive + a11y (focus states, hamburger, contrast note) → Tasks 5, 11, 18 Step 5. ✓
- Done criteria: build + astro check + link check + Lighthouse + visual spot-check → Task 18. ✓
- OG share image: spec lists an OG image; this plan wires `og:image` support in Base but does not generate an image (no design asset, "starting fresh"). Gap is intentional and documented — add a real `/og-image.png` and pass `ogImage` when available.

**Placeholder scan:** No "TBD"/"implement later" steps. All component/page code is complete. Placeholder *content* (copy, product) is intentional and clearly marked.

**Type consistency:** `Service`, `Product`, `NavLink`, `ValueProp` interfaces defined in Task 4 and consumed with matching property names in Tasks 5, 6, 9, 10, 12–16. `ContactForm` element IDs (`contact-form`, `form-result`) consistent between markup and script. `.hero-forest` / `.accent-bar` classes defined in Task 2 and used in Tasks 6, 7, 8, 9, 13–16.
