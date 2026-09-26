/**
 * Universal Mobile & Desktop PDF Downloader for All College Notes
 * Works seamlessly across:
 * 1. Capacitor Android Native App (saves to Downloads/AllCollegeNotes + opens native PDF viewer)
 * 2. Mobile Chrome & Safari Browsers (Web Share API / blob downloader)
 * 3. Desktop Browsers (standard HTML5 download attribute)
 */

export async function downloadPdf(url, filename, title = 'Document') {
  if (!url || url === '#' || url === '') {
    alert('This document is currently being prepared. Please check back shortly!');
    return false;
  }

  const safeName = (filename || 'College_Notes_Document.pdf').trim();
  const finalFilename = safeName.toLowerCase().endsWith('.pdf') ? safeName : `${safeName}.pdf`;

  // ─── 1. Native Android Capacitor App Bridge ─────────────────────────────────
  if (typeof window !== 'undefined' && window.AndroidDownloadBridge) {
    try {
      if (typeof window.AndroidDownloadBridge.downloadPdfFromUrl === 'function') {
        window.AndroidDownloadBridge.downloadPdfFromUrl(url, finalFilename);
        return true;
      }
    } catch (bridgeErr) {
      console.warn('Native downloadPdfFromUrl error, trying base64 fallback:', bridgeErr);
    }

    try {
      if (typeof window.AndroidDownloadBridge.saveAndOpenPdf === 'function') {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Fetch failed with status ' + res.status);
        const blob = await res.blob();
        const base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result;
            const b64 = typeof result === 'string' ? result.split(',')[1] : null;
            if (b64) resolve(b64);
            else reject(new Error('Failed to convert blob to base64'));
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        window.AndroidDownloadBridge.saveAndOpenPdf(finalFilename, base64Data);
        return true;
      }
    } catch (b64Err) {
      console.warn('Native saveAndOpenPdf error:', b64Err);
    }
  }

  // ─── 2. Mobile Browser Support (iOS Safari & Android Chrome) ────────────────
  const isMobile = typeof navigator !== 'undefined' && 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const blob = await res.blob();

    // Check if Web Share API with File sharing is supported
    if (isMobile && navigator?.canShare) {
      try {
        const file = new File([blob], finalFilename, { type: 'application/pdf' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: title || finalFilename,
            text: `Download ${title || finalFilename}`
          });
          return true;
        }
      } catch (shareErr) {
        if (shareErr.name === 'AbortError') {
          return true; // User cancelled share dialog cleanly
        }
        console.warn('Web Share failed, falling back to blob anchor:', shareErr);
      }
    }

    // ─── 3. Standard Desktop & Web Browser Blob Download ──────────────────────
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = finalFilename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 20000);
    return true;
  } catch (err) {
    console.warn('Direct blob fetch error, triggering browser fallback:', err);
  }

  // ─── 4. Universal Fallback ──────────────────────────────────────────────────
  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = finalFilename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
  } catch (e) {
    window.open(url, '_blank') || (window.location.href = url);
    return true;
  }
}
