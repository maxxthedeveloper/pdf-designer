import type { Section } from '../content/types'

// ── Block categories ──
export type BlockCategory =
  | 'heroes'
  | 'features'
  | 'content'
  | 'cta'
  | 'navigation'

// ── Block metadata (serializable — no functions) ──
export interface BlockMeta {
  id: string
  name: string
  description: string
  category: BlockCategory
  tags: string[]
  /** Which section type(s) this block produces */
  produces: string | string[]
}

// ── Block definition ──
export interface BlockDefinition<
  TOutput extends Section | Section[] = Section,
  TOverrides extends Record<string, unknown> = Record<string, unknown>,
> {
  meta: BlockMeta
  create: (overrides?: TOverrides) => TOutput
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyBlock = BlockDefinition<any, any>
