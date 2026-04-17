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















Bu fonksiyon:
- Dosyanın boyutuna göre bir yükleme süresi hesaplıyor.
- Zamanla "progress" artırıyor
- Bunu callback ile UI'a iletiyor
- %10 ihtimalle hatayı simüle ediyor

## Fonksiyonun Genel Akışı : 
- Dosya Alınır
- Boyuta göre süre hesaplanır
- 100ms'de bir ilerleme yapılır
- UI callback ile güncellenir
- %10 ihtimalle hata oluşur
- Upload biter veya error olur
