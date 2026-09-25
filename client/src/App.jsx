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
import VisitorAnalyticsModal from './components/VisitorAnalyticsModal';
const SensoryLab = React.lazy(() => import('./components/SensoryLab'));
const TechGuide = React.lazy(() => import('./components/TechGuide'));
const Theaters = React.lazy(() => import('./components/Theaters'));
const ExpectedQuestionPapers = React.lazy(() => import('./components/ExpectedQuestionPapers'));
const SeatBooking = React.lazy(() => import('./components/SeatBooking'));
const SuperAdminPanel = React.lazy(() => import('./components/SuperAdminPanel'));
const QuickSearchPalette = React.lazy(() => import('./components/QuickSearchPalette'));
import { initialSubjects } from './data/mockData';
import { Menu, ChevronLeft, ChevronRight, GraduationCap, Download, BookOpen, FileText, Sparkles, Code2, ClipboardCheck, Search, Activity, Crown } from 'lucide-react';
import { App as CapApp } from '@capacitor/app';
import { pullCloudUsers, getApiUrl, pullCloudControls } from './utils/cloudSync';
import { recordVisit } from './utils/visitorTracker';
import './App.css';

export default function App() {
  /* -----------------------------------------------------------------------
     0. USER CONTEXT: OPEN ACCESS (NO LOGIN REQUIRED)
     All students access notes freely without any login barriers.
     ----------------------------------------------------------------------- */
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedAdmin = localStorage.getItem('college_notes_admin_session');
      if (savedAdmin) return JSON.parse(savedAdmin);
    } catch (e) {}
    return { username: 'Student', role: 'student', isSuperAdmin: false };
  });

  // Real-Time Visitor Analytics Modal State
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

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

  // Record real-time visitor visit on launch
  useEffect(() => {
    recordVisit('home').catch(() => {});
  }, []);

  // Secret Hotkey: Ctrl+Shift+A (Toggle Super Admin mode for Bhavya Mishra)
  useEffect(() => {
    const handleAdminKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (currentUser?.isSuperAdmin) {
          const resetUser = { username: 'Student', role: 'student', isSuperAdmin: false };
          setCurrentUser(resetUser);
          localStorage.removeItem('college_notes_admin_session');
          alert('Switched back to Normal Student Mode');
        } else {
          const pass = prompt('Enter Admin Access Code:');
          if (pass === 'bhavya2026' || pass === 'admin123') {
            const adminUser = { username: 'Bhavya Mishra', role: 'superadmin', isSuperAdmin: true };
            setCurrentUser(adminUser);
            localStorage.setItem('college_notes_admin_session', JSON.stringify(adminUser));
            alert('👑 Super Admin Mode Activated! Super Admin Panel is now unlocked in your menu.');
          } else if (pass !== null) {
            alert('Incorrect admin code.');
          }
        }
      }
    };
    window.addEventListener('keydown', handleAdminKey);
    return () => window.removeEventListener('keydown', handleAdminKey);
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
        onOpenAnalytics={() => setAnalyticsOpen(true)}
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
           Clean, streamlined, uncluttered: Title, Search, Stats, Download
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
            {/* Elevated Super Admin Pill (only if Bhavya activated admin mode) */}
            {isSuperAdmin && (
              <button 
                onClick={() => setActiveTab('admin-panel')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  background: 'rgba(245, 158, 11, 0.15)', 
                  border: '1.5px solid #f59e0b', 
                  color: '#fef08a',
                  padding: '6px 12px', 
                  borderRadius: '20px',
                  boxShadow: '0 0 15px rgba(245, 158, 11, 0.25)',
                  cursor: 'pointer',
                  fontSize: '0.74rem',
                  fontWeight: 800
                }}
                title="Super Admin Control Active"
              >
                <Crown size={14} color="#f59e0b" />
                <span>ADMIN</span>
              </button>
            )}

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

      {/* Real-time Visitor Traffic & Analytics Modal */}
      <VisitorAnalyticsModal
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />

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
