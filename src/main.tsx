import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/tokens.css'
import './styles/tokens-dark.css'
import './styles/global.css'
import './styles/pdf-document.css'
import App from './App'
import InstructionsPage from './pages/InstructionsPage'
import EditorPage from './pages/EditorPage'
import DesignSystemPage from './components/DesignSystemPage/DesignSystemPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <InstructionsPage /> },
      { path: 'editor', element: <EditorPage /> },
      { path: 'tokens', element: <DesignSystemPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
