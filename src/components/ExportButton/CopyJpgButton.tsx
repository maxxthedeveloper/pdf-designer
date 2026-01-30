import { useExportJpg } from '../../hooks/useExportJpg'
import styles from './ExportButton.module.css'

interface CopyJpgButtonProps {
  pdfRef: React.RefObject<HTMLDivElement | null>
  compact?: boolean
}

const labels = {
  idle: 'Copy as JPG',
  exporting: 'Rendering...',
  copied: 'Copied!',
  error: 'Copy failed',
} as const

const compactLabels = {
  idle: 'JPG',
  exporting: '...',
  copied: 'Copied!',
  error: 'Failed',
} as const

export default function CopyJpgButton({ pdfRef, compact }: CopyJpgButtonProps) {
  const { copyJpg, status } = useExportJpg()
  const l = compact ? compactLabels : labels

  return (
    <button
      className={`${styles.btn} ${styles.secondary} ${compact ? styles.compact : ''} ${status !== 'idle' ? styles.loading : ''}`}
      onClick={() => copyJpg(pdfRef)}
      disabled={status === 'exporting'}
    >
      {l[status]}
    </button>
  )
}
