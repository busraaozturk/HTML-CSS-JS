# UploadProgress-React - Component Mimarisi

Bu dokuman, `UploadProgress-React/src/components` altindaki dosyalari ve her birinin ne yaptigini detayli olarak aciklar. Amac: tek bir dosyada toplanmis UI + mantigi parcalara ayirarak okunabilirligi, bakimi ve degisiklik yapmayi kolaylastirmaktir.

## Neden Yeni `components/uploadProgress` Klasoru Olusturuldu?

Ilk halinde `UploadProgress-React/src/components/UploadProgress.jsx` tek basina su sorumluluklari tasiyordu:

- UI render (header, dropzone, progress bar, butonlar)
- Upload simulasyonu (interval, hiz, hata olasiligi)
- Yardimci fonksiyonlar (formatBytes, extension tespiti vb.)
- Dosya listesi ve preview render

Bu durum dosyayi kalabaliklastirir, okunurlugu dusurur ve degisikliklerde hata riskini artirir. Bu yuzden feature-based bir alt klasor olusturduk:

- `UploadProgress.jsx` = sayfa/feature orchestrator (akisi yoneten ana component)
- `components/uploadProgress/*` = bu sayfanin alt UI parcalari + utility mantigi

## Klasor Yapisi

- `UploadProgress-React/src/components/UploadProgress.jsx`
- `UploadProgress-React/src/components/uploadProgress/constants.js`
- `UploadProgress-React/src/components/uploadProgress/utils.js`
- `UploadProgress-React/src/components/uploadProgress/HeaderIcon.jsx`
- `UploadProgress-React/src/components/uploadProgress/DropZone.jsx`
- `UploadProgress-React/src/components/uploadProgress/FileList.jsx`
- `UploadProgress-React/src/components/uploadProgress/FilePreview.jsx`
- `UploadProgress-React/src/components/uploadProgress/StatusIcon.jsx`
- `UploadProgress-React/src/components/uploadProgress/ProgressBar.jsx`
- `UploadProgress-React/src/components/uploadProgress/Controls.jsx`

## Dosya Dosya Detay

### 1) `UploadProgress-React/src/components/UploadProgress.jsx`

Bu dosya "feature orchestrator" rolundedir. Yani state + akis burada, kucuk UI parcalari baska dosyalarda.

- State:
  - `selectedFiles`: secilen dosyalar
  - `selectedFilesStatus`: her dosyanin durumu (`waiting/uploading/completed/error`)
  - `imageUrlsByKey`: image preview icin object URL'ler
  - `progressPercent` ve `progressLabel`
  - `isUploading`, `isPaused`, `isDragOver`
- Ref:
  - `fileInputRef`: hidden input tetiklemek icin
  - `intervalsRef`: interval id'leri (reset/unmount temizligi icin)
  - `objectUrlsRef`: object URL map (revoke ederek memory leak engellenir)
  - `isUploadingRef` ve `isPausedRef`: interval callback icinde guncel deger okumak icin
- Akis:
  - `handleFilesChosen` -> dosya secim/drop olunca calisir
  - `showFileInfo` -> dosya status'larini `waiting` olarak baslatir
  - `startUpload` -> serial upload simulasyonu baslatir
  - `resetAll` -> her seyi sifirlar (interval temizligi + url revoke)
- Compose:
  - `HeaderIcon`, `DropZone`, `FileList`, `FilePreview`, `ProgressBar`, `Controls`

**Neden `thisIndex` yakalaniyor?**
Multi-file upload sirasinda `fileIndex` degiskeni ilerledigi icin interval callback icinde yanlis dosyaya status yazma riski olur. Bu "closure bug"u engellemek icin her dosya baslarken `const thisIndex = fileIndex;` ile index sabitlenir.

### 2) `constants.js`

Sabit degerler ve ayarlar:

- Tip listeleri: `IMAGE_TYPES`, `DOC_TYPES`, `AUDIO_TYPES`, `VIDEO_TYPES`
- Simulasyon tuning:
  - `UPLOAD_SPEED_MBPS`
  - `MIN_FILE_DURATION_MS`

### 3) `utils.js`

Ortak helper + simulasyon motoru:

- `formatBytes(bytes)`
- `getExt(fileName)`
- `getDocIcon(ext)` (ASCII etiketler: PDF/DOCX vb.)
- `createUploadTicker(file, ctx)`
  - 100ms tick
  - hiz + minimum sure
  - dosya basina hata olasiligi (default %10)
  - `onTick({ kind: "progress" })` veya `onTick({ kind: "error" })`

Bu fonksiyon UI bilmez; UI sadece event alir ve state gunceller.

### 4) `HeaderIcon.jsx`

Basliktaki SVG ikon. Ana dosyanin JSX kalabaligini azaltir.

### 5) `DropZone.jsx`

Drag&drop ve click-to-select alani.

- `disabled` ile upload sirasinda tekrar secim engellenir
- `isDragOver` ile border rengi degisir
- `onDrop` ile `FileList` + upload otomatik baslar

### 6) `FileList.jsx`

Multi-file list render.

- Ust satir: toplam dosya / toplam boyut / OK-ERR sayisi
- Her satir: preview + ad/boyut + status icon

### 7) `FilePreview.jsx`

Dosya turune gore preview.

- image: `img` (object URL)
- audio/video/doc: basit tip etiketi
- `size="sm|lg"`

### 8) `StatusIcon.jsx`

Status'a gore SVG icon.

- `uploading`: spinner
- `completed`: yesil tik
- `error`: kirmizi carpı

Pause'da spinner durmasi `paused` class'i + CSS ile saglanir.

### 9) `ProgressBar.jsx`

Bar'in tek gorevi:

- width = `percent`
- glow efekti = `glow`

### 10) `Controls.jsx`

Alt butonlar:

- `Sifirla`
- `Durdur/Devam Et`

## CSS Notlari

Tailwind layout icin, ozel efektler ise `UploadProgress-React/src/upload-progress.css` icin:

- `glow` box-shadow
- file list scrollbar
- spinner keyframes + pause (paused class)

## Pratik Degisiklik Noktalari

- Simulasyon hizini degistir: `constants.js` -> `UPLOAD_SPEED_MBPS`
- Minimum sure: `constants.js` -> `MIN_FILE_DURATION_MS`
- Hata ihtimali: `utils.js` -> `Math.random() < 0.1`
- Liste UI: `FileList.jsx`
- Preview davranisi: `FilePreview.jsx`

