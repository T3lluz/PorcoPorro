import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** CSS cannot switch off SMIL, so SVG animations skip rendering instead. */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => globalThis.matchMedia?.(QUERY).matches ?? false,
  )

  useEffect(() => {
    const mq = globalThis.matchMedia?.(QUERY)
    if (!mq) return
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
