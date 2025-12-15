Learncity web app built with [Next.js](https://nextjs.org), TypeScript, and Tailwind CSS.

## Getting Started

First, run the development server:

```bash
# install deps (first time)
npm install

# start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the landing page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

Fonts are loaded using [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (Geist Sans/Mono).

## Project Structure

- `src/app/layout.tsx` — global layout, header, footer, and metadata.
- `src/app/page.tsx` — landing page with CTAs.
- `src/app/download/page.tsx` — app download info.
- `src/app/business/page.tsx` — business lead capture form.
- `src/app/api/leads/route.ts` — API route to collect business leads.
- `src/app/globals.css` — Tailwind v4 and theme tokens.

## Assets

All public images live in `public/learncity/`.

Replace these placeholders with your real assets (keep the same filenames):

- `hero.svg` — Home page hero illustration.
- `business-hero.svg` — Business page banner.
- `app-screenshot.svg` — App UI screenshot for the Download page.
- `appstore-badge.svg` — App Store badge.
- `playstore-badge.svg` — Google Play badge.

You can also add your own filenames and update paths in:

- `src/app/page.tsx` (home)
- `src/app/download/page.tsx` (download)
- `src/app/business/page.tsx` (business)

## Environment Variables

Create a `.env.local` file at the project root and add:

```
# Optional: if set, lead submissions will be forwarded as JSON to this URL
LEADS_WEBHOOK_URL="https://example.com/webhook"
```

Restart the dev server after changing env variables.

## Scripts

- `npm run dev` — Start development server (Turbopack).
- `npm run build` — Build for production.
- `npm run start` — Start production server.
- `npm run lint` — Run ESLint.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy

The easiest way to deploy is the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). You can also deploy to any Node hosting that supports Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
