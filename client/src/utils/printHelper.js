/**
 * =========================================================================
 * UNIVERSAL PRINT & PDF ENGINE (printHelper.js)
 * =========================================================================
 * Bridges native Android WebView printing (via AndroidPrintBridge),
 * browser printing, and fallback print dialogs for clean PDF exports.
 * =========================================================================
 */

export function triggerUniversalPrint(documentTitle = 'College_Notes') {
  try {
    if (typeof window !== 'undefined') {
      const sanitizedTitle = (documentTitle || 'College_Notes')
        .replace(/[^a-zA-Z0-9_\-\s]/g, '')
        .replace(/\s+/g, '_');

      // 1. Android Capacitor WebView via Native PrintManager
      if (window.AndroidPrintBridge && typeof window.AndroidPrintBridge.printDocument === 'function') {
        window.AndroidPrintBridge.printDocument(sanitizedTitle);
        return true;
      }

      // 2. Standard Browser print
      window.print();
      return true;
    }
  } catch (err) {
    console.error('Universal print invocation error:', err);
    try {
      window.print();
    } catch (fallbackErr) {
      console.error('Fallback window.print also failed:', fallbackErr);
    }
  }
  return false;
}

// Global safety patch: route all window.print() calls to native AndroidPrintBridge if available
if (typeof window !== 'undefined') {
  const originalPrint = window.print ? window.print.bind(window) : () => {};
  window.print = function() {
    if (window.AndroidPrintBridge && typeof window.AndroidPrintBridge.printDocument === 'function') {
      const cleanDocTitle = (document.title || 'College_Notes')
        .replace(/[^a-zA-Z0-9_\-\s]/g, '')
        .replace(/\s+/g, '_');
      window.AndroidPrintBridge.printDocument(cleanDocTitle);
    } else {
      originalPrint();
    }
  };
}

export default triggerUniversalPrint;
