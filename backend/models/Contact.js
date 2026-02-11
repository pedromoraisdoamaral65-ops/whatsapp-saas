const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: String,
  tags: [String],
  customFields: {
    type: Map,
    of: String
  },
  notes: String,
  lastInteraction: Date,
  totalMessages: {
    type: Number,
    default: 0
  },
  activeFlows: [{
    flow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flow'
    },
    currentNodeId: String,
    variables: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    },
    startedAt: Date,
    lastActivityAt: Date
  }],
  status: {
    type: String,
    enum: ['active', 'blocked', 'unsubscribed'],
    default: 'active'
  },
  source: {
    type: String,
    enum: ['manual', 'import', 'chat', 'webhook'],
    default: 'chat'
  }
}, {
  timestamps: true
});

// Index para busca rápida
contactSchema.index({ user: 1, phone: 1 }, { unique: true });
contactSchema.index({ user: 1, tags: 1 });
contactSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Contact', contactSchema);
