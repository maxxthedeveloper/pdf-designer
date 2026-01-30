import { useExportFigma } from '../../hooks/useExportFigma'
import styles from './ExportButton.module.css'

interface FigmaExportButtonProps {
  pdfRef: React.RefObject<HTMLDivElement | null>
}

const labels = {
  idle: 'Export to Figma',
  exporting: 'Serializing...',
  copied: 'Copied to clipboard',
  error: 'Export failed',
} as const

export default function FigmaExportButton({ pdfRef }: FigmaExportButtonProps) {
  const { exportFigma, status } = useExportFigma()

  return (
    <button
      className={`${styles.btn} ${styles.secondary} ${status !== 'idle' ? styles.loading : ''}`}
      onClick={() => exportFigma(pdfRef)}
      disabled={status === 'exporting'}
    >
      {labels[status]}
    </button>
  )
}
