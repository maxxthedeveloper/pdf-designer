import type { BulletListSection } from '../../../content/types'

interface BulletListProps {
  section: BulletListSection
}

export default function BulletList({ section }: BulletListProps) {
  return (
    <div className="bullet-list">
      {section.title && (
        <div className="section-head">
          <h2 className="section-title">{section.title}</h2>
          {section.description && (
            <p className="section-desc">{section.description}</p>
          )}
        </div>
      )}
      {section.groups.map((group, i) => (
        <div key={i} className="bullet-group">
          {group.label && <div className="bullet-group-label">{group.label}</div>}
          <ul>
            {group.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
