import { useEffect, useState } from 'react'
import { navLinks, sectionIds } from '../../data/constants'
import { site } from '../../data/configs'
import { springTransition } from '../../lib/spring.js'
import { prefersReducedMotion } from '../../lib/motion.js'
import Reveal from '../ui/Reveal.jsx'

const barSpring = springTransition(['transform', 'opacity', 'visibility'], { stiffness: 400, damping: 40 }) // menu open/close variants
const hideSpring = springTransition(['transform', 'opacity'], { stiffness: 300, damping: 40 }) // hide on scroll down / show on scroll up

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let last = window.scrollY, ticking = false
    const update = () => {
      const y = Math.max(window.scrollY, 0), d = y - last
      if (y <= 80) { setHidden(false); last = y } else if (Math.abs(d) > 6) { setHidden(d > 0); last = y }
      ticking = false
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hide = hidden && !open
  const bar = (rot, ty) => ({ transform: open ? `translate3d(0, ${ty}px, 0) rotate(${rot}deg)` : 'none', transition: barSpring.css })
  return (
    <Reveal as="header" y={-30} stiffness={150} damping={40} delay={0.8} className="fixed inset-x-0 top-0 z-50">
      <div style={{ transform: hide ? 'translate3d(0, -80px, 0)' : 'none', opacity: hide ? 0 : 1, pointerEvents: hide ? 'none' : 'auto', transition: hideSpring.css }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-bg to-bg/0" />
        <nav className="relative mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-5 md:h-20 md:px-10">
          <a href={`#${sectionIds.top}`} onClick={() => setOpen(false)}>
            <img src={site.logo} alt={site.name} className="h-[53px] w-[68px] object-contain" />
          </a>
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="hover-press px-4 py-2">{l.label}</a></li>
            ))}
          </ul>
          <button type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex size-[52px] flex-col items-center justify-center gap-2 md:hidden">
            <span className="block h-[3px] w-9 rounded-sm bg-ink" style={bar(45, 5.5)} />
            <span className="block h-[3px] w-9 rounded-sm bg-ink" style={bar(-45, -5.5)} />
          </button>
          <ul
            aria-hidden={!open}
            className="absolute inset-x-3 top-full flex flex-col rounded-[32px] bg-highlight p-5 md:hidden"
            style={{
              opacity: open ? 1 : 0,
              visibility: open ? 'visible' : 'hidden',
              transform: open ? 'none' : 'translate3d(0, -12px, 0) scale(0.98)',
              transition: `${barSpring.css.replace(/visibility [^,]*/, `visibility 0ms linear ${open ? 0 : barSpring.duration}ms`)}`,
            }}
          >
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} style={{ '--press': 0.98 }} className="hover-press text-lg-ui block py-3">{l.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </Reveal>
  )
}
