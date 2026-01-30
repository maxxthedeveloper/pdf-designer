import type { Section, HeroSection, CardsSection, FooterSection } from '../../content/types'
import type { TemplateDefinition } from '../template-types'
import { solanaFooter } from '../blocks/navigation/solana-footer'
import { solanaAccentBar } from '../blocks/navigation/solana-accent-bar'

interface CoverPageSlots {
  hero: HeroSection
  content?: Section | Section[]
  cta?: CardsSection
  footer?: FooterSection
}

export const coverPage: TemplateDefinition<CoverPageSlots> = {
  meta: {
    id: 'cover-page',
    name: 'Cover Page',
    description: 'Opening page with hero, optional content area, optional CTA cards, and footer.',
    category: 'capability-deck',
    slotNames: ['hero', 'content', 'cta', 'footer'],
  },
  accentBar: solanaAccentBar.create(),
  slots: [
    {
      name: 'hero',
      description: 'Hero section with title and description',
      accepts: ['hero'],
      required: true,
    },
    {
      name: 'content',
      description: 'Main content area (feature lists, text blocks, dividers)',
      accepts: ['feature-list', 'two-column', 'text-block', 'divider'],
      required: false,
      multi: true,
    },
    {
      name: 'cta',
      description: 'Call-to-action cards at bottom of page',
      accepts: ['cards'],
      required: false,
    },
    {
      name: 'footer',
      description: 'Page footer',
      accepts: ['footer'],
      required: false,
      default: solanaFooter.create(),
    },
  ],
  assemble: (slots) => {
    const sections: Section[] = [slots.hero]

    if (slots.content) {
      const content = Array.isArray(slots.content) ? slots.content : [slots.content]
      sections.push(...content)
    }

    if (slots.cta) sections.push(slots.cta)
    sections.push(slots.footer ?? solanaFooter.create())

    return sections
  },
  preview: () => coverPage.assemble({
    hero: {
      type: 'hero',
      title: 'Document\nTitle',
      description: 'A brief overview of the document purpose and key value proposition for the reader.',
    },
    content: {
      type: 'two-column',
      left: {
        type: 'feature-list',
        title: 'Key Benefits',
        features: [
          { icon: 'shield-check', name: 'Enterprise Security', description: 'Bank-grade encryption and compliance.' },
          { icon: 'server', name: 'High Performance', description: 'Sub-second transaction finality.' },
        ],
      },
      right: {
        type: 'feature-list',
        title: 'Use Cases',
        features: [
          { icon: 'credit-card', name: 'Payments', description: 'Real-time settlement infrastructure.' },
          { icon: 'globe', name: 'Global Access', description: 'Permissionless, worldwide reach.' },
        ],
      },
    },
    cta: {
      type: 'cards',
      items: [{ overline: 'Next Steps', title: 'Get Started', description: 'Reach out to learn more about integration options.' }],
    },
  }),
}
