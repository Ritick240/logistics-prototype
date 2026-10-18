# Northline Logistics Group — website

Angular 18 marketing site for a freight brokerage, with a default "Classic" design and five alternative designs
you can switch between from the bar at the top of every page (or with `?ui=p1` … `?ui=p5` in the URL).

## Run it

```bash
npm install
npm start            # http://localhost:4200
npm run build        # production build in dist/logistics-prototype/browser
```

## Where things live

| What | File |
|---|---|
| Company name, phones, emails, address, social links | `src/app/site-data.ts` → `BRAND` |
| All page copy: services, stats, team, testimonials, blog posts, FAQs, documents, legal text | `src/app/site-data.ts` |
| Form endpoint, tracking endpoint, public site URL | `src/app/config.ts` |
| Routes, page titles and meta descriptions | `src/app/app.routes.ts` |
| Theme colours / fonts per design | `src/styles.scss` (`:root` and `html[data-ui='pN']`) |
| Classic design (header, footer, home) | `src/app/layout/`, `src/app/pages/home/` |
| Prototype designs 1–5 (shell + home page each) | `src/app/protos/p1` … `p5` |
| Inner pages (shared by every design) | `src/app/pages/*.page.ts` |
| Forms (contact, quote, carrier, careers) | `src/app/forms/`, `src/app/shared/contact-form.component.ts` |
| Site-wide widgets (toasts, call button, feedback, cookies, newsletter) | `src/app/shared/widgets.component.ts` |

Inner pages, forms and widgets read colours from CSS variables, so they automatically match whichever design is active.

## Forms

Every form (contact, quote, carrier sign-up, careers, newsletter, feedback) goes through `FormService`.

- With `FORM_ENDPOINT` empty (default) the site runs in **demo mode**: submissions are logged to the browser console and show the normal success message.
- Set `FORM_ENDPOINT` to a URL that accepts `multipart/form-data` (Formspree, a Netlify/Vercel function, or your own API).
  Each request includes a `form` field (`contact`, `quote`, `carrier`, …) plus the form's fields and any uploaded files.
- Forms have client-side validation, a spam honeypot field, a consent checkbox and a 10 MB upload limit.
  **Validate again on the server** — client checks can be bypassed.

## Shipment tracking

`/track` calls `GET ${TRACKING_ENDPOINT}?ref=<reference>` and expects:

```json
{ "status": "In transit", "origin": "Newark, NJ", "destination": "Columbus, OH", "eta": "Oct 20, by 2:00 PM",
  "events": [{ "time": "Oct 19, 9:40 AM", "text": "In transit — passed Harrisburg, PA" }] }
```

Return HTTP 404 for unknown references. Until it's set, the page shows a sample result that is clearly labelled as a sample.

## Before going live

- [ ] Replace placeholder company details, team members and testimonials in `site-data.ts` with real ones (and get permission to use people's names/photos)
- [ ] Replace `www.example.com` in `config.ts`, `src/index.html` (OG + JSON-LD), `public/robots.txt` and `public/sitemap.xml`
- [ ] Add a real `public/og-image.jpg` (1200×630) and logo
- [ ] Set `FORM_ENDPOINT` (and `TRACKING_ENDPOINT` if you have a TMS API)
- [ ] Have the Terms and Privacy text reviewed by a lawyer
- [ ] Swap Unsplash images for your own photography (download them rather than hot-linking)
- [ ] Wire analytics to the cookie choices in `CookieConsentComponent.save()`
- [ ] Remove the design switcher once a design is chosen (see below)

## Choosing a final design

1. Pick the design (e.g. `p3`).
2. In `ui.service.ts`, make `initial()` return that id, or delete the service and render that shell/home directly.
3. Delete `<app-design-switcher />` from `app.component.html`, set `--sw-h: 0px` in `styles.scss`, and remove the unused `protos/pN` folders.

## Hosting

It's a single-page app: configure the host to serve `index.html` for unknown paths so deep links like `/blog/ftl-vs-ltl` work.

- **Netlify:** `public/_redirects` containing `/*  /index.html  200`
- **Vercel:** a `vercel.json` rewrite of `/(.*)` to `/index.html`
- **Nginx:** `try_files $uri $uri/ /index.html;`
