import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { document as docDefinition } from '../content/document'

export function useExportPdf() {
  return async (pdfRef: React.RefObject<HTMLDivElement | null>) => {
    const el = pdfRef.current
    if (!el) return

    await document.fonts.ready

    const canvas = await html2canvas(el, {
      scale: 3,
      useCORS: true,
      logging: false,
    })

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = 210
    const pageHeight = (canvas.height * pageWidth) / canvas.width
    const imgData = canvas.toDataURL('image/png')

    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight)
    pdf.save(docDefinition.meta.exportFilename)
  }
}
