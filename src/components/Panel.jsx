import { useEffect, useRef, useState } from 'react'
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
--------------------------------------------------------------------------- */

// No observer, or the visitor asked for less motion: show everything at once.
const showImmediately = () => !globalThis.IntersectionObserver || stillCamera()

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
  const [shown, setShown] = useState(showImmediately)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const unwatch = stillCamera() ? undefined : register(el)
    if (showImmediately()) return unwatch

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        io.disconnect() // once only
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.04 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      unwatch?.()
    }
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`pass-outer reveal wrap ${shown ? 'is-in' : ''} ${className}`}
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
