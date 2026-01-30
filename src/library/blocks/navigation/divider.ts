import type { DividerSection } from '../../../content/types'
import type { BlockDefinition } from '../../types'

export const divider: BlockDefinition<DividerSection, Record<string, never>> = {
  meta: {
    id: 'divider',
    name: 'Divider',
    description: 'Horizontal rule with balanced spacing above and below.',
    category: 'navigation',
    tags: ['divider', 'separator', 'spacing'],
    produces: 'divider',
  },
  create: () => ({ type: 'divider' }),
}
