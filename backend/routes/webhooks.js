const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

// @route   POST /api/webhooks/stripe
// @desc    Handle Stripe webhooks
// @access  Public (but verified by Stripe signature)
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

// Helper functions
async function handleCheckoutSessionCompleted(session) {
  const userId = session.metadata.userId;
  const plan = session.metadata.plan;

  const user = await User.findById(userId);
  if (!user) return;

  user.subscription.stripeCustomerId = session.customer;
  user.subscription.stripeSubscriptionId = session.subscription;
  user.subscription.plan = plan;
  user.subscription.status = 'active';

  // Update limits based on new plan
  user.updateLimitsByPlan();

  await user.save();
  console.log(`Subscription created for user ${userId}, plan: ${plan}`);
}

async function handleSubscriptionUpdate(subscription) {
  const user = await User.findOne({
    'subscription.stripeSubscriptionId': subscription.id
  });

  if (!user) return;

  user.subscription.status = subscription.status;
  user.subscription.currentPeriodStart = new Date(subscription.current_period_start * 1000);
  user.subscription.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
  user.subscription.cancelAtPeriodEnd = subscription.cancel_at_period_end;

  await user.save();
  console.log(`Subscription updated for user ${user.id}`);
}

async function handleSubscriptionDeleted(subscription) {
  const user = await User.findOne({
    'subscription.stripeSubscriptionId': subscription.id
  });

  if (!user) return;

  user.subscription.status = 'canceled';
  user.subscription.plan = 'trial';
  user.updateLimitsByPlan();

  await user.save();
  console.log(`Subscription canceled for user ${user.id}`);
}

async function handleInvoicePaid(invoice) {
  const user = await User.findOne({
    'subscription.stripeCustomerId': invoice.customer
  });

  if (!user) return;

  // Reset monthly usage counters
  user.usage.messagesUsed = 0;
  user.usage.lastReset = new Date();

  await user.save();
  console.log(`Invoice paid for user ${user.id}, usage reset`);
}

async function handleInvoicePaymentFailed(invoice) {
  const user = await User.findOne({
    'subscription.stripeCustomerId': invoice.customer
  });

  if (!user) return;

  user.subscription.status = 'past_due';

  await user.save();
  console.log(`Payment failed for user ${user.id}`);

  // TODO: Send email notification
}

module.exports = router;
