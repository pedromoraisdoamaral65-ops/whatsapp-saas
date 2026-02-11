const mongoose = require('mongoose');

const flowSchema = new mongoose.Schema({
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
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'draft'],
    default: 'draft'
  },
  trigger: {
    type: {
      type: String,
      enum: ['keyword', 'welcome', 'button', 'schedule', 'webhook'],
      required: true
    },
    keywords: [String],
    scheduleTime: String,
    webhookUrl: String
  },
  nodes: [{
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['message', 'question', 'condition', 'action', 'delay', 'ai'],
      required: true
    },
    position: {
      x: Number,
      y: Number
    },
    data: {
      // Para mensagens
      message: String,
      mediaUrl: String,
      mediaType: String,
      buttons: [{
        id: String,
        text: String,
        nextNodeId: String
      }],
      
      // Para perguntas
      question: String,
      variableName: String,
      validationType: String,
      
      // Para condições
      conditions: [{
        variable: String,
        operator: String,
        value: String,
        nextNodeId: String
      }],
      defaultNextNodeId: String,
      
      // Para ações
      action: String,
      actionData: mongoose.Schema.Types.Mixed,
      
      // Para delay
      delayTime: Number,
      delayUnit: String,
      
      // Para AI
      aiPrompt: String,
      aiModel: String
    },
    nextNodeId: String
  }],
  edges: [{
    id: String,
    source: String,
    target: String,
    label: String
  }],
  variables: [{
    name: String,
    type: String,
    defaultValue: String
  }],
  stats: {
    totalExecutions: {
      type: Number,
      default: 0
    },
    successfulExecutions: {
      type: Number,
      default: 0
    },
    failedExecutions: {
      type: Number,
      default: 0
    },
    lastExecutedAt: Date
  },
  isTemplate: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index para busca rápida
flowSchema.index({ user: 1, status: 1 });
flowSchema.index({ 'trigger.keywords': 1 });

module.exports = mongoose.model('Flow', flowSchema);
