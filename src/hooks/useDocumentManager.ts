import { useCallback } from 'react'
import { useAppState, useAppDispatch } from '../context/AppContext'
import { documentRegistry, BUILTIN_DOCUMENT_IDS, DEFAULT_DOCUMENT_ID } from '../content/registry'
import { generateDocumentId } from '../lib/document-storage'
import { exportDocumentAsJson, importDocumentFromFile } from '../lib/document-json'
import type { DocumentDefinition } from '../content/types'

export interface DocumentListEntry {
  id: string
  label: string
  source: 'builtin' | 'saved'
}

export function useDocumentManager() {
  const { activeDocumentId, savedDocuments } = useAppState()
  const dispatch = useAppDispatch()

  const documents: DocumentListEntry[] = [
    ...documentRegistry.map((e) => ({
      id: e.id,
      label: e.label,
      source: 'builtin' as const,
    })),
    ...Object.values(savedDocuments).map((d) => ({
      id: d.id,
      label: d.label,
      source: 'saved' as const,
    })),
  ]

  const saveDocument = useCallback(
    (label: string, definition: DocumentDefinition) => {
      const id = generateDocumentId()
      dispatch({
        type: 'UPSERT_SAVED_DOCUMENT',
        payload: { id, label, definition, savedAt: Date.now() },
      })
      dispatch({ type: 'SET_DOCUMENT', payload: id })
    },
    [dispatch],
  )

  const deleteDocument = useCallback(
    (id: string) => {
      if (BUILTIN_DOCUMENT_IDS.has(id)) return
      dispatch({ type: 'DELETE_SAVED_DOCUMENT', payload: id })
      if (activeDocumentId === id) {
        dispatch({ type: 'SET_DOCUMENT', payload: DEFAULT_DOCUMENT_ID })
      }
    },
    [dispatch, activeDocumentId],
  )

  const handleImport = useCallback(async () => {
    try {
      const definition = await importDocumentFromFile()
      const label = definition.meta.title || 'Imported Document'
      saveDocument(label, definition)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Import failed'
      if (msg !== 'Import cancelled') {
        alert(`Import failed: ${msg}`)
      }
    }
  }, [saveDocument])

  const handleExport = useCallback(
    (definition: DocumentDefinition) => {
      exportDocumentAsJson(definition)
    },
    [],
  )

  return {
    documents,
    activeDocumentId,
    saveDocument,
    deleteDocument,
    importDocument: handleImport,
    exportDocument: handleExport,
    setActiveDocument: (id: string) => dispatch({ type: 'SET_DOCUMENT', payload: id }),
  }
}
