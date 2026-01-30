import { useEffect } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { AppProvider, useAppState } from './context/AppContext'
import styles from './App.module.css'

function ThemeSync() {
  const { theme } = useAppState()

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
  }, [theme])

  return null
}

function Layout() {
  return (
    <>
      <ThemeSync />
      <div className={styles.shell}>
        <nav className={styles.nav}>
          <span className={styles.brand}>PDF Designer</span>
          <div className={styles.links}>
            <NavLink to="/" end className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
              Guide
            </NavLink>
            <NavLink to="/editor" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
              Editor
            </NavLink>
            <NavLink to="/tokens" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
              Tokens
            </NavLink>
          </div>
        </nav>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  )
}
