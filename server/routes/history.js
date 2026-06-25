const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const Scan = require('../models/Scan');

// Get all scans for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(scans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a scan
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const scan = await Scan.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!scan) return res.status(404).json({ message: 'Scan not found' });
    res.json({ message: 'Scan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
