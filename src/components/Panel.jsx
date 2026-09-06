import useParallax from '../lib/parallax.js'

/*
  A boarding pass: a stub down the left with the section name set vertically, a
  column of punched holes, and the content on the larger half.

  Each card gets a small base `tilt`; the camera adds --s on top as the card
  rises through the frame, so the passes read as loose paper falling past a
  lens. See lib/parallax.js and .pass in base.css.
*/

export default function Panel({
  id,
  eyebrow,
  title,
  code,
  tilt = 0,
  className = '',
  children,
}) {
  const ref = useParallax()

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
