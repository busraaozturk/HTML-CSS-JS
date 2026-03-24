# JS Modülü Ödev #03: Fetch API (Vanilla JS vs React)

Bu proje, aynı veri çekme (fetch) işleminin hem saf JavaScript (Vanilla JS) hem de modern bir kütüphane olan React ile nasıl yapıldığını ve aralarındaki farkları deneyimlemek amacıyla hazırlanmıştır.

## Proje Yapısı

Proje iki ana dizinden oluşmaktadır:

- **`Js/`**: Herhangi bir kütüphane kullanmadan, doğrudan DOM manipülasyonu ile geliştirilen sürüm.
- **`React/`**: Vite kullanılarak oluşturulmuş, bileşen tabanlı ve state yönetimli sürüm.

## Kullanılan Teknolojiler

- **API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) (Ücretsiz, 10 kullanıcı verisi)
- **Frontend:** HTML5, CSS3, JavaScript, React.js
- **Build Tool:** Vite (Hızlı geliştirme ortamı için)

## Proje Nasıl Çalışıyor?

Uygulama, her iki versiyonda da aşağıdaki teknik akışı takip eder:

### 1. Veri Kaynağı (Data Fetching)
Tarayıcının yerleşik `fetch()` fonksiyonu kullanılarak API'ye bir `GET` isteği gönderilir. `async/await` yapısı ile asenkron süreç yönetilir.

### 2. Durum Takibi (Status Handling)
* **Yükleme:** İstek sürerken kullanıcıya görsel bir geri bildirim ("Yükleniyor...") sunulur.
* **Başarı:** Veri geldiğinde JSON formatına dönüştürülür ve listelenir.
* **Hata:** Ağ hatası veya sunucu kaynaklı sorunlarda `try-catch` bloğu ile hata yakalanarak ekrana anlamlı bir mesaj basılır.

### 3. Arayüzün Oluşturulması (Rendering)
* **Vanilla JS:** `forEach` döngüsü ile her kullanıcı için manuel olarak `div` oluşturulur ve `appendChild` ile DOM'a eklenir.
* **React:** Gelen veri `useState` hook'u ile saklanır. `users.map()` yöntemiyle her veri objesi `UserCard` bileşenine birer **prop** olarak aktarılır ve React tarafından otomatik render edilir.

### 4. Tasarım ve İkonlar
Kullanıcı bilgilerini (E-posta, Telefon, Şirket) daha şık göstermek için özel SVG ikonlar kullanılmış ve modern bir kart (card) tasarımı uygulanmıştır.

## Karşılaştırma ve Analiz

Ödev sürecinde gözlemlediğim temel farklar:

### 1. Durum Yönetimi (State Management)
- **Vanilla JS:** Loading ve Error durumlarını manuel olarak `innerText` veya `className` atayarak yönetmek zorundayız. Veri her değiştiğinde HTML'i elle temizleyip yeniden yazmak karmaşıklığa neden olabilir.
- **React:** `useState` sayesinde sadece veriyi güncelliyoruz, React arayüzün o anki veriye göre nasıl görünmesi gerektiğini kendisi hesaplıyor.

### 2. Okunabilirlik ve Bakım
- **Vanilla JS:** HTML kodlarını JavaScript içinde tırnak işaretleri (`innerHTML`) arasında yazmak, projenin büyümesi durumunda kodun okunabilirliğini azaltıyor.
- **React:** Projeyi `UserCard.jsx` gibi küçük parçalara ayırmak kodun daha düzenli ve tekrar kullanılabilir olmasını sağlıyor.

### 3. Geliştirici Deneyimi
- **React**'in deklaratif yapısı (neyin yapılacağını değil, sonucun ne olacağını söylemek) karmaşık arayüzlerde büyük kolaylık sağlıyor. Ancak basit ve küçük projeler için **Vanilla JS** ek kurulum gerektirmediği için hala çok hızlı bir seçenek.

## Çalıştırma Talimatları

### Vanilla JS Sürümü
1. `Js/` klasörüne gidin.
2. `index.html` dosyasını tarayıcıda açın.

### React Sürümü
1. `React/` klasörüne gidin.
2. Terminale şu komutları sırasıyla yazın:
   ```bash
   npm install
   npm run dev
3. Terminaldeki yerel adresi (örn: **localhost:5173**) tarayıcıda açın.