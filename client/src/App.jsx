/* =========================================================================
   MAIN APP ROUTER & LAYOUT CONTAINER (App.jsx)
   =========================================================================
   EDIT THIS FILE to:
   1. Change default opening tab (`activeTab` state, defaults to 'subjects-notes')
   2. Map or add tabs in `renderActiveSection()`
   3. Edit page headers & breadcrumbs in `getSectionTitle()`
   4. Customize top navbar quick-action buttons (e.g. "Download Notes")
   ========================================================================= */

import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import NowShowing from './components/NowShowing';
import SensoryLab from './components/SensoryLab';
import TechGuide from './components/TechGuide';
import Theaters from './components/Theaters';
import SeatBooking from './components/SeatBooking';
import FanReviews from './components/FanReviews';
import SecurityShield from './components/SecurityShield';
import AuthPage from './components/AuthPage';
import SuperAdminPanel from './components/SuperAdminPanel';
import DeepSearchModal from './components/DeepSearchModal';
import CampusAIChatbot from './components/CampusAIChatbot';
import { initialSubjects } from './data/mockData';
import { Menu, ChevronLeft, ChevronRight, GraduationCap, ShieldCheck, Download, BookOpen, User, LogOut, Sparkles, Bot } from 'lucide-react';
import { logSecurityEvent } from './utils/security';
import { removeDeviceSession, checkDeviceSessionActive, pullCloudUsers } from './utils/cloudSync';
import './App.css';

export default function App() {
  /* -----------------------------------------------------------------------
     0. USER AUTHENTICATION & SESSION STATE
     ----------------------------------------------------------------------- */
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      // Clear legacy localStorage so opening the link requires logging in
      localStorage.removeItem('college_notes_auth_user');
      const saved = sessionStorage.getItem('college_notes_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Zero-Trust Session Inactivity Timeout Guard (30 Minutes)
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    if (!currentUser) return;

    const resetActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach((evt) => window.addEventListener(evt, resetActivity, { passive: true }));

    // Check every 30 seconds
    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActivityRef.current;
      const MAX_IDLE_MS = 30 * 60 * 1000; // 30 minutes

      if (idleTime > MAX_IDLE_MS) {
        logSecurityEvent('SESSION_IDLE_TIMEOUT', `Auto-lockout engaged for @${currentUser.username} after 30m inactivity`, 'WARN');
        try {
          sessionStorage.removeItem('college_notes_auth_user');
          localStorage.removeItem('college_notes_auth_user');
        } catch (e) {}
        setCurrentUser(null);
        return;
      }

      // Check 2-Device Simultaneous Limit Heartbeat
      checkDeviceSessionActive(currentUser.username).then((active) => {
        if (!active) {
          logSecurityEvent('DEVICE_LIMIT_DISPLACED', `Session displaced for @${currentUser.username} (max 2 devices limit)`, 'WARN');
          try {
            sessionStorage.removeItem('college_notes_auth_user');
            localStorage.removeItem('college_notes_auth_user');
          } catch (e) {}
          alert("⚠️ Session Terminated: This account reached the 2-device simultaneous limit or was signed out from another device.");
          setCurrentUser(null);
        }
      }).catch(() => {});
    }, 25000);

    return () => {
      clearInterval(interval);
      activityEvents.forEach((evt) => window.removeEventListener(evt, resetActivity));
    };
  }, [currentUser]);
  /* -----------------------------------------------------------------------
     1. ACTIVE TAB STATE
     Available values:
     - 'subjects-notes' : Semester Notes & Subject Catalog (Section 1)
     - 'notes-reader'   : In-Browser Notes Reader (Section 2)
     - 'syllabus'       : Official Syllabus & Curriculum (Section 3)
     - 'short-notes'    : Short Notes & Exam Revision Sheets (Section 4)
     - 'downloads-lab'  : Lab Manuals & Download Hub (Section 5)
     - 'doubt-forum'    : Student Q&A Community Forum (Section 6)
     ----------------------------------------------------------------------- */
  const [activeTab, setActiveTab] = useState('subjects-notes');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isUnitsCollapsed, setIsUnitsCollapsed] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // AI DeepSearch Assistant & 16:9 Presentation Slides State
  const [deepSearchOpen, setDeepSearchOpen] = useState(false);
  const [deepSearchInitialQuery, setDeepSearchInitialQuery] = useState('');

  // Global Hotkey Listener: Alt + Space or Ctrl + K for DeepSearch Ecosystem HUD
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.altKey && e.code === 'Space') || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setDeepSearchOpen(prev => !prev);
      }
    };

    const handleOpenDeepSearchEvent = (e) => {
      if (e.detail?.query) {
        setDeepSearchInitialQuery(e.detail.query);
      }
      setDeepSearchOpen(true);
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('open-deepsearch', handleOpenDeepSearchEvent);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('open-deepsearch', handleOpenDeepSearchEvent);
    };
  }, []);

  /* -----------------------------------------------------------------------
     2. CROSS-SECTION ACTION HANDLERS
     Passes selected subject data from catalog to reader or download hub
     ----------------------------------------------------------------------- */
  const ALLOWED_CORE_IDS = ['sub-beee', 'sub-aiml', 'sub-m1', 'sub-c1', 'sub-webtech', 'sub-p1', 'sub-physics', 'sub-py', 'sub-python', 'sub-dsa-bcse007', 'sub-bcse007'];
  const isSubjectValid = (subject) => {
    if (!subject) return false;
    // CS301 (Data Structures and Algorithms) is dead as per user instructions
    if (subject.id === 'sub-dsa' || subject.code === 'CS301') return false;
    if (ALLOWED_CORE_IDS.includes(subject.id)) return true;
    const code = (subject.code || '').toUpperCase().trim();
    return ['BELE-001', 'EE101', 'BCSE-011', 'BMAT-001', 'BCSE-008', 'CS102', 'BCSE-012', 'PHYS102', 'BPHY-001', 'BCSE-004', 'PYTHON', 'BCSE-007'].includes(code);
  };

  const handleSelectSubjectForDownload = (subject) => {
    if (!isSubjectValid(subject)) return;
    setSelectedSubject(subject);
    setActiveTab('downloads-lab');
  };

  const handleOpenNotesReader = (subject) => {
    if (!isSubjectValid(subject)) return;
    setSelectedSubject(subject);
    setActiveTab('notes-reader');
  };

  /* -----------------------------------------------------------------------
     3. TAB SWITCH ROUTER
     Renders the active component based on `activeTab`
     ----------------------------------------------------------------------- */
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'subjects-notes':
        return (
          <NowShowing 
            onSelectSubject={handleSelectSubjectForDownload} 
            onReadNotes={handleOpenNotesReader} 
          />
        );
      case 'notes-reader':
        return (
          <SensoryLab 
            currentUser={currentUser}
            movieContext={selectedSubject} 
            isUnitsCollapsed={isUnitsCollapsed}
            setIsUnitsCollapsed={setIsUnitsCollapsed}
          />
        );
      case 'syllabus':
        return <TechGuide />;
      case 'short-notes':
        return <Theaters currentUser={currentUser} />;
      case 'downloads-lab':
        return <SeatBooking currentUser={currentUser} preselectedMovie={selectedSubject} />;
      case 'doubt-forum':
        return <FanReviews currentUser={currentUser} />;
      case 'admin-panel':
        return <SuperAdminPanel />;
      default:
        return (
          <NowShowing 
            onSelectSubject={handleSelectSubjectForDownload} 
            onReadNotes={handleOpenNotesReader} 
          />
        );
    }
  };

  /* -----------------------------------------------------------------------
     4. DYNAMIC SECTION TITLES (Top Header Banner)
     ----------------------------------------------------------------------- */
  const getSectionTitle = () => {
    switch (activeTab) {
      case 'subjects-notes': return 'Semester Notes & Subjects';
      case 'notes-reader': return 'Interactive Notes Reader';
      case 'syllabus': return 'Syllabus & Curriculum';
      case 'short-notes': return 'Short Notes & Exam Revision Sheets';
      case 'downloads-lab': return 'Lab Manuals & Downloads';
      case 'doubt-forum': return 'Student Doubt Forum';
      case 'admin-panel': return 'Super Admin Control Center';
      default: return 'College Academic Portal';
    }
  };

  const isSuperAdmin = (currentUser?.username?.toLowerCase() === 'bhavya mishra') || (currentUser?.role === 'superadmin') || (currentUser?.isSuperAdmin === true) || (currentUser?.role === 'admin');

  // 4DX Authentication Guard: Show login/create account page if not signed in
  if (!currentUser) {
    return (
      <AuthPage 
        onLogin={(user) => {
          setCurrentUser(user);
          try {
            sessionStorage.setItem('college_notes_auth_user', JSON.stringify(user));
            localStorage.setItem('college_notes_has_account', 'true');
            if (user?.username) {
              localStorage.setItem('college_notes_last_username', user.username);
            }
          } catch (e) {}
        }} 
      />
    );
  }

  return (
    <div className="app-wrapper">
      {/* Collapsible Sidebar Navigation */}
      <Sidebar 
        currentUser={currentUser}
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className={`main-viewport ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        {/* -----------------------------------------------------------------
           5. TOP STICKY NAVBAR
           Contains sidebar collapse toggle, section title, and quick download
           ----------------------------------------------------------------- */}
        <header className="top-navbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1, marginRight: '8px' }}>
            <button 
              className="sidebar-toggle-btn"
              onClick={() => {
                if (activeTab === 'notes-reader') {
                  setIsUnitsCollapsed(!isUnitsCollapsed);
                } else {
                  if (window.innerWidth <= 900) {
                    setSidebarOpen(!sidebarOpen);
                  } else {
                    setIsSidebarCollapsed(!isSidebarCollapsed);
                  }
                }
              }}
              title={
                activeTab === 'notes-reader'
                  ? (isUnitsCollapsed ? "Open Select Subject Section (>)" : "Close Select Subject Section (<)")
                  : (isSidebarCollapsed ? "Expand Sidebar (>)" : "Collapse Sidebar (<)")
              }
              style={{
                color: (activeTab === 'notes-reader' && isUnitsCollapsed) ? 'var(--neon-cyan)' : undefined,
                borderColor: (activeTab === 'notes-reader' && isUnitsCollapsed) ? 'var(--neon-cyan)' : undefined,
                background: (activeTab === 'notes-reader' && isUnitsCollapsed) ? 'rgba(0, 240, 255, 0.15)' : undefined
              }}
            >
              {activeTab === 'notes-reader'
                ? (isUnitsCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />)
                : (isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />)
              }
            </button>
            <div className="nav-title-group">
              <h2>{getSectionTitle()}</h2>
              <p>University Study Portal • All 4 Years & 8 Semesters</p>
            </div>
          </div>

          <div className="top-actions">
            {/* Security Shield: Unrestricted for Admin accounts, active for normal students */}
            <SecurityShield 
              enabled={!isSuperAdmin} 
              isAdmin={isSuperAdmin}
              showBadge={false} 
              watermarkId={`STU-${(currentUser?.username || 'STUDENT').toUpperCase()}-BEEE-8491`} 
            />
            
            <div 
              onClick={() => {
                if (currentUser?.username?.toLowerCase() === 'bhavya mishra' || currentUser?.role === 'superadmin') {
                  setActiveTab('admin-panel');
                }
              }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: (currentUser?.username?.toLowerCase() === 'bhavya mishra' || currentUser?.role === 'superadmin') ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 240, 255, 0.08)', 
                border: (currentUser?.username?.toLowerCase() === 'bhavya mishra' || currentUser?.role === 'superadmin') ? '1.5px solid #f59e0b' : '1px solid rgba(0, 240, 255, 0.25)', 
                padding: '6px 14px', 
                borderRadius: '20px',
                boxShadow: (currentUser?.username?.toLowerCase() === 'bhavya mishra' || currentUser?.role === 'superadmin') ? '0 0 15px rgba(245, 158, 11, 0.25)' : 'none',
                cursor: (currentUser?.username?.toLowerCase() === 'bhavya mishra' || currentUser?.role === 'superadmin') ? 'pointer' : 'default',
                transition: 'transform 0.15s ease'
              }}
              title={(currentUser?.username?.toLowerCase() === 'bhavya mishra' || currentUser?.role === 'superadmin') ? 'Click to jump to Super Admin Panel' : undefined}
            >
              <User size={15} color={(currentUser?.username?.toLowerCase() === 'bhavya mishra' || currentUser?.role === 'superadmin') ? '#f59e0b' : 'var(--neon-cyan)'} />
              <span style={{ 
                fontSize: '0.78rem', 
                color: (currentUser?.username?.toLowerCase() === 'bhavya mishra' || currentUser?.role === 'superadmin') ? '#fef08a' : 'var(--neon-cyan)', 
                fontWeight: 700 
              }}>
                @{currentUser?.username}
              </span>
              {(currentUser?.username?.toLowerCase() === 'bhavya mishra' || currentUser?.role === 'superadmin') && (
                <span style={{
                  fontSize: '0.66rem',
                  fontWeight: 900,
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#000',
                  padding: '2px 7px',
                  borderRadius: '10px'
                }}>
                  👑 ADMIN
                </span>
              )}
            </div>

            <button 
              className="btn-secondary" 
              style={{ 
                padding: '6px 14px', 
                fontSize: '0.82rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                borderColor: 'rgba(0, 240, 255, 0.45)', 
                color: 'var(--neon-cyan)', 
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.12), rgba(112, 0, 255, 0.12))', 
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(0, 240, 255, 0.2)'
              }}
              onClick={() => {
                setDeepSearchInitialQuery('');
                setDeepSearchOpen(true);
              }}
              title="AI DeepSearch & 16:9 Presentation Slides (Alt + Space)"
            >
              <Sparkles size={14} color="var(--neon-cyan)" />
              <span style={{ fontWeight: 800 }}>DeepSearch</span>
              <span style={{ fontSize: '0.66rem', opacity: 0.75, background: 'rgba(0,0,0,0.4)', padding: '1px 5px', borderRadius: '4px' }}>Alt+Space</span>
            </button>

            <button 
              className="btn-secondary" 
              style={{ padding: '6px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px', borderColor: 'rgba(255, 75, 75, 0.4)', color: '#ff6b6b', background: 'rgba(255, 75, 75, 0.08)', cursor: 'pointer' }}
              onClick={() => {
                if (currentUser && currentUser.username) {
                  removeDeviceSession(currentUser.username).catch(() => {});
                }
                try {
                  sessionStorage.removeItem('college_notes_auth_user');
                  localStorage.removeItem('college_notes_auth_user');
                } catch (e) {}
                setCurrentUser(null);
              }}
              title="Sign Out & Lock Portal"
            >
              <LogOut size={15} /> Log Out
            </button>
            
            <button 
              className="btn-primary" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => setActiveTab('downloads-lab')}
            >
              <Download size={16} /> Download Notes
            </button>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="content-container">
          {renderActiveSection()}
        </main>
      </div>

      {/* Floating AI Assistant Chatbot (Bottom Right) */}
      <CampusAIChatbot
        onOpenNotesReader={handleOpenNotesReader}
        onNavigate={setActiveTab}
        onOpenDeepSearch={(query) => {
          setDeepSearchInitialQuery(query || '');
          setDeepSearchOpen(true);
        }}
        subjects={initialSubjects}
      />

      {/* Global AI DeepSearch & 16:9 Presentation Slides Modal */}
      <DeepSearchModal 
        isOpen={deepSearchOpen} 
        onClose={() => setDeepSearchOpen(false)} 
        initialQuery={deepSearchInitialQuery} 
      />
    </div>
  );
}
