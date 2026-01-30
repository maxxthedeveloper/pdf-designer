import type { AccentBar } from '../../../content/types'

type Overrides = {
  height?: number
}

const defaults: AccentBar = {
  gradient: 'linear-gradient(90deg, #9945FF 0%, #14F195 50%, #00C2FF 100%)',
  height: 3,
}

export const solanaAccentBar = {
  meta: {
    id: 'solana-accent-bar',
    name: 'Solana Accent Bar',
    description: 'Solana gradient bar (purple > green > blue). 3px default height.',
    category: 'navigation' as const,
    tags: ['accent', 'gradient', 'brand'],
    produces: 'accent-bar',
  },
  create: (overrides?: Overrides): AccentBar => ({ ...defaults, ...overrides }),
}
