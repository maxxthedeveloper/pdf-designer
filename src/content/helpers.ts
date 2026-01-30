import type { DocumentDefinition, PageDefinition } from './types'

export function resolvePages(doc: DocumentDefinition): PageDefinition[] {
  if (doc.pages && doc.pages.length > 0) {
    return doc.pages.map((page) => ({
      sections: page.sections,
      accentBar: page.accentBar ?? doc.accentBar,
    }))
  }
  return [
    {
      sections: doc.sections ?? [],
      accentBar: doc.accentBar,
    },
  ]
}
