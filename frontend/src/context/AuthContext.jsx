import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const email = localStorage.getItem('admin_email')
    if (token && email) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setAdmin({ email, token })
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/admin/login', { email, password })
    localStorage.setItem('admin_token', data.token)
    localStorage.setItem('admin_email', data.email)
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    setAdmin({ email: data.email, token: data.token, role: data.role })
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_email')
    delete api.defaults.headers.common['Authorization']
    setAdmin(null)
  }, [])

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
