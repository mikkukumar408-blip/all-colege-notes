/* =========================================================================
   SUPER ADMIN TELEMETRY & USER MANAGEMENT CONSOLE (SuperAdminPanel.jsx)
   =========================================================================
   Visible ONLY to Master Super Admin (@Bhavya Mishra).
   Features:
   1. Total Registered Accounts counter and directory
   2. Super Admin actions: CHANGE USER PASSWORD & PERMANENTLY DELETE USER
   3. Comprehensive audit log of what each account downloaded and viewed
   4. Search, filter by action, export report, and refresh telemetry
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
  ShieldAlert
} from 'lucide-react';
import { 
  getAllAccountsWithStats, 
  getUserActivities, 
  adminChangeUserPassword, 
  adminDeleteUser,
  resetActivityLogs 
} from '../utils/activityTracker';
import { pullCloudUsers, authBroadcastChannel } from '../utils/cloudSync';

export default function SuperAdminPanel() {
  const [accounts, setAccounts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'DOWNLOAD' | 'VIEW' | 'AUTH'
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState({ type: '', text: '' });

  // Modal State for Changing Password
  const [passwordModalUser, setPasswordModalUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Modal State for Deleting User
  const [deleteModalUser, setDeleteModalUser] = useState(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Load telemetry data with live cloud syncing
  const loadTelemetry = async (showToast = false) => {
    setIsRefreshing(true);
    try {
      // 1. Pull fresh registered accounts from serverless cloud across all devices
      const freshCloudUsers = await pullCloudUsers().catch(() => null);

      // 2. Aggregate telemetry & accounts
      const accs = getAllAccountsWithStats(freshCloudUsers);
      const acts = getUserActivities();
      setAccounts(accs);
      setActivities(acts);

      if (showToast) {
        setFeedbackMsg({
          type: 'success',
          text: `⚡ Live Cloud Refreshed! Synced ${accs.length} accounts across all devices & sessions.`
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

    // Instant cross-tab real-time sync when a user is created or password is changed in any tab
    const handleBroadcast = (e) => {
      if (e?.data?.type === 'USERS_UPDATED' || e?.data?.type === 'USER_CREATED') {
        const freshUsers = e.data.users || null;
        const accs = getAllAccountsWithStats(freshUsers);
        setAccounts(accs);
      }
    };

    authBroadcastChannel.addEventListener('message', handleBroadcast);

    // Multi-device cloud polling every 5 seconds
    const interval = setInterval(() => {
      loadTelemetry(false);
    }, 5000);

    return () => {
      authBroadcastChannel.removeEventListener('message', handleBroadcast);
      clearInterval(interval);
    };
  }, []);

  // Filter activities based on tab and search query
  const filteredActivities = activities.filter(item => {
    const matchesFilter = filterType === 'ALL' || item.action === filterType;
    const matchesSearch = 
      (item.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.resource || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.details || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalDownloads = activities.filter(a => a.action === 'DOWNLOAD').length;
  const totalViews = activities.filter(a => a.action === 'VIEW').length;

  // Handle Changing User Password
  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (!passwordModalUser || !newPassword) return;
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

  // Generate random password helper
  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pass = 'Pass#';
    for (let i = 0; i < 4; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    pass += '2026';
    setNewPassword(pass);
  };

  // Handle Deleting User Account
  const handleConfirmDelete = async () => {
    if (!deleteModalUser) return;
    setIsDeletingUser(true);

    const res = await adminDeleteUser(deleteModalUser.username);
    setIsDeletingUser(false);

    if (res.success) {
      setFeedbackMsg({ type: 'success', text: res.message });
      setDeleteModalUser(null);
      await loadTelemetry(false);
    } else {
      setFeedbackMsg({ type: 'error', text: res.message });
    }
    setTimeout(() => setFeedbackMsg({ type: '', text: '' }), 4500);
  };

  // Export logs as JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      exportedAt: new Date().toISOString(),
      exportedBy: 'Super Admin',
      totalAccounts: accounts.length,
      accounts,
      auditActivities: activities
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `super_admin_audit_${Date.now()}.json`);
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
              Full master clearance: Modify student passwords, delete accounts, and inspect downloads & reading logs.
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
            <Eye size={14} color="#38bdf8" /> Notes & Units Viewed
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#38bdf8', marginTop: '6px' }}>
            {totalViews}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#93c5fd', marginTop: '2px' }}>
            Interactive Reader Sessions
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
            Password Edit & Delete Unlocked
          </div>
        </div>
      </div>

      {/* Accounts Directory with Change Password & Delete User Actions */}
      <div style={{ marginBottom: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fef08a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="#f59e0b" /> Registered Accounts & Access Controls ({accounts.length})
          </h3>
          <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
            Click <b>🔑 Key</b> to change password • <b>🗑️ Trash</b> to delete user
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
                <th style={{ padding: '14px 18px', color: '#fef08a', textAlign: 'center', whiteSpace: 'nowrap' }}>Downloads</th>
                <th style={{ padding: '14px 18px', color: '#fef08a', textAlign: 'center', whiteSpace: 'nowrap' }}>Views</th>
                <th style={{ padding: '14px 18px', color: '#fef08a', whiteSpace: 'nowrap' }}>Date & Time of Login / Activity</th>
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
                  <tr key={idx} style={{ 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
                    background: isRootAdmin ? 'rgba(245, 158, 11, 0.08)' : 'transparent' 
                  }}>
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
                    <td style={{ padding: '14px 18px', color: '#f59e0b', fontWeight: 800, textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <span style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '3px 10px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                        {acc.downloadsCount}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#38bdf8', fontWeight: 800, textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <span style={{ background: 'rgba(0, 240, 255, 0.12)', padding: '3px 10px', borderRadius: '12px', border: '1px solid rgba(0, 240, 255, 0.25)' }}>
                        {acc.viewsCount}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: '#fef08a', fontSize: '0.84rem', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.08)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <Clock size={14} color="#f59e0b" style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: 600 }}>{formatTime(acc.lastActive)}</span>
                      </div>
                    </td>
                    <td style={{ 
                      padding: '14px 18px', 
                      textAlign: 'center', 
                      whiteSpace: 'nowrap',
                      position: 'sticky',
                      right: 0,
                      background: isRootAdmin ? '#1b1b1c' : '#0b1120',
                      zIndex: 2,
                      boxShadow: '-4px 0 8px rgba(0, 0, 0, 0.5)'
                    }}>
                      <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
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
                            padding: '6px 12px',
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
                          <Key size={14} /> Change Pass
                        </button>

                        {/* Delete User Button (Disabled for Root Master Admin) */}
                        {!isRootAdmin ? (
                          <button
                            onClick={() => setDeleteModalUser(acc)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid #ef4444',
                              color: '#fca5a5',
                              borderRadius: '6px',
                              padding: '6px 12px',
                              cursor: 'pointer',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              transition: 'all 0.15s ease'
                            }}
                            title={`Delete user account @${acc.username}`}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.74rem', color: '#64748b', fontStyle: 'italic', padding: '0 6px' }}>
                            Protected (Master Root)
                          </span>
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
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fef08a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="#00f0ff" /> Live Activity & Download Audit Log ({filteredActivities.length} Events)
          </h3>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(255, 255, 255, 0.05)', padding: '3px', borderRadius: '8px' }}>
            {[
              { id: 'ALL', label: 'All' },
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
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            placeholder="Search activities by username, resource, or details..."
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
                    background: item.action === 'DOWNLOAD' ? 'rgba(245, 158, 11, 0.2)' : item.action === 'VIEW' ? 'rgba(0, 240, 255, 0.18)' : 'rgba(34, 197, 94, 0.2)',
                    color: item.badgeColor,
                    border: `1px solid ${item.badgeColor}`,
                    whiteSpace: 'nowrap',
                    marginTop: '2px'
                  }}>
                    {item.action === 'DOWNLOAD' ? '📥 DOWNLOAD' : item.action === 'VIEW' ? '👁️ VIEW' : '🔑 AUTH'}
                  </span>

                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff' }}>
                      {item.resource}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                      {item.details}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
                      Account: <strong style={{ color: item.username.toLowerCase() === 'bhavya mishra' ? '#f59e0b' : '#38bdf8' }}>@{item.username}</strong>
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
         MODAL 1: CHANGE USER PASSWORD (SUPER ADMIN ONLY)
         =================================================================== */}
      {passwordModalUser && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
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
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(0, 240, 255, 0.15)',
                color: 'var(--neon-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Key size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>
                  Change User Password
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--neon-cyan)' }}>
                  Target: @{passwordModalUser.username}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '18px' }}>
              As Super Admin, you can set a new password for <strong>@{passwordModalUser.username}</strong>. The new password will be encrypted with PBKDF2-100k rounds and salt.
            </p>

            <form onSubmit={handleSavePassword} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 700 }}>
                    NEW PASSWORD:
                  </label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--neon-cyan)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Sparkles size={12} /> Generate Random
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
         MODAL 2: DELETE USER CONFIRMATION (SUPER ADMIN ONLY)
         =================================================================== */}
      {deleteModalUser && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(8px)',
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
