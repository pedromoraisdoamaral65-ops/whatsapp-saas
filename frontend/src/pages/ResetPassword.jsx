import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../stores/authStore'
import { Lock, MessageSquare } from 'lucide-react'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { resetPassword } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await resetPassword(token, data.password)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-dark-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Nova senha</h1>
          <p className="text-gray-400">Digite sua nova senha</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nova senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  {...register('password', {
                    required: 'Senha é obrigatória',
                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                  })}
                  className="input pl-11"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirmar senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Confirme sua senha',
                    validate: value => value === password || 'As senhas não coincidem'
                  })}
                  className="input pl-11"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary w-full py-3">
              {isLoading ? 'Redefinindo...' : 'Redefinir senha'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
