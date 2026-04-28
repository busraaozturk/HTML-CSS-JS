# UploadProgress (React)

Bu proje, `UploadProgress` klasöründeki HTML/CSS/JS örneğini React + Vite yapisina taşır. Amaç "gerçek upload" değil; orijinal `script.js` mantığıyla bir yükleme simulasyonu yapar ve UI buna göre güncellenir.

## Özellikler

- Çoklu dosya seçimi (`multiple`)
- Drag & drop + tıklayarak dosya seçme
- Dosya listesi (preview + ad + boyut) ve durum ikonları:
  - `uploading`: spinner
  - `completed`: yeşil tik
  - `error`: kırmızı hata
- Toplam progress bar (tüm dosyaların toplam byte oranına göre)
- `Durdur / Devam Et` (pause/resume)
- `Sıfırla`
- Yükleme bitince konfeti
- Hata simülasyonu (dosya başına rastgele ihtimalle)

## Nasıl Çalışır? (Simülasyon Mantığı)

Bu proje dosyaları bir sunucuya göndermez. Bunun yerine:

- Her dosya sırasıyla (serial) yükleniyor gibi gösterilir.
- Her dosya için yaklaşık bir hız ile `setInterval` üzerinden byte ilerleme hesaplanır.
- Dosya başına belirli bir ihtimalle hata oluşur; hata alan dosyanın byte’ları toplama sayılmaz ve diğer dosyaya geçilir.
- Pause durumunda interval çalışır ama ilerleme artmaz (orijinal JS ile aynı).

### Ayarlanabilir Değerler

Simülasyon ayarları `UploadProgress-React/src/components/UploadProgress.jsx` içindedir:

- `UPLOAD_SPEED_MBPS`: Simüle edilen hız (MB/s)
- `MIN_FILE_DURATION_MS`: Küçük dosyaların “anında bitmemesi” için minimum süre (ms)
- Hata ihtimali: `createUploadTicker(...)` içinde `Math.random() < 0.1` (yani %10)

Not: Zip gibi büyük bir dosya toplam boyutun çok büyük bir kısmını oluşturuyorsa, küçük dosyalar yüklense bile progress yüzdesi az artıyor gibi görünebilir. Bar yine oranlı ilerler; yüzde etiketi tam sayı olduğu için bu daha belirgin olur.

## Kurulum ve Çalıştırma

Proje klasörü: `UploadProgress-React`

```bash
npm install
npm run dev
```

### Diğer Komutlar

```bash
npm run lint
npm run build
npm run preview
```

## Dosya Yapısı

- `UploadProgress-React/src/App.jsx`
  - Sadece `UploadProgress` component’ini render eder.
- `UploadProgress-React/src/components/UploadProgress.jsx`
  - Upload akışını yöneten ana component (state + iş mantığı).
- `UploadProgress-React/src/components/uploadProgress/`
  - `UploadProgress` feature’ına ait alt component’ler ve yardımcı dosyalar.
  - Örnekler:
    - `Controls.jsx` (Durdur/Devam Et, Sıfırla)
    - `DropZone.jsx` (drag & drop alanı)
    - `FileList.jsx` / `FilePreview.jsx` (liste + önizleme)
    - `ProgressBar.jsx` / `StatusIcon.jsx` (progress + durum ikonları)
    - `constants.js` / `utils.js` (simülasyon ayarları ve yardımcı fonksiyonlar)
- `UploadProgress-React/src/upload-progress.css`
  - Orijinal projedeki ek CSS (glow, dosya listesi, spinner, scrollbar vb.)
- `UploadProgress-React/src/index.css`
  - Tailwind base + global stiller

## Davranış Detayları

- Dosya seçilince veya drop yapılınca upload otomatik başlar.
- `Durdur`:
  - progress artmaz
  - spinner animasyonu durur
- `Devam Et`:
  - kaldığı yerden devam eder
- `Sıfırla`:
  - tüm interval’lar temizlenir
  - seçilen dosyalar ve durumlar sıfırlanır
  - progress `%0` olur

## Sorun Giderme

### `npm run build` sırasında `spawn EPERM`

Bazı Windows ortamları/güvenlik ayarları nedeniyle Vite config yüklerken `spawn EPERM` hatası görülebilir. Bu genelde ortam izinleriyle ilgilidir.

Deneyebileceklerin:

- Terminali “Yönetici olarak çalıştır” ile açmak
- Projeyi daha kısa/ASCII bir yola taşımak (örneğin `C:\\dev\\uploadprogress-react`)
- Antivirus/Defender için proje klasörünü istisnaya almak
- `npm run dev` ile çalıştırmanın sorunsuz olduğunu doğrulamak

## Geliştirme Notları

- React tarafında interval callback’lerinde index karışması olmaması için her dosya upload başlatıldığında index sabitlenir (closure bug engellenir).
- Image preview için object URL oluşturma/revoke işlemleri `useEffect` ile render dışına alınmıştır; memory leak engellenir.
