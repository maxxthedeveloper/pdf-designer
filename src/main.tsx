import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './styles/tokens.css'
import './styles/tokens-dark.css'
import './styles/global.css'
import './styles/pdf-document.css'
import App from './App'
import InstructionsPage from './pages/InstructionsPage'
import EditorPage from './pages/EditorPage'
import LibraryLayout from './pages/LibraryLayout'
import TokensPage from './pages/library/TokensPage'
import BlocksPage from './pages/library/BlocksPage'
import TemplatesPage from './pages/library/TemplatesPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <InstructionsPage /> },
      { path: 'editor', element: <EditorPage /> },
      {
        path: 'library',
        element: <LibraryLayout />,
        children: [
          { index: true, element: <Navigate to="tokens" replace /> },
          { path: 'tokens', element: <TokensPage /> },
          { path: 'blocks', element: <BlocksPage /> },
          { path: 'templates', element: <TemplatesPage /> },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
