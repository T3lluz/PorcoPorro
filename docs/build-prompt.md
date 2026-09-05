# Build prompt — Susan & Skage wedding site

> Hand this back to Claude Code to execute. Edit anything in it first; the
> `⚠️` markers are decisions only you can make.
> Reference artifact: **Adriatic Flight Plan / "Sopra le Nuvole"** —
> https://claude.ai/code/artifact/784e63ca-d1b3-4f3f-b2eb-72d732a31efb

---

## 0. The one-line brief

Build the Porco Rosso wedding site for Susan & Skage as a single scrolling page
of open sky: a big red Savoia seaplane towing a hand-painted banner across the
top of the screen, and the practical information further down riding on cloud
banks. Norwegian copy. React + Vite. Ship it ready for GitHub Pages, but do not
commit or push — I want to see it on localhost first.

---

## 1. What already exists

Do not re-scaffold. Build on top of this.

| Path | What it is |
| --- | --- |
| `package.json` | React 19 + Vite 8, `npm run dev` on :5173, oxlint |
| `src/App.jsx`, `src/App.css`, `src/index.css` | **Vite starter boilerplate — replace the contents** |
| `src/config.js` | All site content already extracted into one module (see §8) |
| `src/assets/plane/plane-side.png` | 1024×461 red Savoia, **nose pointing LEFT**, transparent PNG |
| `src/assets/backgrounds/sky-clouds.jpg` | 1920×1138 painted cumulus bank, rises left→right |
| `src/assets/clouds/cloud-a\|b\|c.svg` | Standalone cloud cutouts |
| `src/assets/clouds/clouds-sprite.svg` | Same three as `<symbol>`s — inline once, `<use href="#cloud-a">` |
| `mocks/sky-mock.html` | **The approved sky composition.** Match it. |
| `src/assets/scenes/sky-scene.html` | Same scene, kept as the canonical reference |
| `src/assets/README.md` | Asset conventions — read it, follow it |
| `.claude/launch.json` | `wedding-dev` preview config, already points at :5173 |

Cloud viewBoxes: `cloud-a` 320×130 (broad cumulus), `cloud-b` 220×90 (small
puff), `cloud-c` 420×100 (long low bank).

**Research note:** the Mobbin MCP is behind a paid plan and returned
`requires a paid plan` on every query — layout direction below comes from the
project artifact plus web research on one-page wedding sites and Porco Rosso's
palette instead. If Mobbin access appears later, re-check §7.4 (RSVP) and
§7.5 (FAQ) against real examples.

---

## 2. Art direction

Lifted from the artifact. Do not invent a second visual language.

**Principle:** the page *is* weather. Blue sky is the ground; white is reserved
for clouds; the only warmth on the entire site is the aeroplane.

### Palette — put these in `:root` in `src/index.css`

```css
/* sky */
--sky-1:#2E8FB8;  --sky-2:#5FB4D2;  --sky-3:#94CFE3;
--sky-4:#C4E5EF;  --sky-5:#DCF0F5;
--sea:#1B6C8C;    --isle:#4E8A45;

/* clouds — three flat tones, hard edges, no blur between them */
--cloud:#FFFFFF;  --cloud-2:#E6F2F8;  --cloud-shade:#9FC6DC;

/* the aeroplane — the only warm colour on the site */
--rosso:#CE3419;  --rosso-lit:#EE6A42;  --rosso-deep:#9E2411;
--amber:#EFA92B;  --steel:#8FA6B6;      --verde:#2E9E5B;

/* ink */
--ink:#173C4C;  --ink-2:#5A7E8D;  --line:#D5E9F0;  --panel:#FFFFFF;
--radius:22px;
--shadow:0 10px 34px rgba(23,60,76,.10), 0 2px 6px rgba(23,60,76,.05);
```

Light only. Set `color-scheme: light` and commit to it — a daylight sky has no
dark mode. Do **not** add `prefers-color-scheme` blocks.

### Type — Google Fonts, `<link>` in `index.html`

| Role | Face | Notes |
| --- | --- | --- |
| Display — names, section headings | **Cormorant Garamond** 300 / 400, italic for the "&" line | `clamp(46px,7.6vw,86px)` for the names |
| UI — times, labels, buttons, eyebrows | **Zen Maru Gothic** 500 | uppercase, `letter-spacing:.2em`, `font-variant-numeric:tabular-nums` on times |
| Body | **Lora** 400 | 16.5px / 1.78 |

### Texture

None. Flat colour, hard tonal edges, soft 22px radii. No paper grain, no
hairline rules — sections separate by floating white cloud panels on blue.

---

## 3. Page structure, top to bottom

1. **Open sky — hero.** Plane, banner, names, date, place. No navigation bar.
2. **Cloud panel — Velkommen.** One short paragraph, `wedding.invitation`.
3. **Open sky.** ~200px of blue, one drifting cloud.
4. **Cloud panel — Hvor.** Venue, map, then travel cards.
5. **Open sky.**
6. **Cloud panel — Når.** The timeline.
7. **Cloud panel — Svar.** The widest panel. Google Form. (§7.4)
8. **Cloud panel — Praktisk.** FAQ.
9. **Horizon — footer.** Sky pales into the `sky-clouds.jpg` bank, sea band in
   `--sea`, green island bottom-left, contacts in white.

---

## 4. The sky system

One continuous sky behind everything, built the way `mocks/sky-mock.html` builds
it. Three z-layers so the depth reads:

- `<SkyBackdrop/>` — `position:fixed; inset:0; z-index:0; pointer-events:none`.
  Holds the vertical gradient plus the **far** (blurred 2.5px, 55% opacity) and
  **mid** (0.8px blur, 80%) cloud layers and the wind spirals. Fixed, so it
  never scrolls away.
- Content — `position:relative; z-index:2`.
- **Near** clouds — crisp, full opacity, `drop-shadow(0 14px 22px rgba(40,110,180,.13))`,
  absolutely positioned inside the hero so they scroll with the page. **At least
  one must cross in front of the plane's hull** — that overlap is the single
  thing that sells the depth. Do not skip it.
- `<Cloudbank/>` — `sky-clouds.jpg` pinned to the **bottom of the document**,
  full-bleed, at its true 1920×1138 aspect (`padding-top:59.27%`), with a 160px
  `mask-image` fade on its top edge so it joins the CSS sky without a seam.

**The seam is colour-matched, not faked.** The jpg's top row runs `#82dbfd`
left → `#4aaef9` right. The sky above it is exactly that horizontal gradient
with the vertical blue wash over it fading to transparent at the join. Copy the
two stacked `linear-gradient`s from the mock verbatim.

Inline `clouds-sprite.svg` **once** as a React component and draw every cloud
with `<use href="#cloud-a">`. Randomise each instance's horizontal flip
(`--fx:-1`) and vertical scale (`--fy:0.87`–`1.16`) so the three shapes don't
visibly repeat. Each drifts on its own 31–64s cycle with a negative delay so
they start mid-animation.

---

## 5. The hero rig — plane, banner, wind

This is the piece worth spending the most time on. Everything else on the page
is a card.

### 5.1 Plane motion — nested wrappers, deliberately mismatched periods

Three transforms on three elements, so the loop never visibly repeats:

```
.plane-drift    translateX  ±18px    14s   ease-in-out  alternate
  .plane-bob    translateY  ±22px     9s   ease-in-out  infinite
    .plane-tilt rotate      ±2deg    11s   ease-in-out  infinite
      <img plane-side.png> + <Banner/>
```

Sizing: `clamp(260px, 46vw, 620px)`, sitting around `top:18%` with the nose
toward the left edge. Give it
`filter: drop-shadow(0 18px 26px rgba(20,80,150,.28))` and
`will-change: transform` on all three wrappers.

### 5.2 The banner

The plane's nose points **left**, so the banner tows **behind it, to the right**.

- SVG, roughly `viewBox="0 0 900 260"`, sitting inside `.plane-tilt` so it
  inherits the plane's motion, anchored at the tail.
- Two slack tow-lines in `--rosso-deep`, 5px, from the tail to the banner's
  leading edge.
- Banner body: white fill, 6px `--rosso` stroke, top and bottom edges as
  matching sine curves so it reads as cloth, not a rectangle.
- Text: `couple.banner` on a `<textPath>` following the banner's centreline,
  Cormorant Garamond ~70px, `letter-spacing:6`, fill `--rosso`.
- **Flutter:** SMIL `<animate attributeName="d" values="…;…;…;…" dur="6s"
  repeatCount="indefinite" calcMode="spline">` on *three* paths in lockstep —
  the fill path, the stroke path, and the invisible textPath — cycling through
  3–4 wave phases. That makes the letters ripple with the cloth, which is the
  whole effect. If SMIL misbehaves, fall back to a static path plus a CSS
  `skewY` oscillation on the group and say so.

### 5.3 Spiral wind

Ghibli wind curls: a long tapering stroke that ends in a tight spiral.

- A `<WindSwirl/>` component drawing one path like
  `M0 40 C 60 40 120 10 180 22 C 230 32 240 70 210 78 C 190 84 178 66 192 56 C 202 49 214 54 214 62`,
  stroke `#FFFFFF` at 30–55% opacity, `stroke-linecap:round`, width 2–4px.
- Animate `stroke-dashoffset` so each curl **draws in, travels, and draws out**
  rather than just sliding across.
- 5–7 of them across the hero at different scales, speeds (18–34s), vertical
  positions and delays. A couple should pass close to the propeller so they read
  as prop-wash.
- One or two much fainter ones in `<SkyBackdrop/>` so the whole page has weather,
  not just the top.

### 5.4 Hero type

Under the plane, centred: `Susan` on one line, `& Skage` italic on the next,
Cormorant Garamond 300, `--ink`. A 5px `--rosso` dot. Then `wedding.dateStamp`
in Zen Maru Gothic with `letter-spacing:7px`, then `wedding.place` in Lora.

A small scroll cue at the bottom — a paper-plane glyph nosing down, gently
bobbing.

### 5.5 Motion budget

Everything above must be wrapped in:

```css
@media (prefers-reduced-motion: reduce) { /* all animation: none */ }
```

Keep it to compositor-only properties — `transform` and `opacity`. No animating
`top`, `left`, `width`, or box-shadow. Target 60fps on a mid-range phone; if the
hero drops frames, cut cloud count before cutting the plane rig.

---

## 6. Below the fold — the containers

Between banks, 180–220px of open sky. Content rides on white cloud panels:

- `.panel` — `background:var(--panel); border-radius:22px; box-shadow:var(--shadow);
  padding:44px 46px` (30px/24px and radius 18px under 640px).
- Give the panels a **lumpy cloud top edge** rather than a plain rounded
  rectangle: an SVG scallop of overlapping circles in `--panel` sitting on the
  panel's top edge, so content genuinely looks like it's resting on a cloud.
  Flat white beneath it for the text.
- Section heads: eyebrow in Zen Maru Gothic + `h2` in Cormorant Garamond.
- Reveal each panel on scroll with an `IntersectionObserver` — 12px rise + fade,
  400ms, once only, and skipped under reduced motion.

**Paper planes as connective tissue:** between panels, 2–3 small folded paper
planes drift across the open sky on long slow arcs. They are the visual rhyme
for the big plane and they carry the eye down the page. Draw them as inline SVG
(two triangles and a fold line), not an image.

---

## 7. Section specs

### 7.1 Hvor — the map

- Venue name (`h3`), address, `venue.blurb`.
- Map: Google Maps embed, **no API key** —
  `https://www.google.com/maps?q={lat},{lng}&hl=no&z=15&output=embed` in an
  iframe with `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`,
  a `title` for screen readers, and `border:0`.
- Frame it: `border-radius:18px; overflow:hidden`, 320px tall (240px on mobile),
  and tint it toward the page blues with
  `filter: saturate(.75) hue-rotate(-8deg)` on the iframe — enough that it sits
  in the palette without becoming unreadable.
- One crimson marker feel: overlay a small `--rosso` pin/pulse dot in the centre
  above the iframe (`pointer-events:none`).
- Below it, a "Veibeskrivelse" button linking to `venue.directionsUrl`
  (`target="_blank" rel="noreferrer"`).
- Then `travel[]` as three plain columns (stacked on mobile), each with a small
  line icon, title, body.

### 7.2 Når — the timeline

- Rows from `schedule[]`: fixed left column for the time in Zen Maru Gothic 500
  with `font-variant-numeric: tabular-nums`, event + place beside it, optional
  note in `--ink-2`.
- A **dotted vertical line** connects the rows — same dash pattern as the
  banner's tow-lines, in `--line`.
- Each row's dot is a small `--rosso` circle on that line.
- Under 560px the row collapses to a single column, time above title.

### 7.3 Velkommen

One panel, one paragraph (`wedding.invitation`), large-ish (19px Lora), max
64ch. Nothing else. It exists to give the page a breath after the hero.

### 7.4 Svar — the Google Form (make this the best-looking section)

The brief calls this out specifically, so give it the most care:

- **The widest panel on the page**, sitting slightly proud of the others.
- Present it as a **boarding pass / flight ticket**: a card with a perforated
  edge (repeating-radial-gradient notches down one side), a dashed tear line,
  and a small `--rosso` "GI BESKJED" stamp rotated a few degrees — the same
  stamp treatment as the artifact's masthead pill.
- `rsvp.deadlineLabel` on a small pennant hanging above the card, in `--amber`
  or `--rosso`.
- `rsvp.blurb` as one short paragraph — set the expectation that it's quick.
- Then the form itself, **embedded inline** in a rounded, shadowed frame:
  `<iframe src={rsvp.embedUrl}>`, width 100%, height ~1100px, `border:0`,
  `loading="lazy"`. Google's own chrome is plain — bury it: give the frame
  generous white padding, the panel radius, and let it sit on `--cloud-2` so
  the seams don't show.
- Under the frame, a fallback line + a `--rosso` pill button "Åpne skjemaet i
  ny fane" → `rsvp.openUrl`, for anyone whose browser blocks the embed.
- The placeholder form ID in `config.js` will not load. Render a friendly
  in-frame placeholder state when `embedUrl` still contains `PLACEHOLDER`, so
  the section looks finished on localhost.

### 7.5 Praktisk — FAQ

`faq[]` as a two-column grid of small cards (single column on mobile), each card
carrying a faint paper-plane watermark in the corner. Question in Cormorant
Garamond 500, answer in Lora. Either static cards or a `<details>`-based
accordion — accordion is fine, but style away the default marker and animate the
disclosure.

### 7.6 Footer — the horizon

- Sky pales into the `sky-clouds.jpg` bank.
- A sea band in `--sea` across the bottom, a simple green island silhouette
  (`--isle`) at the left.
- `contacts[]` — role, name, `tel:` link — in white.
- Small print: `Susan & Skage · {dateLong}` and
  `Porco Rosso © 1992 Studio Ghibli` as an honest nod.
- Optional and nice: the plane exits stage right here, small and far away.

---

## 8. Content

Everything lives in `src/config.js` — already written, already Norwegian.
Components import from it; **no hard-coded copy in JSX**. It exports:

`couple` · `wedding` · `venue` · `travel[]` · `schedule[]` · `rsvp` ·
`faq[]` · `contacts[]`

Every value I had to invent is marked `⚠️` in that file. They are plausible
placeholders, not real details:

- ⚠️ the date (`2027-06-12`) and everything derived from it
- ⚠️ venue name, address and lat/lng (currently Midtåsen, Sandefjord)
- ⚠️ the Google Form ID in `rsvp.embedUrl` / `rsvp.openUrl`
- ⚠️ hotel name, bus route, deadline date
- ⚠️ contact names and phone numbers

Leave them in place for the MVP; they get filled in later.

---

## 9. Component layout

```
src/
  config.js                 ← content, already written
  main.jsx                  ← keep
  index.css                 ← tokens + reset + base type (replace boilerplate)
  App.jsx                   ← page composition only (replace boilerplate)
  components/
    CloudSprite.jsx         inline <defs> for cloud-a/b/c, rendered once
    SkyBackdrop.jsx         fixed gradient + far/mid clouds + faint wind
    Cloudbank.jsx           sky-clouds.jpg pinned to document bottom
    WindSwirl.jsx           one spiral curl
    PaperPlane.jsx          the small folded plane
    Hero.jsx                rig + near clouds + hero type + scroll cue
    Plane.jsx               the three nested motion wrappers
    Banner.jsx              SVG banner + SMIL flutter
    Panel.jsx               cloud panel w/ scalloped top + scroll reveal
    Welcome.jsx  Where.jsx  When.jsx  Rsvp.jsx  Practical.jsx  Footer.jsx
  styles/
    base.css  sky.css  hero.css  sections.css
```

Plain CSS, no framework, no CSS-in-JS. Keep motion values as CSS custom
properties on the element (`--dur`, `--delay`, `--travel`) the way the mock does,
so they are tunable without touching keyframes.

---

## 10. GitHub Pages

Remote is `PorcoPorro → https://github.com/T3lluz/PorcoPorro.git`, so the site
will serve from `https://t3lluz.github.io/PorcoPorro/`.

- `vite.config.js` → `base: '/PorcoPorro/'`.
- `public/.nojekyll` (empty file) so Vite's `_`-prefixed assets are not eaten.
- `.github/workflows/deploy.yml` — on push to `main`: checkout, Node 20,
  `npm ci`, `npm run build`, `actions/upload-pages-artifact` on `dist`,
  `actions/deploy-pages`. Permissions `contents:read pages:write id-token:write`,
  concurrency group `pages`.
- Add a favicon + an OG share image reference in `index.html`, plus
  `<html lang="no">`, a real `<title>`, and a `description` meta.
- Verify the production build actually works under the subpath:
  `npm run build && npm run preview`, then load it.

**Do not `git add`, `git commit`, or `git push`.** Leave everything in the
working tree — localhost review comes first.

---

## 11. Definition of done

- [ ] `npm run dev` serves a page with no console errors and no 404s.
- [ ] The plane bobs, drifts and tilts on three different periods — it never
      looks like it is on a single loop.
- [ ] The banner's cloth *and its lettering* ripple together.
- [ ] Spiral wind curls draw in and out across the sky.
- [ ] At least one crisp cloud passes in **front** of the plane.
- [ ] The CSS sky meets `sky-clouds.jpg` with no visible seam.
- [ ] The map renders and "Veibeskrivelse" opens Google Maps.
- [ ] The RSVP section looks finished even with the placeholder form ID.
- [ ] Nothing scrolls horizontally at 360px, 768px, 1440px.
- [ ] `prefers-reduced-motion: reduce` stops every animation.
- [ ] `npm run lint` is clean.
- [ ] `npm run build && npm run preview` works under `/PorcoPorro/`.
- [ ] Working tree is dirty — nothing committed.

Verify it in the browser preview and produce screenshots at desktop and mobile
widths rather than asking for a manual check.
