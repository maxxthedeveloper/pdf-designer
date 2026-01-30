import type { FeatureListSection, FeatureItem } from '../../../content/types'
import type { BlockDefinition } from '../../types'

type Overrides = {
  title?: string
  description?: string
  features?: FeatureItem[]
}

export const featureGrid: BlockDefinition<FeatureListSection, Overrides> = {
  meta: {
    id: 'feature-grid',
    name: 'Feature Grid',
    description: 'Section header with icon/name/description feature rows. Use inside two-column layouts or standalone.',
    category: 'features',
    tags: ['features', 'icon-list', 'grid'],
    produces: 'feature-list',
  },
  create: (overrides) => ({
    type: 'feature-list',
    title: overrides?.title ?? 'Features',
    ...(overrides?.description && { description: overrides.description }),
    features: overrides?.features ?? [],
  }),
}
