import type { FeatureListSection } from '../../../content/types'
import { iconRegistry } from '../../../icons/registry'

interface FeatureListProps {
  section: FeatureListSection
}

export default function FeatureList({ section }: FeatureListProps) {
  return (
    <div>
      <div className="section-head">
        <h2 className="section-title">
          {section.title.split('\n').map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h2>
        {section.description && (
          <p className="section-desc">{section.description}</p>
        )}
      </div>
      <div className="features">
        {section.features.map((feature) => {
          const Icon = iconRegistry[feature.icon]
          return (
            <div key={feature.name} className="feature">
              <div className="feature-icon">
                <Icon />
              </div>
              <div className="feature-text">
                <div className="feature-name">{feature.name}</div>
                <div className="feature-desc">{feature.description}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
