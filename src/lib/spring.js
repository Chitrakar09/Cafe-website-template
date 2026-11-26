// Framer-style springs (stiffness / damping / mass) turned into CSS `linear()` easings,
// so entrances, hovers and the slideshow run as plain CSS transitions.
const cache = new Map()
const SETTLE = 0.0015 // fraction of the travel distance left when the spring counts as "at rest"

function displacement({ stiffness, damping, mass }) {
  const w0 = Math.sqrt(stiffness / mass)
  const z = damping / (2 * Math.sqrt(stiffness * mass))
  if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return (t) => Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t)) }
  if (z === 1) return (t) => Math.exp(-w0 * t) * (1 + w0 * t)
  const s = Math.sqrt(z * z - 1), r1 = w0 * (-z + s), r2 = w0 * (-z - s)
  return (t) => (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1)
}

export function springEasing({ stiffness, damping, mass = 1 }) {
  const key = `${stiffness}/${damping}/${mass}`
  if (cache.has(key)) return cache.get(key)
  const x = displacement({ stiffness, damping, mass })
  let end = 0.05
  for (let t = 0; t < 8; t += 0.01) if (Math.abs(x(t)) > SETTLE) end = t + 0.01
  const steps = 90, pts = []
  for (let i = 0; i < steps; i++) pts.push((1 - x((end * i) / steps)).toFixed(4))
  pts.push('1')
  const linear = `linear(${pts.join(',')})`
  const ok = typeof CSS !== 'undefined' && CSS.supports('transition-timing-function', linear)
  const res = { duration: Math.round(end * 1000), easing: ok ? linear : 'cubic-bezier(0.22, 1, 0.36, 1)' }
  cache.set(key, res)
  return res
}

export function springTransition(props, cfg, delay = 0) {
  const { duration, easing } = springEasing(cfg)
  return { duration, css: props.map((p) => `${p} ${duration}ms ${easing} ${delay}s`).join(', ') }
}

// Hover/press spring used by every interactive element in the template (stiffness 400, damping 30).
export function installSpringVars() {
  const { duration, easing } = springEasing({ stiffness: 400, damping: 30 })
  const s = document.documentElement.style
  s.setProperty('--hover-dur', `${duration}ms`)
  s.setProperty('--hover-ease', easing)
}
