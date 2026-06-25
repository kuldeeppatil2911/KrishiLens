const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Scan = require('../models/Scan');

// Get profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const totalScans = await Scan.countDocuments({ userId: req.user.id });
    const healthyScans = await Scan.countDocuments({ userId: req.user.id, 'result.isHealthy': true });

    res.json({ ...user.toObject(), totalScans, healthyScans });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, language } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, language },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
