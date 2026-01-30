import { useState, useCallback } from 'react'
import { domToFigma } from '../lib/dom-to-figma'

type Status = 'idle' | 'exporting' | 'copied' | 'error'

export function useExportFigma() {
  const [status, setStatus] = useState<Status>('idle')

  const exportFigma = useCallback(
    async (pdfRef: React.RefObject<HTMLDivElement | null>) => {
      const container = pdfRef.current
      if (!container) return

      setStatus('exporting')
      try {
        // Wait for fonts (same as PDF export)
        await document.fonts.ready

        const data = domToFigma(container)
        const json = JSON.stringify(data)

        await navigator.clipboard.writeText(json)
        setStatus('copied')

        // Reset after 2 seconds
        setTimeout(() => setStatus('idle'), 2000)
      } catch {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 2000)
      }
    },
    [],
  )

  return { exportFigma, status }
}
