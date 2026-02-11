const express = require('express');
const router = express.Router();
const Flow = require('../models/Flow');
const { protect, checkLimit } = require('../middleware/auth');

// @route   GET /api/flows
// @desc    Get all flows for user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const flows = await Flow.find({ user: req.user.id }).sort('-createdAt');
    res.json({ success: true, data: flows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/flows
// @desc    Create new flow
// @access  Private
router.post('/', protect, checkLimit('maxFlows'), async (req, res) => {
  try {
    const flow = await Flow.create({
      ...req.body,
      user: req.user.id
    });

    // Increment usage
    req.user.usage.flowsUsed += 1;
    await req.user.save();

    res.status(201).json({ success: true, data: flow });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/flows/:id
// @desc    Get single flow
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const flow = await Flow.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!flow) {
      return res.status(404).json({ success: false, message: 'Flow não encontrado' });
    }

    res.json({ success: true, data: flow });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/flows/:id
// @desc    Update flow
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let flow = await Flow.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!flow) {
      return res.status(404).json({ success: false, message: 'Flow não encontrado' });
    }

    flow = await Flow.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: flow });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/flows/:id
// @desc    Delete flow
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const flow = await Flow.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!flow) {
      return res.status(404).json({ success: false, message: 'Flow não encontrado' });
    }

    await flow.deleteOne();

    // Decrement usage
    if (req.user.usage.flowsUsed > 0) {
      req.user.usage.flowsUsed -= 1;
      await req.user.save();
    }

    res.json({ success: true, message: 'Flow deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
