import type { Section, AccentBar } from '../content/types'

// ── Template metadata ──
export interface TemplateMeta {
  id: string
  name: string
  description: string
  category: string
  slotNames: string[]
}

// ── Slot declaration ──
export interface TemplateSlot {
  name: string
  description: string
  /** Section types accepted in this slot */
  accepts: string[]
  required: boolean
  /** Whether this slot accepts multiple sections */
  multi?: boolean
  default?: Section | Section[]
}

// ── Template definition ──
export interface TemplateDefinition<TSlots extends object> {
  meta: TemplateMeta
  accentBar?: AccentBar
  slots: TemplateSlot[]
  assemble: (slots: TSlots) => Section[]
  /** Returns example sections for a scaled preview thumbnail */
  preview?: () => Section[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyTemplate = TemplateDefinition<any>
