const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Planos de preços
const PLANS = {
  base: {
    name: 'Base',
    price: 2490, // R$ 24,90 em centavos
    currency: 'brl',
    interval: 'month',
    features: {
      maxContacts: 500,
      maxFlows: 10,
      maxMessages: 2000,
      hasAI: false,
      hasAnalytics: true,
      hasPrioritySupport: false
    }
  },
  professional: {
    name: 'Profissional',
    price: 3790, // R$ 37,90
    currency: 'brl',
    interval: 'month',
    features: {
      maxContacts: 2000,
      maxFlows: 30,
      maxMessages: 10000,
      hasAI: true,
      hasAnalytics: true,
      hasPrioritySupport: false
    }
  },
  premium: {
    name: 'Premium',
    price: 9700, // R$ 97,00
    currency: 'brl',
    interval: 'month',
    features: {
      maxContacts: -1,
      maxFlows: -1,
      maxMessages: -1,
      hasAI: true,
      hasAnalytics: true,
      hasPrioritySupport: true
    }
  }
};

// @route   GET /api/subscriptions/plans
// @desc    Get available plans
// @access  Public
router.get('/plans', (req, res) => {
  res.json({
    success: true,
    data: PLANS
  });
});

// @route   POST /api/subscriptions/create-checkout-session
// @desc    Create Stripe checkout session
// @access  Private
router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    const { plan } = req.body;

    if (!PLANS[plan]) {
      return res.status(400).json({
        success: false,
        message: 'Plano inválido'
      });
    }

    let customerId = req.user.subscription.stripeCustomerId;

    // Create customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: req.user.name,
        metadata: {
          userId: req.user.id.toString()
        }
      });

      customerId = customer.id;
      req.user.subscription.stripeCustomerId = customerId;
      await req.user.save();
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: PLANS[plan].currency,
            product_data: {
              name: `Plano ${PLANS[plan].name}`,
              description: `Assinatura mensal - Plano ${PLANS[plan].name}`
            },
            unit_amount: PLANS[plan].price,
            recurring: {
              interval: PLANS[plan].interval
            }
          },
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      metadata: {
        userId: req.user.id.toString(),
        plan: plan
      }
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar sessão de checkout',
      error: error.message
    });
  }
});

// @route   POST /api/subscriptions/portal
// @desc    Create customer portal session
// @access  Private
router.post('/portal', protect, async (req, res) => {
  try {
    if (!req.user.subscription.stripeCustomerId) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma assinatura encontrada'
      });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: req.user.subscription.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/dashboard`
    });

    res.json({
      success: true,
      url: session.url
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar portal do cliente',
      error: error.message
    });
  }
});

// @route   GET /api/subscriptions/status
// @desc    Get current subscription status
// @access  Private
router.get('/status', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: {
        subscription: user.subscription,
        limits: user.limits,
        usage: user.usage
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar status da assinatura',
      error: error.message
    });
  }
});

// @route   POST /api/subscriptions/cancel
// @desc    Cancel subscription at period end
// @access  Private
router.post('/cancel', protect, async (req, res) => {
  try {
    if (!req.user.subscription.stripeSubscriptionId) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma assinatura ativa encontrada'
      });
    }

    const subscription = await stripe.subscriptions.update(
      req.user.subscription.stripeSubscriptionId,
      {
        cancel_at_period_end: true
      }
    );

    req.user.subscription.cancelAtPeriodEnd = true;
    await req.user.save();

    res.json({
      success: true,
      message: 'Assinatura será cancelada no fim do período',
      data: subscription
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao cancelar assinatura',
      error: error.message
    });
  }
});

// @route   POST /api/subscriptions/reactivate
// @desc    Reactivate canceled subscription
// @access  Private
router.post('/reactivate', protect, async (req, res) => {
  try {
    if (!req.user.subscription.stripeSubscriptionId) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma assinatura encontrada'
      });
    }

    const subscription = await stripe.subscriptions.update(
      req.user.subscription.stripeSubscriptionId,
      {
        cancel_at_period_end: false
      }
    );

    req.user.subscription.cancelAtPeriodEnd = false;
    await req.user.save();

    res.json({
      success: true,
      message: 'Assinatura reativada com sucesso',
      data: subscription
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao reativar assinatura',
      error: error.message
    });
  }
});

module.exports = router;
