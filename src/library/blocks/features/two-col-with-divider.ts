import type { Section, FeatureListSection, FeatureItem } from '../../../content/types'
import type { BlockDefinition } from '../../types'

type ColumnOverrides = {
  title?: string
  description?: string
  features?: FeatureItem[]
}

type Overrides = {
  left?: ColumnOverrides
  right?: ColumnOverrides
  dividerBefore?: boolean
}

export const twoColWithDivider: BlockDefinition<Section[], Overrides> = {
  meta: {
    id: 'two-col-with-divider',
    name: 'Two-Column Features with Divider',
    description: 'Optional divider followed by side-by-side feature lists. Common in capability decks.',
    category: 'features',
    tags: ['features', 'two-column', 'divider', 'icon-list'],
    produces: ['divider', 'two-column'],
  },
  create: (overrides) => {
    const sections: Section[] = []

    if (overrides?.dividerBefore !== false) {
      sections.push({ type: 'divider' })
    }

    const left: FeatureListSection = {
      type: 'feature-list',
      title: overrides?.left?.title ?? 'Left Column',
      features: overrides?.left?.features ?? [],
      ...(overrides?.left?.description && { description: overrides.left.description }),
    }

    const right: FeatureListSection = {
      type: 'feature-list',
      title: overrides?.right?.title ?? 'Right Column',
      features: overrides?.right?.features ?? [],
      ...(overrides?.right?.description && { description: overrides.right.description }),
    }

    sections.push({ type: 'two-column', left, right })
    return sections
  },
}
