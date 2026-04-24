 # UploadProgress-React - Component Mimarisi

Bu doküman, `UploadProgress-React/src/components` altındaki dosyaları ve her birinin ne yaptığını detaylı olarak açıklar. Amaç: tek bir dosyada toplanmış UI + mantığı parçalara ayırarak okunabilirliği, bakımı ve değişiklik yapmayı kolaylaştırmaktır.

## Neden Yeni `components/uploadProgress` Klasörü Oluşturuldu?

İlk halinde `UploadProgress-React/src/components/UploadProgress.jsx` tek başına su sorumlulukları taşıyordu:

- UI render (header, dropzone, progress bar, butonlar)
- Upload simulasyonu (interval, hiz, hata olasılığı)
- Yardımcı fonksiyonlar (formatBytes, extension tespiti vb.)
- Dosya listesi ve preview render

Bu durum dosyayı kalabalıklaştırır, okunurluğu düşürür ve değişikliklerde hata riskini artırır. Bu yüzden feature-based bir alt klasör oluşturduk:

- `UploadProgress.jsx` = sayfa/feature orchestrator (akışı yöneten ana component)
- `components/uploadProgress/*` = bu sayfanın alt UI parçaları + utility mantığı

## Klasör Yapısı

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

**Proje Yapısı Şu Şekilde**
UploadProgress (ANA)
 ├── Controls
 ├── DropZone
 ├── FileList
 ├── FilePreview
 ├── ProgressBar
 └── HeaderIcon

**Amaç**
Her Component = **Tek bir işi yapar (Single Responsibility)**
| Component      | Görevi                  |
| -------------- | ----------------------- |
| DropZone       | Dosya seçme / drag-drop |
| FileList       | Çoklu dosya listesi     |
| FilePreview    | Tek dosya görseli       |
| ProgressBar    | Yükleme yüzdesi         |
| Controls       | Pause / Reset butonları |
| UploadProgress | Hepsini yönetir         |


# Dosya Dosya Detay

## 1) `UploadProgress-React/src/components/UploadProgress.jsx`

Bu dosya "feature orchestrator" rolündedir. 
Yani state ve iş akışı burada yönetilir, UI parçalar ise alt componentlere bölünmüştür.
- Ana yönetici componenttir
- Tüm state'leri tutar
- İş mantığını yönetir
- Alt componentlere veri ve event gönderir
- React'te buna **Container Component ve Smart Component** denir.

### State Yapısı : 
```
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesStatus, setSelectedFilesStatus] = useState({});
  const [imageUrlsByKey, setImageUrlsByKey] = useState({});
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressLabel, setProgressLabel] = useState("%0");
  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
```

- `selectedFiles`: Seçilen dosyalar
- `selectedFilesStatus`: Dosya Durumları (`waiting/uploading/completed/error`)
- `imageUrlsByKey`: Image preview için object URL'ler
- `progressPercent`: Yükleme Yüzdesi
- `progressLabel` : UI metni
- `isUploading` : Upload aktif mi
- `isPaused` : Pause durumu
- `isDragOver` : Drag UI efekti

### `hasGlow` State (UI State / Derived State)
```
  const hasGlow = isUploading && !isPaused && progressPercent < 100;
```
- `hasGlow` : Progress bar animasyonu için kullanılır
- Sadece upload aktifken ve pause değilken çalışır

### Ref Kullanımı :
```
  const fileInputRef = useRef(null);
  const objectUrlsRef = useRef(new Map());
  const intervalsRef = useRef({});
```
- `useRef` render tetiklenmeden veri tutar.
- `fileInputRef`: Hidden input tetiklemek için
- `intervalsRef`: setInterval kontrolü (reset/unmount temizliği için)
- `objectUrlsRef`: Object URL yönetimi (revoke ederek memory leak engellenir)
- `isUploadingRef`: interval callback içinde güncel değer okumak 
- `isPausedRef` : Pause durumunu interval içinde kontrol etmek için kullanılır
için

```
  const isUploadingRef = useRef(false);

  useEffect(() => {
    isUploadingRef.current = isUploading;
  }, [isUploading]);
```
- `setInterval` içinde state güncel kalmaz bu yüzden ref ile güncel değer tutulur.

### Akış (Flow) :
  - `handleFilesChosen` -> dosya seçim/drop olunca çalışır
  - `showFileInfo` -> dosya status'larını `waiting` olarak başlatır
  - `startUpload` -> upload sürecini başlatır
  - `resetAll` -> her şeyi sıfırlar (interval temizliği + url revoke)

### Neden `thisIndex` kullanıldı?
```
  const thisIndex = fileIndex;
```
- Multi-file upload sırasında `fileIndex` değişkeni ilerlediği için interval callback içinde yanlış dosyaya status yazma riski olur. Bu "closure bug"u engellemek için her dosya başlarken `const thisIndex = fileIndex;` ile index sabitlenir.

### Upload Motoru (createUploadTicker)
```
  createUploadTicker(file, {...})
```
- setInterval tabanlı çalışır
- Her tick'te progress üretir
- Pause / resume desteği vardır
- Error simülasyonu yapabilir
- Upload işlemini gerçek backend olmadan simüle eder

### Cleanup Mantığı
```
  useEffect(() => {
    return () => {
      clearInterval(...)
      URL.revokeObjectURL(...)
    };
  }, []);
```
- Memory leak önler
- Performans korur

### Performans (useMemo)
```
  const totalBytes = useMemo(() => {
    ...
  }, [selectedFiles]);
```
- Gereksiz hesaplamaları önler

### Image Preview Yönetimi
```
  URL.createObjectURL(file)
```
- RAM'de tutulur temizlenmezse memory leak olur

```
  useEffect(() => {
    const nextMap = new Map();
    ...
  }, [selectedFiles]);
```
- Her render'da yeniden URL oluşturulmaz
- Mevcut URL'ler `Map` içinde saklanır
- Kullanılmayan URL'ler `revoke` edilir
- Bu sayede:
  - Gereksiz yeniden oluşturma engellenir
  - Memory leak önlenir
  - Performans korunur

### Upload Simülasyonu
```
  function startUpload(files)
```
Bu fonksiyon:
- Dosyaları sırayla upload eder
- Progress hesaplar
- Error yönetir
- Pause/resume destekler
- Tamamlanınca confetti efekti çalışır
Akışı:
- Upload başlar
- Dosya sıraya girer
- Interval çalışır (createUploadTicker)
- Progress güncellenir
- Tamamlanınca -> sıradaki dosya

### Event Yönetimi
```
  onDrop -> handleFilesChosen
  onChange -> handleFilesChosen
```
- Aynı fonksiyon kullanılmış -> DRY prensibi

### UI Mantığı
- Tek dosya -> `<FilePreview />`
- Çoklu dosya -> `<FileList />`
```
  selectedFiles.length > 1 ? (...) : (...)
```
- Conditional rendering kullanılmış

### Component Mimarisi
```
  <Controls
    isUploading={isUploading}
    isPaused={isPaused}
    onReset={resetAll}
    onTogglePause={...}
  />
```
- Parent : state + logic
- Child : sadece UI (dumb component)



## 2) `constants.js`
Bu dosya uygulamada kullanılan **sabit değerleri (constants)** ve **simülasyon ayarlarını (tuning)** içerir.
Amaç : 
- Magic number'ları kaldırmak
- Kodun okunabilirliğini artırmak
- Tek noktadan yönetim sağlamak

Sonuç olarak `constants.js` dosyası :
- Uygulamanın **konfigürasyon merkezi**
- Dosya tiplerini sınıflandırır
- Upload simülasyonunu kontrol eder
- Kodun daha temiz, okunabilir ve sürdürülebilir olmasını sağlar

### Dosya Tipleri (File Type Definitions)
```
  export const IMAGE_TYPES = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  export const DOC_TYPES = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "rtf"];
  export const AUDIO_TYPES = ["mp3", "wav", "ogg", "m4a", "flac", "aac"];
  export const VIDEO_TYPES = ["mp4", "avi", "mov", "mkv", "wmv"];
```
Bu listeler dosyaları **tipine göre ayırmak** için kullanılır.
Bu yapı sayesinde:
- Dosya tipine göre farklı UI gösterilebilir
- Kod içinde `if (ext === "jpg" || ext === "png")` gibi karmaşa olmaz
- Yeni tip eklemek kolay olur

### IMAGE_TYPES
```
  if (IMAGE_TYPES.includes(ext)) {
    // preview göster
  }
```
- Görsel dosyaları belirler
- Kullanım yeri :
  - Preview gösterme (`FilePreview`)
  - `URL.createObjectURL` ile görsel oluşturma

### DOC_TYPES
- Doküman dosyalarını tanımlar
- Kullanım senaryosu : 
  - İkon gösterimi (PDF icon vs.)
  - Preview yerine farklı UI

### AUDIO_TYPES / VIDEO_TYPES
- Medya dosyalarını ayırır
- Kullanım : 
  - Farklı preview türleri
  - İleride player eklenebilir

### Simülasyon Ayarları (Upload Tuning)09+9
```
  export const UPLOAD_SPEED_MBPS = 2;
  export const MIN_FILE_DURATION_MS = 2000;
```
Bu kısım **upload simülasyonunu davranışını kontrol eder.**

###  `UPLOAD_SPEED_MBPS`
- Upload hızını belirler (MB/s cinsinden)
- Simülasyonun ne kadar hızlı ilerleyeceğini kontrol eder
**Örnek:**
```
  2 MB/s → daha yavaş, kullanıcı progress’i görür  
  10 MB/s → çok hızlı, UX kötü olur
```
- Kullanıcı 'Durdur' butonuna basabilsin diye yavaşlatılmış

### `MIN_FILE_DURATION_MS`
- Çok küçük dosyaların bile minimum yükleme süresi
**Problem :**
- Küçük dosyalar
```
  10KB → anında %100 olur ❌
```
**Çözüm :**
```
  minimum 2000ms (2 saniye)
```
Böylece:
- UI daha doğal görünür
- Progress bar animasyonu hissedilir
- Kullanıcı deneyimi iyileşir



Sabit değerler ve ayarlar:

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
  - hiz + minimum süre
  - dosya başına hata olasılığı (default %10)
  - `onTick({ kind: "progress" })` veya `onTick({ kind: "error" })`

Bu fonksiyon UI bilmez; UI sadece event alır ve state günceller.

### 4) `HeaderIcon.jsx`

Başlıktaki SVG ikon. Ana dosyanın JSX kalabalığını azaltır.

### 5) `DropZone.jsx`

Drag&drop ve click-to-select alanı.

- `disabled` ile upload 7sırasında tekrar seçim engellenir
- `isDragOver` ile border rengi değişir
- `onDrop` ile `FileList` + upload otomatik başlar

### 6) `FileList.jsx`

Multi-file list render.

- Üst satır: toplam dosya / toplam boyut / OK-ERR sayısı
- Her satır: preview + ad/boyut + status icon

### 7) `FilePreview.jsx`

Dosya türüne göre preview.

- image: `img` (object URL)
- audio/video/doc: basit tip etiketi
- `size="sm|lg"`

### 8) `StatusIcon.jsx`

Status'a göre SVG icon.

- `uploading`: spinner
- `completed`: yeşil tik
- `error`: kırmızı çarpı

Pause'da spinner durması `paused` class'ı + CSS ile sağlanır.

### 9) `ProgressBar.jsx`

Bar'ın tek görevi:

- width = `percent`
- glow efekti = `glow`

### 10) `Controls.jsx`

Alt butonlar:

- `Sıfırla`
- `Durdur/Devam Et`

## CSS Notları

Tailwind layout için, özel efektler ise `UploadProgress-React/src/upload-progress.css` için:

- `glow` box-shadow
- file list scrollbar
- spinner keyframes + pause (paused class)

## Pratik Değişiklik Noktaları

- Simulasyon hızını değiştir : `constants.js` -> `UPLOAD_SPEED_MBPS`
- Minimum süre: `constants.js` -> `MIN_FILE_DURATION_MS`
- Hata ihtimali: `utils.js` -> `Math.random() < 0.1`
- Liste UI: `FileList.jsx`
- Preview davranışı  : `FilePreview.jsx`

