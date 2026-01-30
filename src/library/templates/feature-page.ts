import type { Section, HeroSection, CardsSection, FooterSection } from '../../content/types'
import type { TemplateDefinition } from '../template-types'
import { solanaFooter } from '../blocks/navigation/solana-footer'
import { solanaAccentBar } from '../blocks/navigation/solana-accent-bar'

interface FeaturePageSlots {
  hero?: HeroSection
  features: Section | Section[]
  cta?: CardsSection
  footer?: FooterSection
}

export const featurePage: TemplateDefinition<FeaturePageSlots> = {
  meta: {
    id: 'feature-page',
    name: 'Feature Page',
    description: 'Feature showcase page with optional hero, feature sections (lists, two-column layouts), optional CTA, and footer.',
    category: 'capability-deck',
    slotNames: ['hero', 'features', 'cta', 'footer'],
  },
  accentBar: solanaAccentBar.create(),
  slots: [
    {
      name: 'hero',
      description: 'Optional hero section',
      accepts: ['hero'],
      required: false,
    },
    {
      name: 'features',
      description: 'Feature sections — feature lists, two-column layouts, dividers',
      accepts: ['feature-list', 'two-column', 'divider', 'text-block'],
      required: true,
      multi: true,
    },
    {
      name: 'cta',
      description: 'Call-to-action cards at bottom',
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
    const sections: Section[] = []

    if (slots.hero) sections.push(slots.hero)

    const features = Array.isArray(slots.features) ? slots.features : [slots.features]
    sections.push(...features)

    if (slots.cta) sections.push(slots.cta)
    sections.push(slots.footer ?? solanaFooter.create())

    return sections
  },
  preview: () => featurePage.assemble({
    hero: {
      type: 'hero',
      title: 'Platform\nCapabilities',
      description: 'An overview of the core features and infrastructure capabilities.',
    },
    features: [
      { type: 'divider' },
      {
        type: 'two-column',
        left: {
          type: 'feature-list',
          title: 'Infrastructure',
          features: [
            { icon: 'server', name: 'RPC Nodes', description: 'Dedicated access with guaranteed uptime.' },
            { icon: 'database', name: 'Data Indexing', description: 'Real-time on-chain data streams.' },
          ],
        },
        right: {
          type: 'feature-list',
          title: 'Developer Tools',
          features: [
            { icon: 'code', name: 'SDK', description: 'Type-safe client libraries.' },
            { icon: 'component', name: 'Components', description: 'Pre-built UI for common flows.' },
          ],
        },
      },
    ],
    cta: {
      type: 'cards',
      items: [{ overline: 'Get Involved', title: 'Partner Program', description: 'Apply to join as an early design partner.' }],
    },
  }),
}
