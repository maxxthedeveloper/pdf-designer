import { Switch } from '@base-ui/react/switch'
import { useAppState, useAppDispatch, useActiveDocument } from '../../context/AppContext'
import { resolvePages } from '../../content/helpers'
import { useDocumentManager } from '../../hooks/useDocumentManager'
import ExportButton from '../ExportButton/ExportButton'
import FigmaExportButton from '../ExportButton/FigmaExportButton'
import CopyJpgButton from '../ExportButton/CopyJpgButton'
import styles from './Sidebar.module.css'

interface SidebarProps {
  pdfRef: React.RefObject<HTMLDivElement | null>
}

export default function Sidebar({ pdfRef }: SidebarProps) {
  const doc = useActiveDocument()
  const pages = resolvePages(doc)
  const totalSections = pages.reduce((sum, p) => sum + p.sections.length, 0)
  const { theme } = useAppState()
  const dispatch = useAppDispatch()
  const {
    documents,
    activeDocumentId,
    saveDocument,
    deleteDocument,
    importDocument,
    exportDocument,
    setActiveDocument,
  } = useDocumentManager()

  const builtinDocs = documents.filter((d) => d.source === 'builtin')
  const savedDocs = documents.filter((d) => d.source === 'saved')

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <div>
          <div className={styles.label}>Documents</div>
          <div className={styles.docList}>
            {builtinDocs.map((entry) => (
              <button
                key={entry.id}
                className={entry.id === activeDocumentId ? styles.docItemActive : styles.docItem}
                onClick={() => setActiveDocument(entry.id)}
              >
                {entry.label}
              </button>
            ))}

            {savedDocs.length > 0 && (
              <>
                <div className={styles.savedSeparator}>Saved</div>
                {savedDocs.map((entry) => (
                  <div key={entry.id} className={styles.docItemRow}>
                    <button
                      className={entry.id === activeDocumentId ? styles.docItemActive : styles.docItem}
                      onClick={() => setActiveDocument(entry.id)}
                    >
                      {entry.label}
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => {
                        if (confirm(`Delete "${entry.label}"?`)) {
                          deleteDocument(entry.id)
                        }
                      }}
                      title="Delete document"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          <button className={styles.importBtn} onClick={importDocument}>
            + Import JSON
          </button>

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
        <div className={styles.exportButtons}>
          <ExportButton pdfRef={pdfRef} />
          <button
            className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
            onClick={() => saveDocument(doc.meta.title, doc)}
          >
            Save to Library
          </button>
          <div className={styles.exportRow}>
            <button
              className={`${styles.actionBtn} ${styles.actionBtnSecondary} ${styles.actionBtnCompact}`}
              onClick={() => exportDocument(doc)}
            >
              JSON
            </button>
            <FigmaExportButton pdfRef={pdfRef} compact />
            <CopyJpgButton pdfRef={pdfRef} compact />
          </div>
        </div>
      </div>
    </div>
  )
}
