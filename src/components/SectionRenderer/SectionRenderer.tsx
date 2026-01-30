import type { Section } from '../../content/types'
import Hero from '../PdfDocument/sections/Hero'
import FeatureList from '../PdfDocument/sections/FeatureList'
import Cards from '../PdfDocument/sections/Cards'
import Table from '../PdfDocument/sections/Table'
import BulletList from '../PdfDocument/sections/BulletList'
import Footer from '../PdfDocument/sections/Footer'

interface SectionRendererProps {
  section: Section
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case 'hero':
      return <Hero section={section} />

    case 'feature-list':
      return <FeatureList section={section} />

    case 'two-column':
      return (
        <div className="two-col">
          <FeatureList section={section.left} />
          <FeatureList section={section.right} />
        </div>
      )

    case 'divider':
      return <div className="divider" />

    case 'cards':
      return <Cards section={section} />

    case 'text-block': {
      const paragraphs = Array.isArray(section.body) ? section.body : [section.body]
      return (
        <div className="text-block">
          <h2 className="section-title">{section.title}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="section-desc">{p}</p>
          ))}
        </div>
      )
    }

    case 'table':
      return <Table section={section} />

    case 'bullet-list':
      return <BulletList section={section} />

    case 'image':
      return (
        <div className="image-section">
          <img src={section.src} alt={section.alt} />
        </div>
      )

    case 'footer':
      return <Footer section={section} />

    default:
      return null
  }
}
