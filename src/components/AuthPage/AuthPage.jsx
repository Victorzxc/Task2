import { useState } from "react"
import styles from './styles.module.css'
import AuthForm from "../AuthForm/AuthForm"
import RegForm from "../RegForm/RegForm"

export default function AuthPage() {

    const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.AuthPage}>
        <button style={{ position: 'relative', zIndex: 10 }} onClick={() => setIsOpen(!isOpen)}>Сменить окно</button>
        { isOpen ? <AuthForm/> : <RegForm/> }
    </div>
  )
}
