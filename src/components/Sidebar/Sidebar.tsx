import { document } from '../../content/document'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import ExportButton from '../ExportButton/ExportButton'
import styles from './Sidebar.module.css'

interface SidebarProps {
  pdfRef: React.RefObject<HTMLDivElement | null>
}

export default function Sidebar({ pdfRef }: SidebarProps) {
  const { meta, sections } = document

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div>
          <div className={styles.label}>Document</div>
          <div className={styles.docTitle}>{meta.title}</div>
          <div className={styles.docMeta}>
            {sections.length} sections &middot; {meta.exportFilename}
          </div>
        </div>
        <div>
          <div className={styles.label}>Theme</div>
          <ThemeToggle />
        </div>
      </div>
      <div className={styles.bottom}>
        <ExportButton pdfRef={pdfRef} />
      </div>
    </aside>
  )
}
