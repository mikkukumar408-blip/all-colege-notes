// Pure Markdown (.md) content loader for all 8 subjects.
// In Vite (Web & Android APK): import.meta.glob('./**/*.md', { query: '?raw', import: 'default', eager: true })
// is statically replaced at compile time with the object mapping './<subject>/<sectionId>.md' -> raw string.
// In Node CLI scripts (build_unit_pdfs.mjs): falls back to process.getBuiltinModule('fs').

let viteMdModules = null;
try {
  viteMdModules = import.meta.glob('./**/*.md', { query: '?raw', import: 'default', eager: true });
} catch {
  viteMdModules = null;
}

export function getSectionMarkdown(subjectSlug, sectionId) {
  const relKey = `./${subjectSlug}/${sectionId}.md`;
  if (viteMdModules && viteMdModules[relKey] !== undefined) {
    return viteMdModules[relKey];
  }
  if (typeof globalThis.__READ_MD_SYNC__ === 'function') {
    return globalThis.__READ_MD_SYNC__(subjectSlug, sectionId);
  }
  if (typeof globalThis.process !== 'undefined' && typeof globalThis.process.getBuiltinModule === 'function') {
    const fs = globalThis.process.getBuiltinModule('fs');
    const url = globalThis.process.getBuiltinModule('url');
    const path = globalThis.process.getBuiltinModule('path');
    const dir = path.dirname(url.fileURLToPath(import.meta.url));
    return fs.readFileSync(path.join(dir, subjectSlug, `${sectionId}.md`), 'utf8');
  }
  return '';
}
