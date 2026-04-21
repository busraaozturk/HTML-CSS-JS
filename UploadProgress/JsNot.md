# Upload Fonksiyonu
**function upload(file,callback)**
 - **file :** Yüklenecek dosya
 - **callback :** Her ilerleme güncellemesinde dışarıya bilgi gönderen fonksiyon

### Upload Hız Simülasyonu
 ```
    const UPLOAD_SPEED_MBPS = 10;
    const UPLOAD_SPEED_BPS = UPLOAD_SPEED_MBPS * 1024 * 1024;
```
Burada:
- 10 MB/s sabit hız varsayılıyor
- Byte/s'e çevriliyor
- 10 MB/s = saniyede yaklaşık 10.485.760 byte

### Tick (Zaman Adımı)
```
    const tickMs = 100;
```

- Her 100ms'de bir progress güncelleniyor.
- Yani UI çok sık güncelleniyor (smooth progress bar için)

### Kaç Adımda İlerleyecek
```
    const steps = Math.max(Math.ceil(targetDurationMs / tickMs), 1);
```

- Toplam süreyi 100ms'lik parçalara böl
- En az 1 step olsun

### Her adımda ne kadar ilerleyecek
```
    const chunkSize = Math.max(Math.ceil(total / steps), 1);
```

- Her interval tick'inde kaç byte artacak?
- total/steps -> her adımda ilerleme miktarı

### Hata simülasyonu
```
    const shouldFail = Math.random() < 0.1;
```
- %10 ihtimalle upload başarısız olacak

```
const failAt = shouldFail 
  ? Math.max(Math.floor(total * (0.2 + Math.random() * 0.6)), 1)
  : -1;
```
Eğer hata olacaksa:
- Upload'un %20 ile %80 arası bir noktasında hata üret
- Rastgele bir yerde 'çökme' simülasyonu
- Hata her zaman başta veya sonda olmaz. Bu gerçek upload davranışına benzer. 

### Interval Başlatma (Asıl Motor)
```
    const interval =setInterval(() =>{
```
- Her 100ms'de bir çalışacak döngü

### Upload durdurulmuşsa
```
    if (!isUploading) {
    clearInterval(interval);
    return;
}
```
-  Upload iptal edildiyse tamamen durur

### Pause Kontrolü
```
    if(isPaused) return;
```
- Upload durur ama interval çalışmaya devam eder yani bekleme modu

### Progress Artırma
```
current = Matj.min(current + chunkSize, total);
```
- Her tick'te progress artar
- **total**'ı geçmez

### Hata Kontrolü
```
if(shouldFail && current >= failAt) {
    clearInterval(interval);
    callback('error');
    return;
}
```

Ne oluyor?
- Eğer hata planlandıysa
- Ve belirlenen noktaya gelindiyse:
    - upload durur
    - callback ile `error`gönderilir

### Progress callback
```
    callback(current, total);
```

UI'a şunu söyler:
- Şu kadar yüklendi
- Toplam bu kadar
Örnek:
```
callback(30,100);
```
- %30 progress

### Upload Tamamlandı Mı?
```
    if(current >= total){
        clearInterval(interval);
    }
```
- Bitince interval durur

## Fonksiyonun Genel Akışı : 
- Dosya Alınır
- Boyuta göre süre hesaplanır
- 100ms'de bir ilerleme yapılır
- UI callback ile güncellenir
- %10 ihtimalle hata oluşur
- Upload biter veya error olur


# *setUploadingState* -> Upload Durum Yönetimi
- Amaç UI'da ki *"yükleniyor mu?"* durumunu kontrol etmek
- Upload state'i yönetir
- Input'u kilitler
- Pause butonunu kontrol eder

```
    isUploading = isLoading;
```
- Global bir state değişkeni
- Upload başladıysa -> true
- Bittiyse -> false
- Bu değişken **upload()** fonksiyonunda kullanılıyordu.

```
    fileInput.disabled = isLoading;
```
- Upload sırasında kullanıcı yeni bir dosya seçmesin
    - true -> input kilitli
    - false -> aktif

```
    pauseBtn.classList.toggle('hidden', !isLoading);
```
- Pause butonunu göster / gizle
    - isLoading = true -> buton görünür
    - isLoading = false -> buton gizlenir
- *toggle* burada şöyle çalışır:
    - toggle('hidden', true)  → hidden EKLE
    - toggle('hidden', false) → hidden KALDIR


# *formatBytes* -> Dosya Boyutu Formatlama
- Amaç Byte cinsinden gelen değeri insan okunabilir hale getirmek
- Kullanıcıya anlamlı veri verir
- "1549843 bytes" -> Kötü UX
- "1.47MB" -> iyi veri
- Dosya boyutu gösterimi

```
    if(bytes === 0)
    return '0 B';
```
- 0 Byte -> direkt göster

```
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
```
- Birim Listesi

```
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
```
- Bu sayı kaçıncı birime denk geliyor?
- Logaritma ile doğru indec bulunuyor
- 500 -> B
- 2000 -> KB
- 5000000 -> MB

```
    (bytes / Math.pow(1024, i)).toFixed(2)
```
- Byte -> uygun birime çevirme
- Örn: 2048 byte i = 1 (KB) -> 2048 / 1024 = 2.00 KB

### ÖRNEK ÇIKTILAR
| Input    | Output    |
|----------|-----------|
| 500      | 500.00 B  |
| 2048     | 2.00 KB   |
| 1048576  | 1.00 MB   |

# *getPreviewHTML* -> Dosya Önizleme Oluşturma
- Amaç dosya tipine göre HTML preview üretmek
- Görsel / ikon üretimi

### Dosya Uzantısını Alma
```
    const ext = file.name.split('.').pop().toLowerCase();
```
- Küçük harfe çevir -> karşılatırma kolaylığı

### Dosya Tür Grupları
```
    const imageTypes = [...]
    const docTypes = [...]
    const audioTypes = [...]
    const videoTypes = [...]
```

- Dosyaları kategorize ediyorsun

### HTML Başlangıcı
```
    let previewHTML = `<div class="file-preview">`;
```
- Her preview bu wrapper içinde olacak

### Image Preview
```
    if (imageTypes.includes(ext)) {
        const url = URL.createObjectURL(file);
        previewHTML += `<img src="${url}" alt="preview">`;
    }
```
- Dosyayı geçici URL'e çevirir
- Örn: blob:http://localhost/abc-123
- Bu sayede dosyayı servera göndermeden preview gösterirsin

### Audio - Video - Dokümanlar - Dosya Tipleri
- Gerçek preview yerine ikon kullanılmakta
- Dosya tipine göre ikon seçiyorsun
- Diğer dosya tipleri için Default ikon belirleniyor


# Tüm Dosya Listesini + Statelerini + UI'yı Yöneten Ana Render Fonksiyonu
Bu fonksiyon:
- Tüm dosyaları alır
- Her dosyanın durumuna göre UI üretir
- En sonunda ekrana basar

### Toplam Veri Hesaplama
```
    const totalBytes = allFiles.reduce((sum, f) => sum + (f?.size || 0), 0);
```
- Dosyaların boyutlarını topluyor
- null / undefined hatası önlenmiş

### Completed Sayısı
```
    const completed = Object.values(selectedFilesStatus)
    .filter(s => s === 'completed').length;
```
- Kaç dosya başarıyla yüklendi

```
    const errors = Object.values(selectedFilesStatus)
    .filter(s => s === 'error').length;
```
- Kaç dosya hata verdi

### Ana container oluşturma
```
    let fileListHTML = `<div class="file-list">`;
```
- Tüm liste buraya basılacak

### Dosyalar Üzerinde Dönme
```
    allFiles.forEach((f, idx) => {
```
- Her dosya için preview - isim - boyut - status - icon oluşturuluyor.

### Status Alma
```
    const status = selectedFilesStatus[idx] || 'waiting';
    const rowClass = status === 'error' ? 'file-item-error' : '';
    let statusIconHtml = '';
    if (status === 'uploading') { }
    else if (status === 'completed') { }
    else if (status === 'error') { }
```

- Kod sırasına göre şunlar yapılmıştır:
    - Status alma : Eğer status yoksa *default = 'waiting'*
    - Hata varsa class eklenir. UI'da kırmızı highlight gibi
    - Status ikon oluşturma. 3 farklı durum var:
        - Uploading (spinner) : 
            - SVG spinner gösteriliyor
            - UX açısından çok iyi gerçek sistem hissi veriyor
        - Completed : 
            - Yüklendiğine dair yeşil tik
        - Error :
            - Yüklenmediğini belli eden kırmızı çarpı
- Bu yapı aslında *state -> UI mapping*

### HTML Oluşturma
```
    fileListHTML += `
    <div class="file-item-with-preview ${rowClass}">
        ${preview}
        <div>
            <div class="file-name">${f.name}</div>
            <div class="file-size">${size}</div>
        </div>
        ${statusIconHtml}
    </div>`;
```
- Her dosya için:
    - preview (resim / ikon)
    - dosya adı
    - dosya boyutu
    - status icon birleştiriyor

### Üst Bilgi (Summary)
```
    fileInfoEl.innerHTML = `
        <div style="margin-bottom: 0.5rem; font-weight: 500;">
            Toplam: ${allFiles.length} dosya (${formatBytes(totalBytes)}) | ✅ ${completed} | ❌ ${errors}
        </div>
    ` + fileListHTML;
```
- Kullanıcıya özet bilgi verilmektedir : 
    - Toplam dosya sayısı
    - Toplam boyut bilgisi
    - Başarılı sayısı
    - Hatalı sayısı

## Fonksiyonun Genel Akışı
- Dosyalar geliyor
- Toplam h esaplanıyor
- Her dosya için UI oluşturuluyor
- Status'a göre icon ekleniyor
- Hepsi HTML olarak birleştiriliyor
- Ekrana basılıyor


# Dosya Seçildiği Anda UI'ı Hazırlayan Giriş Noktası
- İki senaryoyu yönetiyor:
    - Tek dosya seçildiyse - detay + preview göster
    - Birden fazla dosya seçildiyse - liste halinde göster
- Aynı zamanda:
    - Tüm dosyalar için başlangıç status'lerini oluşturur
    - UI'ı görünür hale getirir

### State Durum Başlatma
```
    selectedFilesStatus = {};
    allFiles.forEach((f, idx) => {
        selectedFilesStatus[idx] = 'waiting';
    });
```
- Her dosya için başlangıç durumu:
    - 0 -> waiting
    - 1 -> waiting
    - 2 -> waiting
- Henüz upload başlamadı state'i
- Upload başlayınca - uploading
- Bitince - completed
- Hata olursa - Error
- Bu yapı state management sistemi

### Tekli / Çoklu Dosya Ayrımı
```
    if(allFiles.length > 1)
```
- Sistem 2'ye ayrılır

**Çoklu Dosya Varsa**
```
    updateFileListUI(allFiles);
    previewBox.classList.add('hidden');
```

- Tüm dosyalar liste halinde gösteriliyor
- Preview kapatılıyor
- Çünkü 10 dosya varsa tek tek büyük preview göstermek imkansız

**Tek Dosya Varsa**
- Basit bir bilgi gösterimi:
```
    fileInfoEl.innerHTML = `
    Dosya: 1
    Boyut: ...
    İsim: ...
    `;
```

- Preview açılıyor:
```
    previewBox.classList.remove('hidden');
    previewBox.innerHTML = getPreviewHTML(file);
```
- Tek dosyada:
    - görsel ise -> resim
    - değilse -> ikon

## Fonksiyonun Genel Akışı
- Dosya seçildi
- Tüm dosyalar "waiting" yapılır
- UI açılır
- Eğer 1 dosya:
    - Detay + preview göster
- Eğer çoklu dosya:
    - listeyi render et
 

# Ana Upload Başlatma Fonksiyonu
- Bu fonksiyon:
    - Upload'u başlatır
    - Tüm dosyaları sıraya yükler
    - Progress bar'ı günceller
    - Hata ve başarı durumlarını yönetir

## Fonksiyonun Çalışma Mantığı
- Upload Başlat
- UI hazırlar (progress sıfırlanır)
- Dosyalar sırayla yüklenir
- Her dosyada progress güncellenit
- Biten -> completed
- Hatalı -> error
- Hepsi bitince -> %100 + confetti
- Bu sistem paralel değil sıralı ıpload (queue sistemi) kullanıyor
    - Dosya 1 -> biter
    - Dosya 2 -> başlar
    - Dosya 3 -> başlar
    - Daha kontrol edilebilir ve gerçekçi

### Başlangıç Kontrolü
```
    if(!selectedFiles.length || isUploading) return;
```
- Eğer:
    - Dosya yoksa
    - Zaten upload devam ediyorsa bu fonksiyon çalışmaz

### Upload State ve UI Hazırlığı
```
    isUploading = true;
    setUploadingState(true);
```
- Sistem *yükleniyor* moduna geçer
- Input disable olur
- Pause butonu aktif olur

### Progress Bar Sıfırlama
```
    progressBar.style.width = '0%';
    progressText.innerText = 'Yukleniyor...';
```
- Baştan temiz bir başlangıç yapılır

### Toplam Yük Hesaplama
```
    const totalBytes = ...
    let uploadedBytes = 0;
```
- Tüm dosyaların toplam boyutu alınır
- Kaç byte yüklendiği takip edilir

### Progress Hesaplayan Fonksiyon
```
    const updateOverallProgress = (currentFileBytes) => {...}
```
- En önemli parçalardan biridir.
- Yüklenen toplamı hesaplar
- % değerini çıkarır
- Progress bar'ı günceller

```
    percent = (yüklenen / toplam) * 100
```
- Ek Efektler:
    - Yüklenirken -> *glow* efekti
    - %100 olunca:
        - Yükleme tamamlandı yazısı
        - state reset
        - confetti animasyonu

### Dosyaları Sırayala Yükleme
```
    const uploadNextFile = () => { ... }
```
- Dosyaları tek tek sırayla yükler.

**Sıradaki Dosya Alınır**
```
    const file = selectedFiles[fileIndex];
    selectedFilesStatus[fileIndex] = 'uploading';
```
- UI'da dosya "yükleniyor" olur

**Upload Başlatılır**
```
    upload(file, (current, total) => { ... })
```

### Hata Durumu
```
    if (current === 'error')
```
- Eğer dosya hata verirse:
    - Status -> error
    - UI günceller
    - Bu dosya atlanır
    - Sıradaki dosyaya geçilir
    - Sistem çökmez
    
### Yükleme Sırasında Progress
```
    updateOverallProgress(current);
```
- O anki dosyanın ilerlemesi -> genel progress'e yansır

### Dosya Tamamlanınca
```
    if(current >0 total)
```
- Dosya bitince: 
    - Status -> completed
    - Toplam yüklenen byte artar
    - Sıradaki dosyaya geçilir

### Tüm Dosyalar Bitince
```
    if(fileIndex >= selectedFiles.length)
```
- Hepsi bittiyse:
    - progress %100 yapılır
    - upload tamamlanır


# Inputtan Dosya Seçme
```
    fileInput.addEventListener("change", (e) => { ... })
```
- Kullanıcı dosya seçtiğinde çalışır

### Seçilen Dosyaları Alır
```
    selectedFiles = Array.from(e.target.files || []);
    selectedFile = selectedFiles[0] || null;
```
- `e.target.files` -> seçilen tüm dosyalar
- `Array.from` -> bunu gerçek array'e çevir
- `selectedFile` -> İlk dosya (tekli kullanım için)

### Dosya Varsa
```
    if (selectedFile) {
```
- En az 1 dosya seçilmişse

```
    showFileInfo(selectedFile, selectedFiles);
```
- UI hazırlanır (liste veya preview)

```
    startUpload();
```
- Upload otomatik başlar
- Kullanıcı butona basmak zorunda değil
- Daha modern UX

### Dosya Yoksa
```
    else {
        fileInfoEl.innerHTML = '';
    }
```
- Seçim iptal edilirse UI temizlenir

## Fonksiyon Akışı
- Kullanıcı dosya seçer
- Dosya alınır
- UI hazırlanır (showFileInfo)
- Upload otomatik başlar (startUpload)


# Reset / Sıfırla Button Click
```
    resetBtn.addEventListener("click", () => { ... })
```
- Reset/sıfırla butonuna bastığında çalışır.
- Amaç upload sürecini tamamen tamizleyip sistemi **ilk haline döndürmek**

### Aktif Upload'ları Durdur
```
    Object.values(uploadIntervals).forEach(interval => clearInterval(interval));
```
- Devam eden tüm ıpload işlemleri durdurulur
- Çok öenmli -> yoksa arka planda çalışmaya devam ederdi

### Progress Bar Sıfırlanır
```
    progressBar.style.width = "0%";
    progressText.innerText = '%0';
```
- Görsel olarak başa döner

### UI Temizlenir
```
    fileInfoEl.innerHTML = '';
    previewBox.innerHTML = '';
```
- Dosya listesi ve preview kaldırılır
```
    fileInfoEl.classList.add('hidden');
    previewBox.classList.add('hidden');
```
- UI tamamen gizlenir

### Tüm State'ler Tamamen Sıfırlanır
```
    selectedFile = null;
    selectedFiles = [];
    selectedFilesStatus = {};
    uploadIntervals = {};
    isUploading = false;
    isPaused = false;
```
- Sistem tamamen boş hale getirilir

### Pause Butonu Resetlenir
```
    pauseBtn.textContent = 'Durdur';
    pauseBtn.classList.add('hidden');
```
- Buton tekrar başlangıç haline döner gizlenir

### Memory Temizliği
```
    if (fileObjectURL) {
        URL.revokeObjectURL(fileObjectURL);
    }
```
- Daha önce oluşturulan preview URL'i silinir
- Memory leak önlenir 

## Genel Akış
- Reset butonuna basılır
- Upload durdurulur
- Progress sıfırlanır
- UI temizlenir
- State sıfırlanır
- Sistem ilk haline döner


# Durdur / Devam Et Butonu
```
    pauseBtn.addEventListener("click", () => { ... })
```
- Kullanıcı 'Durdur / Devam Et' butonuna bastığında çalışır
- Upload işlemini `pause/resume (duraklat/devam ettir)` yapmak

### Upload Aktif Mi Kontrol Eder
```
    if (!isUploading) return;
```
- Eğer upload yoksa hiçbir şey yapmaz

### Pause State'i Değiştirir
```
    isPaused = !isPaused;
```
- True <-> False arasında geçiş yapar

### Buton Yazısını Günceller
```
    pauseBtn.textContent = isPaused ? 'Devam Et' : 'Durdur';
```
- Pause olduysa -> Devam Et
- Devam Ediyorsa -> Durdur

### Spinner'ları Seçer
```
    const spinners = document.querySelectorAll('.spinner');
```
- Yükleniyor ikonlarını alır

### Pause Durumunda
```
    if(isPaused) {}
```
- Glow efekti kaldırılır

```
    progressBar.classList.remove('glow');
```
- Spinner animasyonu durdurulur

```
    spinner.style.animationPlayState = 'paused';
```
- Görsel olarak her şey `donar`

### Devam Durumunda
```
    else {
```
- Progress Kontrolü:

```
    const percent = parseInt(progressText.innerText.substring(1)) || 0;
```
- %50 -> 50 olarak alınır

**Glow Tekrar Eklenir (Eğer Bitmemişse)**
```
    if (percent < 100) {
        progressBar.classList.add('glow');
    }
```

**Spinner'lar Tekrar Döner**
```
    spinner.style.animationPlayState = 'running';
```

## Genel Akış
- Butona Tıklandı
- isPaused Değişti
- Pause ise animasyonlar *durur*
- Devam ise animasyonlar *devam eder*


# Tıklayarak Dosya Seçme
```
    dropZone.addEventListener("click", () => {
        fileInput.click();
    });
```
- Drop alanına tıklayınca:
    - Gizli `<input type="file">` açılır

# Sürüklerken Görsel Efekt
```
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("border-blue-400");
    });
```
- Dosya alanın üstüne gelince : 
    - Default davranış engellenir
    - Border rengi değişir (hover efekti)

# Sürükleme Çıkınca Eski Haline Döner
```
    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("border-blue-400");
    });
```
- Görsel efekt kaldırılır

# Dosya Bırakıldığında
```
    dropZone.addEventListener("drop", (e) => {
```

**Dosya Alır**
```
    selectedFiles = Array.from(e.dataTransfer.files || []);
    selectedFile = selectedFiles[0] || null;
```

**UI + upload başlatır**
```
    showFileInfo(selectedFile, selectedFiles);
    startUpload();
```
- Aynı input seçimi gibi çalışır ama:
    - Sürükle bırak ile tetiklenir
    - Otomatik upload başlar

## Genel Akış
- Dosya sürüklenir
- Alan highlight olur
- Dosya bırakılır
- Dosyalar alınır
- UI hazırlanır
- Upload başlar

