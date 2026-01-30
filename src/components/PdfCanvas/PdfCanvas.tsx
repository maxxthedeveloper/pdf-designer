import { useRef } from 'react'
import PdfDocument from '../PdfDocument/PdfDocument'
import styles from './PdfCanvas.module.css'

interface PdfCanvasProps {
  pdfRef: React.RefObject<HTMLDivElement | null>
}

export default function PdfCanvas({ pdfRef }: PdfCanvasProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.canvas} ref={scrollRef}>
      <div className={styles.pageWrapper}>
        <PdfDocument ref={pdfRef as React.Ref<HTMLDivElement>} />
      </div>
    </div>
  )
}
