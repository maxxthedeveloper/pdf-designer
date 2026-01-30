import type { HeroSection } from '../../../content/types'
import type { BlockDefinition } from '../../types'

type Overrides = {
  title?: string
  description?: string
}

export const heroSplit: BlockDefinition<HeroSection, Overrides> = {
  meta: {
    id: 'hero-split',
    name: 'Hero Split',
    description: 'Two-column hero with multi-line title on left, description paragraph on right.',
    category: 'heroes',
    tags: ['hero', 'title', 'split', 'two-column'],
    produces: 'hero',
  },
  create: (overrides) => ({
    type: 'hero',
    title: overrides?.title ?? 'Title',
    description: overrides?.description ?? 'Description',
  }),
}
