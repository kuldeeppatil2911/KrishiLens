import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Scan() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cropName, setCropName] = useState('');
  const fileRef = useRef();
  const navigate = useNavigate();

  const crops = ['Tomato', 'Potato', 'Corn', 'Rice', 'Wheat', 'Apple', 'Grape', 'Pepper', 'Other'];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Please select a valid image file');
    setError('');
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const analyzeImage = async () => {
    if (!image) return setError('Please select an image first');
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('cropName', cropName);
      formData.append('language', 'en');

      const { data } = await api.post('/scan/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/result', { state: { result: data.result, scanId: data.scanId, preview } });
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview('');
    setError('');
    fileRef.current.value = '';
  };

  return (
    <div className="container">
      <h1 className="page-title">📷 Scan Crop</h1>
      <p className="page-subtitle">Upload a leaf image to detect diseases instantly</p>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <div className="form-group">
          <label>Select Crop (Optional)</label>
          <select
            style={{ width: '100%', padding: '12px 16px', border: '2px solid #C8E6C9', borderRadius: 10, fontSize: 15, color: '#1B5E20', outline: 'none' }}
            value={cropName}
            onChange={e => setCropName(e.target.value)}
          >
            <option value="">-- Select crop type --</option>
            {crops.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div
          className="upload-area"
          onClick={() => !preview && fileRef.current.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          style={{ cursor: preview ? 'default' : 'pointer', position: 'relative' }}
        >
          {preview ? (
            <>
              <img src={preview} alt="Selected crop" />
              <button
                className="btn btn-danger"
                style={{ marginTop: 16 }}
                onClick={(e) => { e.stopPropagation(); clearImage(); }}
              >
                ✕ Remove Image
              </button>
            </>
          ) : (
            <>
              <div className="upload-icon">🌿</div>
              <p className="upload-text">Click or drag & drop your leaf image here</p>
              <p className="upload-subtext">Supports JPG, PNG, WEBP — Max 10MB</p>
            </>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn btn-secondary btn-full" onClick={() => fileRef.current.click()}>
            📁 Choose File
          </button>
          <button className="btn btn-primary btn-full" onClick={analyzeImage} disabled={loading || !image}>
            {loading ? <><span className="spinner" /> Analyzing...</> : '🔍 Analyze Crop'}
          </button>
        </div>
      </div>

      <div className="card" style={{ background: '#E8F5E9' }}>
        <h3 style={{ marginBottom: 10 }}>📌 Tips for best results</h3>
        <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#2E7D32' }}>
          <li>Ensure the leaf is clearly visible and in focus</li>
          <li>Use good lighting — natural light works best</li>
          <li>Capture the affected area of the leaf clearly</li>
          <li>Avoid blurry or dark images</li>
        </ul>
      </div>
    </div>
  );
}
