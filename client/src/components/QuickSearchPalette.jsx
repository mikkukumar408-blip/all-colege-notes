import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, BookOpen, Zap, Compass, ArrowRight, CornerDownLeft, Sparkles, Hash } from 'lucide-react';
import { ACADEMIC_THEOREM_KB } from '../data/academicKnowledgeBase';

const SUBJECT_ID_MAP = {
  'math': 'sub-m1',
  'beee': 'sub-beee',
  'electrical': 'sub-beee',
  'physics': 'sub-p1',
  'python': 'sub-py',
  'c': 'sub-c1',
  'web': 'sub-webtech',
  'aiml': 'sub-aiml',
  'dsa': 'sub-dsa-bcse007',
  'data structures': 'sub-dsa-bcse007'
};

export default function QuickSearchPalette({ isOpen, onClose, onSelectResult, subjects = [] }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'theorems' | 'units' | 'formulas'
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  // Global Ctrl+K / Escape keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate searchable items
  const indexedItems = useMemo(() => {
    const items = [];

    // 1. Index All Subject Units
    subjects.forEach(sub => {
      if (Array.isArray(sub.units)) {
        sub.units.forEach(u => {
          items.push({
            id: `unit-${sub.id}-${u.unitNum || u.num || 1}`,
            type: 'units',
            title: `Unit ${u.unitNum || u.num || 1}: ${u.title}`,
            subtitle: `${sub.code} • ${sub.name}`,
            subjectId: sub.id,
            unitNum: u.unitNum || u.num || 1,
            badge: `${sub.code} UNIT ${u.unitNum || u.num || 1}`,
            weightage: u.examWeightage || '25 Marks',
            keywords: `${sub.name} ${sub.code} unit ${u.unitNum || u.num || 1} ${u.title} ${(u.topics || []).join(' ')}`
          });
        });
      }
    });

    // 2. Index Academic Knowledge Base Theorems & Concepts
    ACADEMIC_THEOREM_KB.forEach((th, idx) => {
      let matchedSubId = 'sub-beee';
      const subLower = (th.subject || '').toLowerCase();
      if (subLower.includes('math')) matchedSubId = 'sub-m1';
      else if (subLower.includes('physics')) matchedSubId = 'sub-p1';
      else if (subLower.includes('c programming') || subLower.includes('c language')) matchedSubId = 'sub-c1';
      else if (subLower.includes('python')) matchedSubId = 'sub-py';
      else if (subLower.includes('web')) matchedSubId = 'sub-webtech';
      else if (subLower.includes('aiml') || subLower.includes('intelligence')) matchedSubId = 'sub-aiml';
      else if (subLower.includes('dsa') || subLower.includes('data structure') || subLower.includes('algorithm')) matchedSubId = 'sub-dsa-bcse007';

      items.push({
        id: `kb-theorem-${idx}`,
        type: 'theorems',
        title: th.title,
        subtitle: th.subject,
        subjectId: matchedSubId,
        unitNum: 1, // default unit
        badge: 'EXAM THEOREM',
        weightage: 'Verified Syllabus',
        keywords: `${th.title} ${(th.keywords || []).join(' ')} ${th.subject}`
      });
    });

    // 3. Essential Engineering Formulas
    const CORE_FORMULAS = [
      { name: "Thevenin Equivalent Theorem (Vth, Rth)", sub: "sub-beee", unit: 1, kw: "thevenin vth rth open circuit terminal voltage" },
      { name: "Norton's Equivalent Current (In, Rn)", sub: "sub-beee", unit: 1, kw: "norton short circuit isc rn" },
      { name: "Maximum Power Transfer Theorem (Pmax = Vth^2 / 4Rth)", sub: "sub-beee", unit: 1, kw: "maximum power transfer theorem rl rth efficiency 50" },
      { name: "AC Series RLC Resonance (fr = 1/2pi*sqrt(LC))", sub: "sub-beee", unit: 2, kw: "resonance rlc series quality factor bandwidth" },
      { name: "Stokes' Phase Reversal & Newton's Rings", sub: "sub-p1", unit: 1, kw: "newton rings stokes lambda 2 diameter dark fringe" },
      { name: "Maxwell's Equations & Displacement Current", sub: "sub-p1", unit: 2, kw: "maxwell equations displacement current amp skin depth" },
      { name: "Schrödinger 1D Infinite Well Wavefunction", sub: "sub-p1", unit: 3, kw: "schrodinger wave equation quantum box energy levels" },
      { name: "Euler's Homogeneous Function Theorem", sub: "sub-m1", unit: 1, kw: "euler homogeneous degree partial differentiation" },
      { name: "Taylor & Maclaurin Power Series", sub: "sub-m1", unit: 2, kw: "taylor maclaurin expansion polynomial series" },
      { name: "Asymptotic Big-O / Omega / Theta Notations", sub: "sub-dsa-bcse007", unit: 1, kw: "big o omega theta asymptotic time complexity" },
      { name: "QuickSort Partition & Recurrence T(n) = 2T(n/2) + O(n)", sub: "sub-dsa-bcse007", unit: 2, kw: "quicksort partition pivot merge sort best worst" }
    ];

    CORE_FORMULAS.forEach((f, idx) => {
      items.push({
        id: `formula-${idx}`,
        type: 'formulas',
        title: f.name,
        subtitle: 'Core University Engineering Formula & Identity',
        subjectId: f.sub,
        unitNum: f.unit,
        badge: 'FORMULA',
        weightage: 'High Yield',
        keywords: `${f.name} ${f.kw}`
      });
    });

    return items;
  }, [subjects]);

  // Filtered results
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return indexedItems.filter(item => {
      if (filterCategory !== 'all' && item.type !== filterCategory) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
      );
    }).slice(0, 14); // Top 14 results for instant responsiveness
  }, [indexedItems, query, filterCategory]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredResults.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (filteredResults.length || 1)) % (filteredResults.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        executeSelection(filteredResults[selectedIndex]);
      }
    }
  };

  const executeSelection = (item) => {
    onSelectResult?.({
      subjectId: item.subjectId,
      unitNum: item.unitNum,
      topicTitle: item.title
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="quick-search-backdrop" onClick={onClose}>
      <div 
        className="quick-search-palette-modal glass-panel" 
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="quick-search-header">
          <Search size={20} className="quick-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="quick-search-input"
            placeholder="Search theorems, formulas, units across all 8 subjects... (e.g. Thevenin, Fourier, Newton's rings)"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="quick-search-badges">
            <span className="search-kbd-pill">ESC to exit</span>
          </div>
          <button className="quick-search-close" onClick={onClose} title="Close search">
            <X size={18} />
          </button>
        </div>

        {/* Category Pills Filter */}
        <div className="quick-search-categories">
          {[
            { id: 'all', label: 'All Results', count: indexedItems.length },
            { id: 'theorems', label: 'Theorems & Concepts', icon: BookOpen },
            { id: 'formulas', label: 'Formulas & Laws', icon: Zap },
            { id: 'units', label: 'Units & Syllabus', icon: Compass }
          ].map(cat => (
            <button
              key={cat.id}
              className={`search-cat-pill ${filterCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setFilterCategory(cat.id);
                setSelectedIndex(0);
              }}
            >
              {cat.icon && <cat.icon size={13} />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="quick-search-list" ref={listRef}>
          {filteredResults.length === 0 ? (
            <div className="quick-search-empty">
              <Sparkles size={28} style={{ color: 'var(--neon-cyan)', opacity: 0.7, marginBottom: 8 }} />
              <p style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>No direct matches found</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem', marginTop: 4 }}>
                Try searching for <em>Thevenin</em>, <em>Taylor series</em>, <em>Maxwell</em>, <em>Unit 1</em>, or <em>Sorting</em>.
              </p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`quick-search-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => executeSelection(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="search-item-icon">
                    {item.type === 'formulas' ? <Zap size={16} /> : item.type === 'theorems' ? <BookOpen size={16} /> : <Compass size={16} />}
                  </div>

                  <div className="search-item-info">
                    <div className="search-item-title-row">
                      <span className="search-item-title">{item.title}</span>
                      <span className="search-item-badge">{item.badge}</span>
                    </div>
                    <div className="search-item-sub-row">
                      <span className="search-item-subtitle">{item.subtitle}</span>
                      {item.weightage && (
                        <span className="search-item-weightage">• {item.weightage}</span>
                      )}
                    </div>
                  </div>

                  <div className="search-item-action">
                    {isSelected ? (
                      <span className="search-enter-hint">
                        Jump <CornerDownLeft size={13} />
                      </span>
                    ) : (
                      <ArrowRight size={14} className="search-arrow" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="quick-search-footer">
          <div className="footer-keys">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select & Open</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
          <div className="footer-status">
            <span>⚡ High-Yield Exam KB Indexed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
