import { Outlet, NavLink } from 'react-router-dom'
import styles from './LibraryLayout.module.css'

export default function LibraryLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.tabActive : styles.tab

  return (
    <div className={styles.layout}>
      <nav className={styles.subnav} data-print-hide>
        <NavLink to="/library/tokens" className={linkClass}>
          Tokens
        </NavLink>
        <NavLink to="/library/blocks" className={linkClass}>
          Blocks
        </NavLink>
        <NavLink to="/library/templates" className={linkClass}>
          Page Templates
        </NavLink>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
