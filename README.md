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


## Publisering

`.github/workflows/deploy.yml` bygger og publiserer til GitHub Pages ved push
til `main`. Første gang må **Settings → Pages → Source** stå på **GitHub
Actions**.

---

Flyet og fargene er en hyllest til Porco Rosso (Studio Ghibli,
1992).
