/**
 * The cloud geometry, inlined once per page. Every cloud on the site is drawn
 * with <svg viewBox="…"><use href="#cloud-a" /></svg>, so there is exactly one
 * copy of the shapes no matter how many clouds are in the sky.
 *
 * Each cloud is a silhouette (<g id="shape-*">) painted twice: once flat with a
 * shared vertical gradient, then again with blurred shadow and highlight blobs
 * masked back inside that same silhouette. The second pass is what stops them
 * reading as flat vector blobs.
 *
 * This is the only copy of the geometry; the standalone SVGs it was drawn from
 * are gone, so edit the shapes here.
 * viewBoxes: cloud-a 320x130 · cloud-b 220x90 · cloud-c 420x100
 */
export default function CloudSprite() {
  return (
    <svg className="cloud-sprite" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient
          id="puff"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="130"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".5" stopColor="#f6fcff" />
          <stop offset="1" stopColor="#c8e0f4" />
        </linearGradient>
        <linearGradient
          id="puff-soft"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="90"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d7eaf9" />
        </linearGradient>

        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="soft-sm" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        {/* ---- silhouettes ---- */}
        <g id="shape-a">
          <rect x="20" y="84" width="210" height="34" rx="17" />
          <rect x="150" y="90" width="156" height="28" rx="14" />
          <ellipse cx="80" cy="88" rx="66" ry="34" />
          <ellipse cx="232" cy="92" rx="74" ry="30" />
          <ellipse cx="150" cy="66" rx="72" ry="50" />
          <ellipse cx="98" cy="58" rx="46" ry="37" />
          <ellipse cx="214" cy="54" rx="52" ry="41" />
          <ellipse cx="262" cy="72" rx="42" ry="31" />
          <ellipse cx="176" cy="40" rx="34" ry="25" />
          <ellipse cx="44" cy="96" rx="30" ry="22" />
        </g>
        <g id="shape-b">
          <rect x="16" y="56" width="188" height="28" rx="14" />
          <ellipse cx="70" cy="58" rx="48" ry="27" />
          <ellipse cx="152" cy="62" rx="54" ry="23" />
          <ellipse cx="108" cy="40" rx="47" ry="33" />
          <ellipse cx="168" cy="44" rx="31" ry="23" />
          <ellipse cx="52" cy="46" rx="28" ry="21" />
        </g>
        <g id="shape-c">
          <rect x="18" y="60" width="240" height="30" rx="15" />
          <rect x="180" y="66" width="226" height="24" rx="12" />
          <ellipse cx="92" cy="64" rx="74" ry="27" />
          <ellipse cx="222" cy="58" rx="88" ry="33" />
          <ellipse cx="334" cy="68" rx="70" ry="23" />
          <ellipse cx="166" cy="44" rx="54" ry="29" />
          <ellipse cx="272" cy="38" rx="46" ry="27" />
          <ellipse cx="384" cy="74" rx="30" ry="16" />
        </g>

        <mask
          id="mask-a"
          maskUnits="userSpaceOnUse"
          x="-20"
          y="-20"
          width="360"
          height="170"
        >
          <use href="#shape-a" fill="#fff" />
        </mask>
        <mask
          id="mask-b"
          maskUnits="userSpaceOnUse"
          x="-20"
          y="-20"
          width="260"
          height="130"
        >
          <use href="#shape-b" fill="#fff" />
        </mask>
        <mask
          id="mask-c"
          maskUnits="userSpaceOnUse"
          x="-20"
          y="-20"
          width="460"
          height="140"
        >
          <use href="#shape-c" fill="#fff" />
        </mask>

        {/* A: broad cumulus */}
        <symbol id="cloud-a" viewBox="0 0 320 130">
          <use href="#shape-a" fill="url(#puff)" />
          <g mask="url(#mask-a)">
            <g filter="url(#soft)">
              <ellipse
                cx="160"
                cy="132"
                rx="180"
                ry="40"
                fill="#a6cbe8"
                opacity=".65"
              />
              <ellipse
                cx="132"
                cy="104"
                rx="74"
                ry="26"
                fill="#b9d8ef"
                opacity=".5"
              />
              <ellipse
                cx="252"
                cy="108"
                rx="58"
                ry="20"
                fill="#b0d2ec"
                opacity=".45"
              />
              <ellipse
                cx="118"
                cy="82"
                rx="24"
                ry="30"
                fill="#cde3f5"
                opacity=".55"
              />
              <ellipse cx="150" cy="46" rx="62" ry="34" fill="#ffffff" />
              <ellipse
                cx="212"
                cy="36"
                rx="42"
                ry="26"
                fill="#ffffff"
                opacity=".9"
              />
              <ellipse
                cx="88"
                cy="48"
                rx="36"
                ry="24"
                fill="#ffffff"
                opacity=".8"
              />
            </g>
          </g>
        </symbol>

        {/* B: small three-lobe puff */}
        <symbol id="cloud-b" viewBox="0 0 220 90">
          <use href="#shape-b" fill="url(#puff-soft)" />
          <g mask="url(#mask-b)">
            <g filter="url(#soft-sm)">
              <ellipse
                cx="110"
                cy="94"
                rx="130"
                ry="30"
                fill="#aed0ec"
                opacity=".6"
              />
              <ellipse
                cx="152"
                cy="74"
                rx="52"
                ry="16"
                fill="#bcdaf1"
                opacity=".5"
              />
              <ellipse cx="106" cy="28" rx="44" ry="20" fill="#ffffff" />
              <ellipse
                cx="58"
                cy="40"
                rx="26"
                ry="16"
                fill="#ffffff"
                opacity=".75"
              />
            </g>
          </g>
        </symbol>

        {/* C: long, low, drawn-out bank */}
        <symbol id="cloud-c" viewBox="0 0 420 100">
          <use href="#shape-c" fill="url(#puff)" />
          <g mask="url(#mask-c)">
            <g filter="url(#soft)">
              <ellipse
                cx="210"
                cy="104"
                rx="240"
                ry="30"
                fill="#a6cbe8"
                opacity=".62"
              />
              <ellipse
                cx="120"
                cy="80"
                rx="80"
                ry="18"
                fill="#bcdaf1"
                opacity=".5"
              />
              <ellipse
                cx="318"
                cy="82"
                rx="72"
                ry="16"
                fill="#b4d5ee"
                opacity=".45"
              />
              <ellipse
                cx="196"
                cy="66"
                rx="26"
                ry="26"
                fill="#cde3f5"
                opacity=".45"
              />
              <ellipse cx="222" cy="30" rx="76" ry="22" fill="#ffffff" />
              <ellipse
                cx="164"
                cy="30"
                rx="46"
                ry="18"
                fill="#ffffff"
                opacity=".85"
              />
              <ellipse
                cx="94"
                cy="50"
                rx="52"
                ry="16"
                fill="#ffffff"
                opacity=".7"
              />
            </g>
          </g>
        </symbol>
      </defs>
    </svg>
  )
}

/** viewBox strings, so callers never have to remember them. */
const CLOUD_BOX = {
  'cloud-a': '0 0 320 130',
  'cloud-b': '0 0 220 90',
  'cloud-c': '0 0 420 100',
}

/**
 * One cloud. `shape` picks the silhouette; `fx`/`fy` flip and squash it so the
 * three shapes never visibly repeat.
 *
 * `x` and `top` are where the cloud's *centre* goes, as percentages of the
 * layer (sky.css pulls it back by half its own width). That distinction is the
 * whole reason the sky used to bunch up on the right: these were `left` edges,
 * so a 300px-wide cloud at 80% started at 80% and spent most of itself off the
 * screen — which is barely noticeable at 1440px and is most of the sky at 390.
 * A centre lands where you put it at every width.
 */
export function Cloud({ shape, layer, w, top, x, dur, delay, travel, fx = 1, fy = 1 }) {
  return (
    <div
      className={`cloud layer-${layer}`}
      style={{
        '--w': w,
        '--dur': dur,
        '--delay': delay,
        '--travel': travel,
        '--fx': fx,
        '--fy': fy,
        top,
        left: x,
      }}
    >
      <svg viewBox={CLOUD_BOX[shape]} aria-hidden="true" focusable="false">
        <use href={`#${shape}`} />
      </svg>
    </div>
  )
}
