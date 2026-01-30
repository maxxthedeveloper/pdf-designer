import { createContext, useContext, useReducer, useEffect, type ReactNode, type Dispatch } from 'react'
import type { DocumentDefinition } from '../content/types'
import { getDocumentById, getStoredDocumentId, setStoredDocumentId, DEFAULT_DOCUMENT_ID } from '../content/registry'
import { getSavedDocuments, type SavedDocument } from '../lib/document-storage'

type Theme = 'light' | 'dark'

interface AppState {
  theme: Theme
  activeDocumentId: string
  savedDocuments: Record<string, SavedDocument>
}

type AppAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_DOCUMENT'; payload: string }
  | { type: 'LOAD_SAVED_DOCUMENTS'; payload: Record<string, SavedDocument> }
  | { type: 'UPSERT_SAVED_DOCUMENT'; payload: SavedDocument }
  | { type: 'DELETE_SAVED_DOCUMENT'; payload: string }

function loadInitialSavedDocuments(): Record<string, SavedDocument> {
  const docs: Record<string, SavedDocument> = {}
  for (const d of getSavedDocuments()) {
    docs[d.id] = d
  }
  return docs
}

const initialState: AppState = {
  theme: 'light',
  activeDocumentId: getStoredDocumentId(),
  savedDocuments: loadInitialSavedDocuments(),
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_DOCUMENT':
      return { ...state, activeDocumentId: action.payload }
    case 'LOAD_SAVED_DOCUMENTS':
      return { ...state, savedDocuments: action.payload }
    case 'UPSERT_SAVED_DOCUMENT': {
      const doc = action.payload
      return { ...state, savedDocuments: { ...state.savedDocuments, [doc.id]: doc } }
    }
    case 'DELETE_SAVED_DOCUMENT': {
      const { [action.payload]: _, ...rest } = state.savedDocuments
      return { ...state, savedDocuments: rest }
    }
    default:
      return state
  }
}

const AppContext = createContext<AppState>(initialState)
const AppDispatchContext = createContext<Dispatch<AppAction>>(() => {})

function DocumentSync({ activeDocumentId }: { activeDocumentId: string }) {
  useEffect(() => {
    setStoredDocumentId(activeDocumentId)
  }, [activeDocumentId])
  return null
}

function SavedDocumentsSync({ savedDocuments }: { savedDocuments: Record<string, SavedDocument> }) {
  useEffect(() => {
    const docs = Object.values(savedDocuments)
    localStorage.setItem('pdf-designer:documents', JSON.stringify(docs))
  }, [savedDocuments])
  return null
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <DocumentSync activeDocumentId={state.activeDocumentId} />
        <SavedDocumentsSync savedDocuments={state.savedDocuments} />
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  )
}

export function useAppState() {
  return useContext(AppContext)
}

export function useAppDispatch() {
  return useContext(AppDispatchContext)
}

export function useActiveDocument(): DocumentDefinition {
  const { activeDocumentId, savedDocuments } = useAppState()
  // Check static registry first, then saved documents
  const fromRegistry = getDocumentById(activeDocumentId)
  if (fromRegistry) return fromRegistry
  const fromSaved = savedDocuments[activeDocumentId]
  if (fromSaved) return fromSaved.definition
  return getDocumentById(DEFAULT_DOCUMENT_ID)!
}
