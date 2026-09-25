/* =========================================================================
   SUPER ADMIN TELEMETRY & USER MANAGEMENT CONSOLE (SuperAdminPanel.jsx)
   =========================================================================
   Visible ONLY to Master Super Admin (@Bhavya Mishra).
   Features:
   1. Total Registered Accounts counter and directory
   2. Super Admin actions: CHANGE USER PASSWORD & PERMANENTLY DELETE USER
   3. Account Inspector: Deep-dive into what any user/admin DOWNLOADED
   4. AI Doubt Inspector: Full log of questions asked to AI Academic Mentor & solutions
   5. Device Telemetry: Inspect exact device user logged in with (PC, iPhone, Android)
   6. Search, filter by action, export report, and refresh telemetry
   ========================================================================= */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Download, 
  Eye, 
  Activity, 
  Search, 
  Filter, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Crown,
  Key,
  Database,
  Trash2,
  Edit3,
  X,
  AlertTriangle,
  Lock,
  Sparkles,
  ShieldAlert,
  Laptop,
  Smartphone,
  Bot,
  HelpCircle,
  ExternalLink,
  MessageSquare,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  Cpu,
  Radio,
  Megaphone,
  Bell,
  Power
} from 'lucide-react';
import { 
  getAllAccountsWithStats, 
  getUserActivities, 
  getAccountFullAudit,
  adminChangeUserPassword, 
  adminDeleteUser,
  resetActivityLogs,
  fetchCloudTelemetry,
  clearCloudTelemetry
} from '../utils/activityTracker';
import { pullCloudUsers, authBroadcastChannel, getApiUrl, pullCloudControls, pushCloudControls } from '../utils/cloudSync';

export default function SuperAdminPanel() {
  const [accounts, setAccounts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'DOWNLOAD' | 'VIEW' | 'AUTH' | 'AI_QUERY'
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState({ type: '', text: '' });

  // Master System Controls (Broadcast Announcement & Maintenance)
  const [controls, setControls] = useState({
    announcement: '',
    announcementActive: false,
    maintenanceMode: false
  });
  const [announcementText, setAnnouncementText] = useState('');
  const [isUpdatingControls, setIsUpdatingControls] = useState(false);

  // Modal State for Changing Password
  const [passwordModalUser, setPasswordModalUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Modal State for Deleting User
  const [deleteModalUser, setDeleteModalUser] = useState(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Deep-dive Account Activity & AI Doubts Inspector Modal
  const [selectedAuditUser, setSelectedAuditUser] = useState(null);
  const [auditTab, setAuditTab] = useState('ai'); // 'ai' | 'downloads' | 'views' | 'timeline'
  const [copiedId, setCopiedId] = useState(null);

  // Load telemetry data with live cloud syncing
  const loadTelemetry = async (showToast = false) => {
    setIsRefreshing(true);
    try {
      const [freshCloudUsers, freshCloudActivities, cloudControls] = await Promise.all([
        pullCloudUsers().catch(() => null),
        fetchCloudTelemetry().catch(() => null),
        pullCloudControls().catch(() => null)
      ]);

      const accs = getAllAccountsWithStats(freshCloudUsers);
      const acts = Array.isArray(freshCloudActivities) && freshCloudActivities.length > 0 
        ? freshCloudActivities 
        : getUserActivities();

      setAccounts(accs);
      setActivities(acts);

      if (cloudControls) {
        setControls(cloudControls);
        setAnnouncementText(prev => prev || cloudControls.announcement || '');
      }

      if (showToast) {
        setFeedbackMsg({
          type: 'success',
          text: `⚡ Live Cloud Refreshed! Synced ${accs.length} accounts & ${acts.length} live stream events.`
        });
        setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4000);
      }
    } catch (e) {
      console.warn('Telemetry sync error:', e);
      const accs = getAllAccountsWithStats();
      const acts = getUserActivities();
      setAccounts(accs);
      setActivities(acts);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadTelemetry(false);

    const handleBroadcast = (e) => {
      if (e?.data?.type === 'USERS_UPDATED' || e?.data?.type === 'USER_CREATED') {
        const freshUsers = e.data.users || null;
        const accs = getAllAccountsWithStats(freshUsers);
        setAccounts(accs);
      }
    };

    authBroadcastChannel.addEventListener('message', handleBroadcast);

    // Live continuous sync polling every 3 seconds
    const interval = setInterval(() => {
      loadTelemetry(false);
    }, 3000);

    return () => {
      authBroadcastChannel.removeEventListener('message', handleBroadcast);
      clearInterval(interval);
    };
  }, []);

  // System Controls Actions
  const handleSaveAnnouncement = async (e) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setIsUpdatingControls(true);
    try {
      const updated = await pushCloudControls({
        ...controls,
        announcement: announcementText.trim(),
        announcementActive: true
      });
      setControls(updated);
      setFeedbackMsg({ type: 'success', text: '📢 Global campus announcement published live to Website & Mobile App!' });
      await loadTelemetry(false);
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: 'Failed to publish announcement: ' + err.message });
    } finally {
      setIsUpdatingControls(false);
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4000);
    }
  };

  const handleDisableAnnouncement = async () => {
    setIsUpdatingControls(true);
    try {
      const updated = await pushCloudControls({
        ...controls,
        announcementActive: false
      });
      setControls(updated);
      setFeedbackMsg({ type: 'success', text: 'Announcement banner deactivated on all devices.' });
      await loadTelemetry(false);
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: 'Failed to deactivate announcement.' });
    } finally {
      setIsUpdatingControls(false);
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4000);
    }
  };

  const handleToggleMaintenance = async () => {
    const nextMode = !controls.maintenanceMode;
    setIsUpdatingControls(true);
    try {
      const updated = await pushCloudControls({
        ...controls,
        maintenanceMode: nextMode
      });
      setControls(updated);
      setFeedbackMsg({
        type: 'success',
        text: nextMode ? '🛑 Emergency Maintenance Mode ENGAGED on all devices.' : '✅ Normal operational mode restored.'
      });
      await loadTelemetry(false);
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: 'Failed to toggle maintenance mode.' });
    } finally {
      setIsUpdatingControls(false);
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4000);
    }
  };

  const handleClearTelemetryStream = async () => {
    if (!window.confirm('Clear all live telemetry events from the cloud stream?')) return;
    try {
      await clearCloudTelemetry();
      setActivities([]);
      setFeedbackMsg({ type: 'success', text: 'Live telemetry stream cleared across all devices.' });
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 3000);
      await loadTelemetry(false);
    } catch (e) {}
  };

  // Filter activities based on tab and search query
  const filteredActivities = activities.filter(item => {
    const matchesFilter = filterType === 'ALL' || item.action === filterType;
    const matchesSearch = 
      (item.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.resource || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.details || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.device || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalDownloads = activities.filter(a => a.action === 'DOWNLOAD').length;
  const totalViews = activities.filter(a => a.action === 'VIEW').length;
  const totalAiQueries = activities.filter(a => a.action === 'AI_QUERY').length;

  // Handle Changing User Password
  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (!passwordModalUser || !newPassword) return;

    if (passwordModalUser.username?.toLowerCase() === 'bhavya mishra' || passwordModalUser.isSuperAdmin) {
      setFeedbackMsg({ 
        type: 'error', 
        text: '🛑 Access Denied: The Master Super Admin password cannot be altered from this panel.' 
      });
      setPasswordModalUser(null);
      setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4500);
      return;
    }

    setIsUpdatingPassword(true);
    const res = await adminChangeUserPassword(passwordModalUser.username, newPassword);
    setIsUpdatingPassword(false);

    if (res.success) {
      setFeedbackMsg({ type: 'success', text: res.message });
      setPasswordModalUser(null);
      setNewPassword('');
      await loadTelemetry(false);
    } else {
      setFeedbackMsg({ type: 'error', text: res.message });
    }
    setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4500);
  };

  // Handle Deleting User Account
  const handleConfirmDelete = async () => {
    if (!deleteModalUser) return;
    setIsDeletingUser(true);

    const res = await adminDeleteUser(deleteModalUser.username);
    setIsDeletingUser(false);

    if (res.success) {
      setFeedbackMsg({ type: 'success', text: res.message });
      if (selectedAuditUser?.username?.toLowerCase() === deleteModalUser.username.toLowerCase()) {
        setSelectedAuditUser(null);
      }
      setDeleteModalUser(null);
      await loadTelemetry(false);
    } else {
      setFeedbackMsg({ type: 'error', text: res.message });
    }
    setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4500);
  };

  // Export logs as JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      exportedAt: new Date().toISOString(),
      exportedBy: 'Super Admin Bhavya Mishra',
      totalAccounts: accounts.length,
      accounts,
      auditActivities: activities
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `super_admin_audit_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setFeedbackMsg({ type: 'success', text: 'Full Audit Telemetry exported successfully as JSON!' });
    setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 3000);
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'No activity yet';
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return String(isoString);
      const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `${timeStr} • ${dateStr}`;
    } catch {
      return String(isoString);
    }
  };

  const getDeviceIcon = (deviceName = '') => {
    const d = (deviceName || '').toLowerCase();
    if (d.includes('phone') || d.includes('iphone') || d.includes('android') || d.includes('mobile')) {
      return <Smartphone size={14} color="#38bdf8" style={{ flexShrink: 0 }} />;
    }
    return <Laptop size={14} color="#38bdf8" style={{ flexShrink: 0 }} />;
  };

  const handleCopyText = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Compute audit for currently selected account
  const currentAudit = selectedAuditUser ? getAccountFullAudit(selectedAuditUser.username) : null;

  return (
    <div style={{
      marginTop: '28px',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.96) 0%, rgba(8, 12, 24, 0.98) 100%)',
      border: '2px solid #f59e0b',
      borderRadius: '16px',
      padding: '24px 28px',
      boxShadow: '0 0 40px rgba(245, 158, 11, 0.2), 0 10px 30px rgba(0, 0, 0, 0.7)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top golden accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #f59e0b, #ef4444, #3b82f6, #f59e0b)'
      }} />

      {/* Top Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px',
        borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
        paddingBottom: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b, #b45309)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
          }}>
            <Crown size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.74rem',
                fontWeight: 900,
                letterSpacing: '1.2px',
                background: '#f59e0b',
                color: '#000',
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                MASTER SUPER ADMIN ACCESS GRANTED
              </span>
              <span style={{ fontSize: '0.78rem', color: '#86efac', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                Root Active: Bhavya Mishra
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: '4px 0 0 0' }}>
              Super Admin Control Center & User Management
            </h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
              Tap any account below to inspect their <strong>Downloaded Notes</strong>, <strong>AI Doubt Inquiries</strong>, and <strong>Logging Device</strong>.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => loadTelemetry(true)}
            className="btn-outline"
            style={{ padding: '7px 14px', fontSize: '0.8rem', gap: '6px', borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fef08a', cursor: 'pointer' }}
            title="Refresh live user metrics from cloud across all devices"
            disabled={isRefreshing}
          >
            <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} /> {isRefreshing ? 'Syncing...' : 'Refresh'}
          </button>
          <button
            onClick={handleExportJSON}
            className="btn-outline"
            style={{ padding: '7px 14px', fontSize: '0.8rem', gap: '6px', borderColor: '#22c55e', color: '#86efac', cursor: 'pointer' }}
            title="Export full audit trail as JSON"
          >
            <Download size={13} /> Export Report
          </button>
        </div>
      </div>

      {/* Feedback Toast Banner */}
      {feedbackMsg.text && (
        <div style={{
          background: feedbackMsg.type === 'success' ? 'rgba(34, 197, 94, 0.18)' : 'rgba(239, 68, 68, 0.18)',
          border: `1.5px solid ${feedbackMsg.type === 'success' ? '#22c55e' : '#ef4444'}`,
          color: feedbackMsg.type === 'success' ? '#86efac' : '#fca5a5',
          padding: '10px 16px',
          borderRadius: '10px',
          fontSize: '0.86rem',
          fontWeight: 700,
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: `0 0 15px ${feedbackMsg.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
        }}>
          {feedbackMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* 4 Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '14px',
        marginBottom: '22px'
      }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Users size={14} color="#00f0ff" /> Registered Accounts
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginTop: '6px' }}>
            {accounts.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#38bdf8', marginTop: '2px' }}>
            1 Super Admin • {Math.max(0, accounts.length - 1)} Students
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Download size={14} color="#f59e0b" /> Notes Downloaded
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f59e0b', marginTop: '6px' }}>
            {totalDownloads}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#fde68a', marginTop: '2px' }}>
            Handwritten PDFs & Bundles
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Bot size={14} color="#a855f7" /> AI Doubts Solved
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#c084fc', marginTop: '6px' }}>
            {totalAiQueries}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#d8b4fe', marginTop: '2px' }}>
            CampusNotes AI Queries
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <ShieldCheck size={14} color="#22c55e" /> Admin Privileges
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#86efac', marginTop: '10px' }}>
            Full Master Access
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
            Password Edit, Deep Audit & Delete
          </div>
        </div>
      </div>

      {/* ===================================================================
         PORTAL MASTER CONTROLS & LIVE CAMPUS BROADCAST (FULL CONTROL)
         =================================================================== */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
        border: '1.5px solid rgba(139, 92, 246, 0.4)',
        borderRadius: '14px',
        padding: '18px 20px',
        marginBottom: '26px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Megaphone size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Portal Master Control & Live Campus Broadcast
              </h3>
              <span style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
                Broadcast live announcements and manage global controls across Website & Android Mobile App
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Live Indicator */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              color: '#86efac',
              fontSize: '0.74rem',
              fontWeight: 700
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.2s infinite' }} />
              Real-Time Sync Active (3s)
            </div>

            {/* Emergency Maintenance Mode Toggle */}
            <button
              onClick={handleToggleMaintenance}
              disabled={isUpdatingControls}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: controls.maintenanceMode ? '1.5px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                background: controls.maintenanceMode ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                color: controls.maintenanceMode ? '#fca5a5' : '#cbd5e1',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              title="Toggle emergency lockdown / maintenance mode across all devices"
            >
              <Power size={13} color={controls.maintenanceMode ? '#ef4444' : '#94a3b8'} />
              Maintenance: {controls.maintenanceMode ? 'LOCKED' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Global Announcement Broadcaster Form */}
        <form onSubmit={handleSaveAnnouncement} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 320px', position: 'relative' }}>
            <Bell size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a78bfa' }} />
            <input
              type="text"
              placeholder="Type live announcement for all students (e.g., '📢 Mid-Sem Notes & Lab Viva Guides uploaded!')..."
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                borderRadius: '8px',
                padding: '10px 12px 10px 36px',
                color: '#fff',
                fontSize: '0.84rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={isUpdatingControls || !announcementText.trim()}
              className="btn-primary"
              style={{ padding: '9px 16px', fontSize: '0.8rem', gap: '6px' }}
            >
              <Megaphone size={14} /> {isUpdatingControls ? 'Publishing...' : 'Publish Live Announcement'}
            </button>

            {controls.announcementActive && (
              <button
                type="button"
                onClick={handleDisableAnnouncement}
                disabled={isUpdatingControls}
                className="btn-outline"
                style={{ padding: '9px 14px', fontSize: '0.8rem', color: '#fca5a5', borderColor: '#ef4444' }}
              >
                Disable Banner
              </button>
            )}
          </div>
        </form>

        {/* Live Preview if announcement active */}
        {controls.announcementActive && controls.announcement && (
          <div style={{
            marginTop: '12px',
            background: 'rgba(124, 58, 237, 0.15)',
            border: '1px dashed #8b5cf6',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '0.78rem',
            color: '#e9d5ff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontWeight: 800, color: '#c084fc' }}>LIVE ON APP & WEB:</span>
            <span>{controls.announcement}</span>
          </div>
        )}
      </div>

      {/* Accounts Directory with Deep-Dive Inspector Trigger */}
      <div style={{ marginBottom: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fef08a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="#f59e0b" /> Registered Accounts & Device Telemetry ({accounts.length})
          </h3>
          <span style={{ fontSize: '0.74rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={13} /> <strong>Tap any row or 👁️ Inspect</strong> to view downloads, AI queries & device details
          </span>
        </div>

        <div style={{
          overflowX: 'auto',
          background: 'rgba(7, 10, 20, 0.85)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ background: 'rgba(245, 158, 11, 0.12)', borderBottom: '1.5px solid rgba(245, 158, 11, 0.25)', textAlign: 'left' }}>
                <th style={{ padding: '14px 18px', color: '#fef08a', whiteSpace: 'nowrap' }}>Username</th>
                <th style={{ padding: '14px 18px', color: '#fef08a', whiteSpace: 'nowrap' }}>Role</th>
                <th style={{ padding: '14px 18px', color: '#fef08a', whiteSpace: 'nowrap' }}>Logging Device</th>
                <th style={{ padding: '14px 18px', color: '#fef08a', textAlign: 'center', whiteSpace: 'nowrap' }}>Downloads</th>
                <th style={{ padding: '14px 18px', color: '#fef08a', textAlign: 'center', whiteSpace: 'nowrap' }}>AI Doubts</th>
                <th style={{ padding: '14px 18px', color: '#fef08a', whiteSpace: 'nowrap' }}>Last Active / Login</th>
                <th style={{ 
                  padding: '14px 18px', 
                  color: '#fef08a', 
                  textAlign: 'center', 
                  whiteSpace: 'nowrap',
                  position: 'sticky',
                  right: 0,
                  background: '#131b2e',
                  zIndex: 3,
                  boxShadow: '-4px 0 8px rgba(0, 0, 0, 0.5)'
                }}>
                  Super Admin Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, idx) => {
                const isRootAdmin = acc.username.toLowerCase() === 'bhavya mishra';
                return (
                  <tr 
                    key={idx} 
                    onClick={() => setSelectedAuditUser(acc)}
                    style={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
                      background: isRootAdmin ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isRootAdmin) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isRootAdmin) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <td style={{ padding: '14px 18px', fontWeight: 700, color: isRootAdmin ? '#f59e0b' : '#fff', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {isRootAdmin && <Crown size={16} color="#f59e0b" />}
                        <span>@{acc.username}</span>
                        {isRootAdmin && (
                          <span style={{ fontSize: '0.68rem', background: '#f59e0b', color: '#000', padding: '2px 7px', borderRadius: '4px', fontWeight: 900 }}>
                            ROOT MASTER
                          </span>
                        )}
                        {acc.updatedAt && (
                          <span style={{ 
                            fontSize: '0.66rem', 
                            background: 'rgba(34, 197, 94, 0.15)', 
                            color: '#86efac', 
                            border: '1px solid rgba(34, 197, 94, 0.35)', 
                            padding: '2px 6px', 
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}>
                            <Key size={10} /> Pass Updated
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px', color: isRootAdmin ? '#fde68a' : '#94a3b8', whiteSpace: 'nowrap' }}>
                      {isRootAdmin ? 'Super Administrator' : 'Student Account'}
                    </td>
                    <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(56, 189, 248, 0.12)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        padding: '3px 9px',
                        borderRadius: '6px',
                        color: '#bae6fd',
                        fontSize: '0.78rem',
                        fontWeight: 600
                      }}>
                        {getDeviceIcon(acc.device)}
                        <span>{acc.device || 'Windows PC (Chrome)'}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#f59e0b', fontWeight: 800, textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <span style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '3px 10px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                        {acc.downloadsCount}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#c084fc', fontWeight: 800, textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <span style={{ background: 'rgba(168, 85, 247, 0.15)', padding: '3px 10px', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Bot size={12} /> {acc.aiQueriesCount || 0}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#fef08a', fontSize: '0.84rem', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.08)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <Clock size={14} color="#f59e0b" style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: 600 }}>{formatTime(acc.lastActive)}</span>
                      </div>
                    </td>
                    <td 
                      onClick={(e) => e.stopPropagation()} 
                      style={{ 
                        padding: '14px 18px', 
                        textAlign: 'center', 
                        whiteSpace: 'nowrap',
                        position: 'sticky',
                        right: 0,
                        background: isRootAdmin ? '#1b1b1c' : '#0b1120',
                        zIndex: 2,
                        boxShadow: '-4px 0 8px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                        {/* Deep Inspect Button */}
                        <button
                          onClick={() => setSelectedAuditUser(acc)}
                          style={{
                            background: 'rgba(56, 189, 248, 0.15)',
                            border: '1px solid #38bdf8',
                            color: '#7dd3fc',
                            borderRadius: '6px',
                            padding: '6px 11px',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            transition: 'all 0.15s ease'
                          }}
                          title={`Inspect downloads and AI doubts for @${acc.username}`}
                        >
                          <Eye size={13} /> Inspect
                        </button>

                        {!isRootAdmin ? (
                          <>
                            {/* Change Password Button */}
                            <button
                              onClick={() => {
                                setPasswordModalUser(acc);
                                setNewPassword('');
                              }}
                              style={{
                                background: 'rgba(0, 240, 255, 0.15)',
                                border: '1px solid var(--neon-cyan)',
                                color: 'var(--neon-cyan)',
                                borderRadius: '6px',
                                padding: '6px 11px',
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                transition: 'all 0.15s ease'
                              }}
                              title={`Change password for @${acc.username}`}
                            >
                              <Key size={13} /> Pass
                            </button>

                            {/* Delete User Button */}
                            <button
                              onClick={() => setDeleteModalUser(acc)}
                              style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid #ef4444',
                                color: '#fca5a5',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                cursor: 'pointer',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.15s ease'
                              }}
                              title={`Delete user account @${acc.username}`}
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </>
                        ) : (
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '5px 10px',
                            background: 'rgba(245, 158, 11, 0.12)',
                            border: '1px solid rgba(245, 158, 11, 0.35)',
                            borderRadius: '6px',
                            color: '#fbbf24',
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}>
                            <Lock size={12} color="#f59e0b" /> Root Protected
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Download & View Audit Trail */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fef08a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="#00f0ff" /> Live System Telemetry Stream ({filteredActivities.length} Events)
            </h3>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              color: '#86efac',
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              padding: '2px 8px',
              borderRadius: '12px',
              fontWeight: 700
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.2s infinite' }} />
              LIVE REAL-TIME STREAM
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: '6px', background: 'rgba(255, 255, 255, 0.05)', padding: '3px', borderRadius: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'ALL', label: 'All' },
                { id: 'AI_QUERY', label: '🤖 AI Doubts' },
                { id: 'DOWNLOAD', label: '📥 Downloads' },
                { id: 'VIEW', label: '👁️ Views' },
                { id: 'AUTH', label: '🔑 Logins' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: filterType === tab.id ? '#f59e0b' : 'transparent',
                    color: filterType === tab.id ? '#000' : '#94a3b8',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Clear Stream Button */}
            <button
              onClick={handleClearTelemetryStream}
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Clear live telemetry event stream"
            >
              <Trash2 size={12} /> Clear Stream
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            placeholder="Search activities by username, note title, doubt question, or device..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: 'rgba(7, 10, 20, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '9px 12px 9px 34px',
              color: '#fff',
              fontSize: '0.84rem'
            }}
          />
        </div>

        {/* Activity Items List */}
        <div style={{
          maxHeight: '340px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          paddingRight: '4px'
        }}>
          {filteredActivities.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
              No activities matching the current filter.
            </div>
          ) : (
            filteredActivities.map(item => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    padding: '3px 7px',
                    borderRadius: '6px',
                    background: 
                      item.action === 'AI_QUERY' ? 'rgba(168, 85, 247, 0.2)' :
                      item.action === 'DOWNLOAD' ? 'rgba(245, 158, 11, 0.2)' : 
                      item.action === 'VIEW' ? 'rgba(0, 240, 255, 0.18)' : 'rgba(34, 197, 94, 0.2)',
                    color: item.badgeColor || (item.action === 'AI_QUERY' ? '#c084fc' : '#fff'),
                    border: `1.5px solid ${item.badgeColor || '#a855f7'}`,
                    whiteSpace: 'nowrap',
                    marginTop: '2px'
                  }}>
                    {item.action === 'AI_QUERY' ? '🤖 AI QUERY' :
                     item.action === 'DOWNLOAD' ? '📥 DOWNLOAD' : 
                     item.action === 'VIEW' ? '👁️ VIEW' : '🔑 AUTH'}
                  </span>

                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff' }}>
                      {item.resource}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '2px' }}>
                      {item.details}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span>Account: <strong style={{ color: item.username.toLowerCase() === 'bhavya mishra' ? '#f59e0b' : '#38bdf8' }}>@{item.username}</strong></span>
                      {item.device && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
                          • {getDeviceIcon(item.device)} {item.device}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#64748b', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {formatTime(item.timestamp)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===================================================================
         MODAL 1: ACCOUNT ACTIVITY & AI DOUBTS INSPECTOR (SUPER ADMIN)
         =================================================================== */}
      {selectedAuditUser && currentAudit && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9998,
          padding: '16px'
        }}>
          <div style={{
            background: 'linear-gradient(180deg, #0b1120 0%, #070a14 100%)',
            border: '2px solid #38bdf8',
            borderRadius: '16px',
            padding: '24px',
            width: '100%',
            maxWidth: '780px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 0 50px rgba(56, 189, 248, 0.35)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedAuditUser(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: selectedAuditUser.username.toLowerCase() === 'bhavya mishra' 
                  ? 'linear-gradient(135deg, #f59e0b, #b45309)' 
                  : 'linear-gradient(135deg, #38bdf8, #1d4ed8)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)'
              }}>
                {selectedAuditUser.username.toLowerCase() === 'bhavya mishra' ? <Crown size={26} /> : <Users size={24} />}
              </div>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#fff', fontWeight: 900 }}>
                    @{selectedAuditUser.username}
                  </h3>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: selectedAuditUser.username.toLowerCase() === 'bhavya mishra' ? '#f59e0b' : 'rgba(56, 189, 248, 0.2)',
                    color: selectedAuditUser.username.toLowerCase() === 'bhavya mishra' ? '#000' : '#38bdf8',
                    border: `1px solid ${selectedAuditUser.username.toLowerCase() === 'bhavya mishra' ? '#f59e0b' : 'rgba(56, 189, 248, 0.4)'}`
                  }}>
                    {selectedAuditUser.username.toLowerCase() === 'bhavya mishra' ? 'SUPER ADMIN (ROOT)' : 'STUDENT'}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span>Last active: {formatTime(selectedAuditUser.lastActive)}</span>
                </div>
              </div>

              {/* Prominent Logging Device Badge */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1.5px solid #38bdf8',
                borderRadius: '10px',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.2)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getDeviceIcon(selectedAuditUser.device)}
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 800 }}>
                    Logged In With Device
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#e0f2fe', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                    {selectedAuditUser.device || 'Windows PC (Chrome)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Metric pill summary */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '10px',
              marginBottom: '16px'
            }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#fde68a', fontWeight: 700 }}>📥 Notes Downloaded</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#f59e0b', marginTop: '2px' }}>{currentAudit.downloads.length}</div>
              </div>
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#e9d5ff', fontWeight: 700 }}>🤖 AI Questions Asked</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#c084fc', marginTop: '2px' }}>{currentAudit.aiQueries.length}</div>
              </div>
              <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#bae6fd', fontWeight: 700 }}>👁️ Units Read</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#38bdf8', marginTop: '2px' }}>{currentAudit.views.length}</div>
              </div>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#bbf7d0', fontWeight: 700 }}>📊 Total Actions</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#4ade80', marginTop: '2px' }}>{currentAudit.allActivities.length}</div>
              </div>
            </div>

            {/* Inspector Navigation Tabs */}
            <div style={{
              display: 'flex',
              gap: '8px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '10px',
              marginBottom: '14px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setAuditTab('ai')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: auditTab === 'ai' ? '1.5px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                  background: auditTab === 'ai' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: auditTab === 'ai' ? '#e9d5ff' : '#94a3b8',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Bot size={14} color="#c084fc" /> AI Doubts Asked ({currentAudit.aiQueries.length})
              </button>

              <button
                onClick={() => setAuditTab('downloads')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: auditTab === 'downloads' ? '1.5px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  background: auditTab === 'downloads' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: auditTab === 'downloads' ? '#fde68a' : '#94a3b8',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={14} color="#f59e0b" /> Downloads ({currentAudit.downloads.length})
              </button>

              <button
                onClick={() => setAuditTab('views')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: auditTab === 'views' ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                  background: auditTab === 'views' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: auditTab === 'views' ? '#bae6fd' : '#94a3b8',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Eye size={14} color="#38bdf8" /> Viewed Units ({currentAudit.views.length})
              </button>

              <button
                onClick={() => setAuditTab('timeline')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: auditTab === 'timeline' ? '1.5px solid #22c55e' : '1px solid rgba(255,255,255,0.1)',
                  background: auditTab === 'timeline' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.03)',
                  color: auditTab === 'timeline' ? '#bbf7d0' : '#94a3b8',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Activity size={14} color="#4ade80" /> Full Timeline ({currentAudit.allActivities.length})
              </button>
            </div>

            {/* Tab Body */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              paddingRight: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {/* TAB 1: AI DOUBTS ASKED */}
              {auditTab === 'ai' && (
                currentAudit.aiQueries.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px', color: '#64748b', fontSize: '0.88rem' }}>
                    <Bot size={34} style={{ margin: '0 auto 10px', display: 'block', opacity: 0.5 }} />
                    No AI academic doubts asked yet by <strong>@{selectedAuditUser.username}</strong>.
                  </div>
                ) : (
                  currentAudit.aiQueries.map((query, qIdx) => (
                    <div
                      key={qIdx}
                      style={{
                        background: 'rgba(168, 85, 247, 0.06)',
                        border: '1.5px solid rgba(168, 85, 247, 0.3)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        position: 'relative'
                      }}
                    >
                      {/* Top tags */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{
                            background: '#a855f7',
                            color: '#fff',
                            fontSize: '0.72rem',
                            fontWeight: 900,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            textTransform: 'uppercase'
                          }}>
                            {query.resource || 'Academic Doubt'}
                          </span>
                          <span style={{
                            fontSize: '0.72rem',
                            color: '#cbd5e1',
                            background: 'rgba(255, 255, 255, 0.06)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {getDeviceIcon(query.device || selectedAuditUser.device)}
                            {query.device || selectedAuditUser.device}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={11} /> {formatTime(query.timestamp)}
                        </span>
                      </div>

                      {/* Question */}
                      <div style={{
                        fontSize: '0.94rem',
                        fontWeight: 700,
                        color: '#f3e8ff',
                        marginBottom: '10px',
                        lineHeight: 1.4,
                        padding: '8px 10px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '6px',
                        borderLeft: '3px solid #a855f7'
                      }}>
                        ❓ "{query.details}"
                      </div>

                      {/* AI Solution display */}
                      {query.fullAnswer ? (
                        <div style={{
                          background: 'rgba(7, 10, 20, 0.9)',
                          border: '1px solid rgba(168, 85, 247, 0.25)',
                          borderRadius: '8px',
                          padding: '12px',
                          marginTop: '8px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#c084fc', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Cpu size={12} /> AI Mentor Solution Generated:
                            </span>
                            <button
                              onClick={() => handleCopyText(query.fullAnswer, qIdx)}
                              style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: '#cbd5e1',
                                borderRadius: '4px',
                                padding: '2px 7px',
                                fontSize: '0.7rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              {copiedId === qIdx ? <Check size={11} color="#4ade80" /> : <Copy size={11} />}
                              {copiedId === qIdx ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                          <pre style={{
                            margin: 0,
                            fontSize: '0.78rem',
                            color: '#e2e8f0',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            fontFamily: 'monospace',
                            lineHeight: 1.5
                          }}>
                            {query.fullAnswer}
                          </pre>
                        </div>
                      ) : query.solutionSnippet ? (
                        <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontStyle: 'italic', marginTop: '4px' }}>
                          💡 Answer preview: {query.solutionSnippet}...
                        </div>
                      ) : null}
                    </div>
                  ))
                )
              )}

              {/* TAB 2: DOWNLOADS */}
              {auditTab === 'downloads' && (
                currentAudit.downloads.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px', color: '#64748b', fontSize: '0.88rem' }}>
                    <Download size={34} style={{ margin: '0 auto 10px', display: 'block', opacity: 0.5 }} />
                    No notes downloaded yet by <strong>@{selectedAuditUser.username}</strong>.
                  </div>
                ) : (
                  currentAudit.downloads.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      style={{
                        background: 'rgba(245, 158, 11, 0.05)',
                        border: '1px solid rgba(245, 158, 11, 0.25)',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fde68a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Download size={14} color="#f59e0b" /> {item.resource}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '3px' }}>
                          {item.details}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {getDeviceIcon(item.device || selectedAuditUser.device)} Downloaded using: {item.device || selectedAuditUser.device}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap', textAlign: 'right' }}>
                        <Clock size={11} style={{ verticalAlign: 'middle', marginRight: '3px' }} />
                        {formatTime(item.timestamp)}
                      </div>
                    </div>
                  ))
                )
              )}

              {/* TAB 3: VIEWED UNITS */}
              {auditTab === 'views' && (
                currentAudit.views.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px', color: '#64748b', fontSize: '0.88rem' }}>
                    <Eye size={34} style={{ margin: '0 auto 10px', display: 'block', opacity: 0.5 }} />
                    No units viewed yet by <strong>@{selectedAuditUser.username}</strong>.
                  </div>
                ) : (
                  currentAudit.views.map((item, vIdx) => (
                    <div
                      key={vIdx}
                      style={{
                        background: 'rgba(56, 189, 248, 0.05)',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#bae6fd', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Eye size={14} color="#38bdf8" /> {item.resource}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '3px' }}>
                          {item.details}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                        {formatTime(item.timestamp)}
                      </div>
                    </div>
                  ))
                )
              )}

              {/* TAB 4: FULL TIMELINE */}
              {auditTab === 'timeline' && (
                currentAudit.allActivities.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px', color: '#64748b', fontSize: '0.88rem' }}>
                    No recorded activities for this user.
                  </div>
                ) : (
                  currentAudit.allActivities.map((act, aIdx) => (
                    <div
                      key={aIdx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: act.action === 'AI_QUERY' ? '#a855f7' : act.action === 'DOWNLOAD' ? '#f59e0b' : '#38bdf8',
                          color: '#000'
                        }}>
                          {act.action}
                        </span>
                        <div>
                          <div style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600 }}>{act.resource}</div>
                          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{act.details}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                        {formatTime(act.timestamp)}
                      </div>
                    </div>
                  ))
                )
              )}
            </div>

            {/* Modal Bottom Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {selectedAuditUser.username.toLowerCase() !== 'bhavya mishra' && (
                  <>
                    <button
                      onClick={() => {
                        setPasswordModalUser(selectedAuditUser);
                        setNewPassword('');
                      }}
                      className="btn-outline"
                      style={{ padding: '7px 12px', fontSize: '0.78rem', borderColor: '#00f0ff', color: '#00f0ff' }}
                    >
                      <Key size={13} /> Change Password
                    </button>
                    <button
                      onClick={() => {
                        setDeleteModalUser(selectedAuditUser);
                      }}
                      className="btn-outline"
                      style={{ padding: '7px 12px', fontSize: '0.78rem', borderColor: '#ef4444', color: '#fca5a5' }}
                    >
                      <Trash2 size={13} /> Delete User
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setSelectedAuditUser(null)}
                className="btn-primary"
                style={{ padding: '7px 16px', fontSize: '0.8rem' }}
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
         MODAL 2: CHANGE USER PASSWORD (SUPER ADMIN ONLY)
         =================================================================== */}
      {passwordModalUser && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '16px'
        }}>
          <div style={{
            background: '#0d1326',
            border: '2px solid #00f0ff',
            borderRadius: '16px',
            padding: '28px',
            width: '100%',
            maxWidth: '460px',
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.4)',
            position: 'relative'
          }}>
            <button
              onClick={() => setPasswordModalUser(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(0, 240, 255, 0.15)',
                color: 'var(--neon-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Key size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>
                  Reset User Password
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#38bdf8' }}>
                  Target Account: @{passwordModalUser.username}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '16px' }}>
              As Super Admin, you can set a new secure password for <strong>@{passwordModalUser.username}</strong>. The password will be hashed with cryptographic PBKDF2 with 10,000 rounds and salted immediately.
            </p>

            <form onSubmit={handleSavePassword}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fef08a' }}>New Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
                      let pass = 'Pass#';
                      for (let i = 0; i < 4; i++) {
                        pass += chars.charAt(Math.floor(Math.random() * chars.length));
                      }
                      pass += '2026';
                      setNewPassword(pass);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--neon-cyan)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Sparkles size={11} /> Generate Strong
                  </button>
                </div>

                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="text"
                    required
                    placeholder="Enter new password (min 5 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '11px 12px 11px 36px',
                      borderRadius: '8px',
                      background: 'rgba(7, 10, 20, 0.9)',
                      border: '1.5px solid var(--neon-cyan)',
                      color: '#fff',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPasswordModalUser(null)}
                  className="btn-outline"
                  style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="btn-primary"
                  style={{ flex: 2, padding: '10px', justifyContent: 'center', gap: '6px' }}
                >
                  <CheckCircle2 size={16} />
                  {isUpdatingPassword ? 'Updating Hash...' : 'Save New Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
         MODAL 3: DELETE USER CONFIRMATION (SUPER ADMIN ONLY)
         =================================================================== */}
      {deleteModalUser && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '16px'
        }}>
          <div style={{
            background: '#140c15',
            border: '2px solid #ef4444',
            borderRadius: '16px',
            padding: '28px',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)',
            position: 'relative'
          }}>
            <button
              onClick={() => setDeleteModalUser(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.18)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Trash2 size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>
                  Permanently Delete User
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#fca5a5' }}>
                  Target: @{deleteModalUser.username}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '20px' }}>
              Are you sure you want to delete <strong>@{deleteModalUser.username}</strong>? Their login credentials and stored session tokens will be permanently expunged from the academic portal database.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setDeleteModalUser(null)}
                className="btn-outline"
                style={{ flex: 1, padding: '10px', justifyContent: 'center' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeletingUser}
                style={{
                  flex: 1.5,
                  padding: '10px',
                  background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                }}
              >
                <Trash2 size={16} />
                {isDeletingUser ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
