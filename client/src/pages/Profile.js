import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/user/profile')
      .then(({ data }) => { setProfile(data); setForm({ firstName: data.firstName, lastName: data.lastName }); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/user/profile', form);
      setProfile(prev => ({ ...prev, ...data }));
      setEdit(false);
      setMsg('Profile updated successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch {
      setMsg('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-page"><div className="spinner" style={{ borderTopColor: '#4CAF50' }} /></div>;

  return (
    <div className="container">
      <h1 className="page-title">👤 Profile</h1>

      {msg && <div className={`alert ${msg.includes('success') ? 'alert-success' : 'alert-error'}`}>{msg}</div>}

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="profile-avatar">
          {profile?.firstName?.[0]}{profile?.lastName?.[0]}
        </div>
        <h2 style={{ fontSize: 22 }}>{profile?.firstName} {profile?.lastName}</h2>
        <p style={{ color: '#666', marginTop: 4 }}>{user?.email}</p>
        <p style={{ color: '#999', fontSize: 13, marginTop: 4 }}>
          Member since {new Date(profile?.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </p>

        <div className="stats-grid" style={{ width: '100%', marginTop: 24 }}>
          <div className="stat-box">
            <h3>{profile?.totalScans ?? 0}</h3>
            <p>Total Scans</p>
          </div>
          <div className="stat-box">
            <h3>{profile?.healthyScans ?? 0}</h3>
            <p>Healthy Plants</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18 }}>Edit Profile</h3>
          <button className="btn btn-secondary" style={{ padding: '8px 18px' }} onClick={() => setEdit(!edit)}>
            {edit ? 'Cancel' : '✏️ Edit'}
          </button>
        </div>

        {edit ? (
          <form onSubmit={saveProfile}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label>First Name</label>
                <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required />
              </div>
            </div>
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? <><span className="spinner" /> Saving...</> : '💾 Save Changes'}
            </button>
          </form>
        ) : (
          <div>
            <div className="info-row">
              <span className="info-label">First Name:</span>
              <span className="info-value">{profile?.firstName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Name:</span>
              <span className="info-value">{profile?.lastName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
