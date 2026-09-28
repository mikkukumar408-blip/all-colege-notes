/* =========================================================================
   DOWNLOAD APP PAGE (DownloadApp.jsx)
   =========================================================================
   Shows a beautiful APK download page for the Campus Notes Android app.
   APK file must be placed at: client/public/downloads/campus-notes.apk
   Update APK_VERSION below whenever you build a new APK.
   ========================================================================= */

import React, { useState } from 'react';
import { Download, Smartphone, Shield, Zap, Star, CheckCircle, ExternalLink, Info } from 'lucide-react';

/* ─── APK METADATA — UPDATE THIS WHEN YOU RELEASE A NEW APK ─────────────── */
const APK_FILE  = '/downloads/campus-notes.apk';
const APK_VERSION = '1.2.0';
const APK_DATE    = 'September 2026';
const APK_SIZE    = '~8 MB';
/* ─────────────────────────────────────────────────────────────────────────── */

const FEATURES = [
  { icon: '📚', title: 'All Semester Notes', desc: 'B.Tech Sem 1 subjects — C, BEEE, Maths, Physics, Python, DSA, Web Tech, AI/ML — fully offline after first load.' },
  { icon: '📝', title: 'Expected Question Papers', desc: 'Sessional & End-Semester question papers with complete 4-section format and detailed model answers.' },
  { icon: '⚡', title: 'Exam Revision Cards', desc: 'Bite-sized short notes and quick-revision cards for last-minute preparation.' },
  { icon: '🧪', title: 'Lab Manuals', desc: 'Practical codes, viva Q&A, and experiment write-ups for all lab subjects.' },
  { icon: '🔍', title: 'Universal Search (Ctrl+K)', desc: 'Cross-subject instant search — find any theorem, formula, or topic in seconds.' },
  { icon: '🌙', title: 'Dark Mode Always', desc: 'Engineered for night-owl study sessions. Pure dark theme, zero eye strain.' },
];

const STEPS = [
  'Download the APK file using the button below.',
  'On your Android phone, open Settings → Security → enable "Install unknown apps" for your browser/file manager.',
  'Open the downloaded APK file and tap Install.',
  'Launch "Campus Notes" from your app drawer.',
];

export default function DownloadApp() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded]   = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Trigger the actual file download
    const link = document.createElement('a');
    link.href = APK_FILE;
    link.download = `campus-notes-v${APK_VERSION}.apk`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 1500);
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: '0 auto',
      padding: '24px 16px 80px',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      color: 'var(--text-primary, #e2e8f0)'
    }}>

      {/* ── Hero Card ─────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(124,58,237,0.18) 100%)',
        border: '1.5px solid rgba(6,182,212,0.3)',
        borderRadius: 20,
        padding: '32px 28px',
        textAlign: 'center',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow blob */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* App icon */}
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: 'linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 8px 32px rgba(6,182,212,0.35)'
        }}>
          <span style={{ fontSize: 38 }}>📖</span>
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 6px', color: '#f0f4fc' }}>
          Campus Notes
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'rgba(224,242,254,0.7)', margin: '0 0 6px' }}>
          Android App &nbsp;·&nbsp; v{APK_VERSION} &nbsp;·&nbsp; {APK_DATE}
        </p>
        <p style={{ fontSize: '0.82rem', color: 'rgba(148,163,184,0.8)', margin: '0 0 24px' }}>
          File size: {APK_SIZE} &nbsp;·&nbsp; Requires Android 7.0+
        </p>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 32px',
            borderRadius: 50,
            border: 'none',
            background: downloaded
              ? 'linear-gradient(135deg, #059669, #10b981)'
              : 'linear-gradient(135deg, #0ea5e9, #7c3aed)',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: downloading ? 'wait' : 'pointer',
            boxShadow: '0 4px 20px rgba(14,165,233,0.4)',
            transition: 'all 0.3s ease',
            opacity: downloading ? 0.7 : 1,
            transform: downloading ? 'scale(0.97)' : 'scale(1)'
          }}
        >
          {downloaded ? (
            <><CheckCircle size={20} /> Downloaded! Install from Files</>
          ) : downloading ? (
            <><Download size={20} style={{ animation: 'bounce 0.6s infinite' }} /> Downloading…</>
          ) : (
            <><Download size={20} /> Download APK &nbsp; v{APK_VERSION}</>
          )}
        </button>

        {downloaded && (
          <p style={{ marginTop: 12, fontSize: '0.8rem', color: '#34d399' }}>
            ✅ APK saved to your Downloads folder. Open it to install.
          </p>
        )}
      </div>

      {/* ── Installation Guide ────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(15,23,42,0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '22px 22px',
        marginBottom: 24
      }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, color: '#e2e8f0' }}>
          <Smartphone size={18} color="var(--neon-cyan, #06b6d4)" /> How to Install
        </h2>
        <ol style={{ paddingLeft: 20, margin: 0 }}>
          {STEPS.map((step, i) => (
            <li key={i} style={{ marginBottom: 10, fontSize: '0.875rem', color: 'rgba(224,242,254,0.8)', lineHeight: 1.55 }}>
              {step}
            </li>
          ))}
        </ol>

        {/* Warning */}
        <div style={{
          marginTop: 16,
          padding: '10px 14px',
          borderRadius: 10,
          background: 'rgba(245,158,11,0.1)',
          border: '1px solid rgba(245,158,11,0.25)',
          display: 'flex', alignItems: 'flex-start', gap: 10
        }}>
          <Shield size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(254,240,138,0.85)', lineHeight: 1.5 }}>
            This APK is built and signed by Bhavya Mishra — the developer of this portal. 
            It is <strong>not</strong> available on Google Play. Always download only from this official page.
          </p>
        </div>
      </div>

      {/* ── Feature Grid ──────────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 14px', color: '#e2e8f0' }}>
        ✨ What's in the App
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 12,
        marginBottom: 28
      }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            background: 'rgba(15,23,42,0.6)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 12,
            padding: '14px 16px',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: 3, color: '#f1f5f9' }}>{f.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(148,163,184,0.85)', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Version History Note ──────────────────────────────────────── */}
      <div style={{
        background: 'rgba(15,23,42,0.6)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '16px 20px',
        display: 'flex', alignItems: 'flex-start', gap: 12
      }}>
        <Info size={18} color="var(--neon-cyan, #06b6d4)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: 4, color: '#e2e8f0' }}>
            v{APK_VERSION} — Latest Release &nbsp; <span style={{ color: '#94a3b8', fontWeight: 400 }}>({APK_DATE})</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.8rem', color: 'rgba(148,163,184,0.85)', lineHeight: 1.6 }}>
            <li>4-section Sessional question papers with model answers</li>
            <li>Improved code block rendering with line numbers &amp; file tabs</li>
            <li>Expected Q&amp;A format matching university blueprint</li>
            <li>Universal search across all subjects (Ctrl+K)</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
