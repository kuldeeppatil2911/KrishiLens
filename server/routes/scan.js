const router = require('express').Router();
const multer = require('multer');
const fetch = require('node-fetch');
const FormData = require('form-data');
const authMiddleware = require('../middleware/auth');
const Scan = require('../models/Scan');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Process analysis result (ported from original api.js)
function processResult(data) {
  const disease = data.disease || data.top_1?.disease || 'Unknown';
  const confidence = data.confidence
    ? Math.round(data.confidence * 100)
    : data.top_1?.confidence_percent || 0;

  const isHealthy = disease.toLowerCase().includes('healthy');
  const severity = isHealthy ? 'None' : confidence >= 80 ? 'High' : confidence >= 50 ? 'Moderate' : 'Low';

  const recommendations = {
    Tomato_Early_blight: 'Apply Mancozeb or Chlorothalonil fungicide. Improve air circulation between plants.',
    Tomato_Late_blight: 'Use Metalaxyl or Cymoxanil systemic fungicide. Avoid overhead watering.',
    Tomato_Leaf_Mold: 'Apply Azoxystrobin or Tebuconazole. Reduce humidity and improve ventilation.',
    Tomato_Septoria_leaf_spot: 'Use Copper hydroxide or Propiconazole. Remove infected leaves immediately.',
    Tomato_Spider_mites: 'Apply Abamectin or Spiromesifen miticide. Increase humidity around plants.',
    Tomato_Bacterial_spot: 'Apply Copper sulfate or Streptomycin. Use drip irrigation to avoid leaf wetness.',
    Tomato_Mosaic_virus: 'No chemical cure. Remove infected plants. Control aphids with Imidacloprid.',
    Tomato_Yellow_Leaf_Curl_Virus: 'Control whiteflies with Thiamethoxam. Remove infected plants immediately.',
    Tomato_healthy: 'Plant is healthy! Continue NPK fertilizer (19-19-19) and regular monitoring.',
  };

  const treatments = {
    Tomato_Early_blight: 'Remove affected leaves, apply fungicide every 7-10 days, ensure proper spacing.',
    Tomato_Late_blight: 'Apply preventive fungicide, improve drainage, avoid wet foliage.',
    Tomato_Leaf_Mold: 'Increase ventilation, reduce watering frequency, apply organic fungicide.',
    Tomato_healthy: 'Maintain regular watering, adequate sunlight, and monitor for any changes.',
  };

  const normalizedDisease = disease.replace(/\s+/g, '_');

  return {
    disease: disease.replace(/_/g, ' '),
    confidence,
    severity,
    isHealthy,
    recommendation: recommendations[normalizedDisease] || 'Consult an agricultural expert.',
    treatment: treatments[normalizedDisease] || 'Follow recommended treatment plan.',
  };
}

// Analyze crop image
router.post('/analyze', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

    const form = new FormData();
    form.append('file', req.file.buffer, {
      filename: 'crop.jpg',
      contentType: req.file.mimetype,
    });

    const apiRes = await fetch(`${process.env.FASTAPI_URL}/predict`, {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
    });

    if (!apiRes.ok) return res.status(502).json({ message: 'AI service unavailable' });

    const data = await apiRes.json();
    const result = processResult(data);

    const scan = await Scan.create({
      userId: req.user.id,
      result,
      cropName: req.body.cropName || '',
      language: req.body.language || 'en',
    });

    res.json({ success: true, scanId: scan._id, result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
