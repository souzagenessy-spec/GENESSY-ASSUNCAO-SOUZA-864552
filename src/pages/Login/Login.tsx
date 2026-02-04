import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { LogIn, Lock, Mail, Shield } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await login(email, password)
      navigate("/dashboard")
    } catch (err) {
      setError("Erro no login. Tente novamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickLogin = () => {
    setEmail("admin@petsmt.com")
    setPassword("123456")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Pets MT</h1>
          <p className="text-gray-600 mt-2 text-lg">Processo Seletivo SEPLAG</p>
          <p className="text-sm text-gray-500 mt-1">Analista de TI - Frontend</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-800 text-center">
            <strong>Para teste:</strong> Use admin@petsmt.com / 123456 ou deixe em branco
          </p>
          <button
            onClick={handleQuickLogin}
            className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            ↳ Clique aqui para preencher automaticamente
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                E-mail
              </div>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Senha
              </div>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Autenticando...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <LogIn className="w-5 h-5 mr-3" />
                Entrar no Sistema
              </span>
            )}
          </button>

          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Este é um sistema de demonstração para o processo seletivo.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Credenciais são simuladas para avaliação técnica.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
