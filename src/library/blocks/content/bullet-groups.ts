import type { BulletListSection, BulletGroup } from '../../../content/types'
import type { BlockDefinition } from '../../types'

type Overrides = {
  title?: string
  description?: string
  groups?: BulletGroup[]
}

export const bulletGroups: BlockDefinition<BulletListSection, Overrides> = {
  meta: {
    id: 'bullet-groups',
    name: 'Bullet Groups',
    description: 'Grouped bullet points with optional labels per group. Used for ecosystem comparisons and risk assessments.',
    category: 'content',
    tags: ['bullets', 'list', 'groups', 'labeled'],
    produces: 'bullet-list',
  },
  create: (overrides) => ({
    type: 'bullet-list',
    ...(overrides?.title && { title: overrides.title }),
    ...(overrides?.description && { description: overrides.description }),
    groups: overrides?.groups ?? [],
  }),
}
