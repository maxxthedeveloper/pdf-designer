import { useRef } from 'react'
import { useAppState } from '../../context/AppContext'
import PdfDocument from '../PdfDocument/PdfDocument'
import styles from './PdfCanvas.module.css'

interface PdfCanvasProps {
  pdfRef: React.RefObject<HTMLDivElement | null>
}

export default function PdfCanvas({ pdfRef }: PdfCanvasProps) {
  const { theme } = useAppState()
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.canvas} ref={scrollRef}>
      <div className={styles.pageWrapper} data-theme={theme}>
        <PdfDocument ref={pdfRef as React.Ref<HTMLDivElement>} />
      </div>
    </div>
  )
}
