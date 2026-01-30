import { createContext, useContext, useReducer, useEffect, type ReactNode, type Dispatch } from 'react'
import type { DocumentDefinition } from '../content/types'
import { getDocumentById, getStoredDocumentId, setStoredDocumentId, DEFAULT_DOCUMENT_ID } from '../content/registry'

type Theme = 'light' | 'dark'

interface AppState {
  theme: Theme
  activeDocumentId: string
}

type AppAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_DOCUMENT'; payload: string }

const initialState: AppState = {
  theme: 'light',
  activeDocumentId: getStoredDocumentId(),
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_DOCUMENT':
      return { ...state, activeDocumentId: action.payload }
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

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <DocumentSync activeDocumentId={state.activeDocumentId} />
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
  const { activeDocumentId } = useAppState()
  return getDocumentById(activeDocumentId) ?? getDocumentById(DEFAULT_DOCUMENT_ID)!
}
