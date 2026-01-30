import { useRef } from 'react'
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
    </AppProvider>
  )
}
