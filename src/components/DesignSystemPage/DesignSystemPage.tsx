import { iconRegistry } from '../../icons/registry'
import styles from './DesignSystemPage.module.css'

const grayScale = [
  'gray-0', 'gray-25', 'gray-50', 'gray-75', 'gray-100', 'gray-150',
  'gray-200', 'gray-300', 'gray-400', 'gray-500', 'gray-600', 'gray-650',
  'gray-700', 'gray-750', 'gray-800', 'gray-850', 'gray-900', 'gray-950',
]

const emphasisTokens = [
  { name: 'extra-high', var: '--emphasis-extra-high' },
  { name: 'high', var: '--emphasis-high' },
  { name: 'medium', var: '--emphasis-medium' },
  { name: 'low', var: '--emphasis-low' },
  { name: 'extra-low', var: '--emphasis-extra-low' },
]

const surfaceTokens = [
  { name: 'page', var: '--surface-page' },
  { name: 'card', var: '--surface-card' },
  { name: 'card-border', var: '--surface-card-border' },
]

const typeScale = [
  { name: '2xs', var: '--text-2xs' },
  { name: 'xs', var: '--text-xs' },
  { name: 'sm', var: '--text-sm' },
  { name: 'base', var: '--text-base' },
  { name: 'md', var: '--text-md' },
  { name: 'lg', var: '--text-lg' },
  { name: 'xl', var: '--text-xl' },
  { name: '2xl', var: '--text-2xl' },
  { name: '3xl', var: '--text-3xl' },
]

const iconNames = Object.keys(iconRegistry) as (keyof typeof iconRegistry)[]

export default function DesignSystemPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Design Tokens</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Grayscale</h2>
        <div className={styles.swatchGrid}>
          {grayScale.map((name) => (
            <div key={name} className={styles.swatchItem}>
              <div
                className={styles.swatch}
                style={{ background: `var(--${name})` }}
              />
              <span className={styles.swatchLabel}>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Emphasis</h2>
        <div className={styles.tokenList}>
          {emphasisTokens.map((t) => (
            <div key={t.name} className={styles.tokenRow}>
              <span className={styles.tokenName}>{t.name}</span>
              <span style={{ color: `var(${t.var})` }} className={styles.tokenSample}>
                Sample Text
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Surfaces</h2>
        <div className={styles.swatchGrid}>
          {surfaceTokens.map((t) => (
            <div key={t.name} className={styles.swatchItem}>
              <div
                className={styles.swatch}
                style={{ background: `var(${t.var})`, border: '1px solid var(--border-subtle)' }}
              />
              <span className={styles.swatchLabel}>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Type Scale</h2>
        <div className={styles.tokenList}>
          {typeScale.map((t) => (
            <div key={t.name} className={styles.tokenRow}>
              <span className={styles.tokenName}>{t.name}</span>
              <span
                style={{ fontSize: `var(${t.var})` }}
                className={styles.typeSample}
              >
                Ag
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Icons</h2>
        <div className={styles.iconGrid}>
          {iconNames.map((name) => {
            const Icon = iconRegistry[name]
            return (
              <div key={name} className={styles.iconItem}>
                <div className={styles.iconBox}>
                  <Icon />
                </div>
                <span className={styles.iconLabel}>{name}</span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
