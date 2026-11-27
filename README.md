# Sorrel — Botanical skincare storefront

A component-based React/Vite port of the Sorrel one-page storefront. The layout, copy, typography, image assets and interactions are reconstructed from the source site served at <http://127.0.0.1:8085/>, with GSAP driving the intro, scroll-reveal, parallax, carousel, marquee and cart animations.

The port deliberately excludes the hosting harness preview badge (`Buy this template`) and bridge script; those are not part of the template design.

## Good for

A botanical skincare brand that wants a single, editorial storefront page with a hero, bestseller carousel, values, rituals, lookbook, reviews and a small in-page shopping bag.

## What is included

- Full-height photographic hero with split-line title reveal, scroll parallax, pointer parallax and animated plant-derived counter.
- Product carousel with drag/swipe, arrow and keyboard navigation, progress bar, variant swatches and add-to-cart fly animation.
- Scroll-pinned craft story on desktop with scrubbed image scale and word-by-word text reveal.
- Values row, ritual category cards with parallax imagery, and two editorial feature panels with a CSS curtain reveal.
- Horizontal lookbook gallery with scrubbed drift and arrow scrolling.
- Review marquee with hover slowdown, scroll-velocity direction/boost and animated `4.9/5` / `24,000` counters.
- Promise section with stacked-image entrance and inline botanical photo reveals.
- Newsletter form with inline validation feedback.
- Fixed glass nav with solid/hide-on-scroll states, mobile menu, product search dimming, cart drawer, focus trap and toast.

## How to use

Scroll through the sections, drag the product carousel, choose a variant and press **+ Cart** to add an item. Open the bag from the nav to change quantities or see the subtotal. Search in the nav dims non-matching products; pressing Enter scrolls to the shop and jumps to the first match.

Animations respect `prefers-reduced-motion`. In record mode the intro can be driven deterministically (see **Record/debug mode**).

## Built with

React, TypeScript, GSAP + ScrollTrigger, Lenis smooth scrolling and Vite. The source CSS, locally hosted Google fonts and all Sorrel photos are copied into `public/` so typography and imagery match the offline source exactly.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://127.0.0.1:3100>.

The dev server binds to `0.0.0.0:3100`. A production build is generated in `dist/` and can be served with `npm run preview`.

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite on port 3100. |
| `npm run build` | Type-check and create the production bundle in `dist/`. |
| `npm run preview` | Serve the production build on port 3100. |
| `npm run typecheck` | Run `tsc -b` without emitting. |
| `npm run lint` | ESLint with zero warnings allowed. |
| `npm run lint:fix` | Apply ESLint fixes. |
| `npm run check` | Lint, typecheck and build. Run this after edits when `dist/` is what gets served. |

---

## Source and port relationship

| Item | Location |
| --- | --- |
| Live source | `http://127.0.0.1:8085/` |
| Offline source | `C:\Users\HP\Downloads\Compressed\demo-codeandchill-store-sorrel-full-site-offline\demo.codeandchill.store\sorrel` |
| Port | `C:\Users\HP\Downloads\Compressed\sorrel` |

The folder is named `sorrel` to match the site, source bundle and assets. The original request spelled it `sorreel`; no separate `sorreel` directory was created.

The authoritative stylesheet is `public/source.css`, a copy of `assets/index-Cz0MUugR.css` from the source. Font CSS and TTF files are copied under `public/fonts.googleapis.com/` and `public/fonts.gstatic.com/`, and all 24 photos are under `public/photos/sorrel/`. `src/styles/overrides.css` recreates the small word-splitting CSS injected by the source bundle.

---

## Section outline

| Anchor / section | What it shows |
| --- | --- |
| `#top` | Hero: “Botanical Skincare for slower rituals”, subcopy, Shop now, plant-derived stat and scroll cue. |
| `#shop` | “Plant-first essentials, bestselling ✧ Products” carousel and “More products” link. |
| `#about` | Pinned craft story over the atelier image. |
| — | Cold Pressed / Endless Refills / Cruelty Free values. |
| — | Explore our gentle and plant-first ✧ Rituals: Face, Body, Bath and Home. |
| `#best` | Best sellers feature panel. |
| — | New Arrival feature panel. |
| `#gallery` | Thoughtful, skin-first ideas and inspiration ✧ Gallery. |
| — | Review score panel and infinite review marquee. |
| — | Promise statement with stacked botanical photos. |
| — | Newsletter, footer columns, oversized Sorrel wordmark and base line. |

---

## Architecture

```text
sorrel/
├─ index.html                  App shell, font/style links and html.js/reduced/coarse classes
├─ public/
│  ├─ source.css               Copy of the source stylesheet (authoritative design system)
│  ├─ fonts.googleapis.com/    Locally hosted font CSS
│  ├─ fonts.gstatic.com/       Locally hosted Hanken Grotesk and Instrument Serif TTFs
│  ├─ photos/sorrel/           All 24 source photographs
│  └─ favicon.* / apple-touch-icon.png
├─ reference/                  Source index.html and JS bundle kept for comparison
├─ src/
│  ├─ main.tsx                 Root render, GSAP globals, injected word CSS
│  ├─ App.tsx                  Section tree, cart/search/menu state, add-to-cart animation
│  ├─ components/              One component per section or overlay
│  ├─ data/catalog.ts          Products, rituals, gallery items and reviews
│  ├─ hooks/
│  │  ├─ useIntro.ts           Preloader/intro timeline and SORREL debug bridge
│  │  ├─ useScrollAnimations.ts  ScrollTrigger choreography
│  │  └─ useInteractions.ts    Marquee, pointer effects, nav state and Escape handling
│  ├─ lib/
│  │  ├─ gsap.ts               GSAP/ScrollTrigger registration and motion helpers
│  │  ├─ scroll.ts             Lenis setup and anchor scrolling
│  │  ├─ text.tsx              .wm / .w word-splitting primitives
│  │  └─ format.ts             Price formatting
│  ├─ styles/overrides.css     Word-split CSS injected by the source bundle
│  └─ types/                   Centralized catalog and window bridge types
```

State is intentionally local to the page: cart lines, search query, menu/cart visibility and toast messages live in `App.tsx`. There is no backend and no persistence; the source bundle also keeps the cart in memory.

---

## Animation parity

The intro timeline mirrors the source: loader letters rise and exit, the counter reaches 100%, the hero image scales from 1.35 to 1.06, title lines rise, nav/stat enter and the stat counts to 98%.

To avoid trapping the preloader when an image decode stalls, the port releases the intro after a short timeout and has a final guard that completes the timeline. The source waits indefinitely for `heroImg.decode()`; the visible result is the same once the image is ready.

ScrollTrigger recreates the source choreography for split headings, `[data-rise]` elements, product/category/gallery reveals, desktop craft pinning, category and feature image parallax, the `--cover` curtain, review counters, promise stack and footer wordmark scrub.

`useInteractions.ts` recreates hero pointer parallax, magnetic buttons, nav solid/hide states, Escape/menu handling and the infinite review marquee with hover slowdown and scroll-velocity boost.

---

## Record/debug mode

Adding `?record=1` disables Lenis and pauses the intro at time zero, matching the source harness behavior. A small bridge is exposed:

```js
window.SORREL.start()        // play the paused intro
window.SORREL.speed          // get/set gsap.globalTimeline.timeScale()
```

Example:

```text
http://127.0.0.1:3100/?record=1
```

GSAP and ScrollTrigger are also exposed as `window.gsap` and `window.ScrollTrigger`, as in the source bundle.

---

## Verification notes

Run `npm run check` after code changes. The production preview server serves `dist/`, so a build is required before browser verification.

A typical verification pass covers:

- loader completes and `98%` / `4.9` / `24,000` counters settle;
- all section anchors and nav links scroll correctly;
- typography, weights and colors match the source CSS tokens;
- product carousel drag, arrows, keyboard and search dimming;
- swatch selection and add-to-cart fly/badge/toast flow;
- cart open/close, quantity changes, subtotal, focus trap and Escape;
- mobile nav/menu and responsive layouts;
- newsletter validation messages;
- no console errors and no source preview artifacts.

Because the browser harness can keep tabs hidden, GSAP rAF may be throttled during automated checks. The loader guard ensures the page still reaches the final state even when `decode()` or rAF is stalled.
