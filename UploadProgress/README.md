# UploadProgress

Basit bir HTML/CSS/JS tabanlı dosya yükleme simülasyonu projesidir.

## Özellikler

- Drag & drop / tıkla ile dosya seçimi
- Seçilen dosyanın adı, boyutu ve uzantısı gösterilir
- Resim dosyaları için önizleme
- Döküman dosyaları için ikonla gösterim
- Yükleme ilerleme çubuğu (%0 - %100)
- Başlat / Sıfırla butonları
- Başarı durumunda konfeti animasyonu
- Hata durumunda kırmızı çubuk ve uyarı metni

## Kullanımı

1. `index.html` dosyasını tarayıcıda açın.
2. Alanın üzerine tıklayarak veya dosya sürükleyip bırakarak dosya seçin.
3. Seçilen dosya bilgisi ekranda görünür.
4. `Başlat` düğmesine basarak yükleme simülasyonunu başlatın.
5. `Sıfırla` düğmesiyle sıfırlayabilirsiniz.

## Dosya yapısı

- `index.html`: UI + proje düzeni
- `style.css`: stil tanımları
- `script.js`: dosya seçim / yükleme mantığı
- `README.md`: proje açıklaması

## Notlar

- Proje gerçek dosya yükleme yapmaz, sadece UI simülasyonu içindir.
- Resim önizlemesi için tarayıcının `URL.createObjectURL` API'si kullanılır.
