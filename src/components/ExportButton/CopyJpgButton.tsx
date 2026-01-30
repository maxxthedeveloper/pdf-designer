import { useExportJpg } from '../../hooks/useExportJpg'
import styles from './ExportButton.module.css'

interface CopyJpgButtonProps {
  pdfRef: React.RefObject<HTMLDivElement | null>
}

const labels = {
  idle: 'Copy as JPG',
  exporting: 'Rendering...',
  copied: 'Copied!',
  error: 'Copy failed',
} as const

export default function CopyJpgButton({ pdfRef }: CopyJpgButtonProps) {
  const { copyJpg, status } = useExportJpg()

  return (
    <button
      className={`${styles.btn} ${styles.secondary} ${status !== 'idle' ? styles.loading : ''}`}
      onClick={() => copyJpg(pdfRef)}
      disabled={status === 'exporting'}
    >
      {labels[status]}
    </button>
  )
}
