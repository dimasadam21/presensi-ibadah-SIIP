param(
    [string]$AppUrl = "https://presensi-ibadah-kloning.vercel.app",
    [string]$PackageName = "com.siip.presensiibadah",
    [string]$AppName = "S I I P",
    [string]$OutputApkName = "SIIP_Presensi_Ibadah.apk"
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$BuildDir = Join-Path $PSScriptRoot "output"
$SdkDir = "C:\Users\admin\AppData\Local\Android\Sdk"
$BuildToolsDir = Join-Path $SdkDir "build-tools\29.0.3"
$AndroidJar = Join-Path $SdkDir "platforms\android-34\android.jar"
$EcjJar = Join-Path $PSScriptRoot "tools\ecj.jar"
$Keytool = "C:\Program Files\Java\jre1.8.0_321\bin\keytool.exe"

$Aapt2 = Join-Path $BuildToolsDir "aapt2.exe"
$D8Jar = Join-Path $BuildToolsDir "lib\d8.jar"
$Zipalign = Join-Path $BuildToolsDir "zipalign.exe"
$ApksignerJar = Join-Path $BuildToolsDir "lib\apksigner.jar"

Write-Host "=== PREPARING BUILD DIRECTORY ==="
if (Test-Path $BuildDir) { Remove-Item -Path $BuildDir -Recurse -Force }
New-Item -ItemType Directory -Path "$BuildDir\res\values" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\res\drawable" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\res\mipmap-mdpi" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\res\mipmap-hdpi" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\res\mipmap-xhdpi" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\res\mipmap-xxhdpi" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\res\mipmap-xxxhdpi" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\assets" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\src\com\siip\presensiibadah" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\gen" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\bin" -Force | Out-Null
New-Item -ItemType Directory -Path "$BuildDir\dex" -Force | Out-Null

Write-Host "=== COPYING WEB ASSETS TO APK ASSETS ==="
$webFiles = @(
    "index.html", "config.js", "islamic_features.js", "ramadhan_feature.js",
    "manifest.json", "icon-192.png", "icon-512.png", "icon-maskable-512.png",
    "apple-touch-icon.png", "logo-siip.png", "favicon.png", "logo-smkn1.png", "logo-gpai.png", "logo-banner.png",
    "mascot-ipin.png", "logo-si-ipin.png", "suara-si-ipin.mp3", "tahsin_games.js", "tahsin_feature.js", "tahsin.css", "xlsx.full.min.js", "jszip.min.js"
)
foreach ($f in $webFiles) {
    $src = Join-Path $Root $f
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination "$BuildDir\assets\$f" -Force
    }
}
if (Test-Path "$Root\assets") {
    Copy-Item -Path "$Root\assets" -Destination "$BuildDir\assets" -Recurse -Force
}

Write-Host "=== GENERATING MIPMAP ICONS ==="
Add-Type -AssemblyName System.Drawing
$iconSource = Join-Path $Root "icon-512.png"
$srcImg = [System.Drawing.Image]::FromFile($iconSource)

function Make-Mipmap {
    param([string]$targetPath, [int]$size)
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($srcImg, 0, 0, $size, $size)
    $bmp.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

Make-Mipmap -targetPath "$BuildDir\res\mipmap-mdpi\ic_launcher.png" -size 48
Make-Mipmap -targetPath "$BuildDir\res\mipmap-hdpi\ic_launcher.png" -size 72
Make-Mipmap -targetPath "$BuildDir\res\mipmap-xhdpi\ic_launcher.png" -size 96
Make-Mipmap -targetPath "$BuildDir\res\mipmap-xxhdpi\ic_launcher.png" -size 144
Make-Mipmap -targetPath "$BuildDir\res\mipmap-xxxhdpi\ic_launcher.png" -size 192
$srcImg.Dispose()

function Write-Utf8NoBom {
    param([string]$path, [string]$content)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
}

Write-Host "=== CREATING ANDROID RESOURCE FILES ==="
# strings.xml
Write-Utf8NoBom -path "$BuildDir\res\values\strings.xml" -content @"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">$AppName</string>
</resources>
"@

# styles.xml
Write-Utf8NoBom -path "$BuildDir\res\values\styles.xml" -content @"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="@android:style/Theme.DeviceDefault.NoActionBar">
        <item name="android:windowNoTitle">true</item>
        <item name="android:windowBackground">@android:color/black</item>
    </style>
</resources>
"@

# AndroidManifest.xml
Write-Utf8NoBom -path "$BuildDir\AndroidManifest.xml" -content @"
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="$PackageName"
    android:versionCode="1"
    android:versionName="1.0.0">

    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="34" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="28" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />

    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.camera.front" android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
    <uses-feature android:name="android.hardware.location.gps" android:required="false" />

    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/AppTheme"
        android:hardwareAccelerated="true"
        android:usesCleartextTraffic="true">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|keyboardHidden|screenSize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
"@

# MainActivity.java
Write-Utf8NoBom -path "$BuildDir\src\com\siip\presensiibadah\MainActivity.java" -content @"
package com.siip.presensiibadah;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.GeolocationPermissions;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;
    private static final int FILE_CHOOSER_REQUEST = 1001;
    private static final int PERMISSION_REQ_CODE = 2002;
    private static final String APP_URL = "$AppUrl";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        setContentView(webView);

        requestAppPermissions();

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        try {
            settings.setAllowFileAccessFromFileURLs(true);
            settings.setAllowUniversalAccessFromFileURLs(true);
        } catch (Exception ignored) {}

        settings.setGeolocationEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);

        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("file://")) {
                    return false;
                }
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);
                    return true;
                } catch (Exception e) {
                    return true;
                }
            }

            @Override
            public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                if (!failingUrl.startsWith("file:///android_asset/")) {
                    view.loadUrl("file:///android_asset/index.html");
                }
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, false);
            }

            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            request.grant(request.getResources());
                        }
                    });
                }
            }

            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                MainActivity.this.filePathCallback = filePathCallback;
                Intent intent = null;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    intent = fileChooserParams.createIntent();
                } else {
                    intent = new Intent(Intent.ACTION_GET_CONTENT);
                    intent.setType("*/*");
                }
                try {
                    startActivityForResult(intent, FILE_CHOOSER_REQUEST);
                } catch (Exception e) {
                    MainActivity.this.filePathCallback = null;
                    return false;
                }
                return true;
            }
        });

        
        webView.setDownloadListener(new android.webkit.DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW);
                    intent.setData(Uri.parse(url));
                    startActivity(intent);
                } catch (Exception e) {
                    android.widget.Toast.makeText(MainActivity.this, "Download: " + e.getMessage(), android.widget.Toast.LENGTH_SHORT).show();
                }
            }
        });

        webView.addJavascriptInterface(new AndroidBridge(), "AndroidBridge");

        webView.loadUrl(APP_URL);
    }

    
    public class AndroidBridge {
        @android.webkit.JavascriptInterface
        public void downloadBase64File(final String base64Data, final String filename, final String mimeType) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        byte[] data = android.util.Base64.decode(base64Data, android.util.Base64.DEFAULT);
                        java.io.File downloadDir = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS);
                        if (!downloadDir.exists()) downloadDir.mkdirs();
                        java.io.File file = new java.io.File(downloadDir, filename);
                        java.io.FileOutputStream fos = new java.io.FileOutputStream(file);
                        fos.write(data);
                        fos.flush();
                        fos.close();

                        android.media.MediaScannerConnection.scanFile(MainActivity.this, new String[]{file.getAbsolutePath()}, new String[]{mimeType}, null);

                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                android.widget.Toast.makeText(MainActivity.this, "✅ File tersimpan di folder Download: " + filename, android.widget.Toast.LENGTH_LONG).show();
                            }
                        });

                        try {
                            android.net.Uri fileUri = android.net.Uri.fromFile(file);
                            android.content.Intent openIntent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                            openIntent.setDataAndType(fileUri, mimeType);
                            openIntent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
                            startActivity(openIntent);
                        } catch (Exception ignored) {}
                    } catch (final Exception e) {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                android.widget.Toast.makeText(MainActivity.this, "Gagal mengunduh file: " + e.getMessage(), android.widget.Toast.LENGTH_SHORT).show();
                            }
                        });
                    }
                }
            }).start();
        }
    }

    private void requestAppPermissions() {
        if (Build.VERSION.SDK_INT >= 23) {
            String[] permissions = new String[] {
                "android.permission.CAMERA",
                "android.permission.ACCESS_FINE_LOCATION",
                "android.permission.ACCESS_COARSE_LOCATION"
            };
            boolean needRequest = false;
            for (String p : permissions) {
                if (checkSelfPermission(p) != PackageManager.PERMISSION_GRANTED) {
                    needRequest = true;
                    break;
                }
            }
            if (needRequest) {
                requestPermissions(permissions, PERMISSION_REQ_CODE);
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == FILE_CHOOSER_REQUEST) {
            if (filePathCallback != null) {
                Uri[] results = null;
                if (resultCode == Activity.RESULT_OK && data != null) {
                    String dataString = data.getDataString();
                    if (dataString != null) {
                        results = new Uri[] { Uri.parse(dataString) };
                    }
                }
                filePathCallback.onReceiveValue(results);
                filePathCallback = null;
            }
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
"@

Write-Host "=== COMPILING RESOURCES WITH AAPT2 ==="
& $Aapt2 compile --dir "$BuildDir\res" -o "$BuildDir\compiled_res.zip"
if ($LASTEXITCODE -ne 0) { throw "aapt2 compile failed" }

Write-Host "=== LINKING WITH AAPT2 ==="
& $Aapt2 link -I $AndroidJar "$BuildDir\compiled_res.zip" `
    --manifest "$BuildDir\AndroidManifest.xml" `
    --java "$BuildDir\gen" `
    -A "$BuildDir\assets" `
    -o "$BuildDir\unaligned_no_dex.apk"
if ($LASTEXITCODE -ne 0) { throw "aapt2 link failed" }

Write-Host "=== COMPILING JAVA SOURCE CODE WITH ECJ ==="
$javaFiles = @(
    "$BuildDir\gen\com\siip\presensiibadah\R.java",
    "$BuildDir\src\com\siip\presensiibadah\MainActivity.java"
)
& java -jar $EcjJar -7 -cp $AndroidJar $javaFiles -d "$BuildDir\bin"
if ($LASTEXITCODE -ne 0) { throw "ECJ compilation failed" }

Write-Host "=== CONVERTING BYTECODE TO DEX WITH D8 ==="
$classFiles = Get-ChildItem -Path "$BuildDir\bin\com\siip\presensiibadah\*.class" | Select-Object -ExpandProperty FullName
& java -cp $D8Jar com.android.tools.r8.D8 --output "$BuildDir\dex" --lib $AndroidJar $classFiles
if ($LASTEXITCODE -ne 0) { throw "D8 dexing failed" }

Write-Host "=== ADDING DEX TO APK ==="
Copy-Item "$BuildDir\unaligned_no_dex.apk" "$BuildDir\unaligned_with_dex.apk" -Force
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::Open("$BuildDir\unaligned_with_dex.apk", [System.IO.Compression.ZipArchiveMode]::Update)
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, "$BuildDir\dex\classes.dex", "classes.dex")
$zip.Dispose()

Write-Host "=== ALIGNING APK WITH ZIPALIGN ==="
& $Zipalign -f 4 "$BuildDir\unaligned_with_dex.apk" "$BuildDir\aligned.apk"
if ($LASTEXITCODE -ne 0) { throw "zipalign failed" }

Write-Host "=== GENERATING KEYSTORE (IF NEEDED) ==="
$KeystorePath = "$PSScriptRoot\tools\siip_release.keystore"
if (-not (Test-Path $KeystorePath)) {
    & $Keytool -genkeypair -v -keystore $KeystorePath -alias siip -keyalg RSA -keysize 2048 -validity 10000 `
        -storepass "siip2026" -keypass "siip2026" `
        -dname "CN=SIIP, OU=Sistem Informasi Ibadah Pelajar, O=SIIP, L=Jakarta, ST=Jakarta, C=ID"
}

Write-Host "=== SIGNING APK WITH APKSIGNER ==="
$FinalApk = Join-Path $Root $OutputApkName
& java -jar $ApksignerJar sign --ks $KeystorePath --ks-pass "pass:siip2026" --ks-key-alias siip --key-pass "pass:siip2026" `
    --out $FinalApk "$BuildDir\aligned.apk"
if ($LASTEXITCODE -ne 0) { throw "apksigner sign failed" }

Write-Host "=== VERIFYING SIGNED APK ==="
& java -jar $ApksignerJar verify --verbose $FinalApk

$apkItem = Get-Item $FinalApk
Write-Host "`n🎉 SUCCESS! Android APK successfully built and signed!"
Write-Host "File: $($apkItem.FullName)"
Write-Host "Size: $([math]::Round($apkItem.Length / 1MB, 2)) MB"
