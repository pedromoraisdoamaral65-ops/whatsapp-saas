const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, adicione um nome'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Por favor, adicione um email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  password: {
    type: String,
    required: [true, 'Por favor, adicione uma senha'],
    minlength: 6,
    select: false
  },
  phone: {
    type: String,
    trim: true
  },
  businessName: {
    type: String,
    trim: true
  },
  businessType: {
    type: String,
    enum: ['barbershop', 'nails', 'beauty', 'other'],
    default: 'other'
  },
  subscription: {
    plan: {
      type: String,
      enum: ['base', 'professional', 'premium', 'trial'],
      default: 'trial'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'canceled', 'past_due'],
      default: 'inactive'
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false
    }
  },
  limits: {
    maxContacts: {
      type: Number,
      default: 100 // Trial/Base
    },
    maxFlows: {
      type: Number,
      default: 3
    },
    maxMessages: {
      type: Number,
      default: 500
    },
    hasAI: {
      type: Boolean,
      default: false
    },
    hasAnalytics: {
      type: Boolean,
      default: false
    },
    hasPrioritySupport: {
      type: Boolean,
      default: false
    }
  },
  usage: {
    contactsUsed: {
      type: Number,
      default: 0
    },
    flowsUsed: {
      type: Number,
      default: 0
    },
    messagesUsed: {
      type: Number,
      default: 0
    },
    lastReset: {
      type: Date,
      default: Date.now
    }
  },
  whatsappConnections: [{
    name: String,
    number: String,
    status: {
      type: String,
      enum: ['connected', 'disconnected', 'connecting'],
      default: 'disconnected'
    },
    qrCode: String,
    sessionId: String,
    connectedAt: Date
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update limits based on plan
userSchema.methods.updateLimitsByPlan = function() {
  const plans = {
    trial: {
      maxContacts: 100,
      maxFlows: 3,
      maxMessages: 500,
      hasAI: false,
      hasAnalytics: false,
      hasPrioritySupport: false
    },
    base: {
      maxContacts: 500,
      maxFlows: 10,
      maxMessages: 2000,
      hasAI: false,
      hasAnalytics: true,
      hasPrioritySupport: false
    },
    professional: {
      maxContacts: 2000,
      maxFlows: 30,
      maxMessages: 10000,
      hasAI: true,
      hasAnalytics: true,
      hasPrioritySupport: false
    },
    premium: {
      maxContacts: -1, // Ilimitado
      maxFlows: -1,
      maxMessages: -1,
      hasAI: true,
      hasAnalytics: true,
      hasPrioritySupport: true
    }
  };

  const planLimits = plans[this.subscription.plan] || plans.trial;
  this.limits = planLimits;
};

module.exports = mongoose.model('User', userSchema);
