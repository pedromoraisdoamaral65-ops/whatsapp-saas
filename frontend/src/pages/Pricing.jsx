import { useState } from 'react'
import { Check, Crown, Zap } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    id: 'base',
    name: 'Base',
    price: 24.90,
    description: 'Ideal para começar',
    icon: Zap,
    features: [
      '500 contatos',
      '10 fluxos',
      '2.000 mensagens/mês',
      'Analytics básico',
      'Suporte por email',
      'Integrações básicas'
    ],
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'professional',
    name: 'Profissional',
    price: 37.90,
    description: 'Para crescer',
    icon: Crown,
    popular: true,
    features: [
      '2.000 contatos',
      '30 fluxos',
      '10.000 mensagens/mês',
      'IA integrada',
      'Analytics avançado',
      'Suporte prioritário',
      'Webhooks ilimitados',
      'API completa'
    ],
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 97.00,
    description: 'Poder total',
    icon: Crown,
    features: [
      'Contatos ilimitados',
      'Fluxos ilimitados',
      'Mensagens ilimitadas',
      'IA avançada',
      'Analytics completo',
      'Suporte 24/7',
      'White label',
      'Múltiplos números',
      'Gerente de conta dedicado'
    ],
    color: 'from-orange-600 to-orange-800'
  }
]

export default function Pricing() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(null)

  const handleSubscribe = async (planId) => {
    setLoading(planId)
    try {
      const { data } = await axios.post('/api/subscriptions/create-checkout-session', {
        plan: planId
      })
      
      // Redirect to Stripe checkout
      window.location.href = data.url
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao processar assinatura')
      console.error(error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Escolha seu plano
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Comece grátis com 7 dias de teste
          </p>
          <p className="text-gray-500">
            Sem cartão de crédito • Cancele quando quiser
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card relative ${
                plan.popular ? 'ring-2 ring-primary-600 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Mais Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mb-6`}>
                <plan.icon className="w-7 h-7 text-white" />
              </div>

              {/* Plan Info */}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-bold text-white">
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-gray-400">/mês</span>
                </div>
                <p className="text-sm text-gray-500">Cobrado mensalmente</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-dark-800 hover:bg-dark-700 text-white border border-dark-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.id ? 'Processando...' : 'Começar agora'}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Posso cancelar a qualquer momento?',
                a: 'Sim! Você pode cancelar sua assinatura a qualquer momento sem multas ou taxas.'
              },
              {
                q: 'O que acontece após o trial?',
                a: 'Após os 7 dias gratuitos, você será cobrado automaticamente pelo plano escolhido.'
              },
              {
                q: 'Posso mudar de plano depois?',
                a: 'Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.'
              },
              {
                q: 'Vocês aceitam quais formas de pagamento?',
                a: 'Aceitamos todos os principais cartões de crédito via Stripe.'
              }
            ].map((faq, i) => (
              <div key={i} className="card">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate('/register')}
            className="btn btn-secondary px-8 py-3"
          >
            Começar teste grátis
          </button>
        </div>
      </div>
    </div>
  )
}
