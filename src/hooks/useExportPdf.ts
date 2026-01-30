import { snapdom } from '@zumer/snapdom'
import { jsPDF } from 'jspdf'
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

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = 210

    for (let i = 0; i < pageElements.length; i++) {
      const result = await snapdom(pageElements[i], {
        scale: 3,
        outerShadows: true,
        embedFonts: true,
      })
      const canvas = await result.toCanvas()

      const pageHeight = (canvas.height * pageWidth) / canvas.width
      const imgData = canvas.toDataURL('image/png')

      if (i > 0) {
        pdf.addPage()
      }

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight)
    }

    pdf.save(doc.meta.exportFilename)
  }
}
