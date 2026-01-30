import { forwardRef } from 'react'
import { useActiveDocument } from '../../context/AppContext'
import { resolvePages } from '../../content/helpers'
import SectionRenderer from '../SectionRenderer/SectionRenderer'

const PdfDocument = forwardRef<HTMLDivElement>(function PdfDocument(_, ref) {
  const doc = useActiveDocument()
  const pages = resolvePages(doc)

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className="pdf-document">
      {pages.map((page, pageIndex) => (
        <div key={pageIndex} className="pdf-page">
          {page.accentBar && (
            <div
              className="accent-bar"
              style={{
                background: page.accentBar.gradient,
                height: page.accentBar.height ? `${page.accentBar.height}px` : undefined,
              }}
            />
          )}
          {page.sections.map((section, i) => (
            <SectionRenderer key={`${section.type}-${i}`} section={section} />
          ))}
        </div>
      ))}
    </div>
  )
})

export default PdfDocument
