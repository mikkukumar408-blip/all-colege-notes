import React, { useState, useEffect } from 'react';
import { Users, Smartphone, Globe, Eye, RefreshCw, X, ExternalLink, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { fetchVisitorStats } from '../utils/visitorTracker';
import { VERCEL_PROD_ORIGIN } from '../utils/cloudSync';

export default function VisitorAnalyticsModal({ isOpen, onClose }) {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalVisits: 0,
    appVisitors: 0,
    webVisitors: 0,
    recentVisits: []
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchVisitorStats();
    if (data) setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const total = stats.totalVisitors || 0;
  const appPct = total > 0 ? Math.round(((stats.appVisitors || 0) / total) * 100) : 0;
  const webPct = total > 0 ? Math.round(((stats.webVisitors || 0) / total) * 100) : 0;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          background: 'rgba(11, 17, 33, 0.98)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.08) 0%, rgba(112, 0, 255, 0.08) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00f0ff, #7000ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 14px rgba(0, 240, 255, 0.4)'
            }}>
              <Activity size={18} color="#070a13" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Live Visitor Analytics
              </h2>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
                Real-time traffic across App & Website
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={loadData}
              disabled={loading}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#00f0ff',
                padding: '6px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem'
              }}
              title="Refresh Stats"
            >
              <RefreshCw size={13} className={loading ? 'spin-anim' : ''} />
              <span>Refresh</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                padding: '6px',
                cursor: 'pointer',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {/* Main 4-Stat Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: '14px',
              padding: '14px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Users size={14} color="#00f0ff" />
                <span>Total Visitors</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '6px 0 2px', fontFamily: 'monospace' }}>
                {stats.totalVisitors.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Unique users / installs</div>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '14px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Eye size={14} color="#f59e0b" />
                <span>Total Visits</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', margin: '6px 0 2px', fontFamily: 'monospace' }}>
                {stats.totalVisits.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Page opens & sessions</div>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '14px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Smartphone size={14} color="#34d399" />
                <span>Android App</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', margin: '6px 0 2px', fontFamily: 'monospace' }}>
                {stats.appVisitors.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{appPct}% of audience</div>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(168, 85, 247, 0.25)',
              borderRadius: '14px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Globe size={14} color="#c084fc" />
                <span>Web Visitors</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc', margin: '6px 0 2px', fontFamily: 'monospace' }}>
                {stats.webVisitors.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{webPct}% of audience</div>
            </div>
          </div>

          {/* Platform Share Progress Bar */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '12px',
            padding: '12px 14px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#cbd5e1', marginBottom: '8px', fontWeight: 600 }}>
              <span>📱 App: {appPct}%</span>
              <span>🌐 Web: {webPct}%</span>
            </div>
            <div style={{ height: '8px', width: '100%', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${appPct || 50}%`, background: 'linear-gradient(90deg, #10b981, #059669)', transition: 'width 0.4s' }} />
              <div style={{ width: `${webPct || 50}%`, background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)', transition: 'width 0.4s' }} />
            </div>
          </div>

          {/* Recent Real-Time Visits Feed */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '10px' }}>
              🕒 Recent Visitor Activity Feed
            </h3>
            <div style={{
              background: 'rgba(4, 7, 16, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              maxHeight: '190px',
              overflowY: 'auto'
            }}>
              {(!stats.recentVisits || stats.recentVisits.length === 0) ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '0.78rem' }}>
                  Visits will appear here as users open the app or website.
                </div>
              ) : (
                stats.recentVisits.slice(0, 15).map((v, i) => (
                  <div 
                    key={v.id || i}
                    style={{
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      fontSize: '0.76rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        background: (v.platform || '').includes('App') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 240, 255, 0.15)',
                        color: (v.platform || '').includes('App') ? '#34d399' : '#00f0ff'
                      }}>
                        {v.platform}
                      </span>
                      <span style={{ color: '#cbd5e1' }}>{v.device}</span>
                    </div>
                    <span style={{ color: '#64748b', fontSize: '0.7rem', fontFamily: 'monospace' }}>
                      {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Web Dashboard Link Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(112, 0, 255, 0.08) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>
                🌐 Live Web Dashboard URL
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                Open anytime on any phone or laptop: <code style={{ color: '#00f0ff' }}>/stats</code>
              </div>
            </div>
            <a
              href={`${VERCEL_PROD_ORIGIN}/stats`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #00f0ff, #7000ff)',
                color: '#070a13',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0
              }}
            >
              <span>Open Stats</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
