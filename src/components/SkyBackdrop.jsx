import { Cloud } from './CloudSprite.jsx'
import WindSwirl from './WindSwirl.jsx'

/* ---------------------------------------------------------------------------
   The sky behind everything.

   Three pieces, on purpose:

   .sky-wash  scrolls with the document. It is the deep-blue vertical wash, and
              it is anchored to the top of the page so the blue pales away as
              you descend — and, crucially, is long gone by the time the page
              reaches <Cloudbank/>, so the join with the photo is never tinted.

   .sky-drift is fixed. It carries the far and mid cloud layers and a few faint
              wind curls, so the whole page has weather, not just the hero.

   .drift-far / .drift-mid each rise against --sy at their own rate — the far
              layer at 9% of the scroll, the mid layer at 22%, which is roughly
              three times what they used to do. That is the whole point: the
              ground below moves at the full rate of the page, so a sky that
              creeps does not read as distance, it reads as a slightly loose
              background.

   Moving that fast for the length of a page needs more sky than a screenful,
   so each layer is two and a half viewports tall, hung above the fold and
   reaching well below it, and the clouds below are spread across all of it —
   `top` is a percentage of the *layer*, not of the screen. Roughly the middle
   third of each list is what is in frame when the page loads; the rest arrives
   as you fall past it.

   The base colour under all of it is a fixed horizontal gradient running
   exactly #82dbfd → #4aaef9, the top row of sky-clouds.jpg. The seam is
   matched, not faked.
--------------------------------------------------------------------------- */

const far = [
  { shape: 'cloud-a', w: '230px', top: '3%', left: '-3%', dur: '52s', delay: '-4s', travel: '18px', fy: 1.16 },
  { shape: 'cloud-b', w: '180px', top: '8%', left: '62%', dur: '61s', delay: '-16s', travel: '22px', fx: -1, fy: 1.07 },
  { shape: 'cloud-c', w: '250px', top: '13%', left: '26%', dur: '47s', delay: '-9s', travel: '16px', fy: 1.12 },
  { shape: 'cloud-b', w: '170px', top: '18%', left: '50%', dur: '57s', delay: '-7s', travel: '20px', fx: -1, fy: 1.05 },
  { shape: 'cloud-a', w: '200px', top: '23%', left: '79%', dur: '58s', delay: '-22s', travel: '20px', fy: 0.98 },
  { shape: 'cloud-b', w: '190px', top: '28%', left: '8%', dur: '62s', delay: '-18s', travel: '18px', fy: 0.92 },
  { shape: 'cloud-c', w: '260px', top: '33%', left: '54%', dur: '64s', delay: '-30s', travel: '24px', fx: -1, fy: 0.87 },
  { shape: 'cloud-b', w: '160px', top: '38%', left: '32%', dur: '53s', delay: '-29s', travel: '16px', fx: -1, fy: 1.1 },
  { shape: 'cloud-a', w: '210px', top: '43%', left: '70%', dur: '50s', delay: '-12s', travel: '18px', fx: -1, fy: 0.99 },
  { shape: 'cloud-c', w: '200px', top: '48%', left: '12%', dur: '60s', delay: '-14s', travel: '18px', fy: 0.95 },
  { shape: 'cloud-b', w: '190px', top: '53%', left: '44%', dur: '59s', delay: '-25s', travel: '20px', fx: -1, fy: 0.89 },
  { shape: 'cloud-a', w: '240px', top: '58%', left: '80%', dur: '56s', delay: '-33s', travel: '20px', fy: 1.08 },
  { shape: 'cloud-c', w: '230px', top: '64%', left: '20%', dur: '54s', delay: '-11s', travel: '18px', fy: 1.02 },
  { shape: 'cloud-b', w: '175px', top: '70%', left: '58%', dur: '63s', delay: '-21s', travel: '22px', fx: -1, fy: 0.94 },
  { shape: 'cloud-a', w: '205px', top: '76%', left: '2%', dur: '49s', delay: '-6s', travel: '18px', fy: 1.05 },
  { shape: 'cloud-c', w: '245px', top: '82%', left: '66%', dur: '58s', delay: '-27s', travel: '20px', fx: -1, fy: 0.9 },
  { shape: 'cloud-b', w: '185px', top: '89%', left: '34%', dur: '55s', delay: '-13s', travel: '18px', fy: 1 },
  { shape: 'cloud-a', w: '215px', top: '95%', left: '76%', dur: '61s', delay: '-19s', travel: '20px', fx: -1, fy: 0.96 },
]

const mid = [
  { shape: 'cloud-a', w: '340px', top: '5%', left: '31%', dur: '42s', delay: '-6s', travel: '30px', fx: -1, fy: 0.88 },
  { shape: 'cloud-a', w: '300px', top: '12%', left: '80%', dur: '43s', delay: '-21s', travel: '30px', fx: -1 },
  { shape: 'cloud-c', w: '400px', top: '19%', left: '62%', dur: '38s', delay: '-19s', travel: '34px', fy: 1.16 },
  { shape: 'cloud-a', w: '360px', top: '26%', left: '-8%', dur: '45s', delay: '-11s', travel: '28px', fy: 1.04 },
  { shape: 'cloud-c', w: '330px', top: '33%', left: '40%', dur: '39s', delay: '-9s', travel: '32px', fy: 1.08 },
  { shape: 'cloud-b', w: '300px', top: '40%', left: '76%', dur: '40s', delay: '-27s', travel: '32px', fx: -1, fy: 0.88 },
  { shape: 'cloud-c', w: '380px', top: '47%', left: '8%', dur: '44s', delay: '-3s', travel: '30px', fx: -1, fy: 0.87 },
  { shape: 'cloud-a', w: '350px', top: '55%', left: '52%', dur: '41s', delay: '-15s', travel: '28px', fx: -1, fy: 0.95 },
  { shape: 'cloud-b', w: '310px', top: '62%', left: '-4%', dur: '46s', delay: '-26s', travel: '28px', fx: -1, fy: 0.9 },
  { shape: 'cloud-c', w: '360px', top: '70%', left: '68%', dur: '40s', delay: '-8s', travel: '32px', fy: 1.02 },
  { shape: 'cloud-a', w: '320px', top: '77%', left: '26%', dur: '44s', delay: '-17s', travel: '28px', fy: 0.93 },
  { shape: 'cloud-b', w: '290px', top: '84%', left: '58%', dur: '42s', delay: '-24s', travel: '30px', fx: -1, fy: 0.86 },
  { shape: 'cloud-c', w: '340px', top: '91%', left: '4%', dur: '45s', delay: '-5s', travel: '30px', fy: 0.9 },
  { shape: 'cloud-a', w: '300px', top: '96%', left: '72%', dur: '43s', delay: '-29s', travel: '26px', fx: -1, fy: 0.88 },
]

export default function SkyBackdrop() {
  return (
    <>
      <div className="sky-base" aria-hidden="true" />
      <div className="sky-wash" aria-hidden="true" />

      <div className="sky-drift" aria-hidden="true">
        <div className="drift-far">
          {far.map((c, i) => (
            <Cloud key={`far-${i}`} layer="far" {...c} />
          ))}
        </div>

        <div className="drift-mid">
          {mid.map((c, i) => (
            <Cloud key={`mid-${i}`} layer="mid" {...c} />
          ))}

          {/* the high wind. Last in the layer on purpose — sky.css thins the
              set down to one of them on a phone by index. */}
          <WindSwirl w="220px" top="42%" left="-14%" dur="16s" delay="-3s" travel="60vw" rise="-28px" op={0.22} />
          <WindSwirl w="170px" top="66%" left="18%" dur="14s" delay="-9s" travel="52vw" rise="-20px" op={0.18} fy={-1} />
          <WindSwirl w="200px" top="54%" left="46%" dur="17s" delay="-12s" travel="48vw" rise="-24px" op={0.16} />
        </div>
      </div>
    </>
  )
}
