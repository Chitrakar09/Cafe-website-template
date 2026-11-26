import { useEffect } from 'react'
import { prefersReducedMotion } from '../lib/motion.js'

function scrollToHash(hash, behavior = 'smooth') {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  const b = prefersReducedMotion() ? 'instant' : behavior
  if (!id || id === 'top') { window.scrollTo({ top: 0, behavior: b }); return true }
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: b, block: 'start' }) // offset comes from `scroll-margin-top` on sections
  return true
}

// One global handler for every in-page link (nav, logo, CTAs) + hash on load / back-forward.
export default function useSmoothScroll() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest?.('a[href^="#"]')
      if (!a) return
      const hash = a.getAttribute('href')
      if (!scrollToHash(hash)) return
      e.preventDefault()
      history.replaceState(null, '', hash === '#top' || hash === '#' ? location.pathname + location.search : hash)
    }
    const onHashChange = () => scrollToHash(location.hash)
    const init = () => (location.hash ? scrollToHash(location.hash, 'instant') : window.scrollTo({ top: 0, behavior: 'instant' }))
    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHashChange)
    if (document.readyState === 'complete') init(); else window.addEventListener('load', init, { once: true })
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('load', init)
    }
  }, [])
}
