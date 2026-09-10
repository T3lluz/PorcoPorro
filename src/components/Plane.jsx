import planeSide from '../assets/plane-side.png'
import Banner from './Banner.jsx'

/*
  An <svg> with an <image> in it, not a bare <img>, because the propeller has to
  turn. The artwork has the blades painted in and standing still, so they are
  masked out and redrawn underneath as SVG on a spin. Everything stays in the
  artwork's coordinate system (1024 x 463), so the hub holds at 233,133 whatever
  --plane-w is.

  Mask numbers measured off the file: painted blades at x 225-241, y 18-244,
  amber spinner cone between them at y 116-154. The rects take the blades and
  leave the cone, which looks the same spinning or not.
*/

const HUB_X = 233
const HUB_Y = 133

/* One blade, tip up, root at the hub. Drawn ~3x too wide because the group is
   squashed to 30% to foreshorten the disc. See .prop-blades in hero.css. */
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

                {/* userSpaceOnUse, so the highlight stays at the top of the
                    disc instead of riding round with the blades. */}
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

                {/* Soft-edged: a flat ellipse reads as a grey lens on the sky. */}
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

              {/* the disc you see at speed, blades flickering through it */}
              <ellipse
                className="prop-wash"
                cx={HUB_X}
                cy={HUB_Y}
                rx="31"
                ry="116"
              />

              {/* Two groups, not one: the outer squashes what the inner has
                  already rotated. See .prop-disc in hero.css. */}
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
