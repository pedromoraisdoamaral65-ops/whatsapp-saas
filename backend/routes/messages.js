const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id })
      .populate('contact')
      .sort('-createdAt')
      .limit(100);
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
