import type { BlockMeta, BlockCategory, AnyBlock } from './types'

import { heroSplit } from './blocks/heroes'
import { featureGrid, twoColWithDivider } from './blocks/features'
import { textSection, comparisonTable, bulletGroups } from './blocks/content'
import { ctaCards } from './blocks/cta'
import { solanaFooter, divider } from './blocks/navigation'
import { solanaAccentBar } from './blocks/navigation/solana-accent-bar'

// ── Internal storage ──

const blocks = new Map<string, AnyBlock>()
const blocksByCategory = new Map<BlockCategory, AnyBlock[]>()

function register(block: AnyBlock) {
  blocks.set(block.meta.id, block)
  const cat = block.meta.category
  const list = blocksByCategory.get(cat) ?? []
  list.push(block)
  blocksByCategory.set(cat, list)
}

// ── Register all blocks ──

register(heroSplit)
register(featureGrid)
register(twoColWithDivider)
register(textSection)
register(comparisonTable)
register(bulletGroups)
register(ctaCards)
register(solanaFooter)
register(solanaAccentBar as AnyBlock)
register(divider)

// ── Query API ──

export function getBlock(id: string): AnyBlock | undefined {
  return blocks.get(id)
}

export function getBlocksByCategory(category: BlockCategory): AnyBlock[] {
  return blocksByCategory.get(category) ?? []
}

export function getAllCategories(): BlockCategory[] {
  return Array.from(blocksByCategory.keys())
}

export function listBlocks(): BlockMeta[] {
  return Array.from(blocks.values()).map((b) => b.meta)
}

export function searchBlocks(query: string): AnyBlock[] {
  const q = query.toLowerCase()
  return Array.from(blocks.values()).filter(
    (b) =>
      b.meta.name.toLowerCase().includes(q) ||
      b.meta.description.toLowerCase().includes(q) ||
      b.meta.tags.some((t) => t.includes(q)),
  )
}

export function getAllBlocks(): AnyBlock[] {
  return Array.from(blocks.values())
}
