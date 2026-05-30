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
