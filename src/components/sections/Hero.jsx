import { hero } from '../../data/configs'
import { sectionIds } from '../../data/constants'
import Button from '../ui/Button.jsx'
import Rating from '../ui/Rating.jsx'
import HeroSlideshow from './HeroSlideshow.jsx'

export default function Hero() {
  return (
    <section id={sectionIds.top} className="section gap-10 md:gap-20">
      <div className="flex w-full flex-col items-center gap-8 text-center">
        <div className="flex w-full flex-col items-center gap-4">
          <Rating {...hero.rating} />
          <h1 className="h1">{hero.title}</h1>
          <p className="text-lg-ui max-w-[560px]">{hero.description}</p>
        </div>
        <Button href={hero.cta.href}>{hero.cta.label}</Button>
      </div>
      <HeroSlideshow slides={hero.slides} />
    </section>
  )
}
