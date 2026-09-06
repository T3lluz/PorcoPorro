import planeSide from '../assets/plane/plane-side.png'
import Banner from './Banner.jsx'

/* ---------------------------------------------------------------------------
   The rig arrives from stage right on load (.plane-rig), then settles into
   three transforms on deliberately mismatched periods — 14s drift, 9s bob,
   11s tilt — so the loop never visibly repeats.

   The banner hangs off .banner-sway rather than riding .plane-tilt rigidly: a
   towed banner lags the aircraft it is tied to, so it gets its own slower
   swing, pivoted at the tow point.
--------------------------------------------------------------------------- */

/* The aeroplane is an <image> inside an <svg>, not a bare <img>, for one
   reason: the propeller has to turn.

   The artwork has the propeller painted into it — a pair of blades standing
   dead still at the nose, which on a page where everything else drifts is the
   first thing you notice is wrong. So the two blades are masked out of the
   photograph and drawn again underneath as SVG, on a spin.

   Putting the image and the new blades in one <svg> with the artwork's own
   viewBox is what makes them stay together. Both are in the same coordinate
   system — 1024 x 463, the natural size of the PNG — so the hub is at 233,133
   whatever --plane-w happens to be, and no amount of resizing can drift the
   propeller off the nose.

   The numbers below are measured off the file, not eyeballed: the painted
   blades occupy x 225-241, y 18-244, and the amber spinner cone they turn on
   sits between them at y 116-154. The two mask rectangles take the blades and
   leave the cone, which is a solid of revolution and so looks identical
   spinning or not. --------------------------------------------------------- */

const HUB_X = 233
const HUB_Y = 133

/* One blade, tip at the top, root at the hub. Drawn about three times wider
   than it should look, because the group is squashed to 30% horizontally to
   foreshorten the disc — see .prop-blades in hero.css. */
const BLADE = `
  M233 20
  C243 52 250 88 252 118
  C246 127 220 127 214 118
  C216 88 223 52 233 20
  Z`

export default function Plane() {
  return (
    <div className="plane-rig">
      <div className="plane-drift">
        <div className="plane-bob">
          <div className="plane-tilt">
            <svg
              className="plane-img"
              viewBox="0 0 1024 463"
              role="img"
              aria-label="Rødt Savoia-sjøfly som trekker et banner"
            >
              <defs>
                <mask id="plane-prop-cut">
                  <rect width="1024" height="463" fill="#fff" />
                  {/* the painted blades, above and below the spinner */}
                  <rect x="217" y="0" width="26" height="116" />
                  <rect x="217" y="154" width="24" height="96" />
                </mask>

                {/* Lit from above, in the viewBox rather than in the blade, so
                    the highlight stays at the top of the disc as the blades
                    turn through it instead of riding round with them. */}
                <linearGradient
                  id="prop-shade"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="20"
                  x2="0"
                  y2="246"
                >
                  <stop offset="0" stopColor="#8d90a1" />
                  <stop offset=".42" stopColor="#bdbccc" />
                  <stop offset=".58" stopColor="#7c7684" />
                  <stop offset="1" stopColor="#4a4750" />
                </linearGradient>

                {/* Soft-edged, because a flat ellipse at any opacity reads as
                    a grey lens laid on the sky rather than as air being beaten.
                    The falloff is what makes it a blur. */}
                <radialGradient id="prop-wash">
                  <stop offset="0" stopColor="#eef3fb" stopOpacity=".5" />
                  <stop offset=".55" stopColor="#dfe7f5" stopOpacity=".28" />
                  <stop offset="1" stopColor="#dfe7f5" stopOpacity="0" />
                </radialGradient>
              </defs>

              <image
                href={planeSide}
                width="1024"
                height="463"
                mask="url(#plane-prop-cut)"
              />

              {/* the air the blades are beating — the disc you actually see at
                  speed, with the blades flickering through it */}
              <ellipse
                className="prop-wash"
                cx={HUB_X}
                cy={HUB_Y}
                rx="31"
                ry="116"
              />

              {/* Two groups, not one, and the nesting is the point: the disc
                  squashes what the blades have already done. Written as one
                  element it cannot work — CSS composes the individual transform
                  properties *before* `transform`, so a `rotate` alongside a
                  `scaleX` squashes the blade first and then swings the sliver
                  round, which throws two long spikes clean across the picture
                  at every angle but vertical. */}
              <g className="prop-disc">
                <g className="prop-blades">
                  <path className="prop-blade" d={BLADE} />
                  <path
                    className="prop-blade"
                    d={BLADE}
                    transform={`rotate(180 ${HUB_X} ${HUB_Y})`}
                  />
                </g>
              </g>
            </svg>

            <div className="banner-sway">
              <Banner />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
