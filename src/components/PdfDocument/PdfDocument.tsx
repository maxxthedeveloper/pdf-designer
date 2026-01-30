import { forwardRef } from 'react'
import { document } from '../../content/document'
import SectionRenderer from '../SectionRenderer/SectionRenderer'

const PdfDocument = forwardRef<HTMLDivElement>(function PdfDocument(_, ref) {
  const { accentBar, sections } = document

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className="pdf-page">
      {accentBar && (
        <div
          className="accent-bar"
          style={{
            background: accentBar.gradient,
            height: accentBar.height ? `${accentBar.height}px` : undefined,
          }}
        />
      )}
      {sections.map((section, i) => (
        <SectionRenderer key={`${section.type}-${i}`} section={section} />
      ))}
    </div>
  )
})

export default PdfDocument
