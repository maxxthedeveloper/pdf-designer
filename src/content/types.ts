import type { ComponentType } from 'react'

// ── Icon registry ──
export type IconName =
  | 'server'
  | 'component'
  | 'shield-check'
  | 'database'
  | 'credit-card'
  | 'coin'
  | 'chat'
  | 'check-square'
  | 'compass'
  | 'globe'
  | 'code'
  | 'target'
  | 'solana-logo'

// ── Feature item (used across feature-list sections) ──
export interface FeatureItem {
  icon: IconName
  name: string
  description: string
}

// ── Section definitions ──
export interface HeroSection {
  type: 'hero'
  title: string
  description: string
}

export interface FeatureListSection {
  type: 'feature-list'
  title: string
  description?: string
  features: FeatureItem[]
}

export interface TwoColumnSection {
  type: 'two-column'
  left: FeatureListSection
  right: FeatureListSection
}

export interface DividerSection {
  type: 'divider'
}

export interface CardItem {
  overline?: string
  title: string
  description: string
}

export interface CardsSection {
  type: 'cards'
  items: CardItem[]
}

export interface TextBlockSection {
  type: 'text-block'
  title: string
  body: string | string[]
}

export interface TableSection {
  type: 'table'
  title?: string
  description?: string
  columns: string[]
  rows: string[][]
  footnote?: string
}

export interface BulletGroup {
  label?: string
  items: string[]
}

export interface BulletListSection {
  type: 'bullet-list'
  title?: string
  description?: string
  groups: BulletGroup[]
}

export interface ImageSection {
  type: 'image'
  src: string
  alt: string
}

export interface FooterSection {
  type: 'footer'
  brand: string
  logo?: IconName | ComponentType
  pageNumber?: number
  totalPages?: number
}

export type Section =
  | HeroSection
  | FeatureListSection
  | TwoColumnSection
  | DividerSection
  | CardsSection
  | TextBlockSection
  | TableSection
  | BulletListSection
  | ImageSection
  | FooterSection

// ── Accent bar ──
export interface AccentBar {
  gradient: string
  height?: number
}

// ── Page definition (for multi-page documents) ──
export interface PageDefinition {
  sections: Section[]
  accentBar?: AccentBar
}

// ── Document definition (root) ──
export interface DocumentDefinition {
  meta: {
    title: string
    exportFilename: string
  }
  accentBar?: AccentBar
  sections?: Section[]       // single-page (legacy)
  pages?: PageDefinition[]   // multi-page
}
