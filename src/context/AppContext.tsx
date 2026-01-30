import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react'

type Theme = 'light' | 'dark'

interface AppState {
  theme: Theme
}

type AppAction = { type: 'SET_THEME'; payload: Theme }

const initialState: AppState = { theme: 'light' }

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    default:
      return state
  }
}

const AppContext = createContext<AppState>(initialState)
const AppDispatchContext = createContext<Dispatch<AppAction>>(() => {})

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
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
