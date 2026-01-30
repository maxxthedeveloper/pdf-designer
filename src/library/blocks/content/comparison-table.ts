import type { TableSection } from '../../../content/types'
import type { BlockDefinition } from '../../types'

type Overrides = {
  title?: string
  description?: string
  columns?: string[]
  rows?: string[][]
  footnote?: string
}

export const comparisonTable: BlockDefinition<TableSection, Overrides> = {
  meta: {
    id: 'comparison-table',
    name: 'Comparison Table',
    description: 'Data table with optional title, description, and footnote. Used for side-by-side comparisons.',
    category: 'content',
    tags: ['table', 'comparison', 'data', 'grid'],
    produces: 'table',
  },
  create: (overrides) => ({
    type: 'table',
    ...(overrides?.title && { title: overrides.title }),
    ...(overrides?.description && { description: overrides.description }),
    columns: overrides?.columns ?? ['Column A', 'Column B'],
    rows: overrides?.rows ?? [],
    ...(overrides?.footnote && { footnote: overrides.footnote }),
  }),
}
