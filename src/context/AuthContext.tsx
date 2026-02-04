import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"))

  useEffect(() => {
    // Verificar token no localStorage ao carregar
    const savedToken = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - em produção, faria request para API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: "1",
          name: "Administrador",
          email: email || "admin@petsmt.com"
        }
        const mockToken = "mock-jwt-token-" + Date.now()
        
        localStorage.setItem("token", mockToken)
        localStorage.setItem("user", JSON.stringify(mockUser))
        
        setUser(mockUser)
        setToken(mockToken)
        setIsAuthenticated(true)
        resolve()
      }, 500)
    })
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    window.location.href = "/login"
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
