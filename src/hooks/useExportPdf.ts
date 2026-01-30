import { useActiveDocument } from '../context/AppContext'

export function useExportPdf() {
  const doc = useActiveDocument()

  return async (pdfRef: React.RefObject<HTMLDivElement | null>) => {
    const container = pdfRef.current
    if (!container) return

    await Promise.all([
      document.fonts.load('400 1em Inter'),
      document.fonts.load('500 1em Inter'),
      document.fonts.load('600 1em Inter'),
    ])
    await document.fonts.ready
    await new Promise(resolve => setTimeout(resolve, 100))

    const pageElements = container.querySelectorAll<HTMLElement>('.pdf-page')
    if (pageElements.length === 0) return

    const exportTitle = doc.meta.exportFilename.replace(/\.pdf$/i, '')
    const previousTitle = document.title
    document.title = exportTitle

    await new Promise<void>((resolve) => {
      let resolved = false
      const finish = () => {
        if (resolved) return
        resolved = true
        window.removeEventListener('afterprint', finish)
        resolve()
      }

      window.addEventListener('afterprint', finish)
      window.print()
      setTimeout(finish, 10000)
    })

    document.title = previousTitle
  }
}
