import { useState } from 'react'
import { ChevronIcon } from '../ui/Icons.jsx'

// Flex-grow ratios from the Framer slideshow (20/25/30/25/20); phone shows the middle three.
const slots = [
  'hidden md:block md:flex-[20_1_0%]',
  'flex-[22_1_0%] md:flex-[25_1_0%]',
  'flex-[56_1_0%] md:flex-[30_1_0%] shadow-[0_1px_2px_rgba(0,0,0,0.25)]',
  'flex-[22_1_0%] md:flex-[25_1_0%]',
  'hidden md:block md:flex-[20_1_0%]',
]
const arrow = 'absolute top-1/2 z-10 flex size-[42px] -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,245,224,0.8)] transition-opacity hover:opacity-80'

export default function HeroSlideshow({ slides }) {
  const [start, setStart] = useState(0)
  const n = slides.length
  const go = (d) => setStart((s) => (s + d + n) % n)
  return (
    <div className="relative flex h-[360px] w-full items-center gap-2.5 overflow-hidden md:h-[473px]">
      {slots.map((cls, i) => {
        const s = slides[(start + i) % n]
        return <img key={i} src={s.src} alt={s.alt} className={`h-full min-w-0 rounded-[32px] bg-highlight object-cover ${cls}`} />
      })}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_85%_at_50%_50%,rgba(255,255,255,0)_38.9%,rgba(255,254,253,0.13)_58%,var(--color-bg)_100%)]" />
      <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className={`${arrow} left-3 md:left-6`}><ChevronIcon direction="left" className="size-[18px]" /></button>
      <button type="button" aria-label="Next slide" onClick={() => go(1)} className={`${arrow} right-3 md:right-6`}><ChevronIcon className="size-[18px]" /></button>
    </div>
  )
}
