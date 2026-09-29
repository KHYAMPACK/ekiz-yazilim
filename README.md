# Ekiz Yazılım — Company Website

**Website and client funnel for [Ekiz Yazılım](https://ekizyazilim.com), a web and e-commerce studio in Denizli that builds websites, online stores and custom tools for local businesses.**

🌐 Live: [ekizyazilim.com](https://ekizyazilim.com)

## Overview

- **Portfolio** (`/isler`): client work, including live sites for schools, kindergartens and boutiques
- **Service landing pages** for local SEO: `/denizli-web-sitesi` and `/denizli-e-ticaret`
- **Web visibility analysis** (`/gorunurluk`): prospects submit their business details, and each gets a private, token-gated visibility report (`/raporlar/[clientId]`) with a score ring, category breakdown and a print-to-PDF option
- **Design inspiration quiz** (`/ilham`): helps clients express the style they want before a project starts
- **Project intake and appointment booking** (`/randevu`)
- Lead emails through Resend (with Formspree as fallback), plus generated OG/Twitter images, a web manifest and a sitemap
- Brand kit in `brand/`: logo, wordmark and "powered by" badges used in the footer of client sites

**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS 4 · Motion · Resend · Vercel

## Development

```bash
npm install
npm run dev
```
