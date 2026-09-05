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

export default function Plane() {
  return (
    <div className="plane-rig">
      <div className="plane-drift">
        <div className="plane-bob">
          <div className="plane-tilt">
            <img
              className="plane-img"
              src={planeSide}
              width="1024"
              height="461"
              alt="Rødt Savoia-sjøfly som trekker et banner"
            />
            <div className="banner-sway">
              <Banner />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
