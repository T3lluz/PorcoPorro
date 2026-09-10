import useParallax from '../lib/parallax.js'

/*
  A boarding pass: stub down the left, content on the larger half. `tilt` is the
  base lean; the camera adds --s on top. See .pass in base.css.
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
