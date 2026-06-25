import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    { icon: '🔍', title: 'AI Disease Detection', desc: 'CNN-powered model detects 30+ crop diseases from leaf images instantly.' },
    { icon: '📊', title: 'Confidence Score', desc: 'Get prediction accuracy with severity level for better decision making.' },
    { icon: '💊', title: 'Treatment Guide', desc: 'Receive specific fungicide, pesticide and care recommendations.' },
    { icon: '📜', title: 'Scan History', desc: 'Track all your past scans and monitor your crop health over time.' },
  ];

  return (
    <div className="container">
      <div className="hero">
        <h1>🌿 KrishiLens</h1>
        <p>AI-powered crop disease detection. Upload a leaf image and get instant diagnosis with treatment recommendations.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/scan')}>
          📷 Start Scanning
        </button>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#1B5E20' }}>
        Welcome back, {user?.firstName}! 👋
      </h2>

      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button className="btn btn-primary" onClick={() => navigate('/scan')} style={{ marginRight: 12 }}>
          📷 Scan Crop
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/history')}>
          📜 View History
        </button>
      </div>
    </div>
  );
}
