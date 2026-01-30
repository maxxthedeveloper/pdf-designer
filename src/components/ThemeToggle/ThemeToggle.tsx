import { useAppState, useAppDispatch } from '../../context/AppContext'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const { theme } = useAppState()
  const dispatch = useAppDispatch()

  return (
    <div className={styles.toggle}>
      <button
        className={`${styles.btn} ${theme === 'light' ? styles.active : ''}`}
        onClick={() => dispatch({ type: 'SET_THEME', payload: 'light' })}
      >
        Light
      </button>
      <button
        className={`${styles.btn} ${theme === 'dark' ? styles.active : ''}`}
        onClick={() => dispatch({ type: 'SET_THEME', payload: 'dark' })}
      >
        Dark
      </button>
    </div>
  )
}
