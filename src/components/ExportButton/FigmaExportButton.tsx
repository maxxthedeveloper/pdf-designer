import { useExportFigma } from '../../hooks/useExportFigma'
import styles from './ExportButton.module.css'

interface FigmaExportButtonProps {
  pdfRef: React.RefObject<HTMLDivElement | null>
  compact?: boolean
}

const labels = {
  idle: 'Export to Figma',
  exporting: 'Serializing...',
  copied: 'Copied to clipboard',
  error: 'Export failed',
} as const

const compactLabels = {
  idle: 'Figma',
  exporting: '...',
  copied: 'Copied!',
  error: 'Failed',
} as const

export default function FigmaExportButton({ pdfRef, compact }: FigmaExportButtonProps) {
  const { exportFigma, status } = useExportFigma()
  const l = compact ? compactLabels : labels

  return (
    <button
      className={`${styles.btn} ${styles.secondary} ${compact ? styles.compact : ''} ${status !== 'idle' ? styles.loading : ''}`}
      onClick={() => exportFigma(pdfRef)}
      disabled={status === 'exporting'}
    >
      {l[status]}
    </button>
  )
}
