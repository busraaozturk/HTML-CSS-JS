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
Sabit değerler ve ayarlar:
- Tip listeleri: `IMAGE_TYPES`, `DOC_TYPES`, `AUDIO_TYPES`, `VIDEO_TYPES`
- Simulasyon tuning:
  - `UPLOAD_SPEED_MBPS`
  - `MIN_FILE_DURATION_MS`

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
**Not:**
- Dosya uzantısı (ext) bu listelerle karşılaştırılır.
- Bu nedenle uzantının küçük harf (lowercase) olması gerekir.

### IMAGE_TYPES
```
  if (IMAGE_TYPES.includes(ext)) {
    // preview göster
  }
```
- Görsel dosyaları belirler
- Kullanım yeri :
  - Preview gösterme (`FilePreview`)
  - `URL.createObjectURL` ile geçici preview URL oluşturma

### DOC_TYPES
- Doküman dosyalarını tanımlar
- Kullanım : 
  - İkon gösterimi (PDF icon vs.)
  - Preview yerine farklı UI

### AUDIO_TYPES / VIDEO_TYPES
- Medya dosyalarını ayırır
- Kullanım : 
  - Farklı preview türleri
  - İleride player eklenebilir

### Simülasyon Ayarları (Upload Tuning)
```
  export const UPLOAD_SPEED_MBPS = 2;
  export const MIN_FILE_DURATION_MS = 2000;
```
Bu kısım **upload simülasyonunun davranışını kontrol eder.**

###  `UPLOAD_SPEED_MBPS`
- Upload hızını belirler (MB/s cinsinden)
- Simülasyonun ne kadar hızlı ilerleyeceğini kontrol eder
**Örnek:**
```
  2 MB/s → daha yavaş, kullanıcı progress’i görür  
  10 MB/s → çok hızlı, UX kötü olur
```
Not:
- Varsayılan (vanilla JS versiyonunda) değer 10 MB/s idi.
- Kullanıcı deneyimini iyileştirmek ve “Durdur” butonunun kullanılabilmesi için düşürülmüştür.

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


## 3) `utils.js`
Bu dosya uygulama içinde tekrar kullanılan **yardımcı fonksiyonları (helpers)** ve upload sürecini yöneten **simülasyon motorunu** içerir.
Amaç : 
- Tekrar eden işlemleri merkezi hale getirmek
- Kodun okunabilirliğini artırmak
- UI ile iş mantığını ayırmak **(separation of concerns)**
İçerdiği Fonksiyonlar :
- `formatBytes(bytes)`
- `getExt(fileName)`
- `getDocIcon(ext)` (ASCII etiketler: PDF/DOCX vb.)
- `createUploadTicker(file, ctx)`
  - 100ms tick
  - hiz + minimum süre
  - dosya başına hata olasılığı (default %10)
  - `onTick({ kind: "progress" })` veya `onTick({ kind: "error" })`

Bu fonksiyon UI bilmez; UI sadece event alır ve state günceller.

### `formatBytes(bytes)`
```
  export function formatBytes(bytes) {
    if (!bytes) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${sizes[index]}`;
  }
```
- Dosya boyutunu **okunabilir formata çevirir.**
**Örnek:**
```
  1024 -> 1.00KB
  1048576 -> 1.00MB
```
**Nasıl Çlışır?**
- `Math.log` ile uygun birim (KB, MB vs.) bulunur
- 1024 tabanına göre hesaplanır
- `toFixed(2)` ile 2 ondalık basamak gösterilir

### `getExt(fileName)`
```
  export function getExt(fileName) {
    const parts = String(fileName || "").split(".");
    return (parts[parts.length - 1] || "").toLowerCase();
  }
```
- Dosya adından **uzantıyı (extension)** çıkarır.
**Örnek :**
```
  "photo.PNG" → "png"
  "file.pdf" → "pdf"
```
**Neden Önemli?**
- `constants.js` içindeki tip listeleri ile karşılaştırma yapılır
- Küçük harfe çevirerek (`toLowerCase`) eşleşme garantilenir

### `getDocIcon(ext)`
```
  export function getDocIcon(ext) {
    const iconMap = {
      pdf: "PDF",
      doc: "DOC",
      docx: "DOCX",
      xls: "XLS",
      xlsx: "XLSX",
      ppt: "PPT",
      pptx: "PPTX",
      txt: "TXT",
      rtf: "RTF",
    };
    return iconMap[ext] || "FILE";
  }
```
- Doküman dosyaları için **ikon yerine metin etiketi üretir.**
**Örnek:**
```
  pdf → "PDF"
  docx → "DOCX"
  unknown → "FILE"
```
**Neden Önemli**
- UI'da hızlı ve sade gösterim sağlar
- Gerçek ikon kullanmadan fallback çözüm sunar

### `createUploadTicker(file,ctx)`
```
  export function createUploadTicker(file, { isUploadingRef, isPausedRef, onTick })
```
- Bu fonksiyon **upload simülasyonunun motorudur.**
**Ne Yapar?**
- Upload sürecini **setInterval ile simüle eder.**
- Belirli aralıklarla (`100ms`) progress üretir
- Pause / resume destekler
- Rastgele hata simülasyonu yapar
- UI’a event gönderir `(onTick)`

**ÇALIŞMA MANTIĞI**
- **Toplam Boyut**
```
  const total = Math.max(file?.size || 0, 1);
```
0 olmasını engeller

- **Upload Süresi Hesaplama**
```
  const uploadSpeedBps = UPLOAD_SPEED_MBPS * 1024 * 1024;
  const computedDurationMs = (total / uploadSpeedBps) * 1000;
  const targetDurationMs = Math.max(computedDurationMs, MIN_FILE_DURATION_MS);
```
Süre = dosya boyutu / hız
Ama minimum süre garanti edilir

- **Parçalara bölme (chunk logic)**
```
  const tickMs = 100;
  const steps = Math.ceil(targetDurationMs / tickMs);
  const chunkSize = Math.ceil(total / steps);
```
Her 100ms'de:
  - Ne kadar byte yüklenecek hesaplanır.

- **Hata Simülasyonu**
```
  const shouldFail = Math.random() < 0.1;
```
%10 ihtimalle hata
```
  const failAt = total * (0.2 - 0.8 arası)
```
%20 - %80 arasında bir noktada fail olur

- **Interval Döngüsü**
```
  const intervalId = setInterval(() => {
```
Her tick'te:
- Upload Durdu Mu?
```
  if (!isUploadingRef.current)
```
- Pause Mu?
```
  if (isPausedRef.current) return;
```
- Progress Artır:
```
  current += chunkSize;
```

### Hata Durumu
```
  onTick({ kind: "error" });
```

### Progress Durumu
```
  onTick({ kind: "progress", current, total });
```

### Tamamlanma
```
  if(current >= total) clearInterval(intervalId);
``` 

### Return Değeri
```
  return intervalId;
```
- Parent component bu ID'yi saklar.
- Gerekirse `clearInterval` ile durdurur

### Veri Akışı
createUploadTicker -> onTick(event) -> UploadProgress state günceller -> UI değişir

## 4) `HeaderIcon.jsx`

Bu component, upload ekranının üst kısmında görünen **ikonu** render eder.
Amaç : 
- UI’ya görsel kimlik kazandırmak
- Başlık alanını desteklemek
- Harici asset kullanmadan bağımsız bir yapı sağlamak

### Component Yapısı
```
  export default function HeaderIcon() {
    return (
      <svg>...</svg>
    );
  }
```
- Basit bir **stateless (durumsuz)** UI componentidir.
- Herhangi bir `state` veya `props` içermez.

## 5) `DropZone.jsx`

Bu component, kullanıcıların dosya seçmesini sağlayan drag & drop + click-to-select alanıdır.
Amaç:
- Kullanıcıya modern ve kolay bir dosya seçme deneyimi sunmak
- Hem sürükle-bırak hem de tıklama ile dosya seçimini desteklemek
- UI ve event yönetimini ana componentten ayırmak

### Component Yapısı & Tipi
```
  export default function Dropzone({ ...props })
```
Aldığı props:
- disabled
- isDragOver
- onPickFilesClick
- onDragOver
- onDragLeave
- onDrop
Bu component **state tutmaz**, sadece dışarıdan gelen props ile çalışır.

**Component Tipi**
Bu bir:
- Presentational Component (UI)
- Controlled Component (davranışı parent yönetir)

### Click-to-select Mekanizması
```
  onClick={onPickFilesClick}
```
Kullanıcı alana tıkladığında:

  DropZone -> onPickFilesClick -> input.click()

- Hidden input tetiklenir
- Dosya seçme penceresi açılır

### Keyboard Accessibility
```
  role="button"
  tabIndex={0}
```
Bu sayede : 
- Div, button gibi davranır
- Klavye ile seçilebilir
```
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") onPickFilesClick();
  }}
```
Kullanıcı :
- Enter veya space tuşuna basarsa -> aynı click davranışı çalışır
- Accessibility (erişilebilirlik) sağlanmış olur

### Drag & Drop Eventleri
**Drag Over**
```
  onDragOver={onDragOver}
```
Kullanıcı dosyayı alanın üzerine getirince:
- e.preventDefault() yapılır
- isDragOver = true olur

**Drag Leave**
```
  onDragLeave={onDragLeave}
```
Kullanıcı alanı terk edince:
- isDragOver = false

**Drop**
```
  onDrop={onDrop}
```
Dosya bırakıldığında:
  DropZone -> onDrop -> handleFilesChosen()
- Dosyalar alınır
- Upload süreci başlar

### Dinamik UI (Conditional Styling)
```
  className={[
    "...",
    isDragOver ? "border-blue-400" : "border-gray-500",
    disabled ? "opacity-60 pointer-events-none" : "hover:border-blue-400",
  ].join(" ")}
```
**Bu Ne Yapıyor?**
- Drag sırasında : 
```
  isDragOver = true -> border mavi olur
```
- Normal durumda : 
```
  border gri
```
- Disabled durumda : 
```
  opacity düşer + tıklama kapanır
```

### Disabled Mantığı
```
  disabled ? "pointer-events-none" : ...
```

- Upload sırasında :
  - Kullanıcı tekrar dosya seçemez
  - UI pasif hale gelir

- Bu UX açısından çok önemli
- Çift upload hatasını engeller

### Mimari Detay
Bu component:
  - Dosya seçmez
  - Upload başlatmaz
  - Sadece event üretir

### Veri Akışı
User action -> DropZone -> Parent Function -> State Update -> UI değiştir

### DRY Prensibi 
Hem:
```
  onDrop
  onClick
```
aynı fonksiyona gider:

```
  handleFilesChosen()
```

- Kod tekrarını önler
- Tek merkezden kontrol sağlar

### Sonuç
`DropZone.jsx`:
- Drag & Drop + click ile dosya seçimi sağlar
- Tamamen stateless çalışır
- Accessibility destekler
- Dinamik UI feedback verir
- Parent component ile event üzerinden haberleşir

## 6) `FileList.jsx`

Bu component, seçilen dosyaların **liste halinde gösterilmesini** ve her dosyanın **yükleme durumunun (status)** kullanıcıya sunulmasını sağlar.
Amaç:
- Kullanıcıya tüm dosyaları tek yerde göstermek
- Her dosyanın anlık durumunu (waiting / uploading / completed / error) göstermek
- Toplam yükleme özetini sunmak

### Component Yapısı & Tipi
**Component Yapısı**
```
  export default function FileList({ files, statuses, imageUrlsByKey, totalBytes })
```
Aldığı Props:
- `files` → Seçilen dosyalar
- `statuses` → Her dosyanın durumu
- `imageUrlsByKey` → Preview URL’leri
- `totalBytes` → Toplam dosya boyutu
Bu component:
  - State tutmaz
  - Sadece gelen veriyi render eder

**Component Tipi**
Bu bir:
- Presentational Component
- Stateless Component

### Özet Bilgi (Header)
```
  const completed = Object.values(statuses).filter((s) => s === "completed").length;
  const errors = Object.values(statuses).filter((s) => s === "error").length;
```
**Ne yapıyor?**
- Kaç dosya tamamlandı?
- Kaç dosya hata verdi? hesaplanıyor.

```
  Toplam: {files.length} dosya ({formatBytes(totalBytes)}) | OK {completed} | ERR {errors}
```
**Kullanıcı Ne Görür?**
```
  Toplam: 3 dosya (2.4 MB) | OK 2 | ERR 1
```
- Çok önemli UX detayı
- Kullanıcı süreci anlık takip eder

### Dosya Listesi Render
```
  files.map((file, idx) => { ... })
```
Her dosya için ayrı bir UI oluşturulur.

## Dosya Bilgisi Çıkarma
```
  const status = statuses[idx] || "waiting";
```

- Eğer status yoksa:
```
  default → "waiting"
  const ext = getExt(file?.name);
```

- Dosya uzantısı alınır (örn: png, pdf)
```
  const key = `${idx}:${file?.name}:${file?.size}:${file?.lastModified}`;
```
- Unique key oluşturulur
- Neden bu kadar detaylı?
  - Aynı isimli dosyalar çakışmasın
  - React doğru render yapsın

## Image Preview Mantığı
```
  const url = IMAGE_TYPES.includes(ext) ? imageUrlsByKey[key] : null;
```
Eğer dosya bir görselse:
  - preview gösterilir
Değilse:
- null → fallback UI

## Her Dosya UI Yapısı
```
  <div className="file-item-with-preview">
```
İçinde 3 ana parça var:

**1) Preview**
```
  <FilePreview file={file} url={url} size="sm" />
```
- Görsel varsa gösterir
- Yoksa icon gösterir

**2) Dosya Bilgileri**
```
  <div className="file-name">{file.name}</div>
  <div className="file-size">{formatBytes(file.size)}</div>
```
Kullanıcı:
- Dosya adı
- Boyut görür

**3) Status Icon**
```
  <StatusIcon status={status} />
```
Duruma göre icon:
- waiting ⏳
- uploading 🔄
- completed ✅
- error ❌







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

