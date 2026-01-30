import type { DocumentDefinition } from './types'
import { document as solanaSdp } from './documents/solana-sdp'

export interface DocumentEntry {
  id: string
  label: string
  definition: DocumentDefinition
}

export const documentRegistry: DocumentEntry[] = [
  { id: 'solana-sdp', label: 'Solana Development Platform', definition: solanaSdp },
]

export const DEFAULT_DOCUMENT_ID = 'solana-sdp'

const STORAGE_KEY = 'pdf-designer:active-document'

export function getStoredDocumentId(): string {
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_DOCUMENT_ID
}

export function setStoredDocumentId(id: string): void {
  localStorage.setItem(STORAGE_KEY, id)
}

export function getDocumentById(id: string): DocumentDefinition | undefined {
  return documentRegistry.find((e) => e.id === id)?.definition
}
