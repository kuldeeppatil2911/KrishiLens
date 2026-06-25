import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function getSeverityColor(severity) {
  switch (severity?.toLowerCase()) {
    case 'high': return '#d32f2f';
    case 'moderate': return '#f57c00';
    case 'low': return '#388e3c';
    default: return '#388e3c';
  }
}

export default function History() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/history')
      .then(({ data }) => setScans(data))
      .catch(() => setError('Failed to load history'))
      .finally(() => setLoading(false));
  }, []);

  const deleteScan = async (id) => {
    if (!window.confirm('Delete this scan?')) return;
    try {
      await api.delete(`/history/${id}`);
      setScans(prev => prev.filter(s => s._id !== id));
    } catch {
      alert('Failed to delete scan');
    }
  };

  if (loading) return <div className="loading-page"><div className="spinner" style={{ borderTopColor: '#4CAF50' }} /></div>;

  return (
    <div className="container">
      <h1 className="page-title">📜 Scan History</h1>
      <p className="page-subtitle">{scans.length} scan{scans.length !== 1 ? 's' : ''} recorded</p>

      {error && <div className="alert alert-error">{error}</div>}

      {scans.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🌱</div>
          <p style={{ fontSize: 18, color: '#4CAF50', marginBottom: 20 }}>No scans yet</p>
          <button className="btn btn-primary" onClick={() => navigate('/scan')}>📷 Start Scanning</button>
        </div>
      ) : (
        <div className="history-list">
          {scans.map(scan => (
            <div className="history-item" key={scan._id}>
              <div className="history-item-left">
                <h3>{scan.result?.disease || 'Unknown'}</h3>
                <p>
                  Confidence: <strong>{scan.result?.confidence}%</strong> &nbsp;|&nbsp;
                  {scan.cropName && <>Crop: <strong>{scan.cropName}</strong> &nbsp;|&nbsp;</>}
                  {new Date(scan.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span className="severity-badge" style={{ background: getSeverityColor(scan.result?.severity) }}>
                  {scan.result?.severity || 'N/A'}
                </span>
                <button
                  className="btn btn-danger"
                  style={{ padding: '8px 14px', fontSize: 13 }}
                  onClick={() => deleteScan(scan._id)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
