package com.allcollegenotes.app;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.DownloadListener;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;
import androidx.core.content.FileProvider;
import com.getcapacitor.BridgeActivity;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends BridgeActivity {

    public class AndroidPrintBridge {
        @JavascriptInterface
        public void printDocument(final String documentName) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        PrintManager printManager = (PrintManager) getSystemService(Context.PRINT_SERVICE);
                        if (printManager != null && bridge != null && bridge.getWebView() != null) {
                            String name = (documentName != null && !documentName.trim().isEmpty())
                                ? documentName.trim()
                                : "College_Notes_Document";
                            PrintDocumentAdapter adapter = bridge.getWebView().createPrintDocumentAdapter(name);
                            printManager.print(name, adapter, new PrintAttributes.Builder().build());
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
        }
    }

    public class AndroidDownloadBridge {
        @JavascriptInterface
        public boolean isNativeApp() {
            return true;
        }

        @JavascriptInterface
        public void saveAndOpenPdf(final String fileName, final String base64Data) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        byte[] pdfBytes = Base64.decode(base64Data, Base64.DEFAULT);
                        saveBytesAndOpen(fileName, pdfBytes);
                    } catch (Exception e) {
                        e.printStackTrace();
                        showToast("Failed to save PDF: " + e.getMessage());
                    }
                }
            }).start();
        }

        @JavascriptInterface
        public void downloadPdfFromUrl(final String urlString, final String fileName) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        byte[] pdfBytes = null;

                        // Check if it's a bundled asset
                        String cleanPath = urlString;
                        if (cleanPath.startsWith("http://localhost/")) {
                            cleanPath = cleanPath.substring("http://localhost/".length());
                        } else if (cleanPath.startsWith("https://localhost/")) {
                            cleanPath = cleanPath.substring("https://localhost/".length());
                        } else if (cleanPath.startsWith("capacitor://localhost/")) {
                            cleanPath = cleanPath.substring("capacitor://localhost/".length());
                        }
                        if (cleanPath.startsWith("/")) {
                            cleanPath = cleanPath.substring(1);
                        }

                        // Try loading from assets (public/...)
                        AssetManager assetManager = getAssets();
                        InputStream is = null;
                        try {
                            is = assetManager.open("public/" + cleanPath);
                        } catch (Exception ignored) {
                            try {
                                is = assetManager.open(cleanPath);
                            } catch (Exception ignored2) {}
                        }

                        if (is != null) {
                            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                            byte[] data = new byte[8192];
                            int nRead;
                            while ((nRead = is.read(data, 0, data.length)) != -1) {
                                buffer.write(data, 0, nRead);
                            }
                            buffer.flush();
                            pdfBytes = buffer.toByteArray();
                            is.close();
                        } else if (urlString.startsWith("http://") || urlString.startsWith("https://")) {
                            // Download from external network
                            URL url = new URL(urlString);
                            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                            conn.setConnectTimeout(15000);
                            conn.setReadTimeout(15000);
                            conn.connect();
                            if (conn.getResponseCode() == 200) {
                                InputStream netIs = conn.getInputStream();
                                ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                                byte[] data = new byte[8192];
                                int nRead;
                                while ((nRead = netIs.read(data, 0, data.length)) != -1) {
                                    buffer.write(data, 0, nRead);
                                }
                                buffer.flush();
                                pdfBytes = buffer.toByteArray();
                                netIs.close();
                            }
                            conn.disconnect();
                        }

                        if (pdfBytes != null && pdfBytes.length > 0) {
                            saveBytesAndOpen(fileName, pdfBytes);
                        } else {
                            showToast("Could not locate PDF file.");
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        showToast("Error downloading PDF: " + e.getMessage());
                    }
                }
            }).start();
        }

        private void saveBytesAndOpen(String fileName, byte[] pdfBytes) {
            try {
                String safeName = (fileName != null && !fileName.trim().isEmpty())
                    ? fileName.trim()
                    : "College_Notes_Document.pdf";
                if (!safeName.toLowerCase().endsWith(".pdf")) {
                    safeName += ".pdf";
                }

                // 1. Save to Downloads folder
                boolean savedToDownloads = false;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    ContentResolver resolver = getContentResolver();
                    ContentValues contentValues = new ContentValues();
                    contentValues.put(MediaStore.MediaColumns.DISPLAY_NAME, safeName);
                    contentValues.put(MediaStore.MediaColumns.MIME_TYPE, "application/pdf");
                    contentValues.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/AllCollegeNotes");
                    Uri docUri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues);
                    if (docUri != null) {
                        OutputStream os = resolver.openOutputStream(docUri);
                        if (os != null) {
                            os.write(pdfBytes);
                            os.flush();
                            os.close();
                            savedToDownloads = true;
                        }
                    }
                } else {
                    File dlDir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), "AllCollegeNotes");
                    if (!dlDir.exists()) dlDir.mkdirs();
                    File outFile = new File(dlDir, safeName);
                    FileOutputStream fos = new FileOutputStream(outFile);
                    fos.write(pdfBytes);
                    fos.flush();
                    fos.close();
                    savedToDownloads = true;
                }

                // 2. Also write to cache dir for instant FileProvider viewing
                File cacheFile = new File(getCacheDir(), safeName);
                FileOutputStream fosCache = new FileOutputStream(cacheFile);
                fosCache.write(pdfBytes);
                fosCache.flush();
                fosCache.close();

                final String finalName = safeName;
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(MainActivity.this, "✅ Downloaded: " + finalName + " to Downloads", Toast.LENGTH_SHORT).show();

                        try {
                            Uri uri = FileProvider.getUriForFile(
                                MainActivity.this,
                                getPackageName() + ".fileprovider",
                                cacheFile
                            );
                            Intent intent = new Intent(Intent.ACTION_VIEW);
                            intent.setDataAndType(uri, "application/pdf");
                            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            Intent chooser = Intent.createChooser(intent, "Open " + finalName + " with");
                            chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            startActivity(chooser);
                        } catch (Exception ex) {
                            ex.printStackTrace();
                        }
                    }
                });

            } catch (Exception e) {
                e.printStackTrace();
                showToast("Save error: " + e.getMessage());
            }
        }

        private void showToast(final String msg) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Toast.makeText(MainActivity.this, msg, Toast.LENGTH_LONG).show();
                }
            });
        }
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            if (this.bridge != null && this.bridge.getWebView() != null) {
                WebView webView = this.bridge.getWebView();
                
                // Add Android Print Bridge
                webView.addJavascriptInterface(new AndroidPrintBridge(), "AndroidPrintBridge");

                // Add Android Native Download Bridge
                final AndroidDownloadBridge downloadBridge = new AndroidDownloadBridge();
                webView.addJavascriptInterface(downloadBridge, "AndroidDownloadBridge");

                webView.setDownloadListener(new DownloadListener() {
                    @Override
                    public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimetype, long contentLength) {
                        String guessedName = "College_Notes_Document.pdf";
                        if (contentDisposition != null && contentDisposition.contains("filename=")) {
                            try {
                                guessedName = contentDisposition.split("filename=")[1].replace("\"", "").trim();
                            } catch (Exception ignored) {}
                        } else if (url != null && url.contains("/")) {
                            String lastPart = url.substring(url.lastIndexOf('/') + 1);
                            if (lastPart.contains("?")) lastPart = lastPart.substring(0, lastPart.indexOf("?"));
                            if (!lastPart.isEmpty()) guessedName = lastPart;
                        }
                        downloadBridge.downloadPdfFromUrl(url, guessedName);
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
