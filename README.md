# Susan &amp; Skage — bryllupsside

Én rullende side med åpen himmel: et rødt Savoia-sjøfly trekker et håndmalt
banner over toppen, og alt det praktiske ligger lenger nede på boardingkort som
faller forbi kameraet på vei ned til bakken. Norsk tekst, ingen navigasjonsmeny,
ingen backend.

Porco Rosso-estetikk. React 19 + Vite 8, statisk bygg, publiseres på GitHub
Pages.

---

## Kom i gang

```bash
npm install
npm run dev
```

Siden kjører på <http://localhost:5173>.

| Kommando          | Hva den gjør                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Utviklingsserver med hot reload           |
| `npm run build`   | Statisk bygg til `dist/`                  |
| `npm run preview` | Serverer `dist/` lokalt, som i produksjon |
| `npm run lint`    | Oxlint over hele prosjektet               |

Ikoner kommer fra [`lucide-react`](https://lucide.dev). Importer det du trenger
ved navn; Vite rister bort resten.

---

## Alt innhold bor ett sted

**[`src/config.js`](src/config.js)** er den eneste filen du trenger å åpne for å
endre tekst, tider, adresser og lenker. Komponentene leser derfra; ingen streng
er hardkodet i en komponent.

Én markør i den filen: **⚠️ må erstattes før siden deles.** Det er
opplysningene ingen andre enn dere kan fylle inn — dato, sted, adresse,
koordinater, ID-en til svarskjemaet, og navn og telefonnummer på toastmaster og
forlover. Brødteksten er ekte, ikke fyllstoff: den står på egne bein om dere
ikke rører den, men den er skrevet for å byttes ut med deres egne ord.

### Svarskjemaet

Siden lenker til et Google-skjema i stedet for å bygge det inn — et skjema er et
dokument man går og fyller ut, og Google-skjemaet har en minstebredde det ikke
går under, så på mobil ble hele siden det ene skjemaet.

Slik henter du IDen til deres eget: åpne skjemaet → **Send** → fanen `< >`, og
kopier delen av URL-en mellom `/d/e/` og `/viewform` inn i `FORM_ID`.

---

## Hvordan siden er satt sammen

```
src/
  App.jsx              rekkefølgen på seksjonene, og ingenting annet
  config.js            alt innhold
  index.css            tokens (farger, typografi, mål) + reset + basetypografi
  lib/
    directions.js      velger Apple Maps eller Google Maps etter enhet
    parallax.js        kameraet: publiserer --sy, --fall, --bank-top, --p, --s, --c
  styles/
    base.css           sideskall, boardingkortet, knapper
    sky.css            himmelsystemet og vindkrøllene
    hero.css           hero-riggen, flyet, banneret, parallaksen på toppen
    sections.css       alt som ligger på et boardingkort, pluss bakken
  components/          én komponent per seksjon + himmelprimitivene
  assets/              flyet og det malte skybildet
```

Tre seksjoner, i denne rekkefølgen: **Hvor** (sted, kart, veibeskrivelse),
**Når** (dato og tre klokkeslett), **Svar** (lenke til skjemaet). Hver av dem er
et `<Panel>` — et boardingkort med stubb, perforering og innhold.

### Himmelen

Én sammenhengende himmel i fire lag, beskrevet i toppen av `styles/sky.css`:

| Lag          | Feste  | Hva det er                                            |
| ------------ | ------ | ----------------------------------------------------- |
| `.sky-base`  | fixed  | Vannrett gradient, nøyaktig fargene i øverste bildrad  |
| `.sky-wash`  | ruller | Dyp blå loddrett vask, festet til toppen av dokumentet |
| `.sky-drift` | fixed  | Fjerne og mellomliggende skyer + svak høydevind        |
| `.cloudbank` | bunnen | `sky-clouds.jpg`, festet til dokumentets gulv          |

`.drift-far` og `.drift-mid` stiger mot `--sy` med hver sin koeffisient. Uten det
ville de faste lagene stå bom stille mens kortene faller forbi — det leser som
tapet, ikke som avstand.

Skjøten mellom CSS-himmelen og fotoet er fargematchet, ikke jukset: øverste rad
i `sky-clouds.jpg` går `#82dbfd` → `#4aaef9`, og gradienten over er akkurat de
to fargene.

Alle skyene tegnes fra tre `<symbol>`-silhuetter som ligger inline én gang
(`CloudSprite.jsx`) — det er den eneste kopien av geometrien. Hver forekomst
speiles og strekkes litt, så de tre formene aldri gjentar seg synlig.

### Parallaksen på toppen

`.hero-pin` er nøyaktig dobbelt så høy som heroen, og heroen er `sticky` inni
den. `<main>` trekkes tilbake opp med én hero-høyde. Resultatet: den første
skjermhøyden med rulling holder himmelen stille mens skypanelene glir opp over
den — og først når heroen er dekket, slipper den taket og siden ruller normalt.
`--hero-h` i `index.css` er den ene knappen; alle reglene leser den.

### Det fallende kameraet

`lib/parallax.js` animerer ingenting selv. Én rAF-strupet scroll-runde skriver
seks tall og lar CSS bestemme hva de betyr:

| Variabel | Hvor        | Hva den er                                                           |
| -------- | ----------- | -------------------------------------------------------------------- |
| `--sy`   | `:root`     | Hvor langt siden har falt, i piksler                                 |
| `--fall` | `:root`     | Det samme, men bare over første skjermhøyde, 0 til 1                 |
| `--bank-top` | `:root` | Hvor overkanten av det malte skybildet er nå, i piksler fra toppen av vinduet |
| `--p`    | per element | 0 når overkanten kommer inn nederst, 1 når underkanten går ut øverst |
| `--s`    | per element | Samme, fortegnet: −1 under, 0 midt i bildet, +1 over                 |
| `--c`    | per element | `1 − abs(s)`, altså hvor midt i bildet elementet er                  |

`--fall` finnes fordi heroen står fast til pinnen tar slutt: navnene synker og
tones ut på den, og er borte før det første kortet har rukket å dekke dem —
ellers ville de dukket opp igjen i den åpne himmelen mellom to kort.

`--bank-top` er der vektorskyene slutter. De klippes av like over det malte
skybildet i bunnen i stedet for å tones ut over den siste strekningen: en
uttoning tynnet ut hele himmelen på slutten av siden for å løse et problem som
bare finnes i de siste hundre pikslene av den, og fordi den ble styrt av hvor
langt du hadde rullet og ikke av hvor bildet faktisk lå, flyttet punktet der
himmelen ble tom seg med vindusstørrelsen. Kanten følger bildet i stedet, og de
170 pikslene med mykning er nok til at det ene settet skyer forsvinner mens det
andre kommer.

Hvert boardingkort har sin egen lille `tilt`. Kameraet legger `--s` oppå: kortet
vipper mot linsen på vei opp og fra den på vei ut, og `--c` gir det en knapt
merkbar svulming når det passerer midten. Bakken i bunnen får det samme —
teksten i havet legger seg til ro et slag for sent, så den siste strekningen
leser som bakke på vei opp mot linsa.

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

Alle fire faller ut av én bølge samplet i ti faser. Duken, stangen, de to
slepetauene og den usynlige midtlinjen bokstavene rir på, samples fra samme
bølge i samme faser og animeres i lås — derfor bølger bokstavene *med* duken i
stedet for å ligge oppå den.

### Bevegelse

Alt av animasjon respekterer `prefers-reduced-motion`. CSS-animasjoner slås av
globalt i `index.css`; SMIL inne i SVG kan ikke slås av med CSS, så
`usePrefersReducedMotion` sørger for at `<animate>`-elementene aldri rendres i
det hele tatt.

Flyets egne løkker — drift og dupp — måles i `--plane-w`, ikke i piksler. 22
piksler dupp er tre prosent av et fly på 620 piksler og sytten prosent av et på
126, og sytten prosent var nok til at skroget la seg oppå navnene på mobil.

### Propellen

Propellen er malt inn i `plane-side.png` og står følgelig bom stille. Derfor er
flyet en `<image>` inne i en `<svg>` med bildets egen `viewBox` (1024 × 463), og
ikke en `<img>`: de to bladene maskeres bort med to rektangler, og tegnes på
nytt i SVG som snurrer. Nav og blader ligger i samme koordinatsystem som
tegningen, så navet står på 233,133 uansett hva `--plane-w` er — propellen kan
ikke gli av nesen.

To grupper, ikke én. Den indre snurrer, den ytre klemmer resultatet ned til 30 %
bredde — det er forkortningen som gjør at bladspissene beskriver en høy, smal
ellipse i stedet for en sirkel, slik en propellskive ser ut fra siden. Det må
være to elementer: på ett og samme element regner CSS ut `rotate` **før**
`transform`, så bladet flates til en splint først og svinges etterpå, og hver
vinkel utenom loddrett kaster to lange pigger tvers over bildet.

Med `prefers-reduced-motion` faller det ut av seg selv: animasjonen stopper,
`rotate` er null, klemmen står igjen — og da er bladene loddrette og akkurat så
brede som de malte var.

---

## Publisering

`.github/workflows/deploy.yml` bygger og publiserer til GitHub Pages ved hver
push til `main`. Første gang må **Settings → Pages → Source** stå på
**GitHub Actions**.

Siden serveres fra en underkatalog, så `base` i `vite.config.js` må stemme med
repo-navnet:

```js
base: '/PorcoPorro/',
```

Endrer du repo-navn, må du endre `base` i `vite.config.js` og `og:image`,
`og:url` og `canonical` i `index.html`. `public/.nojekyll` hindrer at GitHub
Pages spiser mapper som begynner med `_`.

---

## Ting som fortsatt står igjen

- [ ] Erstatte alle ⚠️ i `src/config.js` med ekte opplysninger
- [ ] Lime inn ID-en til det ekte Google-skjemaet
- [ ] Bytte `public/og-image.jpg` mot et ekte delebilde

---

Flyet, himmelen og fargene er en hyllest til _Porco Rosso_ © 1992 Studio Ghibli.
