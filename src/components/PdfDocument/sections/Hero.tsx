import type { HeroSection } from '../../../content/types'

interface HeroProps {
  section: HeroSection
}

export default function Hero({ section }: HeroProps) {
  return (
    <div className="hero">
      <h1 className="hero-title">
        {section.title.split('\n').map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </h1>
      <p className="hero-desc">{section.description}</p>
    </div>
  )
}
