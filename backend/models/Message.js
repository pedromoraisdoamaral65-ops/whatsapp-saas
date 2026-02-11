const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  flow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flow'
  },
  direction: {
    type: String,
    enum: ['incoming', 'outgoing'],
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'video', 'audio', 'document', 'location', 'contact'],
    default: 'text'
  },
  content: {
    text: String,
    mediaUrl: String,
    caption: String,
    mimeType: String,
    fileName: String
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'read', 'failed'],
    default: 'pending'
  },
  metadata: {
    messageId: String,
    timestamp: Number,
    fromMe: Boolean
  },
  error: String
}, {
  timestamps: true
});

// Index para busca rápida
messageSchema.index({ user: 1, contact: 1, createdAt: -1 });
messageSchema.index({ user: 1, flow: 1 });
messageSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Message', messageSchema);
