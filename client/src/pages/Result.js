import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function getSeverityColor(severity) {
  switch (severity?.toLowerCase()) {
    case 'high': return '#d32f2f';
    case 'moderate': return '#f57c00';
    case 'low': return '#388e3c';
    default: return '#388e3c';
  }
}

function getConfidenceColor(confidence) {
  if (confidence >= 80) return '#388e3c';
  if (confidence >= 60) return '#f57c00';
  return '#d32f2f';
}

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.result) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: 60 }}>
        <p style={{ fontSize: 18, marginBottom: 20 }}>No result data found.</p>
        <button className="btn btn-primary" onClick={() => navigate('/scan')}>Go to Scan</button>
      </div>
    );
  }

  const { result, preview } = state;
  const { disease, confidence, severity, recommendation, treatment, isHealthy } = result;

  const sections = [
    { icon: '💡', title: 'Recommendation', color: '#FF9800', text: recommendation },
    { icon: '🌿', title: 'Treatment', color: '#4CAF50', text: treatment },
    {
      icon: '❓', title: 'Why This Happens', color: '#2196F3',
      text: 'This condition typically occurs due to environmental factors, nutrient deficiencies, or pathogen infections. Poor drainage, excessive moisture, or inadequate nutrition can create favorable conditions for disease development.'
    },
    {
      icon: '✅', title: 'What To Do Next', color: '#FF9800',
      text: '1. Apply recommended treatment immediately\n2. Monitor the affected area daily\n3. Improve drainage and air circulation\n4. Consider preventive measures for future crops\n5. Consult an agricultural expert if symptoms persist'
    },
  ];

  return (
    <div className="container">
      <h1 className="page-title">📊 Analysis Result</h1>
      <p className="page-subtitle">Scan ID: {state.scanId}</p>

      {/* Main result card */}
      <div className="card">
        <div className="result-header">
          <span style={{ fontSize: 32 }}>{isHealthy ? '✅' : '🔬'}</span>
          <span className="result-title">Diagnosis</span>
        </div>

        {preview && (
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <img src={preview} alt="Scanned leaf" style={{ width: 200, height: 200, borderRadius: 12, objectFit: 'cover' }} />
          </div>
        )}

        <div className="info-row">
          <span className="info-label">Disease:</span>
          <span className="info-value" style={{ fontWeight: 700, fontSize: 18 }}>{disease}</span>
        </div>

        <div className="info-row" style={{ alignItems: 'flex-start' }}>
          <span className="info-label">Confidence:</span>
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 700, color: getConfidenceColor(confidence) }}>{confidence}%</span>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${confidence}%`, background: getConfidenceColor(confidence) }}
              />
            </div>
          </div>
        </div>

        <div className="info-row">
          <span className="info-label">Severity:</span>
          <span className="severity-badge" style={{ background: getSeverityColor(severity) }}>{severity}</span>
        </div>
      </div>

      {/* Info sections */}
      {sections.map((s, i) => (
        <div className="card" key={i}>
          <div className="result-header">
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#1B5E20' }}>{s.title}</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#1B5E20', whiteSpace: 'pre-line' }}>{s.text}</p>
        </div>
      ))}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-primary btn-full" onClick={() => navigate('/scan')}>
          📷 Scan Another
        </button>
        <button className="btn btn-secondary btn-full" onClick={() => navigate('/')}>
          🏠 Go Home
        </button>
      </div>
    </div>
  );
}
