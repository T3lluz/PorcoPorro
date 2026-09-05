# Assets

Drop files into the folder that matches what they are. Everything here is
processed by Vite (hashed + optimized), so import it in code:

```js
import plane from '../assets/plane/plane.png'
<img src={plane} alt="" />
```

| Folder         | What goes here                                                |
| -------------- | ------------------------------------------------------------- |
| `backgrounds/` | Full-width sky / scene backdrops, gradients, section backdrops |
| `clouds/`      | Individual cloud cutouts used for parallax layers              |
| `plane/`       | The plane and anything attached to it (banner, propeller, trail) |
| `decor/`       | Small ornaments: banners, ribbons, flourishes, dividers        |
| `icons/`       | UI icons (SVG preferred)                                       |
| `photos/`      | Photos of Susan & Skage, venue, gallery images                 |
| `fonts/`       | Self-hosted font files (.woff2)                                |
| `scenes/`      | Whole compositions kept as reference HTML (sky, hero, …)       |

## Naming

Lowercase, hyphen-separated, descriptive of the thing not the placement:
`cloud-large-01.png`, `plane-side.png`, `sky-dawn.jpg`. Add `@2x` for
retina variants.

## Formats

- Shapes / illustrations (clouds, plane, decor) → **SVG**, or **PNG** with
  transparency if it's a raster illustration.
- Photos → **WebP** (or JPG fallback), max ~2000px wide.
- Never commit anything over ~2 MB — compress first.

## Static files

Files that must keep an exact URL (favicon, OG share image, `robots.txt`)
belong in `/public` instead, referenced as `/filename.png`.

## The sky scene

`scenes/sky-scene.html` is the approved sky composition, standalone — open it in
a browser and it renders on its own. It is the reference the React build should
match, not something the app imports.

How it is put together:

- **One continuous sky.** The page is a single sky. `sky-clouds.jpg` is pinned to
  the bottom of the document at its real aspect (1920x1138) and the open sky above
  it is CSS, so the page can be any height. `--page-height` is the only knob.
- **The seam is colour-matched, not faked.** The top row of `sky-clouds.jpg` runs
  `#82dbfd` on the left to `#4aaef9` on the right. The sky above is exactly that
  horizontal gradient with a deep-blue vertical wash over it that fades to
  transparent at the join, plus a 160px mask fade on the photo's top edge.
- **Clouds are the SVGs in `clouds/`,** scattered in three depth layers: far
  (blurred, 55% opacity, behind the plane), mid, and near (crisp, in front of the
  plane). Each instance is randomly flipped and vertically scaled so the three
  shapes don't visibly repeat, and drifts on its own 31-64s cycle. Motion is off
  under `prefers-reduced-motion`.

## Clouds

`clouds/cloud-a|b|c.svg` are standalone files, fine as `<img src>`. For a page
that draws many of them, inline `clouds/clouds-sprite.svg` once and reference the
symbols instead - one copy of the geometry, any number of clouds:

```html
<svg viewBox="0 0 320 130"><use href="#cloud-a"/></svg>
```

viewBoxes: `cloud-a` 320x130 (broad cumulus), `cloud-b` 220x90 (small puff),
`cloud-c` 420x100 (long low bank).
