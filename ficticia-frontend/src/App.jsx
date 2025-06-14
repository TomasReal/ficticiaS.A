import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import GestorPersonas from './components/GestorPersonas'
import { AuthProvider } from './AuthContext'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/personas"
          element={
            <PrivateRoute>
              <GestorPersonas />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
