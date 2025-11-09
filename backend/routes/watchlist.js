// backend/routes/watchlist.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// GET /api/watchlist
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ watchlist: user.watchlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/watchlist
router.post(
  '/',
  auth,
  [body('coinId').notEmpty().withMessage('coinId required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const { coinId, name, symbol } = req.body;
      // avoid duplicates
      if (user.watchlist.find(w => w.coinId === coinId)) {
        return res.status(400).json({ message: 'Already in watchlist' });
      }

      user.watchlist.push({ coinId, name, symbol });
      await user.save();
      res.json({ watchlist: user.watchlist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /api/watchlist/:coinId
router.delete('/:coinId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.watchlist = user.watchlist.filter(w => w.coinId !== req.params.coinId);
    await user.save();
    res.json({ watchlist: user.watchlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
