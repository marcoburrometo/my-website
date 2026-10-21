# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters, potential employers, and clients visiting Marco Burrometo's CV and portfolio to assess his profile and get in touch.

## Product Purpose

Present Marco's profile, skills, work experience, and projects so visitors can understand his background, explore relevant work, download his CV, or contact him.

## Positioning

The site presents the same professional profile through five distinct CV design variants: Hypercard Neon, Editorial Pop, Mono Terminal, Antigravity Particles, and Signal Bloom. The visual directions can differ, while factual CV content and supporting assets remain consistent.

## Operating Context

Visitors arrive on the public website, review the profile and career history, follow links to social profiles or projects, and may download the PDF CV or contact Marco by email.

## Capabilities and Constraints

- The site is a web CV and portfolio built with Next.js, React, TypeScript, and Tailwind CSS.
- The five variants are available at `/varianti/hypercard`, `/varianti/editorial-pop`, `/varianti/mono-terminal`, `/varianti/antigravity`, and `/varianti/signal-bloom`; `/varianti` lists them.
- `DEFAULT_CV_VARIANT` can select a supported variant for `/`. Without a valid selection, the standard homepage is shown.
- Variants share factual profile, skills, experience, social links, portrait assets, and the downloadable CV. Keep these facts consistent across variants; preserve each variant as a distinct design direction.
- Visitors can switch between light and dark themes.
- Optional Google Analytics stays disabled unless a visitor grants consent; visitors can change their choice later.
- The public-facing site content is primarily in English.

## Brand Commitments

- The site represents Marco Burrometo and uses his name and professional profile.
- Preserve the existing factual CV content and personal identity assets when changing the site.

## Evidence on Hand

- Experience and skills: `src/data/experiences.json` and `src/data/skills.json`.
- Profile copy, social links, and CV path: `src/data/profile.ts`.
- Portraits: `public/media/marco.jpg` and `public/media/marco_full.jpg`.
- Downloadable CV: `public/cv-marco-burrometo.pdf`.
- The experience data includes project descriptions and links, and identifies metrics such as BimboMap reaching 3k users in two weeks and 8k in two months. Preserve claims as supplied; do not invent or extrapolate metrics, testimonials, or endorsements.

## Product Principles

- Make Marco's professional profile and experience easy to understand.
- Keep career, skills, project, and contact information accurate.
- Make it straightforward to explore projects, download the CV, and get in touch.
- Preserve five distinct design variants while keeping their shared factual content aligned.
