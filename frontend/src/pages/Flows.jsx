import { Link } from 'react-router-dom'
import { Plus, Play, Pause, Trash2, Edit } from 'lucide-react'

export default function Flows() {
  const flows = [
    { id: 1, name: 'Boas-vindas', status: 'active', executions: 145 },
    { id: 2, name: 'Confirmação', status: 'paused', executions: 89 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Fluxos</h1>
          <p className="text-gray-400">Gerencie suas automações</p>
        </div>
        <Link to="/flows/new" className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Novo Fluxo
        </Link>
      </div>

      <div className="grid gap-4">
        {flows.map(flow => (
          <div key={flow.id} className="card flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">{flow.name}</h3>
              <p className="text-sm text-gray-400">{flow.executions} execuções</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-secondary p-2"><Edit className="w-4 h-4" /></button>
              <button className="btn btn-secondary p-2"><Play className="w-4 h-4" /></button>
              <button className="btn btn-danger p-2"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
