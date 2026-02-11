import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../stores/authStore'
import { Mail, Lock, User, Phone, Briefcase, MessageSquare } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const { register: registerUser, user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const password = watch('password')

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await registerUser(data)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-dark-950">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Criar sua conta</h1>
          <p className="text-gray-400">Comece seu teste grátis de 7 dias agora</p>
        </div>

        {/* Form */}
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    {...register('name', { required: 'Nome é obrigatório' })}
                    className="input pl-11"
                    placeholder="Seu nome"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    {...register('phone')}
                    className="input pl-11"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
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

            <div className="grid md:grid-cols-2 gap-5">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome do negócio
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    {...register('businessName')}
                    className="input pl-11"
                    placeholder="Minha Barbearia"
                  />
                </div>
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de negócio
                </label>
                <select {...register('businessType')} className="input">
                  <option value="other">Selecionar...</option>
                  <option value="barbershop">Barbearia</option>
                  <option value="nails">Manicure/Pedicure</option>
                  <option value="beauty">Salão de Beleza</option>
                  <option value="other">Outro</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Senha *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    {...register('password', { 
                      required: 'Senha é obrigatória',
                      minLength: {
                        value: 6,
                        message: 'Senha deve ter no mínimo 6 caracteres'
                      }
                    })}
                    className="input pl-11"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar senha *
                </label>
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
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full py-3 text-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Criando conta...' : 'Criar conta grátis'}
            </button>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Ao criar uma conta, você concorda com nossos{' '}
              <a href="#" className="text-primary-500 hover:underline">Termos de Serviço</a> e{' '}
              <a href="#" className="text-primary-500 hover:underline">Política de Privacidade</a>
            </p>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-400 border-t border-dark-800 pt-6">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-400 font-medium">
              Fazer login
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '✓', text: '7 dias grátis' },
            { icon: '✓', text: 'Sem cartão' },
            { icon: '✓', text: 'Cancele quando quiser' }
          ].map((item, i) => (
            <div key={i} className="text-gray-400 text-sm">
              <span className="text-primary-500 font-bold mr-1">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
