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
import SecurityShield from './components/SecurityShield';
import AuthPage from './components/AuthPage';
import CampusAIChatbot from './components/CampusAIChatbot';
const SensoryLab = React.lazy(() => import('./components/SensoryLab'));
const TechGuide = React.lazy(() => import('./components/TechGuide'));
const Theaters = React.lazy(() => import('./components/Theaters'));
const ExpectedQuestionPapers = React.lazy(() => import('./components/ExpectedQuestionPapers'));
const SeatBooking = React.lazy(() => import('./components/SeatBooking'));
const SuperAdminPanel = React.lazy(() => import('./components/SuperAdminPanel'));
const QuickSearchPalette = React.lazy(() => import('./components/QuickSearchPalette'));
import { initialSubjects } from './data/mockData';
import { Menu, ChevronLeft, ChevronRight, GraduationCap, ShieldCheck, Download, BookOpen, FileText, User, LogOut, Sparkles, Code2, ClipboardCheck, Search } from 'lucide-react';
import { App as CapApp } from '@capacitor/app';
import { logSecurityEvent } from './utils/security';
import { removeDeviceSession, checkDeviceSessionActive, pullCloudUsers, getApiUrl, pullCloudControls } from './utils/cloudSync';
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

  /* -----------------------------------------------------------------------
     THEME: PERMANENT DARK MODE ALWAYS
     ----------------------------------------------------------------------- */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');
    try {
      localStorage.setItem('college_notes_theme', 'dark');
    } catch (e) {}
  }, []);

  // Zero-Trust Session Inactivity Timeout Guard (30 Minutes)
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    if (!currentUser) return;

    const resetActivity = () => {
      if (Date.now() - lastActivityRef.current < 2000) return;
      lastActivityRef.current = Date.now();
    };

    const activityEvents = ['pointerdown', 'keydown', 'touchstart'];
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

  // Live Portal Announcement & System Controls from Super Admin
  const [systemControls, setSystemControls] = useState({
    announcement: '',
    announcementActive: false,
    maintenanceMode: false
  });

  useEffect(() => {
    // Pull latest user accounts on launch
    pullCloudUsers().catch(() => {});

    const fetchControls = async () => {
      try {
        const controls = await pullCloudControls();
        if (controls) {
          setSystemControls(controls);
        }
      } catch (e) {}
    };

    fetchControls();
    const interval = setInterval(fetchControls, 45000);
    return () => clearInterval(interval);
  }, []);

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

  // Cross-Subject Universal Quick Search Palette (Ctrl+K)
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);

  // Global Hotkey Listener: Ctrl+K (Quick Search)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuickSearchOpen(prev => !prev);
      }
    };

  }, []);

  /* -----------------------------------------------------------------------
     1B. HARDWARE & GESTURE BACK BUTTON NAVIGATION HANDLER
     Prevents accidental app exits:
     - Closes open search palettes or sidebar drawer
     - Returns to 'subjects-notes' (catalog home) if reading or viewing other tabs
     - Requires double-tap within 2s to exit when on home screen
     ----------------------------------------------------------------------- */
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  const sidebarOpenRef = useRef(sidebarOpen);
  sidebarOpenRef.current = sidebarOpen;

  const quickSearchOpenRef = useRef(quickSearchOpen);
  quickSearchOpenRef.current = quickSearchOpen;

  const lastBackPressTimeRef = useRef(0);
  const [backToastMessage, setBackToastMessage] = useState('');

  // 1. Android Hardware / Gesture Back Button via Capacitor App Plugin
  useEffect(() => {
    let backListenerHandle = null;

    const setupBackListener = async () => {
      try {
        backListenerHandle = await CapApp.addListener('backButton', () => {
          if (quickSearchOpenRef.current) {
            setQuickSearchOpen(false);
            return;
          }
          if (sidebarOpenRef.current) {
            setSidebarOpen(false);
            return;
          }
          if (activeTabRef.current !== 'subjects-notes') {
            setActiveTab('subjects-notes');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }

          // If already on the home catalog tab, confirm before exit
          const now = Date.now();
          if (now - lastBackPressTimeRef.current < 2000) {
            CapApp.exitApp().catch(() => {});
          } else {
            lastBackPressTimeRef.current = now;
            setBackToastMessage('Press back again to exit');
            setTimeout(() => setBackToastMessage(''), 2000);
          }
        });
      } catch (e) {
        // Not running in Capacitor native context
      }
    };

    setupBackListener();

    return () => {
      if (backListenerHandle && typeof backListenerHandle.remove === 'function') {
        backListenerHandle.remove();
      }
    };
  }, []);

  // 2. Web Browser History / PopState Back Button Handler
  useEffect(() => {
    const handlePopState = () => {
      if (quickSearchOpenRef.current) {
        setQuickSearchOpen(false);
        window.history.pushState(null, '', window.location.pathname);
        return;
      }
      if (sidebarOpenRef.current) {
        setSidebarOpen(false);
        window.history.pushState(null, '', window.location.pathname);
        return;
      }
      if (activeTabRef.current !== 'subjects-notes') {
        setActiveTab('subjects-notes');
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
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

  const handleSelectSearchResult = ({ subjectId, unitNum, topicTitle }) => {
    const matched = initialSubjects.find(s => s.id === subjectId || s.code?.toLowerCase() === subjectId?.toLowerCase()) || initialSubjects[0];
    setSelectedSubject({ ...matched, targetUnitNum: unitNum, targetTopic: topicTitle });
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
            onNavigateTab={(tab, sub) => {
              if (sub) setSelectedSubject(sub);
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'syllabus':
        return <TechGuide />;
      case 'short-notes':
        return <Theaters currentUser={currentUser} initialSubject={selectedSubject} />;
      case 'question-papers':
        return <ExpectedQuestionPapers currentUser={currentUser} />;
      case 'downloads-lab':
        return <SeatBooking currentUser={currentUser} preselectedMovie={selectedSubject} />;
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
      case 'short-notes': return 'Exam Revision & Short Notes';
      case 'question-papers': return 'Expected University Question Papers';
      case 'downloads-lab': return 'Practical Lab Manuals & Codes';
      case 'admin-panel': return 'Super Admin Control Center';
      default: return 'College Academic Portal';
    }
  };

  const isSuperAdmin = (currentUser?.username?.toLowerCase() === 'bhavya mishra') || (currentUser?.role === 'superadmin') || (currentUser?.isSuperAdmin === true) || (currentUser?.role === 'admin');

  // Authentication Guard: Show login/create account page if not signed in
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
        {/* Live Super Admin Global Campus Announcement Banner */}
        {systemControls.announcementActive && systemControls.announcement && (
          <div style={{
            background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 50%, #06b6d4 100%)',
            color: '#ffffff',
            padding: '7px 18px',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(124, 58, 237, 0.4)',
            position: 'relative',
            zIndex: 10
          }}>
            <Sparkles size={14} style={{ flexShrink: 0, animation: 'pulse 1.5s infinite' }} />
            <span>{systemControls.announcement}</span>
          </div>
        )}

        {/* -----------------------------------------------------------------
           5. TOP STICKY NAVBAR
           Contains sidebar collapse toggle, section title, and quick download
           ----------------------------------------------------------------- */}
        <header className="top-navbar">
          <div className="nav-left-group">
            <button 
              className="sidebar-toggle-btn"
              onClick={() => {
                if (window.innerWidth <= 900) {
                  setSidebarOpen(!sidebarOpen);
                } else {
                  setIsSidebarCollapsed(!isSidebarCollapsed);
                }
              }}
              title={isSidebarCollapsed ? "Expand Sidebar (>)" : "Collapse Sidebar (<)"}
            >
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
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
              className="nav-user-pill"
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
                <span className="admin-crown-badge" style={{
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

            {/* Universal Cross-Subject Quick Search Trigger (Ctrl+K) */}
            <button 
              className="nav-search-trigger"
              onClick={() => setQuickSearchOpen(true)}
              title="Search all subjects, theorems & formulas (Ctrl+K)"
            >
              <Search size={14} color="var(--neon-cyan)" />
              <span className="search-text-desktop">Search</span>
              <kbd className="nav-search-kbd">Ctrl+K</kbd>
            </button>



            {/* Dedicated Sign Out Button */}
            <button 
              className="btn-secondary nav-logout-btn" 
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
              <LogOut size={15} />
              <span className="logout-text-desktop">Log Out</span>
            </button>
            
            <button 
              className="btn-primary main-download-btn" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => setActiveTab('downloads-lab')}
              title="Download Notes & Lab Manuals"
            >
              <Download size={16} />
              <span className="download-text-desktop">Download Notes</span>
              <span className="download-text-mobile">Notes</span>
            </button>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="content-container">
          <React.Suspense fallback={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '350px', color: 'var(--neon-cyan)', gap: '12px' }}>
              <div className="typing-dot" style={{ width: 10, height: 10, background: 'var(--neon-cyan)', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.9rem', letterSpacing: '0.5px', fontFamily: 'var(--font-heading)' }}>Loading Academic Section...</span>
            </div>
          }>
            {renderActiveSection()}
          </React.Suspense>
        </main>
      </div>

      {/* Floating AI Assistant Chatbot (Bottom Right) */}
      <CampusAIChatbot
        onOpenNotesReader={handleOpenNotesReader}
        onNavigate={setActiveTab}
        subjects={initialSubjects}
      />

      {/* -----------------------------------------------------------------
         6. MOBILE BOTTOM NAVIGATION DOCK (Phones & Small Tablets <= 768px)
         Streamlined 5-tab core navigation: Subjects, Reader, Revision, Papers, Labs
         ----------------------------------------------------------------- */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        {[
          { id: 'subjects-notes', label: 'Subjects', icon: BookOpen },
          { id: 'notes-reader', label: 'Reader', icon: FileText },
          { id: 'short-notes', label: 'Revision', icon: Sparkles },
          { id: 'question-papers', label: 'Papers', icon: ClipboardCheck },
          { id: 'downloads-lab', label: 'Labs', icon: Code2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`mobile-bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              type="button"
            >
              <div className="bottom-nav-icon-wrap">
                <Icon size={19} />
              </div>
              <span>{tab.label}</span>
              {isActive && <div className="bottom-nav-glow-pill" />}
            </button>
          );
        })}
      </nav>

      {/* Code-Split Lazy Loaded Quick Search Palette (Ctrl+K) */}
      <React.Suspense fallback={null}>
        {quickSearchOpen && (
          <QuickSearchPalette
            isOpen={quickSearchOpen}
            onClose={() => setQuickSearchOpen(false)}
            onSelectResult={handleSelectSearchResult}
            subjects={initialSubjects}
          />
        )}
      </React.Suspense>

      {/* Android Back Button Double-Tap Confirmation Toast */}
      {backToastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '84px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(15, 23, 42, 0.94)',
          border: '1px solid rgba(0, 240, 255, 0.4)',
          color: '#f0f4fc',
          padding: '8px 20px',
          borderRadius: '24px',
          fontSize: '0.82rem',
          fontWeight: 600,
          zIndex: 99999,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
          pointerEvents: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}>
          {backToastMessage}
        </div>
      )}
    </div>
  );
}
