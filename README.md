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
    parallax.js        kameraet: publiserer --sy, --fall, --lift, --s, --c
  styles/
    base.css           sideskall, boardingkortet, knapper
    sky.css            himmelsystemet og vindkrøllene
    hero.css           hero-riggen, flyet, banneret, parallaksen på toppen
    sections.css       alt som ligger på et boardingkort, pluss bakken
  components/          én komponent per seksjon + himmelprimitivene
  assets/              flyet og det malte skybildet
```

To seksjoner, i denne rekkefølgen: **Hvor & når** (dato, sted, kart og
veibeskrivelse) og **Svar** (lenke til skjemaet). Begge er et `<Panel>` — et
boardingkort med stubb, perforering og innhold.

Kortet sier fire ting og ikke mer: dato, kirke, kart, vei. Rekken med tre
klokkeslett var et program, og avsnittet om parkering og gangavstander var råd
ingen hadde spurt om ennå — begge svarte på spørsmål gjesten ikke har på vei
inn, på det kortet som skal svare på de to hun har.

Sted og tid lå på hvert sitt kort før, med en skjermhøyde åpen himmel imellom.
Det er ett spørsmål — «hvor skal jeg være, og når» — og å svare på det over to
kort betyr at gjesten må rulle for å finne andre halvdel av setningen.

Begge kortene tegnes fra første bilde. De ventet på hver sin
`IntersectionObserver` før, som gjorde at kortet under folden ikke bare var
utenfor bildet, det fantes ikke — du rullet inn i tom himmel uten noe under, og
uten noen måte å se om siden var slutt. Se `components/Panel.jsx`.

### Himmelen

Én sammenhengende himmel i fire lag, beskrevet i toppen av `styles/sky.css`:

| Lag          | Feste  | Hva det er                                            |
| ------------ | ------ | ----------------------------------------------------- |
| `.sky-base`  | fixed  | Vannrett gradient, nøyaktig fargene i øverste bildrad  |
| `.sky-wash`  | ruller | Dyp blå loddrett vask, festet til toppen av dokumentet |
| `.sky-drift` | fixed  | Fjerne og mellomliggende skyer + svak høydevind        |

`.drift-far` og `.drift-mid` stiger mot `--sy` med hver sin koeffisient — 20 %
og 48 % av rullingen. Uten det ville de faste lagene stå bom stille mens kortene
faller forbi; det leser som tapet, ikke som avstand. Og med for lite av det
leser det som at himmelen ligger *bak* deg i stedet for rundt deg — omtrent
halve sidens fart er punktet der de nære skyene slutter å være kulisser og
kameraet faller gjennom dem.

Samtidig strømmer begge lagene sidelengs, mot høyre, fordi flyet peker mot
venstre: et fast bilde av et fly leser bare som flyging hvis himmelen går forbi
det. Det går én vei og stopper aldri.

Sømløsheten ligger i at hver enkelt sky går rundt for seg. Alle skyene i et lag
gjør nøyaktig samme reise — fra helt utenfor venstre kant til helt utenfor
høyre, på `--fly-dur` — og det eneste som skiller dem er hvor i reisen de er,
satt som negativ `animation-delay`. Derfor er `x` i skylistene ikke lenger en
posisjon, men en fase. Tallene måtte ikke endres da de sluttet å være
koordinater, og det er hele grunnen til at de er akkurat disse tallene: de
stepper gjennom det gylne snitt, og en gyllen-snitt-følge er like jevnt spredt
rundt en syklus som den er over en bredde.

En sky går aldri rundt der du kan se det. Å panorere hele laget som ett stivt
ark får det ikke til uten å flislegge spredningen, og å svinge det fram og
tilbake er ikke flyging, det er en pendel — himmelen snudde hvert tjuende
sekund, og flyet så ut til å ombestemme seg.

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
en håndfull tall og lar CSS bestemme hva de betyr:

| Variabel | Hvor        | Hva den er                                                           |
| -------- | ----------- | -------------------------------------------------------------------- |
| `--sy`   | skylagene   | Hvor langt siden har falt, i piksler                                 |
| `--fall` | `.hero`     | Det samme, men bare over første skjermhøyde, 0 til 1                 |
| `--lift` | `<main>`    | `--fall` myknet ut. Boardingkortene stiger på den, så de klatrer fortere enn siden mens heroen er i veien |
| `--s`    | per element | −1 under bildet, 0 midt i det, +1 over                               |
| `--c`    | per element | `1 − abs(s)`, altså hvor midt i bildet elementet er                  |

`--lift` er `--fall` myknet ut: `1 − (1 − f)²`. Kortene kan ikke starte høyere
enn de gjør — da ville det første stukket fram over folden allerede før du rørte
noe — så den eneste måten å nå dem tidligere på er at de kommer opp fortere enn
siden. `<main>` klatrer én `--card-rise` ekstra over den første skjermhøyden, og
`.footer` trekker den samme `--card-rise` fra sin egen toppmarg, så bakken blir
liggende nøyaktig like langt under det siste kortet. Mykningen er den
bærende delen: stigningstallet er null ved `f = 1`, så farten blør bort akkurat
idet heroen slipper taket. En rett rampe ville kommet fram til overgangen i full
fart, og siden ville synlig skiftet gir.

`--fall` finnes fordi heroen står fast til pinnen tar slutt: navnene synker og
tones ut på den, og er borte før det første kortet har rukket å dekke dem —
ellers ville de dukket opp igjen i den åpne himmelen mellom to kort.

Nederst slutter ikke himmelen, den går over i noe annet. Horisontdisen i
bunnteksten (`.horizon::before`) rekker langt opp forbi toppen av den, og
drivskyene tynnes ut inni den: sky blir dis, dis blir vannfarge, og først da
begynner vannet. Det er ingen maske noe sted i himmelen som klipper dem av,
fordi *dette* er avklippet — og i motsetning til en maske er det en fast
gradient som verken flytter seg eller males på nytt.

Hvert boardingkort har sin egen lille `tilt`. Kameraet legger `--s` oppå: kortet
vipper mot linsen på vei opp og fra den på vei ut, og `--c` gir det en knapt
merkbar svulming når det passerer midten. Bakken i bunnen får det samme —
teksten i havet legger seg til ro et slag for sent, så den siste strekningen
leser som bakke på vei opp mot linsa.

Alt dette er slått av under `prefers-reduced-motion` — da registreres ingenting,
og kortene ligger flatt.

### Hvor tallene skrives

Dette er ytelseshistorien, og grunnen til at `parallax.js` ser ut som den gjør.

Tallene lå på `:root` før. Custom properties arves, så en skriving til `:root`
ugyldiggjør stilen til *hvert eneste element* på siden — på en telefon, seksti
ganger i sekundet, på en side med et levende kartinnbygg i seg. Det var mesteparten
av hakkingen, og ingen justering av verdiene hjelper, for kostnaden ligger ikke
i tallene, den ligger i hvem som må få beskjed om dem.

Nå skrives hver verdi på det minste elementet hvis undertre faktisk leser den:
`--sy` på de to skylagene, `--fall` på `.hero` (riggen, propellvinden, navnene og
scroll-hintet ligger alle inni den), `--lift` på `<main>`. En rulling koster de
undertrærne og ingenting annet. `watch()` i `parallax.js` er hele API-et.

### Mobilbudsjettet

En telefon betaler for hvert lag med uskarphet, hvert filter og hvert hintet
komposittlag — men aller mest for alt som endrer *geometri* mens du ruller, for
det kan ikke komposittes og må males på nytt. Derfor, under 700px:

- Boardingkortet flates ut til en ren `translate3d`. `perspective` + `rotateX` +
  `scale` som endrer seg hvert bilde rasterer hele kortet på nytt — og det ene
  kortet inneholder et levende Google-kart, det dyreste elementet på siden.
  Kartrammen har `contain: strict` i tillegg, så kortets transform ikke drar
  kartets rastrering med seg.
- Ingen filtre: ikke på skyene, ikke på kartet.
- En tredel av det fjerne skylaget. Hver sky er et eget komposittlag, og lag er
  det en telefon går tom for — det er den ene byttehandelen, og den er gjort for
  at vinden skal animere nøyaktig som på skjerm.
- Vindkrøllene slutter å tegne stiplingen på nytt (`stroke-dashoffset` er
  maling, ikke kompositering). De driver fortsatt.
- Skyene krysser skjermen raskere, fordi reisen er én skjermbredde og en
  telefonskjerm er smal: samme varighet ville gitt samme reise på samme tid, som
  på det lille formatet knapt er bevegelse.

Det som ikke står her, er det som ble slettet i stedet for justert: det malte
skybildet i bunnen, masken som fulgte det, den scroll-styrte gjennomsiktigheten
som fantes bare for å slippe unna masken på telefon, to elementer som måtte måles
hvert bilde, fire tokens og 200 kB JPEG.

Hver enkelt av dem står forklart der den er skrevet.

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
- [ ] Dobbeltsjekke adressen og koordinatene til St. Paulus kirke
- [ ] Lime inn ID-en til det ekte Google-skjemaet
- [ ] Bytte `public/og-image.jpg` mot et ekte delebilde

---

Flyet, himmelen og fargene er en hyllest til _Porco Rosso_ © 1992 Studio Ghibli.
