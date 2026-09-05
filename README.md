# Susan &amp; Skage — bryllupsside

En enkelt, rullende side med åpen himmel: en rød Savoia-sjøfly trekker et
håndmalt banner over toppen, og alt det praktiske ligger lenger nede på
boardingkort som faller forbi kameraet på vei ned til bakken. Norsk tekst,
ingen navigasjonsmeny, ingen backend.

Porco Rosso-estetikk. React 19 + Vite 8, statisk bygg, publiseres på GitHub
Pages.

---

## Kom i gang

```bash
npm install
npm run dev
```

Siden kjører på <http://localhost:5173>.

| Kommando          | Hva den gjør                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Utviklingsserver med hot reload                 |
| `npm run build`   | Statisk bygg til `dist/`                        |
| `npm run preview` | Serverer `dist/` lokalt, som i produksjon       |
| `npm run lint`    | Oxlint over hele prosjektet                     |

Ikoner kommer fra [`lucide-react`](https://lucide.dev) — samme sett som
shadcn/ui bruker. Importer det du trenger ved navn; Vite rister bort resten.

---

## Alt innhold bor ett sted

**[`src/config.js`](src/config.js)** er den eneste filen du trenger å åpne for å
endre tekst, tider, adresser og lenker. Komponentene leser derfra; ingen streng
er hardkodet i en komponent.

To markører i den filen:

- **⚠️ må erstattes før siden deles** — dato, sted, koordinater, svarskjema-lenke,
  navn og telefonnummer på toastmaster og forlover.
- **📝 er lorem ipsum** — all løpende brødtekst er bevisst fyllstoff i denne
  runden, slik at ingen forveksler den med ferdig ordlyd. Navn, datoer,
  klokkeslett, adresser, overskrifter og spørsmålene i FAQ-en er ekte.

### Svarskjemaet

`rsvp.embedUrl` og `rsvp.openUrl` peker på et Google-skjema. Slik henter du dine
egne:

1. Åpne skjemaet → **Send** → fanen `< >`
2. Kopier `src`-URL-en (den slutter på `?embedded=true`) → `rsvp.embedUrl`
3. Samme URL uten `?embedded=true` → `rsvp.openUrl`

Så lenge lenken inneholder `PLACEHOLDER` viser siden en pen plassholderboks i
stedet for en ødelagt iframe.

---

## Hvordan siden er satt sammen

```
src/
  App.jsx              rekkefølgen på seksjonene, og ingenting annet
  config.js            alt innhold
  index.css            tokens (farger, typografi, mål) + reset + basetypografi
  lib/
    directions.js      velger Apple Maps eller Google Maps etter enhet
    parallax.js        kameraet: publiserer --sy, --p, --s og --c på scroll
  styles/
    sky.css            himmelsystemet og vindkrøllene
    hero.css           hero-riggen, flyet, banneret, parallaksen
    base.css           sideskall, boardingkortet, knapper
    sections.css       alt som ligger på et boardingkort, pluss bakken
  components/          én komponent per seksjon + himmelprimitivene
  assets/              se assets/README.md for konvensjonene
```

### Himmelen

Én sammenhengende himmel i fire lag, beskrevet i toppen av `styles/sky.css`:

| Lag          | Feste    | Hva det er                                            |
| ------------ | -------- | ----------------------------------------------------- |
| `.sky-base`  | fixed    | Vannrett gradient, nøyaktig fargene i øverste bildrad  |
| `.sky-wash`  | ruller   | Dyp blå loddrett vask, festet til toppen av dokumentet |
| `.sky-drift` | fixed    | Fjerne og mellomliggende skyer + svak høydevind        |
| `.cloudbank` | bunnen   | `sky-clouds.jpg`, festet til dokumentets gulv          |

`.drift-far` og `.drift-mid` stiger mot `--sy` med hver sin koeffisient. Uten det
ville de faste lagene stå bom stille mens kortene faller forbi — det leser som
tapet, ikke som avstand.

Skjøten mellom CSS-himmelen og fotoet er fargematchet, ikke jukset: øverste rad
i `sky-clouds.jpg` går `#82dbfd` → `#4aaef9`, og gradienten over er akkurat de
to fargene.

Alle skyene tegnes fra tre `<symbol>`-silhuetter som ligger inline én gang
(`CloudSprite.jsx`). Hver forekomst speiles og strekkes litt, så de tre formene
aldri gjentar seg synlig.

### Parallaksen på toppen

`.hero-pin` er nøyaktig dobbelt så høy som heroen, og heroen er `sticky` inni
den. `<main>` trekkes tilbake opp med én hero-høyde. Resultatet: den første
skjermhøyden med rulling holder himmelen stille mens skypanelene glir opp over
den — og først når heroen er dekket, slipper den taket og siden ruller normalt.
`--hero-h` i `index.css` er den ene knappen; de tre reglene leser alle den.

### Det fallende kameraet

`lib/parallax.js` animerer ingenting selv. Én rAF-strupet scroll-runde skriver
fire tall og lar CSS bestemme hva de betyr:

| Variabel | Hvor          | Hva den er                                              |
| -------- | ------------- | ------------------------------------------------------- |
| `--sy`   | `:root`       | Hvor langt siden har falt, i piksler                    |
| `--p`    | per element   | 0 når overkanten kommer inn nederst, 1 når underkanten går ut øverst |
| `--s`    | per element   | Samme, fortegnet: −1 under, 0 midt i bildet, +1 over    |
| `--c`    | per element   | `1 − abs(s)`, altså hvor midt i bildet elementet er     |

Hvert boardingkort har sin egen lille `tilt`. Kameraet legger `--s` oppå: kortet
vipper mot linsen på vei opp og fra den på vei ut, og `--c` gir det en knapt
merkbar svulming når det passerer midten. Lappene på oppslagstavla svinger om
tapen sin på samme signal — hver i sitt tempo, så veggen bølger i stedet for å
vri seg som ett ark.

Bakken i bunnen får det samme: øya glir mot fallet og teksten legger seg til ro
et slag for sent, så den siste strekningen leser som bakke på vei opp mot linsa.

Alt dette er slått av under `prefers-reduced-motion` — da registreres ingenting,
og kortene ligger flatt.

### Banneret

Geometrien i `Banner.jsx` genereres, den er ikke tegnet for hånd, fordi det som
får et slepebanner til å lese som stoff er en regel og ikke en form:

- forkanten holdes av en stiv stang og beveger seg nesten ikke;
- forstyrrelsen vandrer **bort** fra slepet, nedover duken — en løpende bølge,
  ikke en klaffing på stedet;
- amplituden vokser mot den frie bakkanten, der ingenting holder igjen;
- når hver bølgetopp passerer, vrir duken seg på kant og silhuetten smalner.

Alt fire faller ut av én bølge samplet i ti faser. Duken, stangen, de to
slepetauene og den usynlige midtlinjen bokstavene rir på, samples fra samme
bølge i samme faser og animeres i lås — derfor bølger bokstavene *med* duken i
stedet for å ligge oppå den.

### Bevegelse

Alt av animasjon respekterer `prefers-reduced-motion`. CSS-animasjoner slås av
globalt i `index.css`; SMIL inne i SVG kan ikke slås av med CSS, så
`usePrefersReducedMotion` sørger for at `<animate>`-elementene aldri rendres i
det hele tatt.

---

## Publisering

`.github/workflows/deploy.yml` bygger og publiserer til GitHub Pages ved hver
push til `main`.

Siden serveres fra et underkatalog, så `base` i `vite.config.js` må stemme med
repo-navnet:

```js
base: '/PorcoPorro/',
```

Endrer du repo-navn, må du endre `base`, `og:image` og `og:url` i `index.html`.
`public/.nojekyll` hindrer at GitHub Pages spiser mapper som begynner med `_`.

---

## Ting som fortsatt står igjen

- [ ] Erstatte alle ⚠️ i `src/config.js` med ekte opplysninger
- [ ] Skrive ferdig brødteksten og fjerne 📝-markørene
- [ ] Lime inn den ekte Google Forms-lenken
- [ ] Bytte `public/og-image.jpg` mot et ekte delebilde
- [ ] Bilder av Susan &amp; Skage i `src/assets/photos/`

---

Flyet, himmelen og fargene er en hyldest til _Porco Rosso_ © 1992 Studio Ghibli.
