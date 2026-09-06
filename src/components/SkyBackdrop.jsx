import { useCamera } from '../lib/parallax.js'
import { Cloud } from './CloudSprite.jsx'
import WindSwirl from './WindSwirl.jsx'

/* ---------------------------------------------------------------------------
   The sky behind everything.

   Three pieces, on purpose:

   .sky-wash  scrolls with the document. It is the deep-blue vertical wash, and
              it is anchored to the top of the page so the blue pales away as
              you descend, leaving the lower half of the page in plain daylight
              blue for the footer's haze to cool into.

   .sky-drift is fixed. It carries the far and mid cloud layers and a few faint
              wind curls, so the whole page has weather, not just the hero. It
              runs the whole height of the page and is not cut off anywhere: the
              footer's horizon haze is what the clouds dissolve into at the
              bottom, and that is a gradient the footer was already painting.
              There was a mask here, parked on the top edge of a painted cloud
              bank and therefore moving on every scroll frame — which meant
              re-rasterising a fixed, full-screen layer with thirty clouds in it
              sixty times a second. Both the bank and the mask are gone.

   .drift-far / .drift-mid each rise against --sy at their own rate — the far
              layer at 9% of the scroll, the mid layer at 22%. The ground below
              moves at the full rate of the page, so a sky that creeps does not
              read as distance, it reads as a slightly loose background.

   Moving that fast for the length of a page needs more sky than a screenful,
   so each layer is close to three viewports tall, hung above the fold and
   reaching well below it.

   The base colour under all of it is a fixed horizontal gradient running
   #82dbfd → #4aaef9.
--------------------------------------------------------------------------- */

/* Scatter.

   `top` is where the cloud's top edge goes, as a percentage of the layer rather
   than of the screen.

   `x` is no longer a position. The sky streams to the right at a fixed rate and
   every cloud makes the same crossing, so what distinguishes one from another
   is where in that crossing it currently is — a phase, set as a negative delay.
   See Cloud() in CloudSprite.jsx and @keyframes fly in sky.css.

   The numbers did not have to change when it stopped being a coordinate, and
   that is the whole reason they are these numbers. They step through the golden
   ratio — each is the one before it plus 0.618, wrapped back into 0..1 — which
   is the sequence that never drops a new point near an old one and never leaves
   a gap. Evenly spread across a width, evenly spread around a cycle: the sky is
   as uniformly covered at every instant as it used to be in the one frame I was
   looking at. Hand-picked percentages kept clustering; random ones clump worse
   than either.

   The tops are simply evenly spaced from the top of the layer to the bottom,
   because the whole page needs weather, not just the parts of it I happened to
   look at. */
const far = [
  { shape: 'cloud-a', w: '230px', top: '3%', x: '75%', dur: '52s', delay: '-4s', travel: '18px', fy: 1.16 },
  { shape: 'cloud-b', w: '180px', top: '8.5%', x: '37%', dur: '61s', delay: '-16s', travel: '22px', fx: -1, fy: 1.07 },
  { shape: 'cloud-c', w: '250px', top: '14%', x: '98%', dur: '47s', delay: '-9s', travel: '16px', fy: 1.12 },
  { shape: 'cloud-b', w: '170px', top: '19.5%', x: '60%', dur: '57s', delay: '-7s', travel: '20px', fx: -1, fy: 1.05 },
  { shape: 'cloud-a', w: '200px', top: '25%', x: '22%', dur: '58s', delay: '-22s', travel: '20px', fy: 0.98 },
  { shape: 'cloud-b', w: '190px', top: '30.5%', x: '84%', dur: '62s', delay: '-18s', travel: '18px', fy: 0.92 },
  { shape: 'cloud-c', w: '260px', top: '36%', x: '46%', dur: '64s', delay: '-30s', travel: '24px', fx: -1, fy: 0.87 },
  { shape: 'cloud-b', w: '160px', top: '41%', x: '7%', dur: '53s', delay: '-29s', travel: '16px', fx: -1, fy: 1.1 },
  { shape: 'cloud-a', w: '210px', top: '47%', x: '69%', dur: '50s', delay: '-12s', travel: '18px', fx: -1, fy: 0.99 },
  { shape: 'cloud-c', w: '200px', top: '52%', x: '31%', dur: '60s', delay: '-14s', travel: '18px', fy: 0.95 },
  { shape: 'cloud-b', w: '190px', top: '58%', x: '93%', dur: '59s', delay: '-25s', travel: '20px', fx: -1, fy: 0.89 },
  { shape: 'cloud-a', w: '240px', top: '63%', x: '55%', dur: '56s', delay: '-33s', travel: '20px', fy: 1.08 },
  { shape: 'cloud-c', w: '230px', top: '69%', x: '16%', dur: '54s', delay: '-11s', travel: '18px', fy: 1.02 },
  { shape: 'cloud-b', w: '175px', top: '74%', x: '78%', dur: '63s', delay: '-21s', travel: '22px', fx: -1, fy: 0.94 },
  { shape: 'cloud-a', w: '205px', top: '80%', x: '40%', dur: '49s', delay: '-6s', travel: '18px', fy: 1.05 },
  { shape: 'cloud-c', w: '245px', top: '85%', x: '2%', dur: '58s', delay: '-27s', travel: '20px', fx: -1, fy: 0.9 },
  { shape: 'cloud-b', w: '185px', top: '90.5%', x: '64%', dur: '55s', delay: '-13s', travel: '18px', fy: 1 },
  { shape: 'cloud-a', w: '215px', top: '96%', x: '26%', dur: '61s', delay: '-19s', travel: '20px', fx: -1, fy: 0.96 },
]

const mid = [
  { shape: 'cloud-a', w: '340px', top: '4%', x: '3%', dur: '42s', delay: '-6s', travel: '30px', fx: -1, fy: 0.88 },
  { shape: 'cloud-a', w: '300px', top: '11%', x: '65%', dur: '43s', delay: '-21s', travel: '30px', fx: -1 },
  { shape: 'cloud-c', w: '400px', top: '18%', x: '26%', dur: '38s', delay: '-19s', travel: '34px', fy: 1.16 },
  { shape: 'cloud-a', w: '360px', top: '25%', x: '88%', dur: '45s', delay: '-11s', travel: '28px', fy: 1.04 },
  { shape: 'cloud-c', w: '330px', top: '32%', x: '50%', dur: '39s', delay: '-9s', travel: '32px', fy: 1.08 },
  { shape: 'cloud-b', w: '300px', top: '39%', x: '12%', dur: '40s', delay: '-27s', travel: '32px', fx: -1, fy: 0.88 },
  { shape: 'cloud-c', w: '380px', top: '46%', x: '74%', dur: '44s', delay: '-3s', travel: '30px', fx: -1, fy: 0.87 },
  { shape: 'cloud-a', w: '350px', top: '53%', x: '35%', dur: '41s', delay: '-15s', travel: '28px', fx: -1, fy: 0.95 },
  { shape: 'cloud-b', w: '310px', top: '60%', x: '97%', dur: '46s', delay: '-26s', travel: '28px', fx: -1, fy: 0.9 },
  { shape: 'cloud-c', w: '360px', top: '67%', x: '59%', dur: '40s', delay: '-8s', travel: '32px', fy: 1.02 },
  { shape: 'cloud-a', w: '320px', top: '74%', x: '21%', dur: '44s', delay: '-17s', travel: '28px', fy: 0.93 },
  { shape: 'cloud-b', w: '290px', top: '81%', x: '83%', dur: '42s', delay: '-24s', travel: '30px', fx: -1, fy: 0.86 },
  { shape: 'cloud-c', w: '340px', top: '88%', x: '44%', dur: '45s', delay: '-5s', travel: '30px', fy: 0.9 },
  { shape: 'cloud-a', w: '300px', top: '95%', x: '6%', dur: '43s', delay: '-29s', travel: '26px', fx: -1, fy: 0.88 },
]

export default function SkyBackdrop() {
  // Each layer is handed --sy directly. It is the only thing on the page that
  // reads it, and a scroll therefore costs these two subtrees and nothing else.
  const farLayer = useCamera('sy')
  const midLayer = useCamera('sy')

  return (
    <>
      <div className="sky-base" aria-hidden="true" />
      <div className="sky-wash" aria-hidden="true" />

      <div className="sky-drift" aria-hidden="true">
        <div className="drift-far" ref={farLayer}>
          {far.map((c, i) => (
            <Cloud key={`far-${i}`} layer="far" {...c} />
          ))}
        </div>

        <div className="drift-mid" ref={midLayer}>
          {mid.map((c, i) => (
            <Cloud key={`mid-${i}`} layer="mid" {...c} />
          ))}

          {/* The high wind, last in the layer. Two of them: this is the sky
              behind the whole page rather than the air off a propeller, so it
              wants to be noticed once a screenful, not constantly.

              It goes past. That is the whole brief: air moves, weather drifts,
              and the ratio between the two is the only thing that makes a pale
              curl read as wind rather than as another, thinner cloud. It
              crosses roughly six times faster than the mid clouds — two
              hundred pixels a second against their thirty on a desktop — and
              the same relationship holds on a phone, because both are stated in
              viewport widths.

              Shortening the duration rather than lengthening the travel, which
              is not the same thing: a curl that crossed further in the same
              time would spend most of its cycle off the side of the screen
              waiting to fade, and there would be fewer of them in frame at
              once. Faster and just as often is a gust; faster and rarer is a
              draught. */}
          <WindSwirl w="220px" top="42%" left="-16%" dur="6.7s" delay="-2.3s" travel="95vw" rise="-28px" op={0.22} />
          <WindSwirl w="170px" top="66%" left="14%" dur="6.1s" delay="-3.7s" travel="88vw" rise="-20px" op={0.18} fy={-1} />
        </div>
      </div>
    </>
  )
}
