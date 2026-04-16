# 📤 UploadProgress - Dosya Yükleme Simülatörü

Modern ve görsel açıdan zengin bir dosya yükleme simülasyonu arayüzü. Gerçekçi yükleme hızı, çoklu dosya desteği, hata yönetimi ve kapsamlı kullanıcı geri bildirimi ile sunulan profesyonel bir web uygulaması.

## 🎯 Proje Özeti

**UploadProgress**, kullanıcıların dosya yükleme deneyimini basit ve eğlenceli hale getirmek için tasarlanmış bir projedir. Gerçekçi simulasyon ile yükleme sürecini görselleriyle sunmuş, başarı ve hata durumlarında uygun geri bildirim sağlar.

## ✨ Özellikler

### 📁 Dosya Seçimi
- ✅ **Sürükle & Bırak (Drag & Drop)**: Dosyaları doğrudan arayüze sürükleyerek yükleyin
- ✅ **Tıklama ile Seçim**: Alanı tıklayıp dosya tarayıcısından seçin
- ✅ **Çoklu Dosya Seçimi**: Birden fazla dosyayı aynı anda yükleyin

### 📊 Yükleme İzleme
- ✅ **Gerçekçi Yükleme Hızı**: 10MB/s hızında simüle edilmiş yükleme
- ✅ **Progress Bar**: Renkli gradient animasyonlu ilerleme çubuğu (%0-%100)
- ✅ **Parlama Efekti (Glow)**: Yükleme sırasında dinamik parlama animasyonu
- ✅ **Yüzde Göstergesi**: Gerçek zamanlı yükleme yüzdesini görüntüle

### 🎨 Dosya Önizlemesi
- ✅ **Tekli Dosya Modu**: 
  - Resimler: Gerçek resim önizlemesi (JPG, PNG, GIF, vb.)
  - Belgeler: Dosya türüne göre emoji ikon (📘 Word, 📗 Excel, 📕 PDF, vb.)
  - 100x100px büyüklüğünde gösterim

- ✅ **Çoklu Dosya Modu**: 
  - Dosya listesi tablosu (50x50px ikon)
  - Her dosya için durum göstergesi (bekleme, yükleniyor, başarı, hata)
  - Kaydırılabilir liste (max-height: 150px)

### 📱 Dosya Bilgileri
- ✅ **Dosya Adı**: Seçilen dosyanın tam adı
- ✅ **Dosya Boyutu**: Otomatik formatlı boyut (B, KB, MB, GB, TB)
- ✅ **Dosya Türü**: Uzantı ve türüne göre otomatik kategori
- ✅ **İstatistikler**: Toplam dosya, başarılı ve başarısız sayıları

### 🎭 Durum Yönetimi
- ✅ **Bekleme (Waiting)**: 📋 - Dosya sırası bekliyor
- ✅ **Yükleniyor (Uploading)**: ⏳ - Dönen spinner animasyonu
- ✅ **Başarı (Completed)**: ✅ - Yeşil onay işareti
- ✅ **Hata (Error)**: ❌ - Kırmızı hata işareti

### 🎮 Kontrol Butonları
- ✅ **Durdur/Devam Et**: 
  - Pause/Resume işlemi sırasında
  - Progress bar durur ve spinner durdurulur
  - Button metni dinamik olarak güncellenir

- ✅ **Sıfırla**: 
  - Tüm işlemleri iptal et
  - Progress bar'ı sıfırla (%0)
  - Dosya listesini temizle
  - Tüm state değişkenlerini sıfırla

### 🎉 Başarı Animasyonu
- ✅ **Konfeti Efekti**: 
  - canvas-confetti kütüphanesi kullanıyor
  - 200 parçacık
  - Ekran merkezinden başlayarak iniyor
  - Yükleme tamamlandığında otomatik tetiklenir

### ❌ Hata Yönetimi
- ✅ **Rastgele Hata Simülasyonu**: %10 ihtimalle hata oluşur
- ✅ **Kısmi Yükleme Hatası**: Dosya yüklemesinin ortasında hata oluşabilir
- ✅ **Devam Eden Yükleme**: Hata verilen dosya atlanıp diğerleri devam eder
- ✅ **Progress Bar İlerlemesi**: Hatalı dosya sayılmaz, progress devam eder
- ✅ **Hata İşareti**: Başarısız dosya kırmızı ❌ ile işaretlenir

### 🌗 Modern Tasarım
- ✅ **Karanlık Tema**: Gradient background (slate-900 → gray-900)
- ✅ **Kaca Etkisi (Glassmorphism)**: `backdrop-blur` ile modern look
- ✅ **Responsive Tasarım**: Mobil, tablet ve desktop uyumlu
- ✅ **Tailwind CSS**: Hızlı ve tutarlı styling

---

## 🛠️ Teknolojiler

| Teknoloji | Amaç | Versiyon |
|-----------|------|---------|
| **HTML5** | Yapı ve semantik | - |
| **CSS3** | Stilizasyon ve animasyon | - |
| **JavaScript (Vanilla)** | İşlevsellik ve dinamik davranış | ES6+ |
| **Tailwind CSS** | Utility-first CSS framework | v4 (CDN) |
| **Canvas Confetti** | Konfeti animasyonu | v1.6.0 (CDN) |

---

## 📁 Proje Yapısı

```
UploadProgress/
├── index.html          # Ana HTML dosyası (UI yapısı)
├── style.css           # Özel CSS stilleri ve animasyonlar
├── script.js           # JavaScript mantığı ve işlevsellik
└── README.md           # Bu dosya
```

### 📄 Dosya Açıklamaları

#### **index.html** (~400 satır)
- HTML5 semantik yapısı
- Tailwind CSS sınıfları ile tasarım
- Upload icon SVG (32x32px)
- Drag & Drop Zone
- File Preview Box
- Progress Bar Container
- Kontrol butonları (Sıfırla, Durdur)
- CDN bağlantıları:
  - Tailwind CSS Browser (@tailwindcss/browser@4)
  - Canvas Confetti (@1.6.0)

#### **style.css** (~110 satır)
Özel CSS kuralları ve animasyonlar:
- `.glow`: Progress bar'ın parlama efekti
- `.file-list`: Kaydırılabilir dosya listesi
- `.file-item-with-preview`: Dosya satırı styling'i
- `.file-preview`: Dosya ön izlemesi container'ı
- `.spinner`: Animasyonlu yükleme spinner'ı
- `.file-item-error`: Hata durumu styling'i
- Özel scrollbar tasarımı
- @keyframes spin: 360° rotasyon animasyonu

#### **script.js** (~370 satır)
Proje mantığı:

**1. Yükleme Fonksiyonu `upload(file, callback)`**
- Parametreler:
  - `file`: Yüklenecek dosya nesnesi
  - `callback`: İlerleme callback'i
- 10MB/s gerçekçi hız simülasyonu
- Dosya boyutuna göre otomatik süre hesaplaması
- Hata simülasyonu (%10 ihtimalle)
- setInterval ile 100ms'de bir güncellenme

**2. HTML Elemanleri Referansları**
```javascript
progressBar, progressText, resetBtn, pauseBtn
fileInput, fileInfoEl, previewBox, dropZone
```

**3. State Yönetimi**
```javascript
selectedFile // Seçilen tek dosya
selectedFiles // Seçilen tüm dosyalar
selectedFilesStatus // Her dosyanın durumu (waiting/uploading/completed/error)
uploadIntervals // Her dosyaya ait interval referansları
isUploading // Genel yükleme durumu
isPaused // Pause/Resume durumu
```

**4. Temel Fonksiyonlar**

| Fonksiyon | Amaç |
|-----------|------|
| `formatBytes(bytes)` | Byte'ı insan okunur formata çevir |
| `getPreviewHTML(file)` | Dosya önizlemesi HTML'i oluştur |
| `updateFileListUI(files)` | Dosya listesini UI'da güncelle |
| `showFileInfo(file, allFiles)` | Dosya bilgisini göster |
| `startUpload()` | Yükleme işlemini başlat |
| `uploadNextFile()` | Sıradaki dosyayı yükle |
| `setUploadingState(bool)` | Yükleme durumunu güncelle |

**5. Event Listeners**
- `fileInput.addEventListener('change')`: Dosya seçildiğinde
- `resetBtn.addEventListener('click')`: Sıfırla butonuna tıklanınca
- `pauseBtn.addEventListener('click')`: Pause butonuna tıklanınca
- `dropZone.addEventListener('drop')`: Sürükle & bırak
- `dropZone.addEventListener('dragover')`: Sürükleme üzerinde
- `dropZone.addEventListener('dragleave')`: Sürükleme dışarıda
- `dropZone.addEventListener('click')`: Tıklama

---

## 🚀 Kullanım Kılavuzu

### Başlama
1. **Proje Dosyasını Açın**
   ```bash
   # Projeyi çalıştırma (doğrudan tarayıcıda)
   open index.html
   # veya
   file:///path/to/UploadProgress/index.html
   ```

2. **Dosya Seçin (3 yöntem)**
   - **Drag & Drop**: Dosyaları sürükle & bırak alanına sürükle
   - **Tıkla**: Açık alan üzerine tıkla → dosya seçicisi aç
   - **Keyboard**: Tıkladıktan sonra `Enter` veya dosya seç

3. **Yükleme Başlar**
   - Dosya seçildiğinde otomatik yükleme başlar
   - Progress bar gerçek zamanlı ilerleme gösterir
   - Dosya bilgisi sol tarafta, ön izleme sağ tarafta

4. **Kontroller Sırasında**
   - **Durdur Butonu**: Yüklemeyi duraklat (pause)
   - **Devam Et Butonu**: Duraklı yüklemeyi sürdür (resume)
   - **Sıfırla Butonu**: Tüm işlemi iptal et ve sıfırla

5. **Tamamlama**
   - Yükleme %100 olunca konfeti animasyonu başlar
   - "Yukleme tamamlandi! 🎉" mesajı görünür
   - Yeni dosya seçmek için Sıfırla'ya bas

### Senaryolar

#### Tekli Dosya Yükleme
```
1. Dosya seç (örn: photo.jpg) → 100x100px preview göster
2. İlerleme çubuğu 0 → 100% animasyon
3. "Yukleme tamamlandi! 🎉" mesajı
4. Konfeti efekti
```

#### Çoklu Dosya Yükleme
```
1. 3 dosya seç (photo.jpg, doc.docx, video.mp4)
2. Dosya listesi görüntülensin (50x50px icons)
3. Sırasıyla yükleme:
   - photo.jpg: ⏳ → ✅
   - doc.docx: ⏳ → ✅
   - video.mp4: ⏳ → ✅
4. Total progress: 0% → 100%
5. Tamamlandı!
```

#### Hata Senaryosu
```
1. 2 dosya seç
2. İlk dosya: ⏳ → ❌ (hata meydana geldi)
3. İkinci dosya: ⏳ → ✅ (devam etti)
4. Progress bar hata dosyasını saymaz
5. İstatistik: "✅ 1 | ❌ 1"
```

#### Pause/Resume
```
1. Yükleme başla
2. %30 iken "Durdur" butonuna bas
3. Progress durur, spinner durdurulur
4. "Devam Et" butonuna bas
5. Yükleme kaldığı yerden devam eder
```

## 🎨 Dosya Türü Simgeleri

| Dosya Türü | Simge | Uzantılar |
|-----------|-------|-----------|
| Resim | 🖼️ preview | jpg, jpeg, png, gif, bmp, webp, svg |
| PDF | 📕 | pdf |
| Word | 📘 | doc, docx |
| Excel | 📗 | xls, xlsx |
| PowerPoint | 📙 | ppt, pptx |
| Text | 📄 | txt, rtf |
| Audio | 🎵 | mp3, wav, ogg, m4a, flac, aac |
| Video | 🎬 | mp4, avi, mov, mkv, wmv |
| Diğer | 📁 | * |

## ⚙️ Yapılandırma & Ayarlar

### Yükleme Hızı Değiştirme
`script.js` 4. satırında:
```javascript
const UPLOAD_SPEED_MBPS = 10; // 10MB/s default
// Değiştir: 5 → 5MB/s, 20 → 20MB/s
```

### Hata Oranı Değiştirme
`script.js` 12. satırında:
```javascript
const shouldFail = Math.random() < 0.1; // %10 hata
// Değiştir: 0.1 → 0.05 (%5), 0.2 (%20), vb.
```

### Hata Konumu Değiştirme
`script.js` 13. satırında:
```javascript
const failAt = shouldFail ? Math.max(...Math.random() * 0.6...) 
// 0.2 + Math.random() * 0.6 = %20-%80 arasında hata
```

### Konfeti Ayarları
`script.js` ~254. satırında:
```javascript
confetti({
    particleCount: 200,      // Parçacık sayısı
    spread: 100,             // Yayılma açısı
    startVelocity: 40,       // Başlangıç hızı
    scalar: 1.2,             // Boyut çarpanı
    origin: { y: 0.6 }       // Başlangıç konumu
});
```

---

## 🌐 Desteklenen Tarayıcılar

| Tarayıcı | Windows | macOS | Linux | Mobil |
|----------|---------|-------|-------|-------|
| Chrome | ✅ 90+ | ✅ 90+ | ✅ 90+ | ✅ 90+ |
| Firefox | ✅ 88+ | ✅ 88+ | ✅ 88+ | ✅ 88+ |
| Safari | ✅ 14+ | ✅ 14+ | - | ✅ 14+ |
| Edge | ✅ 90+ | ✅ 90+ | ✅ 90+ | ✅ 90+ |
| Opera | ✅ 76+ | ✅ 76+ | ✅ 76+ | ✅ 76+ |


## 📊 Performans

| Metrik | Değer |
|--------|-------|
| HTML Boyutu | ~9 KB |
| CSS Boyutu | ~3 KB |
| JavaScript Boyutu | ~12 KB |
| Toplam Boyut | ~24 KB |
| İlk Yükleme | < 100ms |
| DOM Elementleri | ~50 |
| Event Listeners | 7 |
| GIF/Animasyonlar | CSS3 (GPU accelerated) |


## 🛡️ Özellikleri Güvenliği

- ✅ **Gerçek Yükleme Yok**: Sunucuya dosya gönderilmez (frontend simulasyon)
- ✅ **Veri Gizliliği**: Tarayıcı belleğinde geçici depolama
- ✅ **Dosya Doğrulaması**: Sadece seçilen dosyalar işlenir
- ⚠️ **Not**: Gerçek API entegrasyonunda sunucu taraf doğrulaması gerekli


### Yapılmış Geliştirmeler
- ✅ Tekli/çoklu dosya yükleme
- ✅ Gerçekçi yükleme hızı (10MB/s)
- ✅ Dosya türüne göre ön izleme
- ✅ Hata yönetimi ve devam etme
- ✅ Pause/Resume işlevi
- ✅ Progress tracking
- ✅ Konfeti animasyonu
- ✅ Responsive tasarım
- ✅ Glassmorphism UI


### Bilinen Sınırlandırmalar
- Gerçek dosya sunucuya gönderilmiyor
- Maksimum dosya boyutu sınırı yok
- Ağ hızı sabit (10MB/s)
- Hata tamamen random
- Cache özellikleri yok

