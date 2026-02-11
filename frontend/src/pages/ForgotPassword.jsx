import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../stores/authStore'
import { Mail, ArrowLeft, MessageSquare } from 'lucide-react'

export default function ForgotPassword() {
  const { forgotPassword } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await forgotPassword(data.email)
      setEmailSent(true)
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
          <h1 className="text-3xl font-bold text-white mb-2">Esqueceu a senha?</h1>
          <p className="text-gray-400">Sem problemas, vamos te ajudar a recuperar</p>
        </div>

        <div className="card">
          {!emailSent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    {...register('email', { required: 'Email é obrigatório' })}
                    className="input pl-11"
                    placeholder="seu@email.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <button type="submit" disabled={isLoading} className="btn btn-primary w-full py-3">
                {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email enviado!</h3>
              <p className="text-gray-400 mb-6">Verifique sua caixa de entrada para redefinir sua senha.</p>
            </div>
          )}

          <Link to="/login" className="flex items-center justify-center gap-2 text-gray-400 hover:text-white mt-6">
            <ArrowLeft className="w-4 h-4" />
            Voltar para login
          </Link>
        </div>
      </div>
    </div>
  )
}
