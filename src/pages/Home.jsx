import Navigation from '../components/layout/Navigation.jsx'
import Footer from '../components/layout/Footer.jsx'
import Hero from '../components/sections/Hero.jsx'
import Menu from '../components/sections/Menu.jsx'
import LatestNews from '../components/sections/LatestNews.jsx'
import About from '../components/sections/About.jsx'
import useSmoothScroll from '../hooks/useSmoothScroll.js'

export default function Home() {
  useSmoothScroll()
  return (
    <div className="flex min-h-screen flex-col items-center gap-10 overflow-x-clip pt-[120px] md:gap-20">
      <Navigation />
      <main className="flex w-full flex-col items-center gap-10 md:gap-20">
        <Hero />
        <Menu />
        <LatestNews />
        <About />
      </main>
      <Footer />
    </div>
  )
}
