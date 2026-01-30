import type { TextBlockSection } from '../../../content/types'
import type { BlockDefinition } from '../../types'

type Overrides = {
  title?: string
  body?: string | string[]
}

export const textSection: BlockDefinition<TextBlockSection, Overrides> = {
  meta: {
    id: 'text-section',
    name: 'Text Section',
    description: 'Title with one or more body paragraphs. Used for summaries, assessments, and conclusions.',
    category: 'content',
    tags: ['text', 'paragraph', 'body', 'narrative'],
    produces: 'text-block',
  },
  create: (overrides) => ({
    type: 'text-block',
    title: overrides?.title ?? 'Title',
    body: overrides?.body ?? '',
  }),
}
