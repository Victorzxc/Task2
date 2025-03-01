import React from 'react'
import styles from './RegForm.module.css'
import { useState } from 'react'
import { rgstr } from './Registration'
export default function RegForm() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  async function Reg() {
    try {
      await rgstr(email, password, name)
      setError("")
      location.reload()
    } catch (error) {
      setError(error)
    }
  }

  return (

    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.modal__title}>Регистрация</h1>
        <input value={email} onChange={ (event) => setEmail(event.target.value)} placeholder='Почта' type="text" />
        <input value={password} onChange={ (event) => setPassword(event.target.value)} placeholder='Пароль' type="password" />
        <input value={name} onChange={ (event) => setName(event.target.value)} placeholder='Имя' type="text" />
        {error && <p style={{color:'red'}} >{error}</p>}
        <button onClick={Reg} >Зарегестрироваться</button> 
      </div>
    </div>
  )


}
