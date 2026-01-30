import { useRef } from 'react'
import PdfCanvas from '../components/PdfCanvas/PdfCanvas'
import Sidebar from '../components/Sidebar/Sidebar'
import styles from './EditorPage.module.css'

export default function EditorPage() {
  const pdfRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.editor}>
      <PdfCanvas pdfRef={pdfRef} />
      <aside className={styles.sidebar}>
        <Sidebar pdfRef={pdfRef} />
      </aside>
    </div>
  )
}
