import { hero } from '../../data/configs'
import { sectionIds } from '../../data/constants'
import Button from '../ui/Button.jsx'
import Rating from '../ui/Rating.jsx'
import Reveal from '../ui/Reveal.jsx'
import HeroSlideshow from './HeroSlideshow.jsx'

export default function Hero() {
  return (
    <section id={sectionIds.top} className="section gap-10 md:gap-20">
      <div className="flex w-full flex-col items-center gap-8 text-center">
        <div className="flex w-full flex-col items-center gap-4">
          <Reveal y={-40} delay={0.6} damping={80}><Rating {...hero.rating} /></Reveal>
          <Reveal as="h1" className="h1" y={-40} delay={0.1}>{hero.title}</Reveal>
          <Reveal as="p" className="text-lg-ui max-w-[560px]" y={-40} delay={0.1}>{hero.description}</Reveal>
        </div>
        <Reveal y={-40} delay={0.3}><Button href={hero.cta.href}>{hero.cta.label}</Button></Reveal>
      </div>
      <HeroSlideshow slides={hero.slides} />
    </section>
  )
}
