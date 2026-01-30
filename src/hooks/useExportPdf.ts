import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { useActiveDocument } from '../context/AppContext'

export function useExportPdf() {
  const doc = useActiveDocument()

  return async (pdfRef: React.RefObject<HTMLDivElement | null>) => {
    const container = pdfRef.current
    if (!container) return

    await document.fonts.ready

    const pageElements = container.querySelectorAll<HTMLElement>('.pdf-page')
    if (pageElements.length === 0) return

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = 210

    for (let i = 0; i < pageElements.length; i++) {
      const canvas = await html2canvas(pageElements[i], {
        scale: 3,
        useCORS: true,
        logging: false,
      })

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
