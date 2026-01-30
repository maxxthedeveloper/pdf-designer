import type { CardsSection, CardItem } from '../../../content/types'
import type { BlockDefinition } from '../../types'

type Overrides = {
  items?: CardItem[]
}

export const ctaCards: BlockDefinition<CardsSection, Overrides> = {
  meta: {
    id: 'cta-cards',
    name: 'CTA Cards',
    description: 'Call-to-action cards with optional overline. Pushes to the bottom of the page.',
    category: 'cta',
    tags: ['cards', 'cta', 'summary', 'bottom'],
    produces: 'cards',
  },
  create: (overrides) => ({
    type: 'cards',
    items: overrides?.items ?? [],
  }),
}
