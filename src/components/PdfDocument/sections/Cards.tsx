import type { CardsSection } from '../../../content/types'

interface CardsProps {
  section: CardsSection
}

export default function Cards({ section }: CardsProps) {
  return (
    <div className="bottom-cards">
      {section.items.map((item) => (
        <div key={item.title} className="card">
          <div className="card-title">{item.title}</div>
          <div className="card-desc">{item.description}</div>
        </div>
      ))}
    </div>
  )
}
