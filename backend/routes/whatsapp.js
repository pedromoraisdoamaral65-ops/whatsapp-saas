const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/connect', protect, async (req, res) => {
  try {
    // TODO: Integrar com Evolution API ou Baileys
    res.json({ success: true, message: 'WhatsApp connection initiated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/status', protect, async (req, res) => {
  try {
    res.json({ success: true, data: { status: 'disconnected' } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
