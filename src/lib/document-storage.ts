import type { DocumentDefinition } from '../content/types'

export interface SavedDocument {
  id: string
  label: string
  definition: DocumentDefinition
  savedAt: number
}

const STORAGE_KEY = 'pdf-designer:documents'

export function getSavedDocuments(): SavedDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as SavedDocument[]
  } catch {
    return []
  }
}

export function getSavedDocumentById(id: string): SavedDocument | undefined {
  return getSavedDocuments().find((d) => d.id === id)
}

export function saveDocument(doc: SavedDocument): void {
  const docs = getSavedDocuments()
  const idx = docs.findIndex((d) => d.id === doc.id)
  if (idx >= 0) {
    docs[idx] = doc
  } else {
    docs.push(doc)
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs))
  } catch (e) {
    console.error('Failed to save document (storage quota exceeded?):', e)
    throw e
  }
}

export function deleteSavedDocument(id: string): void {
  const docs = getSavedDocuments().filter((d) => d.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs))
}

export function generateDocumentId(): string {
  return 'doc-' + crypto.randomUUID()
}
