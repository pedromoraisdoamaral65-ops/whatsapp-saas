import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import {
  LayoutDashboard,
  Workflow,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Crown
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Fluxos', href: '/flows', icon: Workflow },
  { name: 'Contatos', href: '/contacts', icon: Users },
  { name: 'Mensagens', href: '/messages', icon: MessageSquare },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Configurações', href: '/settings', icon: Settings },
]

export default function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-dark-900 border-r border-dark-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-dark-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white">WA SaaS</h1>
                <p className="text-xs text-gray-400">{user?.name}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Plan Badge */}
          <div className="px-4 py-3">
            <div className="bg-gradient-to-r from-primary-600/20 to-primary-800/20 border border-primary-600/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary-400 flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  Plano {user?.subscription?.plan || 'Trial'}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Status: <span className={user?.subscription?.status === 'active' ? 'text-green-400' : 'text-yellow-400'}>
                  {user?.subscription?.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              {user?.subscription?.plan === 'trial' && (
                <Link to="/pricing" className="text-xs text-primary-500 hover:text-primary-400 mt-2 block">
                  Fazer upgrade →
                </Link>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-dark-800">
            <button
              onClick={handleLogout}
              className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 lg:flex-none"></div>

            <div className="flex items-center gap-4">
              {/* Usage stats */}
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="text-gray-400">
                  <span className="text-white font-medium">{user?.usage?.messagesUsed || 0}</span>
                  {' / '}
                  {user?.limits?.maxMessages === -1 ? '∞' : user?.limits?.maxMessages} mensagens
                </div>
                <div className="text-gray-400">
                  <span className="text-white font-medium">{user?.usage?.contactsUsed || 0}</span>
                  {' / '}
                  {user?.limits?.maxContacts === -1 ? '∞' : user?.limits?.maxContacts} contatos
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
