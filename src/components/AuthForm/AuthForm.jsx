import React, { useState } from 'react'
import styles from './styles.module.css'
import { auth } from './Authorization'

export default function AuthForm() {

  const [authData, setAuthData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  async function Auth() {
    try {
      await auth(authData)
      setError("")
      location.reload()
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1>Авторизация</h1>
        <input value={authData.email} onChange={(event) => setAuthData({ ...authData, email: event.target.value })} placeholder='Почта' type="text" />
        <input value={authData.password} onChange={(event) => setAuthData({ ...authData, password: event.target.value })} placeholder='Пароль' type="password" />
        {error && <p style={{ color: 'red' }} >{error}</p>}
        <button onClick={Auth}>Войти</button>
      </div>
    </div>
  )
}
