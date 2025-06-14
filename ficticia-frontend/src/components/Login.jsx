import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })

            if (response.ok) {
                const data = await response.json()
                login(data.token)          // <- guardamos token en contexto y localStorage
                navigate('/personas')      // <- redirigir a personas
            } else {
                const errorData = await response.json()
                setError(errorData.message || 'Error de autenticación')
            }
        } catch (error) {
            setError('Error de conexión. Por favor, intenta de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
