import React, { createContext, useState, useContext, useEffect } from "react"

interface User {
  id: number
  name: string
  email: string
  role: "admin" | "veterinario" | "atendente"
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  role: "admin" | "veterinario" | "atendente"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulação de API - Substituir por chamada real
    const mockResponse = {
      token: "mock-jwt-token-12345",
      user: {
        id: 1,
        name: "Administrador",
        email: email,
        role: "admin" as const
      }
    }
    
    localStorage.setItem("token", mockResponse.token)
    localStorage.setItem("user", JSON.stringify(mockResponse.user))
    setToken(mockResponse.token)
    setUser(mockResponse.user)
  }

  const register = async (userData: RegisterData) => {
    // Simulação de registro
    const mockResponse = {
      token: "mock-jwt-token-12345",
      user: userData
    }
    
    localStorage.setItem("token", mockResponse.token)
    localStorage.setItem("user", JSON.stringify(mockResponse.user))
    setToken(mockResponse.token)
    setUser(mockResponse.user)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  const isAuthenticated = !!token

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
