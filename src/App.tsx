import { useRef } from 'react'
import { Agentation } from 'agentation'
import { AppProvider } from './context/AppContext'
import PdfCanvas from './components/PdfCanvas/PdfCanvas'
import Sidebar from './components/Sidebar/Sidebar'
import styles from './App.module.css'

export default function App() {
  const pdfRef = useRef<HTMLDivElement>(null)

  return (
    <AppProvider>
      <div className={styles.app}>
        <PdfCanvas pdfRef={pdfRef} />
        <Sidebar pdfRef={pdfRef} />
      </div>
      {import.meta.env.DEV && <Agentation />}
    </AppProvider>
  )
}
