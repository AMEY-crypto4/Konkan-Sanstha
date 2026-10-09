# Kokan NGO India: redesign concept

> **Unofficial concept, made for discussion.** This is not the organisation's website and is not
> operated by, endorsed by or affiliated with Kokan Kala Va Shikshan Vikas Sanstha. It collects no money
> and no personal data. Facts, figures and contact details come from the public site (kokanngo.org,
> October 2026) and may be out of date. The wordmark, sunrise mark and artwork are original and are
> **not** the organisation's logo. Show it to the team privately first, and get their agreement before
> it is hosted anywhere public.

A multi-page redesign built from the real structure and content of the current site: 14 programmes,
5 campaigns, impact figures, careers, transparency and contact. It aims to show what the same
content could look like when it is clearer to read, easier to give through, and faster and more
accessible.

## See it in 10 seconds

Double-click **`Kokan_Redesign_Concept_Preview.html`** (shipped next to this folder). It is a single
file with the code, styles and fonts inlined, so it works offline from your desktop. Links inside use
`#/…` addresses so they work from a file.

## Run it

Needs Node 18 or newer.

```bash
npm install
npm run dev            # local development at http://localhost:5173
npm test               # 115 tests
npm run typecheck
npm run build          # production build into dist/ (BrowserRouter, code-split by page)
npm run build:preview  # single-file preview into dist-preview/index.html (HashRouter)
npm run preview        # serve dist/ locally
```

`netlify.toml` and `public/_redirects` are included so a static host serves the single-page app and
sends security headers. Both also set **noindex**, deliberately. Remove that only when the
organisation owns and approves the site.

## What is in it

| Area | Pages |
| --- | --- |
| Home | Hero with quick-give card, trust strip, animated impact numbers, programme bento, "what a gift can do" calculator, campaigns, journey, awards, CSR, stories, ways to help, scam notice |
| Our work | Index by theme, plus one page per programme (14) built from a single template |
| Campaigns | Index, plus one page per campaign (5) with itemised giving options |
| Give | Donate page (amount, monthly or once, review step), Get involved, Volunteer, Corporate partnerships, Careers (searchable role browser) |
| Trust | Impact by programme, About with timeline, Transparency (registrations, awards, reports, policies), Stories, Contact with four offices |

### Design decisions

- **Brand:** indigo for trust, saffron for action, sunflower for light, warm cream background. Fraunces
  (display) and Inter (text), self-hosted, no third-party requests.
- **Giving:** presets ₹500 / 1,000 / 2,500 / 5,000, one-time or monthly, minimum custom gift ₹500 (all
  from the original site), with a plain-language line of what the amount could fund.
- **Honest data:** a unit cost is marked "Published" when the original site prints it, and
  "Worked out" when it was divided from a package price (for example 150 meals for ₹6,000 gives ₹40 a
  meal). Thin or empty source pages show a visible "Content needed" notice instead of invented text.
- **No images:** all art is SVG and CSS. Real photography needs consent and the organisation's child
  protection policy; this concept does not pretend to have it.

## Architecture

- React 18, Vite 5, TypeScript (strict), React Router 6, hand-written CSS with design tokens, lucide
  icons. No UI framework, no runtime dependency beyond those.
- **Content is data.** `src/content/*.ts` are typed collections (`Program`, `Campaign`, `Stat`,
  `DataTable`…). Pages are templates that render them, so adding a programme is one object, not a new page.
- Route-level code splitting; a loading placeholder holds the page height so nothing jumps.
- `src/lib` holds pure, tested logic (money formatting in Indian digit grouping, gift equivalents,
  validation, role search) plus small hooks (count-up, reveal, reduced motion, page titles).

```
src/
  components/   header + mega menu, mobile drawer, footer, donation widget, calculator, role browser, tables…
  content/      typed content (programmes, campaigns, impact, careers, transparency, org facts)
  lib/          calc, format, roles, hooks
  pages/        16 route components
  styles/       tokens, base, layout, components, pages
  test/         vitest suites
```

## WordPress or custom?

The current site appears to run on WordPress. Neither choice is wrong; the right one depends on who
edits it.

| | WordPress | Custom (this approach) |
| --- | --- | --- |
| Editing by non-developers | Strong. Familiar admin, roles, drafts | Needs a CMS or a developer |
| Plugins (donations, SEO, forms) | Large ecosystem, but each is code to keep patched | You choose and integrate each one |
| Speed, accessibility, design control | Depends on theme and plugins; easy to end up heavy | Full control; this build scores Lighthouse performance 96–97 on a throttled phone |
| Security and upkeep | Regular updates and plugin audits are a real cost | Smaller surface, but one developer knows it |
| Cost and risk | Lower to start | Higher to start; a bus-factor risk if one person owns it |

**Recommendation: a hybrid.** Keep WordPress (or move to a hosted CMS) as the place the team edits
content, and let a custom front end render it. `src/content/*.ts` already has the shape of CMS
collections, so WordPress REST or GraphQL, Sanity or Strapi could replace those files without
changing the pages. That keeps the editing the team is used to and removes the theme and plugin weight
that causes most problems on sites like this. If the team will never touch a CMS, a fully custom site
is fine; if nobody can maintain code, stay on WordPress and fix the theme. I have not seen the
organisation's WordPress admin, so treat this as advice from the public site only.

## Quality checks that were run

| Check | Result |
| --- | --- |
| Unit and component tests (vitest, Testing Library) | 115 pass: calculations, validation, role search, content integrity, donation flow, accordion, tables, every route, every programme and campaign page |
| TypeScript strict, no unused code | Clean |
| axe-core, WCAG 2.2 AA plus best practice | 0 violations on 21 routes at desktop and phone widths |
| Colour contrast | Every text pairing computed; lowest text ratio 5.5:1 |
| Lighthouse, mobile, throttled (home, programme, donate) | Performance 96, 96, 97; Accessibility 100; Best practices 100; layout shift 0. SEO is 63 only because the site is noindex on purpose |
| Browser interaction script | 33 of 33: mega menu, Escape and outside-click, focus after navigation, skip link, focus ring colour, drawer focus trap and scroll lock, donate hand-off, careers filter, counters, reveal |
| Single-file preview opened from `file://` | No external requests, no console errors, fonts and ₹ render |

Not covered: browsers other than Chromium, real screen-reader testing (NVDA, VoiceOver, TalkBack),
and real devices. Please test those before any public use.

Accessibility features: skip link, landmarks, one h1 per page, visible focus (light on dark
surfaces), keyboard-operable menus with Escape, focus trap and restore in the mobile drawer,
labelled form fields with error text announced, scrollable tables reachable by keyboard, reduced
motion respected, numbers visible on first paint (never "0"), content visible without scroll-reveal
when motion is off.

## Known gaps

- **Donations do not work.** A real build needs a payment gateway with hosted checkout (so card data
  never touches the site), 80G receipts with PAN and address captured there, and eNACH or UPI
  AutoPay for monthly gifts.
- **Not prerendered.** It is a single-page app. A public, indexable version should be statically
  generated (Astro, Next.js or a Vite prerender step) so each page is real HTML for search engines.
- **Forms open the visitor's mail app** (`mailto:`). A real site should post to a form service or
  back end with spam protection.
- **No CMS, search, analytics or consent banner, and English only.** Marathi and Hindi would likely
  matter to the audience; the content layer is where translations would live.
- **No photography**, and no leadership, board or case-study content because the original site gives
  little to reuse. Pages show a "Content needed" notice where that is the case.
- **Stories** list the article titles only; the text stays on the official site.

## Facts to confirm with the organisation

The original site contradicts itself in these places. The concept picked one value and says so.

1. Beneficiaries: **14,70,152** (shown twice) vs **11,67,606** (homepage text). The concept uses the first.
2. 2030 goal: **3 million** (mission page) vs **2,10,420** (journey page). The concept uses 3 million.
3. "14 years of impact" vs a 2010 start (about 16 years) vs 2012 registration (about 14 years).
4. A typo in the recognition text ("12 AAs and 80 Gs").
5. "Top 10" style claims have no source; they are not repeated.
6. The careers page counters show 0.
7. Water, sanitation and hygiene context statistics have no sources, so they were left out.
8. The "Unicorn CDC" link points to its own parent page.
9. Derived unit costs (meal ₹40, blanket ₹375, spectacles ₹499, cataract surgery ₹5,500) are arithmetic
   on published packages, not official prices.

## Licence and use

Original code, styling and wording for discussion purposes. Facts belong to the organisation. Do not
present this as the organisation's site, and do not reuse its name publicly without their permission.
