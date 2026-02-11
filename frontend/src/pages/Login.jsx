import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../stores/authStore'
import { Mail, Lock, MessageSquare } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { login, user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await login(data)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-dark-950">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">WhatsApp SaaS</h1>
            <p className="text-gray-400">Automação profissional para seu negócio</p>
          </div>

          {/* Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">Entrar na sua conta</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    className="input pl-11"
                    placeholder="seu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    {...register('password', { required: 'Senha é obrigatória' })}
                    className="input pl-11"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary-500 hover:text-primary-400"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            {/* Register Link */}
            <p className="mt-6 text-center text-gray-400">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-primary-500 hover:text-primary-400 font-medium">
                Criar conta grátis
              </Link>
            </p>
          </div>

          {/* Trial Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              🎉 7 dias de teste grátis • Sem cartão de crédito
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 items-center justify-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg text-white">
          <h2 className="text-4xl font-bold mb-6">
            Automatize seu atendimento no WhatsApp
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Ideal para barbeiros, manicures e profissionais autônomos. Agende clientes, envie lembretes e muito mais!
          </p>
          
          <div className="space-y-4">
            {[
              'Fluxos de conversa automatizados',
              'Agendamento inteligente',
              'Lembretes automáticos',
              'Gestão de contatos',
              'Analytics avançado'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
