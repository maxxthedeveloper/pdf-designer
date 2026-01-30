import type { TemplateMeta, AnyTemplate } from './template-types'
import { coverPage } from './templates/cover-page'
import { dataPage } from './templates/data-page'
import { titleDataPage } from './templates/title-data-page'
import { featurePage } from './templates/feature-page'

// ── Internal storage ──

const templates = new Map<string, AnyTemplate>()
const templatesByCategory = new Map<string, AnyTemplate[]>()

function registerTemplate(template: AnyTemplate) {
  templates.set(template.meta.id, template)
  const cat = template.meta.category
  const list = templatesByCategory.get(cat) ?? []
  list.push(template)
  templatesByCategory.set(cat, list)
}

// ── Register all templates ──

registerTemplate(coverPage)
registerTemplate(dataPage)
registerTemplate(titleDataPage)
registerTemplate(featurePage)

// ── Query API ──

export function getTemplate(id: string): AnyTemplate | undefined {
  return templates.get(id)
}

export function getTemplatesByCategory(category: string): AnyTemplate[] {
  return templatesByCategory.get(category) ?? []
}

export function getAllTemplateCategories(): string[] {
  return Array.from(templatesByCategory.keys())
}

export function listTemplates(): TemplateMeta[] {
  return Array.from(templates.values()).map((t) => t.meta)
}

export function getAllTemplates(): AnyTemplate[] {
  return Array.from(templates.values())
}
