import { useState } from 'react'
import styles from './styles.module.css'
import { auth } from './Authorization'
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {

  const [authData, setAuthData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setAuthData({ ...authData, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setAuthData({ ...authData, password: event.target.value });
  };
  async function Auth() {
    try {
      await auth(authData)
      setError("")
      navigate('/board');
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1>Авторизация</h1>
        <input
            value={authData.email}
            onChange={handleEmailChange}
            placeholder='Почта'
            type="text"
        />
        <input
            value={authData.password}
            onChange={handlePasswordChange}
            placeholder='Пароль'
            type="password"
        />
        {error && <p style={{ color: 'red' }} >{error}</p>}
        <button onClick={Auth}>Войти</button>
      </div>
    </div>
  )
}
