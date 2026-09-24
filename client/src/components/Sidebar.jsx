/* =========================================================================
   SIDEBAR NAVIGATION COMPONENT (Sidebar.jsx)
   =========================================================================
   EDIT THIS FILE to:
   1. Change the Brand Title or Logo (e.g. "CAMPUS NOTES", "4DX ACADEMY")
   2. Rename any of the 6 Navigation Sections in `navSections` array
   3. Change menu icons or badges (e.g. "All Years", "Quick Read", "Solved")
   4. Update footer status message (e.g. "Semesters 1 through 8 Ready")
   ========================================================================= */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  CheckSquare, 
  DownloadCloud, 
  MessageSquare, 
  Crown,
  Layers,
  Menu,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Cpu,
  Award,
  Zap,
  Code2,
  X 
} from 'lucide-react';

export default function Sidebar({ 
  currentUser,
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen,
  isCollapsed = false,
  onToggleCollapse,
  onOpenDeepSearch,
  onOpenCircuitSim,
  onOpenExamQuiz,
  onOpenFormulaHUD
}) {
  /* -----------------------------------------------------------------------
     1. THE 6 MAIN SECTIONS (+ EXCLUSIVE 7TH SECTION FOR SUPER ADMIN)
     ----------------------------------------------------------------------- */
  const isSuperAdmin = (currentUser?.username?.toLowerCase() === 'bhavya mishra') || (currentUser?.role === 'superadmin') || (currentUser?.isSuperAdmin === true);

  const [readinessScore, setReadinessScore] = useState(0);

  useEffect(() => {
    const updateScore = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('college_notes_mastery') || '{}');
        const mastered = Object.values(saved).filter(v => v === 'mastered').length;
        const percent = Math.min(100, Math.round((mastered / 32) * 100));
        setReadinessScore(percent);
      } catch (e) {
        setReadinessScore(0);
      }
    };
    updateScore();
    window.addEventListener('storage', updateScore);
    window.addEventListener('mastery-updated', updateScore);
    return () => {
      window.removeEventListener('storage', updateScore);
      window.removeEventListener('mastery-updated', updateScore);
    };
  }, []);

  const navSections = [
    { id: 'subjects-notes', label: 'Semester Notes & Subjects', icon: BookOpen, badge: 'All Years' },
    { id: 'notes-reader', label: 'Interactive Notes Reader', icon: FileText, badge: 'Quick Read' },
    { id: 'syllabus', label: 'Syllabus & Curriculum', icon: GraduationCap },
    { id: 'short-notes', label: 'Exam Revision & Short Notes', icon: Sparkles, badge: 'Exam Ready' },
    { id: 'downloads-lab', label: 'Lab Manuals & Practical Codes', icon: Code2, badge: 'Codes & Labs' },
    { id: 'doubt-forum', label: 'Student Doubt Forum', icon: MessageSquare },
    ...(isSuperAdmin ? [
      { id: 'admin-panel', label: 'Super Admin Panel', icon: Crown, badge: 'ADMIN' }
    ] : [])
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 90
          }}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        {/* -----------------------------------------------------------------
           2. BRAND HEADER & PORTAL LOGO
           ----------------------------------------------------------------- */}
        <div className="brand-header" style={{ position: 'relative' }}>
          <div className="brand-logo-glow" title="Campus Notes Portal">
            <BookOpen size={22} color="#07090e" strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <div className="brand-text">
              <h1>CAMPUS NOTES</h1>
              <span>YEAR & SEMESTER HUB</span>
            </div>
          )}

          {/* Desktop Collapse Toggle Button */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? "Expand Sidebar (☰)" : "Collapse Sidebar (☰)"}
              style={{
                marginLeft: isCollapsed ? 0 : 'auto',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-dim)',
                color: 'var(--neon-cyan)',
                borderRadius: '6px',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Menu size={18} />
            </button>
          )}

          {/* Mobile Close Button */}
          {isOpen && (
            <button 
              onClick={() => setIsOpen(false)} 
              className="btn-outline" 
              style={{ marginLeft: 'auto', padding: '6px', border: 'none' }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* -----------------------------------------------------------------
           3. NAVIGATION MENU BUTTONS LIST
           Renders the 6 tabs with active glow indicators
           ----------------------------------------------------------------- */}
        <nav className="nav-menu">
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '1px', padding: '0 8px 6px' }}>
            {isSuperAdmin ? 'Academic & Admin • 7 Portals' : 'Academic Sections • 6 Portals'}
          </div>
          {navSections.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
              >
                <Icon size={19} className="nav-icon" style={{ color: item.id === 'admin-panel' ? '#f59e0b' : undefined }} />
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: item.id === 'admin-panel' ? (isActive ? '#fef08a' : '#f59e0b') : undefined, fontWeight: item.id === 'admin-panel' ? 700 : undefined }}>
                  {item.label}
                </span>
                {item.badge && (
                  <span className={item.badge === 'ADMIN' ? 'badge-amber' : item.badge === 'All Years' ? 'badge-neon' : 'badge-crimson'} style={{ padding: '2px 6px', fontSize: '0.65rem' }}>
                    {item.badge}
                  </span>
                )}
                {isActive && <div className="nav-indicator" />}
              </button>
            );
          })}

          {/* Interactive Tools & Simulators Quick Access (Crucial for Mobile Navigation) */}
          <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
            <div style={{ fontSize: '0.70rem', textTransform: 'uppercase', color: 'var(--neon-cyan)', letterSpacing: '1px', padding: '0 8px 8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
              <span>⚡</span>
              <span>{!isCollapsed ? 'Interactive Simulators & Tools' : 'Tools'}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {onOpenDeepSearch && (
                <button
                  className="nav-item"
                  onClick={() => {
                    onOpenDeepSearch();
                    setIsOpen(false);
                  }}
                  style={{ color: 'var(--neon-cyan)', background: 'rgba(0, 240, 255, 0.04)' }}
                  title="AI DeepSearch & 16:9 Slides (Alt+Space)"
                >
                  <Sparkles size={18} className="nav-icon" style={{ color: 'var(--neon-cyan)' }} />
                  {!isCollapsed && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>AI DeepSearch</span>}
                  {!isCollapsed && <span className="badge-neon" style={{ padding: '2px 6px', fontSize: '0.62rem' }}>AI</span>}
                </button>
              )}

              {onOpenCircuitSim && (
                <button
                  className="nav-item"
                  onClick={() => {
                    onOpenCircuitSim();
                    setIsOpen(false);
                  }}
                  style={{ color: '#86efac', background: 'rgba(16, 185, 129, 0.04)' }}
                  title="Circuit Sandbox (Alt+C)"
                >
                  <Cpu size={18} className="nav-icon" style={{ color: '#10b981' }} />
                  {!isCollapsed && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>Circuit Sandbox</span>}
                  {!isCollapsed && <span style={{ background: 'rgba(16,185,129,0.2)', color: '#86efac', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.62rem', fontWeight: 700 }}>SIM</span>}
                </button>
              )}

              {onOpenExamQuiz && (
                <button
                  className="nav-item"
                  onClick={() => {
                    onOpenExamQuiz();
                    setIsOpen(false);
                  }}
                  style={{ color: '#fef08a', background: 'rgba(234, 179, 8, 0.04)' }}
                  title="University Mock Exam (Alt+Q)"
                >
                  <Award size={18} className="nav-icon" style={{ color: '#eab308' }} />
                  {!isCollapsed && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>Mock Exam Quiz</span>}
                  {!isCollapsed && <span style={{ background: 'rgba(234,179,8,0.2)', color: '#fef08a', border: '1px solid rgba(234,179,8,0.3)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.62rem', fontWeight: 700 }}>TEST</span>}
                </button>
              )}

              {onOpenFormulaHUD && (
                <button
                  className="nav-item"
                  onClick={() => {
                    onOpenFormulaHUD();
                    setIsOpen(false);
                  }}
                  style={{ color: '#d8b4fe', background: 'rgba(168, 85, 247, 0.04)' }}
                  title="Formula & Constants HUD (Alt+F)"
                >
                  <Zap size={18} className="nav-icon" style={{ color: '#c084fc' }} />
                  {!isCollapsed && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>Formula Drawer</span>}
                  {!isCollapsed && <span style={{ background: 'rgba(168,85,247,0.2)', color: '#d8b4fe', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '4px', padding: '2px 6px', fontSize: '0.62rem', fontWeight: 700 }}>HUD</span>}
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Exam Readiness Tracker Widget */}
        {!isCollapsed && (
          <div style={{ padding: '10px 14px', margin: '0 12px 10px', background: 'rgba(0, 240, 255, 0.04)', borderRadius: '10px', border: '1px solid rgba(0, 240, 255, 0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.5px' }}>🎯 EXAM READINESS</span>
              <span style={{ color: 'var(--neon-cyan)', fontWeight: 900 }}>{readinessScore}%</span>
            </div>
            <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${readinessScore}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #00f0ff, #10b981)', 
                  transition: 'width 0.4s ease' 
                }} 
              />
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              {readinessScore > 0 ? `${Math.round((readinessScore / 100) * 32)} / 32 Units Mastered` : 'Mark units as Mastered to track score'}
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------------
           4. SIDEBAR FOOTER (Live System / Portal Status Indicator)
           ----------------------------------------------------------------- */}
        <div className="sidebar-footer">
          <div className="live-auditorium-status">
            <div className="pulse-dot" />
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem' }}>Academic Portal Active</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Semesters 1 through 8 Ready</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
