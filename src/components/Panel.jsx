import { useEffect, useRef } from 'react'
import { register, stillCamera } from '../lib/parallax.js'

/* ---------------------------------------------------------------------------
   A boarding pass.

   Every section of the page is one: a stub down the left carrying the section's
   name set large and vertically, a column of punched holes where you would tear
   it, and the content on the larger half.

   The card is not upright. Each one is handed a small base `tilt`, and the
   camera's --s adds to it as the card rises through the frame — so the passes
   read as loose paper falling past a lens rather than as a stack of panels
   scrolling by. See lib/parallax.js for where --s comes from, and .pass in
   base.css for what it is multiplied by.

   There is no per-card reveal any more. Each pass used to wait for an
   IntersectionObserver of its own before fading in, which meant the card below
   the fold was not merely out of frame, it was not *there* — you scrolled into
   blank sky with nothing under it and no way to tell whether the page had ended.
   A staggered fade is only legible when you can see the things that have not
   faded in yet. The cards are all painted from the first frame now; the falling
   camera is what stages them.
--------------------------------------------------------------------------- */

export default function Panel({
  id,
  eyebrow,
  title,
  code,
  tilt = 0,
  className = '',
  children,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || stillCamera()) return
    return register(el)
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`pass-outer wrap ${className}`}
      style={{ '--tilt': `${tilt}deg` }}
    >
      <article className="pass">
        <div className="pass-stub">
          <span className="pass-eyebrow">{eyebrow}</span>
          <span className="pass-code" aria-hidden="true">
            {code}
          </span>
        </div>

        <div className="pass-body">
          <h2 className="pass-title">{title}</h2>
          {children}
        </div>
      </article>
    </section>
  )
}
