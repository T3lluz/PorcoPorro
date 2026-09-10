# Susan & Skage

React 19 + Vite 8, statisk bygg, publisert på GitHub Pages.

<p align="center">
  <img src=".github/media/desktop.jpg" height="340" alt="Toppen av siden på desktop" />
  <img src=".github/media/mobile.jpg" height="340" alt="Toppen av siden på mobil" />
</p>

## Kom i gang

```bash
npm install
npm run dev
```

Siden kjører på <http://localhost:5173>.

| Kommando          | Hva den gjør                    |
| ----------------- | ------------------------------- |
| `npm run dev`     | Utviklingsserver med hot reload |
| `npm run build`   | Statisk bygg til `dist/`        |
| `npm run preview` | Serverer `dist/` lokalt         |
| `npm run lint`    | Oxlint                          |

## Innhold

Alt av tekst, datoer, adresser og lenker ligger i
[`src/config.js`](src/config.js). Ingen streng er hardkodet i en komponent.
Søk etter `TODO` for felt som må fylles inn før siden deles.

Adressene ligger i lista `venues`. Hver post blir ett lokasjonskort med eget
kart og egen veibeskrivelse. En tredje adresse er en ny post der, ikke en ny
komponent; husk å telle `code` videre og å flytte svarkortets `SK 03` i
[`src/components/Rsvp.jsx`](src/components/Rsvp.jsx).

## Struktur

```
src/
  App.jsx        rekkefølgen på seksjonene
  config.js      alt innhold
  index.css      tokens + reset + basetypografi
  components/    én komponent per seksjon, pluss himmelprimitivene
  lib/           kameraet (parallax), kartvalg, reduced-motion
  styles/        base, sky, hero, sections
```

Hver seksjon er et `<Panel>` (et boardingkort). `VenueCard` er kortet som
brukes én gang per adresse; det setter sammen `VenueMap` (kartet) og feltene.
Svarkortet er `Rsvp`. Hver fil forklarer sine egne valg i toppen.

## Publisering

`.github/workflows/deploy.yml` bygger og publiserer til GitHub Pages ved push
til `main`. Første gang må **Settings → Pages → Source** stå på **GitHub
Actions**.

Siden serveres fra en underkatalog, så `base` i `vite.config.js` må stemme med
repo-navnet. Endrer du navnet, må `base` og `og:image` / `og:url` / `canonical`
i `index.html` oppdateres.

---

Flyet, himmelen og fargene er en hyllest til _Porco Rosso_ (Studio Ghibli,
1992). Alt som er tegnet på siden er laget for anledningen; ingen merker eller
bilder fra filmen er i bruk.
