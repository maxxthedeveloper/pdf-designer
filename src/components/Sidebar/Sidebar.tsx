import { Switch } from '@base-ui/react/switch'
import { useAppState, useAppDispatch, useActiveDocument } from '../../context/AppContext'
import { resolvePages } from '../../content/helpers'
import { documentRegistry } from '../../content/registry'
import ExportButton from '../ExportButton/ExportButton'
import styles from './Sidebar.module.css'

interface SidebarProps {
  pdfRef: React.RefObject<HTMLDivElement | null>
}

export default function Sidebar({ pdfRef }: SidebarProps) {
  const doc = useActiveDocument()
  const pages = resolvePages(doc)
  const totalSections = pages.reduce((sum, p) => sum + p.sections.length, 0)
  const { theme, activeDocumentId } = useAppState()
  const dispatch = useAppDispatch()

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <div>
          <div className={styles.label}>Document</div>
          <div className={styles.docList}>
            {documentRegistry.map((entry) => (
              <button
                key={entry.id}
                className={entry.id === activeDocumentId ? styles.docItemActive : styles.docItem}
                onClick={() => dispatch({ type: 'SET_DOCUMENT', payload: entry.id })}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <div className={styles.docMeta}>
            {pages.length > 1 && <>{pages.length} pages &middot; </>}
            {totalSections} sections &middot; {doc.meta.exportFilename}
          </div>
        </div>

        <div>
          <div className={styles.label}>Theme</div>
          <div className={styles.switchRow}>
            <span className={styles.switchLabel}>Dark mode</span>
            <Switch.Root
              checked={theme === 'dark'}
              onCheckedChange={(checked) =>
                dispatch({
                  type: 'SET_THEME',
                  payload: checked ? 'dark' : 'light',
                })
              }
              className={styles.switchRoot}
            >
              <Switch.Thumb className={styles.switchThumb} />
            </Switch.Root>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <ExportButton pdfRef={pdfRef} />
      </div>
    </div>
  )
}
