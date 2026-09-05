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
