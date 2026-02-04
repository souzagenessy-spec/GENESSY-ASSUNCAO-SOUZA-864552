import { NavLink } from "react-router-dom"
import { 
  Home, 
  PawPrint, 
  Users, 
  Calendar,
  Settings,
  FileText
} from "lucide-react"

export default function Sidebar() {
  const menuItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/pets", icon: PawPrint, label: "Pets" },
    { path: "/tutors", icon: Users, label: "Tutores" },
    { path: "/reports", icon: FileText, label: "Relatórios" },
    { path: "/schedule", icon: Calendar, label: "Agenda" },
    { path: "/settings", icon: Settings, label: "Configurações" },
  ]

  return (
    <aside className="w-64 bg-white border-r min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-8 pt-6 border-t">
          <div className="px-4">
            <p className="text-xs text-gray-500 mb-2">Processo Seletivo</p>
            <p className="text-sm font-medium">SEPLAG/MT 2026</p>
            <p className="text-xs text-gray-600 mt-1">Analista de TI - Frontend</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
