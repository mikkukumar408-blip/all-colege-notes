/* =========================================================================
   SIDEBAR NAVIGATION COMPONENT (Sidebar.jsx)
   =========================================================================
   EDIT THIS FILE to:
   1. Change the Brand Title or Logo (e.g. "CAMPUS NOTES", "4DX ACADEMY")
   2. Rename any of the 6 Navigation Sections in `navSections` array
   3. Change menu icons or badges (e.g. "All Years", "Quick Read", "Solved")
   4. Update footer status message (e.g. "Semesters 1 through 8 Ready")
   ========================================================================= */

import React from 'react';
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
  X 
} from 'lucide-react';

export default function Sidebar({ 
  currentUser,
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen,
  isCollapsed = false,
  onToggleCollapse
}) {
  /* -----------------------------------------------------------------------
     1. THE 6 MAIN SECTIONS (+ EXCLUSIVE 7TH SECTION FOR SUPER ADMIN)
     ----------------------------------------------------------------------- */
  const isSuperAdmin = (currentUser?.username?.toLowerCase() === 'bhavya mishra') || (currentUser?.role === 'superadmin') || (currentUser?.isSuperAdmin === true);

  const navSections = [
    { id: 'subjects-notes', label: 'Semester Notes & Subjects', icon: BookOpen, badge: 'All Years' },
    { id: 'notes-reader', label: 'Interactive Notes Reader', icon: FileText, badge: 'Quick Read' },
    { id: 'syllabus', label: 'Syllabus & Curriculum', icon: GraduationCap },
    { id: 'short-notes', label: 'Short Notes & Exam Notes', icon: Sparkles, badge: 'High Yield' },
    { id: 'downloads-lab', label: 'Lab Manuals & Downloads', icon: DownloadCloud },
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
        </nav>

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
