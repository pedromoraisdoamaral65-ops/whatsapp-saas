import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  Users,
  MessageSquare,
  Workflow,
  ArrowUpRight,
  Plus,
  Activity
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data - substituir por dados reais da API
const mockStats = {
  totalContacts: 247,
  totalMessages: 1834,
  activeFlows: 8,
  messagesSentToday: 142
}

const mockChartData = [
  { name: 'Seg', messages: 120 },
  { name: 'Ter', messages: 180 },
  { name: 'Qua', messages: 150 },
  { name: 'Qui', messages: 210 },
  { name: 'Sex', messages: 190 },
  { name: 'Sáb', messages: 85 },
  { name: 'Dom', messages: 60 },
]

const mockRecentFlows = [
  { id: 1, name: 'Boas-vindas', status: 'active', executions: 45 },
  { id: 2, name: 'Confirmação de Agendamento', status: 'active', executions: 32 },
  { id: 3, name: 'Lembrete 24h', status: 'active', executions: 28 },
]

export default function Dashboard() {
  const [stats, setStats] = useState(mockStats)
  const [chartData, setChartData] = useState(mockChartData)

  // TODO: Buscar dados reais da API
  useEffect(() => {
    // fetchDashboardData()
  }, [])

  const statCards = [
    {
      name: 'Total de Contatos',
      value: stats.totalContacts,
      icon: Users,
      change: '+12%',
      changeType: 'positive',
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Mensagens Enviadas',
      value: stats.totalMessages,
      icon: MessageSquare,
      change: '+23%',
      changeType: 'positive',
      color: 'from-green-600 to-green-800'
    },
    {
      name: 'Fluxos Ativos',
      value: stats.activeFlows,
      icon: Workflow,
      change: '+2',
      changeType: 'positive',
      color: 'from-purple-600 to-purple-800'
    },
    {
      name: 'Hoje',
      value: stats.messagesSentToday,
      icon: Activity,
      change: '+18%',
      changeType: 'positive',
      color: 'from-orange-600 to-orange-800'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Visão geral do seu negócio</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          to="/flows/new"
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Fluxo
        </Link>
        <Link
          to="/contacts"
          className="btn btn-secondary inline-flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          Ver Contatos
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card relative overflow-hidden group hover:border-primary-600/50 transition-all">
            {/* Gradient Background */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                } flex items-center gap-1`}>
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              
              <div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value.toLocaleString()}</p>
                <p className="text-sm text-gray-400">{stat.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Mensagens esta semana</h3>
            <Link to="/analytics" className="text-primary-500 hover:text-primary-400 text-sm flex items-center gap-1">
              Ver mais <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Flows Performance */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Fluxos mais ativos</h3>
            <Link to="/flows" className="text-primary-500 hover:text-primary-400 text-sm flex items-center gap-1">
              Ver todos <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {mockRecentFlows.map((flow) => (
              <div
                key={flow.id}
                className="flex items-center justify-between p-4 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
                    <Workflow className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{flow.name}</p>
                    <p className="text-sm text-gray-400">{flow.executions} execuções</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                  Ativo
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Atividade Recente</h3>
        <div className="space-y-3">
          {[
            { action: 'Novo contato adicionado', name: 'João Silva', time: '5 min atrás' },
            { action: 'Fluxo executado', name: 'Boas-vindas', time: '12 min atrás' },
            { action: 'Mensagem enviada', name: 'Maria Santos', time: '18 min atrás' },
            { action: 'Fluxo criado', name: 'Promoção Semanal', time: '1 hora atrás' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-white">
                  <span className="font-medium">{activity.action}:</span> {activity.name}
                </p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
