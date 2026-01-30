import type { FooterSection } from '../../../content/types'
import type { BlockDefinition } from '../../types'

type Overrides = {
  brand?: string
  pageNumber?: number
  totalPages?: number
}

const defaults: FooterSection = {
  type: 'footer',
  brand: 'Solana Foundation',
  logo: 'solana-logo',
}

export const solanaFooter: BlockDefinition<FooterSection, Overrides> = {
  meta: {
    id: 'solana-footer',
    name: 'Solana Footer',
    description: 'Standard Solana Foundation footer with logo and optional pagination. Used at the bottom of every page.',
    category: 'navigation',
    tags: ['footer', 'brand', 'logo', 'pagination'],
    produces: 'footer',
  },
  create: (overrides) => ({ ...defaults, ...overrides }),
}
