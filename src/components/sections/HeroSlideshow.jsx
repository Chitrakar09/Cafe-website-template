import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronIcon } from '../ui/Icons.jsx'
import Reveal from '../ui/Reveal.jsx'
import useMediaQuery from '../../hooks/useMediaQuery.js'
import { springTransition } from '../../lib/spring.js'

const GAP = 10
const CENTER_SHADOW = '0px 1px 2px 0px rgba(0,0,0,0.25)'
const NO_SHADOW = '0px 0px 0px 0px rgba(0,0,0,0)'
// Framer page-load effects per card, outer to centre: rise from below, outer cards first-delayed.
const entrance = [
  { y: 120, delay: 0.4, stiffness: 160, damping: 60 },
  { y: 80, delay: 0.3, stiffness: 180, damping: 60 },
  { y: 40, delay: 0.2, stiffness: 200, damping: 60 },
  { y: 80, delay: 0.3, stiffness: 180, damping: 60 },
  { y: 120, delay: 0.4, stiffness: 160, damping: 60 },
]
const arrowEntrance = { y: 40, delay: 0.6, stiffness: 160, damping: 60 }
const move = springTransition(['transform', 'width', 'box-shadow'], { stiffness: 200, damping: 40 }) // slide-to-slide variant transition
const arrow = 'absolute top-1/2 z-10 flex size-[42px] -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,245,224,0.8)]'

// Slot geometry (px) for the 5 positions. Desktop 20/25/30/25/20; phone shows the middle three (22/56/22), outer two wait off-screen.
function layout(W, desktop) {
  if (desktop) {
    const unit = (W - GAP * 4) / 120
    let x = 0
    return [20, 25, 30, 25, 20].map((r) => { const w = r * unit, s = { x, w }; x += w + GAP; return s })
  }
  const unit = (W - GAP * 2) / 100
  const w = [22, 56, 22].map((r) => r * unit)
  const x2 = w[0] + GAP, x3 = x2 + w[1] + GAP
  return [{ x: -(w[0] + GAP), w: w[0] }, { x: 0, w: w[0] }, { x: x2, w: w[1] }, { x: x3, w: w[2] }, { x: x3 + w[2] + GAP, w: w[2] }]
}

export default function HeroSlideshow({ slides }) {
  const root = useRef(null)
  const desktop = useMediaQuery('(min-width: 810px)')
  const [W, setW] = useState(0)
  const [start, setStart] = useState(0)
  const [instant, setInstant] = useState(true)
  const n = slides.length
  const slotOf = (i) => (((i - start) % n) + n) % n
  const prevSlots = useRef(slides.map((_, i) => i))

  useLayoutEffect(() => {
    const el = root.current
    const measure = () => { setInstant(true); setW(el.clientWidth) }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  useLayoutEffect(() => setInstant(true), [desktop])
  useEffect(() => {
    if (!instant) return
    let id = requestAnimationFrame(() => { id = requestAnimationFrame(() => setInstant(false)) })
    return () => cancelAnimationFrame(id)
  }, [instant, W, desktop])
  useLayoutEffect(() => { prevSlots.current = slides.map((_, i) => slotOf(i)) })

  const pos = layout(W, desktop)
  const go = (d) => setStart((s) => (s + d + n) % n)
  return (
    <div ref={root} className="relative h-[360px] w-full overflow-hidden md:h-[473px]">
      {slides.map((s, i) => {
        const slot = slotOf(i)
        const wrapped = Math.abs(slot - prevSlots.current[i]) > 1 // card leaving one edge and re-entering at the other: no travel
        return (
          <div key={i} className="absolute left-0 top-0 h-full rounded-[32px]" style={{
            width: pos[slot].w, transform: `translate3d(${pos[slot].x}px, 0, 0)`, boxShadow: slot === 2 ? CENTER_SHADOW : NO_SHADOW,
            transition: instant || wrapped ? 'none' : move.css,
          }}>
            <Reveal as="img" {...entrance[i % 5]} src={s.src} alt={s.alt} className="h-full w-full rounded-[32px] bg-highlight object-cover" />
          </div>
        )
      })}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_85%_at_50%_50%,rgba(255,255,255,0)_38.9%,rgba(255,254,253,0.13)_58%,var(--color-bg)_100%)]" />
      <Reveal as="button" {...arrowEntrance} type="button" aria-label="Previous slide" onClick={() => go(-1)} className={`${arrow} left-3 md:left-6`}><ChevronIcon direction="left" className="size-[18px]" /></Reveal>
      <Reveal as="button" {...arrowEntrance} type="button" aria-label="Next slide" onClick={() => go(1)} className={`${arrow} right-3 md:right-6`}><ChevronIcon className="size-[18px]" /></Reveal>
    </div>
  )
}
