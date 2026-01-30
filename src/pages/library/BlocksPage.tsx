import { getAllCategories, getBlocksByCategory } from '../../library/registry'
import type { AnyBlock } from '../../library/types'
import type { Section } from '../../content/types'
import SectionRenderer from '../../components/SectionRenderer/SectionRenderer'
import styles from './BlocksPage.module.css'

function BlockPreview({ block }: { block: AnyBlock }) {
  const output = block.create()
  const sections: Section[] = Array.isArray(output) ? output : [output]

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardName}>{block.meta.name}</span>
        <span className={styles.badge}>{block.meta.produces}</span>
      </div>
      <p className={styles.cardDesc}>{block.meta.description}</p>
      <div className={styles.preview}>
        <div className="pdf-page" style={{ position: 'relative', minHeight: 'auto', padding: '24px 32px' }}>
          {sections.map((section, i) => (
            <SectionRenderer key={i} section={section} />
          ))}
        </div>
      </div>
      <div className={styles.tags}>
        {block.meta.tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

export default function BlocksPage() {
  const categories = getAllCategories()

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Blocks</h1>
      <p className={styles.pageDesc}>
        Configured section factories. Call <code>block.create()</code> for defaults or pass overrides for customization.
      </p>

      {categories.map((category) => {
        const blocks = getBlocksByCategory(category)
        return (
          <section key={category} className={styles.section}>
            <h3 className={styles.sectionTitle}>{category}</h3>
            <div className={styles.cardGrid}>
              {blocks.map((block) => (
                <BlockPreview key={block.meta.id} block={block} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
