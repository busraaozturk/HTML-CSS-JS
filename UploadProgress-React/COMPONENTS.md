# UploadProgress-React - Component Mimarisi

Bu doküman, `UploadProgress-React/src/components` altındaki dosyaları ve her birinin ne yaptığını detaylı olarak açıklar. 

Amaç: tek bir dosyada toplanmış UI + mantığı parçalara ayırarak okunabilirliği, bakımı ve değişiklik yapmayı kolaylaştırmaktır.

## Neden components/uploadProgress Klasörü Oluşturuldu?

Bu projede upload özelliği tek bir dosyada yazılsaydı aşağıdaki sorumlulukların hepsi aynı yerde toplanacaktı:
- UI render (header, dropzone, progress bar, butonlar)
- Upload simülasyonu (interval, hız, hata olasılığı)
- Yardımcı fonksiyonlar (formatBytes, extension tespiti vb.)
- Dosya listesi ve preview yönetimi
Bu durum:
- Dosyanın aşırı büyümesine
- Okunabilirliğin düşmesine
- Debug ve geliştirme sürecinin zorlaşmasına
- Hata riskinin artmasına neden olur
**Çözüm: Feature-Based Klasör Yapısı**
Bu yüzden feature-based (özellik bazlı) klasörleme tercih edilmiştir.
Yapı:
- `UploadProgress.jsx`
  - Ana orchestrator component
  - State + iş mantığı burada yönetilir
- `components/uploadProgress/*`
  - Bu feature’a özel alt componentler ve yardımcı yapılar

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
```bash
UploadProgress (Ana Component - Orchestrator)
├── Controls        # Pause / Reset butonları
├── DropZone        # Drag & Drop alanı
├── FileList        # Çoklu dosya listesi
├── FilePreview     # Dosya önizleme
├── ProgressBar     # Yükleme progress bar
└── HeaderIcon      # Üst ikon (SVG)
```
**Amaç :**

Her Component = **Tek bir işi yapar (Single Responsibility)**
| Component      | Görevi                  |
| -------------- | ----------------------- |
| DropZone       | Dosya seçme / drag-drop |
| FileList       | Çoklu dosya listesi     |
| FilePreview    | Tek dosya görseli       |
| ProgressBar    | Yükleme yüzdesi         |
| Controls       | Pause / Reset butonları |
| UploadProgress | Hepsini yönetir         |


# Component ve Utility Dosyalarının Detaylı İncelenmesi

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
- **Parent :** state + logic
- **Child :** sadece UI (dumb component)

## 2) `UploadProgress-React/src/components/uploadProgress/constants.js`
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
**Not:**
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


## 3) `UploadProgress-React/src/components/uploadProgress/utils.js`
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

## 4) `UploadProgress-React/src/components/uploadProgress/HeaderIcon.jsx`

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

## 5) `UploadProgress-React/src/components/uploadProgress/DropZone.jsx`

Bu component, kullanıcıların dosya seçmesini sağlayan drag & drop + click-to-select alanıdır.

Amaç:
- Kullanıcıya modern ve kolay bir dosya seçme deneyimi sunmak
- Hem sürükle-bırak hem de tıklama ile dosya seçimini desteklemek
- UI ve event yönetimini ana componentten ayırmak

### Component Yapısı & Tipi
**Component Yapısı**
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
```
  DropZone -> onPickFilesClick -> input.click()
```
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

## 6) `UploadProgress-React/src/components/uploadProgress/FileList.jsx`

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

### Dosya Bilgisi Çıkarma
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

### Image Preview Mantığı
```
  const url = IMAGE_TYPES.includes(ext) ? imageUrlsByKey[key] : null;
```
Eğer dosya bir görselse:
  - preview gösterilir

Değilse:
- null → fallback UI

### Her Dosya UI Yapısı
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

### Error Durumu UI
```
  status === "error" ? "file-item-error" : ""
```
Hata varsa:
- CSS class eklenir
- Kırmızı border / arka plan vs. uygulanabilir

### Veri Akışı
```
  UploadProgress -> FileList -> UI
```
### Kullanılan Helper Fonksiyonlar
- `formatBytes()` → boyut formatlama
- `getExt()` → uzantı alma
- `IMAGE_TYPES` → preview kontrolü

### Sonuç Olarak
`FileList.jsx`:
- Dosyaları liste halinde gösterir
- Her dosyanın durumunu kullanıcıya sunar
- Preview + bilgi + status birleşimini sağlar
- Tamamen stateless ve UI odaklıdır

## 7) `FilePreview.jsx`

Bu component, bir dosyanın **türüne göre uygun preview (önizleme)** UI’ını render eder.

Amaç : 
- Görselleri gerçek preview ile göstermek
- Diğer dosya tipleri için uygun fallback (ikon/etiket) sunmak
- Tek bir noktadan dosya görselleştirme mantığını yönetmek

### Component Yapısı & Tipi
**Component Yapısı**
```
  export default function FilePreview({ file, url, size = "sm" })
```
Aldığı Props:
- `file` -> Dosya objesi
- `url` -> Image preview için object URL
- `size` -> Görünüm boyutu (sm | lg)

**Component Tipi**
Bu bir:
  - Presentational Component
  - Stateless Component

✔ Sadece gelen veriye göre render yapar

❌ State veya side-effect yok

### Dosya Tipini Belirleme
```
  const ext = getExt(file?.name);
```
Dosya uzantısı alınır:
  - photo.png -> png
  - file.pdf -> pdf

### Boyut (Size) Yönetimi
```
  const sizeClass = size === "lg" 
    ? "file-preview file-preview--lg" 
    : "file-preview";

  const iconClass = size === "lg" 
    ? "file-preview-icon file-preview-icon--lg" 
    : "file-preview-icon";
```
**Ne yapıyor?**
- `sm` -> küçük preview
- `lg` -> büyük preview
Css class üzerinden kontrol edilir.

### Image Preview (Gerçek Görsel)
```
  if (IMAGE_TYPES.includes(ext) && url)
```
Eğer:
- dosya bir görselse (png, jpg vs.)
- ve URL varsa
```
  <img src={url} alt="preview" />
```
**ÖNEMLİ**
- `url` → `URL.createObjectURL(file)` ile gelir
- Gerçek dosya preview gösterilir
- En zengin UI burada

### Audio Dosyaları
```
  if (AUDIO_TYPES.includes(ext))
  <div className={iconClass}>AUDIO</div>
```
Audio için:
- Gerçek player yok
- Basit etiket gösterilir

### Video Dosyaları
```
  if (VIDEO_TYPES.includes(ext))
  <div className={iconClass}>VIDEO</div>
```
Video için :
- thumbnail yok
- sadece label

### Doküman Dosyaları
```
  if (DOC_TYPES.includes(ext))
  <div className={iconClass}>{getDocIcon(ext)}</div>
```
**Ne yapıyor?**
```
  pdf → "PDF"
  docx → "DOCX"
```
- `getDocIcon()` kullanılıyor
- Dinamik etiket üretimi

### Default (Fallback)
```
  return (
    <div className={iconClass}>FILE</div>
  );
```
Tanımayan dosyalar:
  - .xyz → FILE
  - Güvenli fallback

### Render Mantığı
- IMAGE → gerçek preview (img)
- AUDIO → AUDIO etiketi
- VIDEO → VIDEO etiketi
- DOC → PDF/DOCX etiketi
- OTHER → FILE etiketi

### Veri Akışı
```
  FileList -> FilePreview -> UI
```

### SONUÇ : 
`FilePreview.jsx`:
- Dosya tipine göre uygun preview gösterir
- Görseller için gerçek preview kullanır
- Diğer tipler için fallback UI sunar
- Stateless ve tamamen UI odaklıdır

## 8) `UploadProgress-React/src/components/uploadProgress/StatusIcon.jsx`
Bu component, her dosyanın yükleme durumuna göre **ikon (visual feedback)** gösterir.

Amaç:
- Kullanıcıya anlık durum bilgisini görsel olarak sunmak
- Upload sürecini daha anlaşılır hale getirmek
- Metin yerine ikon ile hızlı algı sağlamak

### Component Yapısı & Tipi
**Component Yapısı**
```
  export default function StatusIcon({ status })
```
Aldığı prop:
- `status` -> Dosyanın Durumu
```
  "waiting" | "uploading" | "completed" | "error"
```

**Component Tipi**

Bu bir:
- Presentational Component
- Stateless Component

✔ Sadece gelen status değerine göre render yapar

❌ State veya logic içermez

### Uploading (Yükleniyor)
```
  if (status === "uploading")
```
UI:
- Dönen spinner (loading animasyonu)
- Mor tonlarında (indigo)
```
  <svg className="spinner">...</svg>
```
**Ne ifade eder?**
- Dosya şu an yükleniyor

**Detay:**
```
  strokeDasharray="15.7 62.8"
```
Bu değer:
- SVG çizgisinin kesik görünmesini sağlar
- CSS ile döndürülerek animasyon efekti verir
- Gerçek loading hissi oluşturur

### Completed (Tamamlandı)
```
  if (status === "completed")
```
UI:
- Yeşil daire
- İçinde check (✔) işareti
```
  <circle stroke="#10b981" />
  <path d="M8 12l2 2 6-6" />
```
**Ne ifade eder?**

`Upload başarıyla tamamlandı.`

- Kullanıcıya güven verir
- İşin bittiğini net gösterir

### Error (Hata)
```
  if (status === "error")
```

UI:
- Kırmızı daire
- İçinde çarpı (X)
```
  <path d="M15 9L9 15M9 9L15 15" />
```
**Ne ifade eder?**

`Upload sırasında hata oluştu.`

- Kullanıcıyı uyarır
- Hızlı aksiyon alınmasını sağlar

### Default (Waiting vs.)
```
  return null;
```

Eğer status: `"waiting"` ise
  - hiçbir ikon gösterilmez

** Neden?**
- UI sade tutulur
- Gereksiz ikon kalabalığı olmaz

### Accessibility (Erişilebilirlik)
```
  <div className="file-status" aria-label="uploading">
```
**Ne işe yarar?**
- Screen reader kullanıcıları için açıklama sağlar
```
  aria-label="uploading"
```
Görmeyen kullanıcılar için:
  - “uploading”, “completed”, “error” okunur

Çok önemli UX detayı

### Neden SVG Kullanılmış?
- Hafif
- Ölçeklenebilir (responsive)
- CSS ile kolay animasyon
- Harici icon kütüphanesine gerek yok

### Veri Akışı
```
  UploadProgress -> FileList -> StatusIcon -> UI
```

### SONUÇ
`StatusIcon.jsx:`
- Upload durumuna göre ikon render eder
- Görsel geri bildirim (feedback) sağlar
- Stateless ve tamamen UI odaklıdır
- Accessibility destekler

## 9) `UploadProgress-React/src/components/uploadProgress/ProgressBar.jsx`

Bu component, yükleme sürecinin genel ilerlemesini **yüzde (%) bazlı görsel olarak** gösterir.

Amaç:
- Kullanıcıya upload ilerlemesini göstermek
- Sürecin devam ettiğini hissettirmek
- Modern ve akıcı bir UI deneyimi sunmak

### Component Yapısı & Tipi
**Component Yapısı**
```
  export default function ProgressBar({ percent, glow })
```
Aldığı Props:
- `percent` → Yükleme yüzdesi (0 - 100)
- `glow` → Animasyon efekti (true / false)

**Component Tipi**

Bu bir:
- Presentational Component
- Stateless Component

✔ Sadece gelen değere göre render yapar

❌ State veya iş mantığı içermez

### Progress (Dolum Barı)
```
  <div className={[
      "h-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500",
      glow ? "glow" : "",
    ].join(" ")}
    style={{ width: `${percent}%` }}
  />
```
**Dinamik Genişlik**
```
  style={{ width: `${percent}%` }}
```
En kritik kısım:
- Progress state’e bağlıdır
- UI otomatik güncellenir
```
  percent = 0   → boş
  percent = 50  → yarım dolu
  percent = 100 → full dolu
```
**Animasyon (Transition)**
```
  transition-all duration-500
```
**Ne sağlar?**
- Width değişimi animasyonlu olur
- Ani sıçrama yerine akıcı ilerleme
- UX ciddi şekilde iyileşir

### Glow Efekti
```
  glow ? "glow" : ""
```
Eğer glow = true ise:
- CSS’te tanımlı glow efekti uygulanır
**Ne zaman aktif?**
Genelde:
```
  isUploading && !isPaused && percent < 100
```

Yani:
- Upload aktifken
- Pause değilken
- Henüz bitmemişken
- Kullanıcıya “şu an çalışıyor” hissi verir

### Veri Akışı
```
  UploadProgress -> percent state -> ProgressBar -> UI
```

### UX Açısından Önemi
Bu component sayesinde kullanıcı:
- Upload başladı mı?
- Ne kadar ilerledi?
- Ne zaman bitecek?

sorularına anlık cevap alır

### SONUÇ
`ProgressBar.jsx:`
- Yükleme ilerlemesini görsel olarak gösterir
- Dinamik width ile çalışır
- Animasyon ve glow efekti ile UX’i güçlendirir
- Stateless ve tamamen UI odaklıdır

## 10) `UploadProgress-React/src/components/uploadProgress/Controls.jsx`
Bu component, upload sürecini kontrol etmek için kullanılan **butonları (actions)** içerir.

Amaç:
- Kullanıcının upload sürecini yönetmesini sağlamak
- Pause / Resume ve Reset işlemlerini sunmak
- UI ile iş mantığını ayırmak

### Component Yapısı & Component Tipi
**Component Yapısı**
```
  export default function Controls({ isUploading, isPaused, onReset, onTogglePause })
```
Aldığı Props:
- `isUploading` → Upload aktif mi?
- `isPaused` → Pause durumunda mı?
- `onReset` → Reset işlemi
- `onTogglePause` → Pause / Resume toggle

**Component Tipi**

Bu bir:
- Presentational Component
- Controlled Component
- State içermez
- Tüm davranış parent'tan gelir

### Reset Butonu
```
  <button onClick={onReset}>
    Sıfırla
  </button>
```
**Ne yapar?**
- Tüm upload sürecini sıfırlar
- Dosya listesi temizlenir
- Progress sıfırlanır
- Interval’lar temizlenir
! Bu logic parent (`UploadProgress`) içinde çalışır

### Pause / Resume Butonu
```
  <button onClick={onTogglePause}>
    {isPaused ? "Devam Et" : "Durdur"}
  </button>
```
**Dinamik text:**
```
  isPaused = false → "Durdur"
  isPaused = true  → "Devam Et"
```
Aynı buton iki işi yapar:
- Pause
- Resume

UX açısından sade ve doğru yaklaşım

### Conditional Rendering (Gizleme)
```
  ${isUploading ? "" : "hidden"}
```
**Ne yapar?**
```
  isUploading = false → buton görünmez
  isUploading = true  → buton görünür
```
Upload başlamadan pause butonu gösterilmez
- Gereksiz UI kaldırılır
- Kullanıcıyı karıştırmaz

### Veri Akışı
```
  User → Controls → onClick → UploadProgress → state değişir → UI güncellenir
```

### UX Açısından Önemi
Bu component sayesinde kullanıcı:
- Upload’ı durdurabilir
- Tekrar başlatabilir
- Baştan başlayabilir
- Tam kontrol hissi verir

### SONUÇ
`Controls.jsx:`
- Upload sürecini kontrol eden butonları içerir
- Stateless ve tamamen UI odaklıdır
- Parent component ile event üzerinden haberleşir
- Conditional rendering ile temiz UI sağlar

## CSS Yapısı (`upload-progress.css`)

Bu dosya, Tailwind ile çözülemeyen veya daha özel davranış gerektiren **custom UI efektlerini** içerir.

Amaç:
- UI’yı görsel olarak zenginleştirmek
- Component bazlı özel stiller vermek
- Animasyon ve etkileşimleri yönetmek

### Glow Efekti (Progress Bar)
```
  .glow {
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.8), 0 0 20px rgba(168, 85, 247, 0.6);
  }
```
**Ne işe yarar?**
- Progress bar aktifken parlayan bir efekt verir
- Kullanıcıya “yükleme devam ediyor” hissi verir
**Nerede kullanılır?**
```
  glow ? "glow" : ""
```
**isUploading** && **!isPaused** durumunda aktif olur

### Custom Scrollbar
```
  .file-list::-webkit-scrollbar { ... }
```
**Neden var?**

UI ile uyumlu modern scrollbar sağlar

**Özellik:**
- Gradient renkli
- Hover’da renk değiştirir

### Spinner (Loading Animasyonu)
```
  .spinner {
    animation: spin 1s linear infinite;
  }
```
**Ne yapar?**
- Upload sırasında dönen ikon gösterir

### Pause Durumu
```
  .paused .spinner {
    animation-play-state: paused;
  }
```

JS tarafında:
```
  <div className={isPaused ? "paused" : ""}>
```
CSS tarafında animasyon durduruluyor
- JS → sadece state yönetir
- CSS → animasyonu kontrol eder

### Keyframes Animasyonu
```
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
```
**Ne yapar?**
- Spinner sürekli döner

### Genel Css Mimari Yorumu
Bu CSS yapısı:
- Tailwind + Custom CSS hibrit yaklaşımı
  - Layout → Tailwind
  - Özel efektler → CSS
- Separation of Concerns
  - React → logic
  - CSS → görünüm & animasyon
- UX odaklı
  - Glow → aktiflik hissi
  - Spinner → loading feedback
  - Error rengi → hızlı farkındalık
  - Scroll → çoklu dosya yönetimi
