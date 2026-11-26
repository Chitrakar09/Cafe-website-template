import { createElement, useLayoutEffect, useRef } from 'react'
import { springTransition } from '../../lib/spring.js'
import { prefersReducedMotion } from '../../lib/motion.js'

// Framer "appear" (trigger="mount") and "style transform on in-view" (trigger="view") effects:
// the element starts offset by `y` px (and transparent when `fade`), then springs into place.
// All inline styles are removed afterwards; nothing is hidden when reduced motion is on.
export default function Reveal({ as = 'div', y = 0, fade = true, delay = 0, stiffness = 250, damping = 60, mass = 1, trigger = 'mount', children, ...props }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let raf, timer, io
    const clear = () => { el.style.transition = ''; el.style.transform = ''; el.style.opacity = ''; el.style.willChange = '' }
    el.style.transition = 'none'
    el.style.transform = `translate3d(0, ${y}px, 0)`
    if (fade) el.style.opacity = '0'
    el.style.willChange = 'transform, opacity'
    const play = () => {
      void el.offsetWidth
      const t = springTransition(fade ? ['transform', 'opacity'] : ['transform'], { stiffness, damping, mass }, delay)
      el.style.transition = t.css
      el.style.transform = 'translate3d(0, 0, 0)'
      if (fade) el.style.opacity = '1'
      timer = setTimeout(clear, t.duration + delay * 1000 + 100)
    }
    if (trigger === 'view' && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); play() } })
      io.observe(el)
    } else raf = requestAnimationFrame(play)
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); io?.disconnect(); clear() }
  }, [y, fade, delay, stiffness, damping, mass, trigger])
  return createElement(as, { ref, ...props }, children)
}
