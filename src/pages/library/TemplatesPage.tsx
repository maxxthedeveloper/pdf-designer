import { getAllTemplateCategories, getTemplatesByCategory } from '../../library/template-registry'
import type { AnyTemplate } from '../../library/template-types'
import SectionRenderer from '../../components/SectionRenderer/SectionRenderer'
import styles from './TemplatesPage.module.css'

function TemplatePreview({ template }: { template: AnyTemplate }) {
  if (!template.preview) return null

  const sections = template.preview()
  const accentBar = template.accentBar

  return (
    <div className={styles.previewFrame}>
      <div className={`pdf-page ${styles.previewPage}`}>
        {accentBar && (
          <div
            className="accent-bar"
            style={{ background: accentBar.gradient, height: accentBar.height ?? 3 }}
          />
        )}
        {sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}
      </div>
    </div>
  )
}

function TemplateCard({ template }: { template: AnyTemplate }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardName}>{template.meta.name}</span>
        <span className={styles.badge}>{template.meta.category}</span>
      </div>
      <p className={styles.cardDesc}>{template.meta.description}</p>
      <TemplatePreview template={template} />
      <div className={styles.slotList}>
        {template.slots.map((slot) => (
          <div key={slot.name} className={styles.slot}>
            <span className={styles.slotName}>
              {slot.name}
              {slot.required && <span className={styles.required}>*</span>}
            </span>
            <span className={styles.slotAccepts}>
              {slot.accepts.join(', ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TemplatesPage() {
  const categories = getAllTemplateCategories()

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Page Templates</h1>
      <p className={styles.pageDesc}>
        Single-page layouts with named slots. Call <code>template.assemble({'{ ...slots }'})</code> to produce sections.
      </p>

      {categories.map((category) => {
        const templates = getTemplatesByCategory(category)
        return (
          <section key={category} className={styles.section}>
            <h3 className={styles.sectionTitle}>{category}</h3>
            <div className={styles.cardGrid}>
              {templates.map((template) => (
                <TemplateCard key={template.meta.id} template={template} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
