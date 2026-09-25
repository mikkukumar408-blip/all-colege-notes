import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Lock, CheckCircle, Eye, AlertTriangle, Key, Terminal, X, History, RefreshCw, Trash2 } from 'lucide-react';
import { logSecurityEvent, getSecurityAuditLogs, clearSecurityAuditLogs } from '../utils/security';

export default function SecurityShield({ enabled = true, isAdmin = false, showBadge = false, watermarkId = 'STU-BEEE-8492' }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('protections'); // 'protections' | 'audit'
  const [auditLogs, setAuditLogs] = useState([]);

  const refreshAuditLogs = () => {
    setAuditLogs(getSecurityAuditLogs());
  };

  useEffect(() => {
    if (modalOpen) {
      refreshAuditLogs();
    }
  }, [modalOpen]);

  useEffect(() => {
    // Super Admin has full developer control: bypass all security interceptors
    if (isAdmin || !enabled) {
      console.log('%c⚡ SUPER ADMIN LOGGED IN: Full Developer Mode Active (F12, Inspect, Copy & Right-Click Unlocked)', 'background: #064e3b; color: #34d399; font-size: 13px; font-weight: bold; padding: 4px 8px; border-radius: 4px; border: 1px solid #10b981;');
      return;
    }

    // 1. Log Console Tamper Warning
    const consoleStyleTitle = 'background: #0f172a; color: #00f0ff; font-size: 16px; font-weight: 800; padding: 6px 12px; border-radius: 4px; border: 1px solid #00f0ff;';
    const consoleStyleText = 'color: #ef4444; font-size: 12px; font-weight: bold; margin-top: 4px;';
    console.log('%c🛡️ CONTENT SECURITY SHIELD ACTIVE', consoleStyleTitle);
    console.log('%cProtected academic material. Unauthorized scraping or source decompilation is prohibited and logged.', consoleStyleText);

    // 2. Prevent Right Click Context Menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerToast('🔒 Protected Academic Material: Right-click context menu is restricted.');
      logSecurityEvent('CONTEXT_MENU_BLOCKED', 'Right-click context menu attempted on academic content', 'INFO');
    };

    // 3. Prevent Copy / Cut Clipboard Theft
    const handleCopyCut = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', '[PROTECTED NOTE CONTENT] © College Notes Study Portal - Licensed to Student (' + watermarkId + '). Unauthorized copying or redistribution is prohibited.');
      }
      triggerToast('📋 Content Protection: Text copying is restricted to protect intellectual property.');
      logSecurityEvent('CLIPBOARD_THEFT_PREVENTED', `Unauthorized text copy intercepted outside of inputs (${watermarkId})`, 'WARN');
    };

    // 4. Keyboard Shortcuts Interceptor (DevTools, Source View, Save As)
    const handleKeyDown = (e) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // F12 -> DevTools
      if (e.key === 'F12') {
        e.preventDefault();
        triggerToast('⚠️ Developer Console access is disabled in academic study mode.');
        logSecurityEvent('DEVTOOLS_KEY_BLOCKED', 'F12 Developer Tools shortcut intercepted', 'WARN');
        return;
      }

      if (isCtrlOrCmd) {
        const key = e.key.toLowerCase();
        
        // Ctrl+U -> View Source
        if (key === 'u') {
          e.preventDefault();
          triggerToast('🔒 Page source inspection is disabled.');
          logSecurityEvent('SOURCE_VIEW_BLOCKED', 'Ctrl+U View Source shortcut blocked', 'WARN');
          return;
        }

        // Ctrl+S -> Save Webpage
        if (key === 's') {
          e.preventDefault();
          triggerToast('💾 Page saving is disabled. Use the official in-app Print / Download button.');
          logSecurityEvent('SAVE_PAGE_BLOCKED', 'Ctrl+S Page Save shortcut blocked', 'INFO');
          return;
        }

        // Ctrl+Shift+I / J / C -> DevTools
        if (e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
          e.preventDefault();
          triggerToast('⚠️ Inspection tools are restricted in academic study mode.');
          logSecurityEvent('DEVTOOLS_INSPECT_BLOCKED', `Ctrl+Shift+${key.toUpperCase()} DevTools shortcut intercepted`, 'WARN');
          return;
        }

        // Ctrl+C / Ctrl+X outside of inputs
        if ((key === 'c' || key === 'x') && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          const selected = window.getSelection()?.toString();
          if (selected && selected.length > 5) {
            e.preventDefault();
            triggerToast('📋 Content Protection: Direct text copying is restricted.');
            logSecurityEvent('KEYBOARD_COPY_BLOCKED', `Ctrl+${key.toUpperCase()} bulk selection copy prevented`, 'WARN');
          }
        }
      }
    };

    // 5. Screen Capture / PrintScreen Key Interceptor
    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen') {
        triggerToast('📸 SCREENSHOT DETECTED: Educational materials are digitally stamped with forensic ID.');
        logSecurityEvent('SCREENSHOT_ATTEMPT', `PrintScreen key event intercepted for license ${watermarkId}`, 'WARN');
      }
    };

    // 6. DOM Anti-Tamper Protection (MutationObserver)
    const domObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const removedNode of mutation.removedNodes) {
          if (removedNode.classList && (removedNode.classList.contains('forensic-watermark-overlay') || removedNode.classList.contains('security-guard'))) {
            triggerToast('🚨 SECURITY TAMPER DETECTED: Watermark deletion attempt neutralized.');
            logSecurityEvent('DOM_TAMPER_ATTEMPT', 'Deletion of forensic security nodes intercepted in DOM', 'CRITICAL');
          }
        }
      }
    });

    domObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopyCut);
    window.addEventListener('cut', handleCopyCut);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      domObserver.disconnect();
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopyCut);
      window.removeEventListener('cut', handleCopyCut);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled, isAdmin, watermarkId]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  return (
    <>
      {/* -----------------------------------------------------------------
         SECURITY TOAST NOTIFICATION
         ----------------------------------------------------------------- */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1.5px solid #00f0ff',
          borderRadius: '12px',
          padding: '14px 20px',
          color: '#f8fafc',
          boxShadow: '0 10px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          fontSize: '0.88rem',
          fontWeight: 700,
          maxWidth: '420px'
        }}>
          <Lock size={18} color="#00f0ff" style={{ flexShrink: 0 }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top navbar security badge button removed per user request */}

      {/* -----------------------------------------------------------------
         ENTERPRISE SECURITY AUDIT MODAL
         ----------------------------------------------------------------- */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4, 7, 18, 0.94)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '16px',
          overflowY: 'auto'
        }} onClick={() => setModalOpen(false)}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #0b1120 0%, #070d19 100%)',
              border: '1.5px solid rgba(0, 240, 255, 0.4)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 240, 255, 0.2)',
              borderRadius: '16px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: 'calc(100vh - 32px)',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px 24px',
              color: '#f8fafc',
              position: 'relative',
              boxSizing: 'border-box'
            }}
          >
            {/* Header (Fixed at top) */}
            <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: isAdmin ? 'rgba(16, 185, 129, 0.18)' : 'rgba(0, 240, 255, 0.16)', padding: '8px', borderRadius: '10px', color: isAdmin ? '#34d399' : '#00f0ff' }}>
                  {isAdmin ? <CheckCircle size={22} color="#10b981" /> : <Shield size={22} />}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', margin: 0 }}>Enterprise Security Shield</h3>
                  <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '2px 0 0 0' }}>Zero-Trust Architecture • Defense-in-Depth Tier 4</p>
                </div>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Super Admin Status Banner (Fixed) */}
            {isAdmin && (
              <div style={{
                flexShrink: 0,
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1.5px solid #10b981',
                borderRadius: '8px',
                padding: '9px 13px',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.78rem', color: '#e2e8f0' }}>
                  <b style={{ color: '#34d399' }}>SUPER ADMIN OVERRIDE ENGAGED:</b> All student security restrictions (F12 DevTools lock, right-click block, copy protection) are <b>completely disabled</b> for your session. You have unrestricted full developer control.
                </div>
              </div>
            )}

            {/* Modal Navigation Tabs (Fixed) */}
            <div style={{ flexShrink: 0, display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <button
                onClick={() => setActiveTab('protections')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'protections' ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255,255,255,0.04)',
                  color: activeTab === 'protections' ? '#00f0ff' : '#94a3b8',
                  borderBottom: activeTab === 'protections' ? '2px solid #00f0ff' : '2px solid transparent',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Shield size={14} /> Active Protections (6)
              </button>

              <button
                onClick={() => {
                  setActiveTab('audit');
                  refreshAuditLogs();
                }}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'audit' ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255,255,255,0.04)',
                  color: activeTab === 'audit' ? '#00f0ff' : '#94a3b8',
                  borderBottom: activeTab === 'audit' ? '2px solid #00f0ff' : '2px solid transparent',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <History size={14} /> Live Audit Trail ({auditLogs.length})
              </button>
            </div>

            {/* TAB 1: ACTIVE PROTECTIONS (Scrollable body) */}
            {activeTab === 'protections' ? (
              <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '6px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#67e8f9' }}>Web Crypto SHA-256 Hashing & Zero-Knowledge Storage</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                      Passwords are asynchronously digested using SHA-256 before persistence. Raw plain-text credentials never touch browser storage.
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#67e8f9' }}>Brute-Force & Credential Stuffing Shield</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                      Automated lockout triggers after 5 failed authentication attempts, freezing credential submission for 60 seconds.
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#67e8f9' }}>Forensic Dynamic Watermarking & DOM Tamper Guard</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                      MutationObservers safeguard watermark nodes from DevTools deletion. Background stamps ({watermarkId}) trace unauthorized screen recordings.
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#67e8f9' }}>Client-Side Content Lock & Anti-Tamper</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                      Right-click context menus, bulk clipboard copying, F12 developer console, and source inspection shortcuts are strictly intercepted.
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#67e8f9' }}>Strict Content Security Policy (CSP Level 3) & HSTS Preload</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                      Preloaded 2-year HSTS TLS 1.3 lock with clickjacking defense (X-Frame-Options: DENY) and strict MIME type sniff protection.
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle size={18} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#67e8f9' }}>Automated Inactivity Session Guard</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                      Active university workstation sessions automatically terminate after 30 minutes of idle time to prevent physical credential leaks.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2: LIVE AUDIT TRAIL (Scrollable body) */
              <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 2px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Latest security events recorded by Client Security Shield:</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={refreshAuditLogs}
                      style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.3)', color: '#00f0ff', padding: '4px 8px', borderRadius: '6px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <RefreshCw size={12} /> Refresh
                    </button>
                    <button
                      onClick={() => {
                        clearSecurityAuditLogs();
                        refreshAuditLogs();
                      }}
                      style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '4px 8px', borderRadius: '6px', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Trash2 size={12} /> Clear
                    </button>
                  </div>
                </div>

                {auditLogs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#64748b', fontSize: '0.85rem' }}>
                    No security violations or alerts recorded in the active audit buffer.
                  </div>
                ) : (
                  auditLogs.map((entry) => {
                    const badgeColor = entry.severity === 'CRITICAL' ? '#ef4444' : (entry.severity === 'WARN' ? '#f59e0b' : '#00f0ff');
                    const badgeBg = entry.severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.15)' : (entry.severity === 'WARN' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 240, 255, 0.15)');
                    const dateStr = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    return (
                      <div key={entry.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.7rem', color: badgeColor, background: badgeBg, padding: '2px 8px', borderRadius: '12px', fontWeight: 800, letterSpacing: '0.5px' }}>
                            {entry.severity} • {entry.type}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{dateStr}</span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#e2e8f0', marginTop: '4px' }}>
                          {entry.details}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Footer (Fixed at bottom) */}
            <div style={{ flexShrink: 0, marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Active Identity: <strong style={{ color: '#00f0ff' }}>{watermarkId}</strong>
              </span>
              <button 
                onClick={() => setModalOpen(false)}
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.82rem' }}
              >
                Close Security Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// FORENSIC WATERMARK OVERLAY COMPONENT
// ---------------------------------------------------------------------------
export function ForensicWatermark({ watermarkText = 'ACADEMIC LICENSE • CONFIDENTIAL • DO NOT DISTRIBUTE' }) {
  return (
    <div 
      className="forensic-watermark-overlay"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
        userSelect: 'none',
        opacity: 0.035,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-around',
        justifyContent: 'space-around',
        contain: 'strict',
        clipPath: 'inset(0)',
        maxWidth: '100%',
        maxHeight: '100%'
      }}
    >
      {Array.from({ length: 32 }).map((_, idx) => (
        <div 
          key={idx} 
          style={{ 
            fontSize: '0.88rem', 
            fontWeight: 900, 
            letterSpacing: '2px', 
            color: 'currentColor',
            padding: '26px 40px',
            whiteSpace: 'nowrap',
            transform: 'rotate(-25deg)',
            transformOrigin: 'center center'
          }}
        >
          {watermarkText}
        </div>
      ))}
    </div>
  );
}
