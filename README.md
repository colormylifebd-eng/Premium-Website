# Color My Life (CML)

Bangla website for **Color My Life**, a Bangladeshi handmade miniature brand. Customers browse the
collection and order through WhatsApp. The owner manages products from `/admin`.

- Pages: Home, Products (fixed categories), product detail, About, Contact
- Every order button opens WhatsApp with a pre-filled message naming the product
- Facebook page linked in the footer, mobile menu, About page, Contact page and the closing CTA
- Order policies, the ৳8,500 starting price and the materials list from the client's brief
- Admin: email + password login, password reset by email, add / edit / delete products with photo upload

## Business details

All contact details live in one place, `BRAND` in `src/lib/constants.ts`. Change them there and every
page, the footer, the WhatsApp links and the search-engine data update together.

| Detail | Value |
| --- | --- |
| WhatsApp / main phone | +880 1780-193752 |
| Second phone | +880 1628-887726 |
| Email | emon.artist.yt@gmail.com |
| Facebook | https://www.facebook.com/share/1F6FQDVuco/ |
| Address (Bangla) | পর্বত নগর টাওয়ার, হাজী মার্কেট, ইসিবি চত্বর, ঢাকা |
| Address (English) | Parbat Nagar Tower, Hajimarket, ECB Chattar, Dhaka |

**Map pin:** the Contact page map searches Google Maps for the English address (`BRAND.mapQuery`).
If the pin isn't exactly on the shop, open Google Maps, right-click the shop's location, click the
coordinates to copy them (e.g. `23.8226, 90.4123`) and paste them as the value of `mapQuery`.

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion (animations) · Prisma 6 + PostgreSQL ·
Auth.js 5 · Cloudinary (product photos) · Resend (reset emails). Fonts: Baloo Da 2 and Galada for Bangla
headlines, Hind Siliguri for body text, Poppins and Dancing Script for English.

## Local development

```bash
npm install
npx prisma dev --name cml --detach   # local Postgres; run it again if the database stops
cp .env.example .env                 # then fill it in (see comments inside)
npm run db:migrate                   # create tables
npm run db:seed                      # categories, admin account, 6 sample products
npm run dev                          # http://localhost:3000
```

Admin: `http://localhost:3000/admin` with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`.
Without Cloudinary keys, uploads are saved to `./.uploads`. Without Resend keys, password-reset links are
printed in the terminal (development only).

The local database (`prisma dev`) sometimes stops when a server using it is killed. If you see
"Can't reach database server", run `npx prisma dev --name cml --detach` again; the data is kept.

## Replace the placeholder photos

`public/images` holds labelled placeholders. Save the client's photos over them with these exact names
(no code changes needed; the favicon is generated from `logo.png`):

| File | Photo |
| --- | --- |
| `logo.png` | CML logo |
| `studio-diorama.jpg` | Round village diorama, CML logo on the wall (home hero) |
| `custom-house.jpg` | "Customize House Model" poster with three houses |
| `tea-shop-closeup.jpg` | Close-up inside the tea shop (bamboo bench) |
| `tea-shop-rooftop.jpg` | Tea shop held up on the rooftop, blue sky |
| `tea-shop-indoor.jpg` | Tea shop standing indoors, electric pole |
| `village-skyline-1.jpg` | Village diorama held against the city skyline |
| `village-skyline-2.jpg` | Same village, second angle with the red edge |
| `village-ledge.jpg` | Village diorama on the light-blue wall ledge |
| `village-topdown.jpg` | Village diorama seen from above |
| `village-night.jpg` | Village house lit up at night |
| `island-hut-1.jpg` | Island hut with boat, held over the street |
| `island-hut-2.jpg` | Island hut on the dark resin base, top view |

The six sample products use these same photos. The owner can edit or delete them from `/admin`.
Keep each photo under about 2 MB (2000 px on the long side is plenty); Next.js serves resized AVIF/WebP
versions automatically. If an old photo still shows locally after replacing it, delete the `.next` folder.

## Deploying (Vercel + Neon + Cloudinary + Resend)

1. **Database:** create a free [Neon](https://neon.tech) project in the Singapore region and copy the
   direct connection string.
2. **Photos:** create a free [Cloudinary](https://cloudinary.com) account and copy the cloud name, API key
   and API secret.
3. **Email:** create a [Resend](https://resend.com) account, verify `colormylifebd.com`, and create an API key.
4. **Vercel:** import the Git repository and add every variable from `.env.example`. Set `SITE_URL` to
   `https://colormylifebd.com`, generate `AUTH_SECRET` with `npx auth secret`, and leave `ADMIN_PASSWORD` empty.
   `vercel.json` runs database migrations on each deploy and runs the server in Singapore (`sin1`), close
   to the database and to Bangladesh. The build reads the database (pages are pre-rendered), so
   `DATABASE_URL` must be set for the build too.
5. **First deploy:** with `DATABASE_URL` pointing at Neon, run `npm run db:seed` once from your machine.
   It prints a temporary admin password. The owner should then use **"পাসওয়ার্ড ভুলে গেছেন?"** on the
   login page to set his own password.
6. **Domain:** add `colormylifebd.com` in Vercel → Settings → Domains and update the DNS records it shows.

## Admin guide (for the owner)

- **Log in:** `colormylifebd.com/admin`
- **Add a product:** "নতুন প্রোডাক্ট" → upload a photo (phone photos are shrunk automatically), enter the
  name, price (Bangla or English digits both work), category and description → "প্রোডাক্ট সেভ করুন".
  It appears on the website right away.
- **Edit / delete:** use the buttons next to each product. Deleting asks for confirmation.
- **Forgot password:** use the link on the login page. The reset link is emailed and lasts 30 minutes.

## Performance

Checked with Lighthouse's mobile profile (slow 4G, 4× slower CPU) on a local production build.

- Public pages are pre-rendered static HTML. Saving a product in `/admin` refreshes them automatically.
- Fonts are self-hosted by `next/font` (no requests to Google Fonts). Only three Bangla files (≈166 KB)
  are preloaded; other weights load only when text uses them. All fonts use `font-display: swap`.
- Scroll reveal animations are pure CSS (scroll-driven animations), so content never waits for JavaScript.
  Browsers without support, and visitors with "reduce motion" turned on, just see the content.
- The mobile menu uses the browser's native `<dialog>`, and `tailwind-merge` is kept out of public pages.
  Public pages ship about 170 KB of JavaScript (brotli), most of it the Next.js/React runtime.
- Below-the-fold sections use `content-visibility: auto` (the `cv-auto` class), so the browser skips their
  layout until they're needed. Don't add it to sections with never-ending animations.
- Google Maps loads only when the visitor taps the map, which saves about 450 KB of third-party scripts.
- Images are served as AVIF/WebP at the size each screen needs; the largest variant is 2048 px.
- Text that could re-wrap when the web font arrives (breadcrumbs, the About page title) has a fixed shape,
  so pages don't jump while loading.

Main remaining cost: on a slow connection, the largest headline waits for the Bangla display font
(Baloo Da 2, about 88 KB). `font-display: optional` would show headlines sooner, but first-time visitors
on slow connections would see a plain system font, so it stays on `swap` to keep the brand look.

## Security notes

- Every admin page and server action checks the session against the database, not just the proxy.
- Passwords are hashed with bcrypt. After 5 wrong attempts the account locks for 15 minutes; a password
  reset unlocks it and signs out every other session.
- Reset tokens are single-use, expire after 30 minutes, and only their SHA-256 hash is stored.
- Uploads are admin-only and checked by file content. Products can only use photos from our own storage.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Create / apply migrations locally |
| `npm run db:deploy` | Apply migrations in production |
| `npm run db:seed` | Seed categories, the admin account and sample products |
| `npm run db:studio` | Browse the database |
