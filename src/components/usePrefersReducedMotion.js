import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * CSS can switch off every animation, but it cannot switch off SMIL. Components
 * that animate inside SVG ask this hook and simply do not render the <animate>
 * elements when the visitor has asked for less motion.
 */
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
