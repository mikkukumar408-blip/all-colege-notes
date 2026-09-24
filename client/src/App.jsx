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
const FanReviews = React.lazy(() => import('./components/FanReviews'));
const SuperAdminPanel = React.lazy(() => import('./components/SuperAdminPanel'));
const DeepSearchModal = React.lazy(() => import('./components/DeepSearchModal'));
const CircuitSimulatorModal = React.lazy(() => import('./components/CircuitSimulatorModal'));
const ExamQuizModal = React.lazy(() => import('./components/ExamQuizModal'));
const FormulaHUDModal = React.lazy(() => import('./components/FormulaHUDModal'));
const QuickSearchPalette = React.lazy(() => import('./components/QuickSearchPalette'));
import { initialSubjects } from './data/mockData';
import { Menu, ChevronLeft, ChevronRight, ChevronDown, GraduationCap, ShieldCheck, Download, BookOpen, User, LogOut, Sparkles, Bot, Cpu, Award, Zap, Search } from 'lucide-react';
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

  // Zero-Trust Session Inactivity Timeout Guard (30 Minutes)
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    if (!currentUser) return;

    const resetActivity = () => {
      if (Date.now() - lastActivityRef.current < 2000) return;
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
    const interval = setInterval(fetchControls, 8000);
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

  // AI DeepSearch Assistant & 16:9 Presentation Slides State
  const [deepSearchOpen, setDeepSearchOpen] = useState(false);
  const [deepSearchInitialQuery, setDeepSearchInitialQuery] = useState('');
  const [circuitSimOpen, setCircuitSimOpen] = useState(false);
  const [circuitSimInitialValues, setCircuitSimInitialValues] = useState({});
  const [examQuizOpen, setExamQuizOpen] = useState(false);
  const [formulaHUDOpen, setFormulaHUDOpen] = useState(false);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);

  // Global Hotkey Listener: Ctrl+K (Quick Search), Alt + Space (DeepSearch), Alt + C (Circuit), Alt + Q (Mock Exam), Alt + F (Formulas)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuickSearchOpen(prev => !prev);
      } else if (e.altKey && e.code === 'Space') {
        e.preventDefault();
        setDeepSearchOpen(prev => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setCircuitSimOpen(prev => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        setExamQuizOpen(prev => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setFormulaHUDOpen(prev => !prev);
      }
    };

    const handleOpenDeepSearchEvent = (e) => {
      if (e.detail?.query) {
        setDeepSearchInitialQuery(e.detail.query);
      }
      setDeepSearchOpen(true);
    };

    const handleOpenCircuitSimEvent = (e) => {
      if (e.detail) {
        setCircuitSimInitialValues(e.detail);
      }
      setCircuitSimOpen(true);
    };

    const handleOpenExamQuizEvent = () => setExamQuizOpen(true);
    const handleOpenFormulaHUDEvent = () => setFormulaHUDOpen(true);

    // Cross-App Synapse Memory Bridge (Bhavya Ecosystem Sync)
    let synapseChannel = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        synapseChannel = new BroadcastChannel('bhavya_ecosystem_synapse');
        synapseChannel.onmessage = (msg) => {
          if (msg.data?.type === 'ECOSYSTEM_QUERY_SYNC' && msg.data?.query) {
            setDeepSearchInitialQuery(msg.data.query);
          }
        };
      }
    } catch (err) {}

    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('open-deepsearch', handleOpenDeepSearchEvent);
    window.addEventListener('open-circuit-sim', handleOpenCircuitSimEvent);
    window.addEventListener('open-exam-quiz', handleOpenExamQuizEvent);
    window.addEventListener('open-formula-hud', handleOpenFormulaHUDEvent);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('open-deepsearch', handleOpenDeepSearchEvent);
      window.removeEventListener('open-circuit-sim', handleOpenCircuitSimEvent);
      window.removeEventListener('open-exam-quiz', handleOpenExamQuizEvent);
      window.removeEventListener('open-formula-hud', handleOpenFormulaHUDEvent);
      if (synapseChannel) synapseChannel.close();
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
      case 'short-notes': return 'Exam Revision & Short Notes';
      case 'question-papers': return 'Expected University Question Papers';
      case 'downloads-lab': return 'Practical Lab Manuals & Codes';
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
      {/* 4DX Fluid Glowing Ambient Background */}
      <div className="fluid-bg-container" aria-hidden="true">
        <div className="fluid-orb fluid-orb-cyan"></div>
        <div className="fluid-orb fluid-orb-purple"></div>
        <div className="fluid-orb fluid-orb-pink"></div>
        <div className="fluid-orb fluid-orb-amber"></div>
      </div>

      {/* Collapsible Sidebar Navigation */}
      <Sidebar 
        currentUser={currentUser}
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenDeepSearch={() => {
          setDeepSearchInitialQuery('');
          setDeepSearchOpen(true);
        }}
        onOpenCircuitSim={() => setCircuitSimOpen(true)}
        onOpenExamQuiz={() => setExamQuizOpen(true)}
        onOpenFormulaHUD={() => setFormulaHUDOpen(true)}
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

            {/* Unified Tools & Simulators Dropdown (Alt+Space, Alt+C, Alt+Q, Alt+F) */}
            <div className="nav-tools-wrapper" style={{ position: 'relative' }}>
              <button 
                className="nav-tools-trigger"
                onClick={() => setToolsMenuOpen(prev => !prev)}
                title="Open Tools & Simulators Menu"
              >
                <Sparkles size={14} color="var(--neon-cyan)" />
                <span className="tools-btn-text">Tools</span>
                <ChevronDown size={13} style={{ transform: toolsMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {/* Tools Dropdown Card */}
              {toolsMenuOpen && (
                <>
                  <div 
                    className="mobile-tools-backdrop"
                    onClick={() => setToolsMenuOpen(false)}
                  />
                  <div className="mobile-tools-dropdown-card">
                    <div className="mobile-dropdown-header">
                      <span>⚡ TOOLS & SIMULATORS</span>
                      <button onClick={() => setToolsMenuOpen(false)} className="close-mini-btn" type="button">✕</button>
                    </div>

                    <button 
                      className="mobile-dropdown-item"
                      type="button"
                      onClick={() => {
                        setQuickSearchOpen(true);
                        setToolsMenuOpen(false);
                      }}
                    >
                      <div className="mobile-dropdown-icon cyan">
                        <Search size={16} />
                      </div>
                      <div className="mobile-dropdown-text">
                        <span className="title">Cross-Subject Search</span>
                        <span className="desc">Find theorems, formulas, syllabus</span>
                      </div>
                      <span className="nav-kbd-badge" style={{ fontSize: '0.62rem', opacity: 0.75, background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px', color: 'var(--neon-cyan)', border: '1px solid rgba(0,240,255,0.3)', marginLeft: 'auto' }}>Ctrl+K</span>
                    </button>

                    <button 
                      className="mobile-dropdown-item"
                      type="button"
                      onClick={() => {
                        setDeepSearchInitialQuery('');
                        setDeepSearchOpen(true);
                        setToolsMenuOpen(false);
                      }}
                    >
                      <div className="mobile-dropdown-icon cyan">
                        <Sparkles size={16} />
                      </div>
                      <div className="mobile-dropdown-text">
                        <span className="title">AI DeepSearch</span>
                        <span className="desc">16:9 Presentation Slides & Citations</span>
                      </div>
                      <span className="nav-kbd-badge" style={{ fontSize: '0.62rem', opacity: 0.75, background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px', color: 'var(--neon-cyan)', border: '1px solid rgba(0,240,255,0.3)', marginLeft: 'auto' }}>Alt+Space</span>
                    </button>

                    <button 
                      className="mobile-dropdown-item"
                      type="button"
                      onClick={() => {
                        setCircuitSimOpen(true);
                        setToolsMenuOpen(false);
                      }}
                    >
                      <div className="mobile-dropdown-icon green">
                        <Cpu size={16} />
                      </div>
                      <div className="mobile-dropdown-text">
                        <span className="title">Circuit Simulator</span>
                        <span className="desc">RLC, Thevenin & Sandbox</span>
                      </div>
                      <span className="nav-kbd-badge" style={{ fontSize: '0.62rem', opacity: 0.75, background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px', color: '#86efac', border: '1px solid rgba(16,185,129,0.3)', marginLeft: 'auto' }}>Alt+C</span>
                    </button>

                    <button 
                      className="mobile-dropdown-item"
                      type="button"
                      onClick={() => {
                        setExamQuizOpen(true);
                        setToolsMenuOpen(false);
                      }}
                    >
                      <div className="mobile-dropdown-icon amber">
                        <Award size={16} />
                      </div>
                      <div className="mobile-dropdown-text">
                        <span className="title">University Mock Exam</span>
                        <span className="desc">Timed Quiz & Scorecard</span>
                      </div>
                      <span className="nav-kbd-badge" style={{ fontSize: '0.62rem', opacity: 0.75, background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px', color: '#fef08a', border: '1px solid rgba(245,158,11,0.3)', marginLeft: 'auto' }}>Alt+Q</span>
                    </button>

                    <button 
                      className="mobile-dropdown-item"
                      type="button"
                      onClick={() => {
                        setFormulaHUDOpen(true);
                        setToolsMenuOpen(false);
                      }}
                    >
                      <div className="mobile-dropdown-icon purple">
                        <Zap size={16} />
                      </div>
                      <div className="mobile-dropdown-text">
                        <span className="title">Formula & Constants HUD</span>
                        <span className="desc">Physics constants & identities</span>
                      </div>
                      <span className="nav-kbd-badge" style={{ fontSize: '0.62rem', opacity: 0.75, background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px', color: '#d8b4fe', border: '1px solid rgba(168,85,247,0.3)', marginLeft: 'auto' }}>Alt+F</span>
                    </button>

                    <div className="mobile-dropdown-divider" />

                    <button 
                      className="mobile-dropdown-item danger"
                      type="button"
                      onClick={() => {
                        setToolsMenuOpen(false);
                        if (currentUser && currentUser.username) {
                          removeDeviceSession(currentUser.username).catch(() => {});
                        }
                        try {
                          sessionStorage.removeItem('college_notes_auth_user');
                          localStorage.removeItem('college_notes_auth_user');
                        } catch (e) {}
                        setCurrentUser(null);
                      }}
                    >
                      <div className="mobile-dropdown-icon red">
                        <LogOut size={16} />
                      </div>
                      <div className="mobile-dropdown-text">
                        <span className="title" style={{ color: '#ff6b6b' }}>Sign Out</span>
                        <span className="desc">Lock portal on this device</span>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>

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
        onOpenDeepSearch={(query) => {
          setDeepSearchInitialQuery(query || '');
          setDeepSearchOpen(true);
        }}
        subjects={initialSubjects}
      />

      {/* Code-Split Lazy Loaded Heavy Modals wrapped in Suspense */}
      <React.Suspense fallback={null}>
        {/* Global AI DeepSearch & 16:9 Presentation Slides Modal */}
        {deepSearchOpen && (
          <DeepSearchModal 
            isOpen={deepSearchOpen} 
            onClose={() => setDeepSearchOpen(false)} 
            initialQuery={deepSearchInitialQuery} 
          />
        )}

        {/* Interactive Deterministic Circuit Simulator & Mathematical Sandbox Modal */}
        {circuitSimOpen && (
          <CircuitSimulatorModal
            isOpen={circuitSimOpen}
            onClose={() => setCircuitSimOpen(false)}
            initialValues={circuitSimInitialValues}
          />
        )}

        {/* Active-Recall University Exam Quiz Generator Modal */}
        {examQuizOpen && (
          <ExamQuizModal
            isOpen={examQuizOpen}
            onClose={() => setExamQuizOpen(false)}
          />
        )}

        {/* Engineering Formula, Identities & Physical Constants Quick Drawer */}
        {formulaHUDOpen && (
          <FormulaHUDModal
            isOpen={formulaHUDOpen}
            onClose={() => setFormulaHUDOpen(false)}
          />
        )}

        {/* Universal Cross-Subject Quick Search Palette (Ctrl+K) */}
        {quickSearchOpen && (
          <QuickSearchPalette
            isOpen={quickSearchOpen}
            onClose={() => setQuickSearchOpen(false)}
            onSelectResult={handleSelectSearchResult}
            subjects={initialSubjects}
          />
        )}
      </React.Suspense>
    </div>
  );
}
