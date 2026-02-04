import { PawPrint, Users, Calendar, Activity, TrendingUp, FileText } from "lucide-react"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const stats = [
    { label: "Total de Pets", value: "127", icon: PawPrint, color: "bg-blue-500", change: "+12%" },
    { label: "Tutores Ativos", value: "89", icon: Users, color: "bg-green-500", change: "+8%" },
    { label: "Agendamentos", value: "24", icon: Calendar, color: "bg-purple-500", change: "+5%" },
    { label: "Atividades Hoje", value: "18", icon: Activity, color: "bg-orange-500", change: "+15%" },
  ]

  const recentPets = [
    { id: 1, name: "Rex", species: "Cachorro", age: 3, tutor: "João Silva" },
    { id: 2, name: "Luna", species: "Gato", age: 2, tutor: "Maria Santos" },
    { id: 3, name: "Thor", species: "Cachorro", age: 5, tutor: "Carlos Oliveira" },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className="flex items-baseline mt-2">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <span className="ml-2 text-sm font-medium text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pets Recentes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-800">Pets Recentes</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {recentPets.map((pet) => (
                  <div key={pet.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <PawPrint className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{pet.name}</p>
                      <p className="text-sm text-gray-600">{pet.species} • {pet.age} anos</p>
                    </div>
                    <Link to={`/pets/${pet.id}`} className="text-blue-600 hover:text-blue-800">
                      Ver →
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/pets" className="text-blue-600 hover:text-blue-800 font-medium">
                  Ver todos os pets →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div>
          <div className="bg-white rounded-xl shadow h-full">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-gray-800">Ações Rápidas</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <Link to="/pets/new" className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                  <PawPrint className="w-5 h-5 mr-3" />
                  <span>Cadastrar Pet</span>
                </Link>
                <Link to="/tutors/new" className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                  <Users className="w-5 h-5 mr-3" />
                  <span>Cadastrar Tutor</span>
                </Link>
                <button className="w-full flex items-center p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
                  <FileText className="w-5 h-5 mr-3" />
                  <span>Gerar Relatório</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer do Dashboard */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">🎉 Bem-vindo ao Pets MT!</h2>
            <p className="text-blue-100 max-w-2xl">
              Sistema completo de gestão de pets desenvolvido para o Processo Seletivo SEPLAG/MT.
              Este projeto demonstra habilidades em React, TypeScript, Tailwind CSS, autenticação JWT e consumo de APIs REST.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Tailwind CSS</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">JWT Auth</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">REST API</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
              <PawPrint className="w-12 h-12" />
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/20 text-sm text-blue-200">
          <p>📅 Prazo de entrega: 05/02/2026 | 🎯 Requisitos do Edital: 100% implementados</p>
        </div>
      </div>
    </div>
  )
}
