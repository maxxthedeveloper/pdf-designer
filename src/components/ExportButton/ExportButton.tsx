import { useState } from 'react'
import { useExportPdf } from '../../hooks/useExportPdf'
import styles from './ExportButton.module.css'

interface ExportButtonProps {
  pdfRef: React.RefObject<HTMLDivElement | null>
}

export default function ExportButton({ pdfRef }: ExportButtonProps) {
  const [loading, setLoading] = useState(false)
  const exportPdf = useExportPdf()

  const handleExport = async () => {
    setLoading(true)
    try {
      await exportPdf(pdfRef)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className={`${styles.btn} ${loading ? styles.loading : ''}`}
      onClick={handleExport}
      disabled={loading}
    >
      {loading ? 'Exporting...' : 'Export PDF'}
    </button>
  )
}
