import { useState } from 'react'
import { navLinks, sectionIds } from '../../data/constants'
import { site } from '../../data/configs'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const bar = 'block h-[3px] w-9 rounded-sm bg-ink transition-transform duration-200'
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-bg to-bg/0" />
      <nav className="relative mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-5 md:h-20 md:px-10">
        <a href={`#${sectionIds.top}`} onClick={() => setOpen(false)}>
          <img src={site.logo} alt={site.name} className="h-[53px] w-[68px] object-contain" />
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} className="rounded-full px-4 py-2 transition-colors hover:bg-highlight">{l.label}</a></li>
          ))}
        </ul>
        <button type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex size-[52px] flex-col items-center justify-center gap-2 md:hidden">
          <span className={`${bar} ${open ? 'translate-y-[5.5px] rotate-45' : ''}`} />
          <span className={`${bar} ${open ? '-translate-y-[5.5px] -rotate-45' : ''}`} />
        </button>
        {open && (
          <ul className="absolute inset-x-3 top-full flex flex-col rounded-[32px] bg-highlight p-5 md:hidden">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="text-lg-ui block py-3">{l.label}</a></li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
