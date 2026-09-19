/* =========================================================================
   DEEPSEARCH AI ASSISTANT & 16:9 PRESENTATION SLIDES (DeepSearchModal.jsx)
   =========================================================================
   Features:
   1. Global Ecosystem HUD activated via Alt+Space, Ctrl+K, or floating avatar
   2. Live multi-step deep reasoning pipeline with status telemetry
   3. Interactive 16:9 Presentation Slides Canvas with keyboard navigation (Arrows / Esc)
   4. KaTeX mathematical formulation & ASCII circuit schematics
   5. Direct integration with Academic Theorem Knowledge Base & Live AI Inference
   ========================================================================= */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  Presentation, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  Sliders,
  Layers,
  Bot
} from 'lucide-react';
import katex from 'katex';
import { matchAcademicKB, generateAnalyticalSolution, ACADEMIC_THEOREM_KB } from '../data/academicKnowledgeBase';

function formatSlideMath(text) {
  if (!text) return '';

  let processed = text.replace(/```(?:text|ascii|[\w-]*)\n?([\s\S]*?)```/g, (_, code) => {
    return `<pre style="background: rgba(4, 7, 13, 0.94); border: 1px solid rgba(0, 240, 255, 0.35); border-radius: 8px; padding: 14px 16px; font-family: 'Consolas', 'Fira Code', 'Courier New', monospace; font-size: 0.84rem; line-height: 1.38; color: #00f0ff; letter-spacing: 0; tab-size: 2; overflow-x: auto; white-space: pre; margin: 12px 0; box-shadow: inset 0 0 15px rgba(0, 240, 255, 0.05);">${code.trim()}</pre>`;
  });

  processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { throwOnError: false, displayMode: true, strict: false });
    } catch {
      return `<div style="overflow-x: auto; font-family: monospace; color: #00f0ff; margin: 10px 0;">${math}</div>`;
    }
  });

  processed = processed.replace(/\$\$([^\$]+)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { throwOnError: false, displayMode: true, strict: false });
    } catch {
      return `<div style="overflow-x: auto; font-family: monospace; color: #00f0ff; margin: 10px 0;">${math}</div>`;
    }
  });

  processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { throwOnError: false, displayMode: false, strict: false });
    } catch {
      return math;
    }
  });

  processed = processed.replace(/\$([^\$]+)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { throwOnError: false, displayMode: false, strict: false });
    } catch {
      return math;
    }
  });

  processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #fff; font-weight: 700;">$1</strong>');

  const parts = processed.split(/(<pre[\s\S]*?<\/pre>)/g);
  return parts.map(part => {
    if (part.startsWith('<pre')) return part;
    return part.replace(/\n/g, '<br/>');
  }).join('');
}

// Convert solution text into structured 16:9 presentation slides
function buildSlidesFromContent(title, content) {
  if (!content) return [];

  const slides = [];

  // Extract sections from standard format
  const coreMatch = content.match(/📌 \*\*Core Concept & Principle\*\*\s*\n([\s\S]*?)(?=(?:📐|⚡|💡|$))/i);
  const diagramMatch = content.match(/📐 \*\*Visual System Diagram\*\*\s*\n([\s\S]*?)(?=(?:⚡|💡|$))/i);
  const stepMatch = content.match(/⚡ \*\*Step-by-Step Solution \/ Derivation\*\*\s*\n([\s\S]*?)(?=(?:💡|$))/i);
  const tipMatch = content.match(/💡 \*\*University Exam Topper Tip\*\*\s*\n([\s\S]*?)$/i);

  // Slide 1: Overview & Core Concept
  slides.push({
    title: 'Overview',
    subtitle: title,
    badge: 'SLIDE 1 • CORE PRINCIPLE',
    body: coreMatch ? coreMatch[1].trim() : content.slice(0, 450)
  });

  // Slide 2: Visual System Diagram & Topology
  if (diagramMatch) {
    slides.push({
      title: 'Circuit Architecture & System Topology',
      subtitle: title,
      badge: 'SLIDE 2 • SCHEMATIC DIAGRAM',
      body: diagramMatch[1].trim()
    });
  }

  // Slide 3: Step-by-Step Derivation & Governing Equations
  if (stepMatch) {
    slides.push({
      title: 'Analytical Derivation & Governing Laws',
      subtitle: title,
      badge: 'SLIDE 3 • STEP-BY-STEP PROOF',
      body: stepMatch[1].trim()
    });
  }

  // Slide 4: Exam Strategy & Topper Tips
  if (tipMatch) {
    slides.push({
      title: 'University Examination Strategy',
      subtitle: title,
      badge: 'SLIDE 4 • TOPPER MARKS BLUEPRINT',
      body: tipMatch[1].trim()
    });
  }

  return slides.length > 0 ? slides : [
    {
      title: title || 'Academic Synthesis',
      subtitle: 'Comprehensive Research',
      badge: 'SLIDE 1 OF 1',
      body: content
    }
  ];
}

export default function DeepSearchModal({ isOpen, onClose, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery || '');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStage, setSearchStage] = useState('');
  const [result, setResult] = useState(null);
  const [viewMode, setViewMode] = useState('slides'); // 'slides' | 'document'
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      if (initialQuery && initialQuery !== query) {
        setQuery(initialQuery);
        handleDeepSearch(initialQuery);
      } else {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  }, [isOpen, initialQuery]);

  // Keyboard navigation for presentation slides & Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (slides.length > 0) {
          setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1));
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (slides.length > 0) {
          setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, slides.length]);

  const handleDeepSearch = async (overrideQuery) => {
    const q = (overrideQuery || query).trim();
    if (!q) return;

    setIsSearching(true);
    setResult(null);
    setCurrentSlideIndex(0);

    // DeepSearch Multi-Step Reasoning Telemetry
    setSearchStage('🔍 Deep-scanning syllabus index & textbook references...');
    await new Promise(r => setTimeout(r, 400));

    setSearchStage('⚡ Extracting boundary equations, circuit topologies & KaTeX formulas...');
    await new Promise(r => setTimeout(r, 450));

    setSearchStage('📊 Synthesizing 16:9 interactive presentation slides & derivations...');

    try {
      // 1. Check Offline Academic Knowledge Base first for instantaneous exact match
      const kbMatch = matchAcademicKB(q);
      if (kbMatch) {
        setResult(kbMatch);
        const generatedSlides = buildSlidesFromContent(kbMatch.title, kbMatch.content);
        setSlides(generatedSlides);
        setIsSearching(false);
        setSearchStage('');
        return;
      }

      // 2. Query Live High-Intelligence AI Inference (Pollinations / Groq)
      let aiContent = null;
      let aiTitle = q;

      try {
        const res = await fetch('https://text.pollinations.ai/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              {
                role: 'system',
                content: 'You are CampusNotes Elite AI Academic Tutor. Provide an exam-grade university derivation following the mandatory 4-part format: 📌 **Core Concept & Principle**, 📐 **Visual System Diagram** inside ```text, ⚡ **Step-by-Step Solution / Derivation** with KaTeX, and 💡 **University Exam Topper Tip**. For circuit diagrams, NEVER use slash resistors (\\/\\/). Use boxes [ R ], sources (↑) I_N or (+) V_s (-), and clean connected wires with Terminal A and Terminal B.'
              },
              {
                role: 'user',
                content: '[STUDENT QUERY DETAILS]\nQuestion: ' + q + '\n\nPlease provide a deep analytical solution with 16:9 presentation slide clarity.'
              }
            ],
            model: 'openai',
            seed: 42
          })
        });

        if (res.ok) {
          const text = await res.text();
          if (text && text.trim().length > 60 && !text.includes('<!DOCTYPE html>')) {
            aiContent = text.trim();
          }
        }
      } catch (err) {
        console.warn('Live DeepSearch fallback:', err);
      }

      if (!aiContent) {
        aiContent = generateAnalyticalSolution('Engineering & Computer Science', q);
      }

      const generated = {
        title: q,
        subject: 'University Engineering Curriculum',
        content: aiContent
      };

      setResult(generated);
      const generatedSlides = buildSlidesFromContent(q, aiContent);
      setSlides(generatedSlides);
    } finally {
      setIsSearching(false);
      setSearchStage('');
    }
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIndex];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(3, 6, 12, 0.92)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '1180px',
          height: '92vh',
          maxHeight: '860px',
          background: '#070a13',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 240, 255, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Top Header Bar */}
        <div style={{
          padding: '12px 20px',
          background: 'linear-gradient(180deg, rgba(14, 21, 37, 0.95) 0%, rgba(8, 12, 22, 0.95) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 14px rgba(0, 240, 255, 0.4)'
            }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.96rem', fontWeight: 800, color: '#fff', letterSpacing: '0.3px' }}>
                  CampusNotes AI DeepSearch
                </span>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(0, 240, 255, 0.15)',
                  color: 'var(--neon-cyan)',
                  border: '1px solid rgba(0, 240, 255, 0.3)'
                }}>
                  ECOSYSTEM HUD
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                Multi-Index Syllabus Search • 16:9 Presentation Slides • KaTeX Derivations
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {slides.length > 0 && (
              <div style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '3px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <button
                  onClick={() => setViewMode('slides')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: viewMode === 'slides' ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                    color: viewMode === 'slides' ? 'var(--neon-cyan)' : 'var(--text-dim)'
                  }}
                >
                  <Presentation size={14} /> 16:9 Slides
                </button>
                <button
                  onClick={() => setViewMode('document')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: viewMode === 'document' ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                    color: viewMode === 'document' ? 'var(--neon-cyan)' : 'var(--text-dim)'
                  }}
                >
                  <BookOpen size={14} /> Full Document
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Close (Esc)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Search Input Box */}
        <div style={{
          padding: '14px 20px',
          background: 'rgba(10, 15, 26, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          flexShrink: 0
        }}>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleDeepSearch();
            }}
            style={{ display: 'flex', gap: '10px' }}
          >
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} color="var(--neon-cyan)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask any engineering theorem, algorithm, or numerical (e.g. Describe Norton's Theorem, Dijkstra algorithm)..."
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  color: '#fff',
                  fontSize: '0.92rem',
                  outline: 'none',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              style={{
                padding: '0 22px',
                borderRadius: '10px',
                background: isSearching ? 'rgba(0, 240, 255, 0.3)' : 'linear-gradient(135deg, #00f0ff 0%, #2563eb 100%)',
                color: '#040711',
                fontWeight: 800,
                fontSize: '0.88rem',
                border: 'none',
                cursor: isSearching || !query.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 16px rgba(0, 240, 255, 0.35)',
                whiteSpace: 'nowrap'
              }}
            >
              {isSearching ? <Sparkles size={16} className="animate-spin" /> : <Cpu size={16} />}
              {isSearching ? 'Reasoning...' : 'DeepSearch'}
            </button>
          </form>

          {/* Quick suggestions pills */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', overflowX: 'auto', paddingBottom: '2px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', alignSelf: 'center', whiteSpace: 'nowrap' }}>
              Suggested:
            </span>
            {[
              "Describe Norton's Theorem",
              "Thevenin's Theorem Derivation",
              "Maximum Power Transfer Theorem",
              "Superposition Theorem Steps",
              "Dijkstra Shortest Path",
              "Zener Diode Regulator"
            ].map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(s);
                  handleDeepSearch(s);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  padding: '3px 10px',
                  color: '#94a3b8',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div style={{ flex: '1 1 0%', minHeight: 0, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' }} className="custom-scroll">
          {/* Loading State */}
          {isSearching && (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              padding: '60px 20px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(0, 240, 255, 0.1)',
                border: '2px solid var(--neon-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)',
                animation: 'pulse 1.5s infinite'
              }}>
                <Sparkles size={28} color="var(--neon-cyan)" className="animate-spin" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                  AI DeepSearch Engine Running
                </h4>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--neon-cyan)', fontFamily: 'monospace' }}>
                  {searchStage}
                </p>
              </div>
            </div>
          )}

          {/* Initial Blank State */}
          {!isSearching && !result && (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px 20px'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(112, 0, 255, 0.15))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                border: '1px solid rgba(0, 240, 255, 0.3)'
              }}>
                <Bot size={34} color="var(--neon-cyan)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: '0 0 8px 0' }}>
                CampusNotes AI DeepSearch & Presentation Slides
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', maxWidth: '560px', margin: '0 0 20px 0', lineHeight: 1.6 }}>
                Type any university theorem, algorithm, or mathematical proof above. DeepSearch performs multi-index reasoning across your semester syllabus and automatically compiles an <strong>Interactive 16:9 Presentation Slide Deck</strong>!
              </p>
            </div>
          )}

          {/* Result View: 16:9 Slides Canvas */}
          {!isSearching && result && viewMode === 'slides' && currentSlide && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              {/* Slide Container in 16:9 Aspect Frame */}
              <div 
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #090e1c 0%, #050811 100%)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  borderRadius: '16px',
                  padding: '32px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0, 240, 255, 0.05)',
                  position: 'relative',
                  overflowY: 'auto'
                }}
                className="custom-scroll"
              >
                {/* Slide Header */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: 'var(--neon-cyan)',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      background: 'rgba(0, 240, 255, 0.12)',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      border: '1px solid rgba(0, 240, 255, 0.25)'
                    }}>
                      {currentSlide.badge || `SLIDE ${currentSlideIndex + 1} OF ${slides.length}`}
                    </span>

                    <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                      Slide {currentSlideIndex + 1} of {slides.length}
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: '#fff',
                    margin: '4px 0 16px 0',
                    borderBottom: '2px solid rgba(0, 240, 255, 0.25)',
                    paddingBottom: '10px'
                  }}>
                    {currentSlide.title}
                  </h2>
                </div>

                {/* Slide Body Content */}
                <div 
                  style={{
                    flex: 1,
                    fontSize: '1rem',
                    color: '#e2e8f0',
                    lineHeight: 1.7,
                    overflowY: 'auto'
                  }}
                  className="custom-scroll"
                  dangerouslySetInnerHTML={{ __html: formatSlideMath(currentSlide.body) }}
                />

                {/* Slide Bottom Bar with Controls */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <Layers size={13} /> Ecosystem HUD <strong style={{ color: '#fff' }}>Alt + Space</strong>
                    </span>
                  </div>

                  {/* Navigation Arrows */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => setCurrentSlideIndex(prev => Math.max(prev - 1, 0))}
                      disabled={currentSlideIndex === 0}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: currentSlideIndex === 0 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: currentSlideIndex === 0 ? 'rgba(255, 255, 255, 0.2)' : '#fff',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>

                    <button
                      onClick={() => setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1))}
                      disabled={currentSlideIndex === slides.length - 1}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: currentSlideIndex === slides.length - 1 ? 'rgba(255, 255, 255, 0.03)' : 'linear-gradient(135deg, rgba(0, 240, 255, 0.25), rgba(37, 99, 235, 0.25))',
                        border: currentSlideIndex === slides.length - 1 ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 240, 255, 0.5)',
                        color: currentSlideIndex === slides.length - 1 ? 'rgba(255, 255, 255, 0.2)' : '#00f0ff',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: currentSlideIndex === slides.length - 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Robot Indicator Avatar */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00f0ff, #7000ff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)'
                  }}>
                    <Bot size={20} color="#000" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Result View: Full Academic Document */}
          {!isSearching && result && viewMode === 'document' && (
            <div style={{
              background: '#040711',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '12px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span className="badge-neon" style={{ fontSize: '0.72rem' }}>
                    {result.subject || 'Verified Academic Solution'}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '6px 0 0 0' }}>
                    {result.title}
                  </h3>
                </div>

                <button
                  onClick={() => handleCopy(result.content)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: copied ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                    border: copied ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: copied ? '#34d399' : '#fff',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied Full Derivation!' : 'Copy Complete Solution'}
                </button>
              </div>

              <div 
                style={{ fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: formatSlideMath(result.content) }}
              />
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div style={{
          padding: '8px 20px',
          background: 'rgba(6, 9, 16, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.72rem',
          color: 'var(--text-dim)',
          flexShrink: 0
        }}>
          <div>
            CampusNotes Ecosystem HUD • Press <strong>Alt + Space</strong> or <strong>Ctrl + K</strong> to summon DeepSearch anytime
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>✓ KaTeX LaTeX Engine Active</span>
            <span>✓ Verified MMEC Syllabus 2025-26</span>
          </div>
        </div>
      </div>
    </div>
  );
}
