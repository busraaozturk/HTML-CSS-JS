## Proje Tanımı
### Proje Adı:
İnsan Kaynakları Yönetim Sistemi
### Proje Amacı:
Şirketlerin insan kaynakları süreçlerini manuel ve dağınık yapıdan çıkararak merkezi ve dijital bir platform üzerinden yönetmelerini sağlamaktır.

Sistem ile birlikte;
- Çalışan izin süreçlerinin dijital ortamda takip edilmesi ve yönetilmesi
- Personel bilgilerinin (ekleme, silme, güncelleme) merkezi olarak tutulması
- Raporlama süreçlerinin otomatik hale getirilmesi hedeflenmektedir.
- **Not:** Gelecek versiyonlarda sisteme çalışan giriş-çıkış takibi ve çoklu kullanıcı desteği eklenmesi planlanmaktadır.
### Hedef Kullanıcı:
- İnsan Kaynakları (İK) Personeli
- Sistem Yöneticileri (Admin)
- Sistem başlangıçta tek kullanıcı (İK) için tasarlanmıştır. İlerleyen aşamalarda çalışan kullanıcı desteği eklenebilir.
### Çözdüğü Problemler:
- Manuel takip edilen izin süreçlerinin karmaşıklığı
- Excel veya kağıt üzerinde tutulan personel verilerinin dağınıklığı
- Departman bazlı organizasyonun zor yönetilmesi
- Raporlama süreçlerinin zaman alıcı ve hataya açık olması
### Platform:
- Web tabanlı uygulama (Tarayıcı üzerinden erişilebilir)

### Temel Özellikler:
- Personel Yönetimi (CRUD işlemleri)
- İzin Yönetimi (İK tarafından ekleme, güncelleme ve onaylama)
- Departman Yönetimi
- Raporlama Modülü 

## Planning (Planlama)
### Amaç:
Bu aşamada projenin kapsamı, hedefleri ve temel gereksinimleri belirlenerek geliştirme süreci öncesinde bir yol haritası oluşturulmuştur.
Proje kapsamında:
- İnsan kaynakları süreçlerinin dijitalleştirilmesi
- Tek kullanıcı (İK) odaklı sistem tasarımı
- Sistem modüllerinin belirlenmesi amaçlanmıştır.
### Yapılanlar:
- Proje kapsamı belirlendi
- Hedef kullanıcı kitlesi tanımlandı
- Sistem gereksinimleri yüksek seviyede analiz edildi
- Temel modüller belirlendi:
    - Personel Yönetimi
    - İzin Yönetimi
    - Departman Yönetimi
    - Raporlama
- Projenin web tabanlı olarak geliştirilmesine karar verildi
- Geliştirme süreci için genel zaman planı oluşturuldu
- Projenin tek geliştirici tarafından yapılacağı belirlendi
- Bu doğrultuda sistem kapsamı sadeleştirildi
- Öncelikli modüller seçildi (MVP-Minimum Viable Product)
### Kullanılan Araçlar:
- Proje Planlama : ChatGPT
- Dokümantasyon : Markdown (MD), ChatGPT
- Diyagram Oluşturma : Draw.io / Excalidraw
### Çıktı:
- Proje kapsam dokümanı

## Analysis (Analiz)
### Amaç:
Bu aşamada sistemin fonksiyonel ve fonksiyonel olmayan gereksinimleri detaylı olarak belirlenmiş, kullanıcı ihtiyaçları analiz edilerek sistemin nasıl çalışacağı netleştirilmiştir.

Ayrıca sistemde yer alacak modüllerin görevleri, veri yapıları ve kullanıcı etkileşimleri tanımlanmıştır.

### Yapılanlar:
- Kullanıcı ihtiyaçları detaylı olarak analiz edildi
- Sistem modülleri ayrıntılı şekilde incelendi
- Her modül için gerekli fonksiyonlar belirlendi
- Veri yapıları (personel, izin, departman) taslak olarak oluşturuldu
- Kullanıcı akışları (workflow) tanımlandı
- Sistem sınırları ve kapsamı netleştirildi
### Functional Requirements (Fonksiyonel Gereksinimler)
#### Personel Yönetimi
- Sistem yeni personel ekleyebilmelidir.
- Personel bilgileri güncellenebilmelidir.
- Personel sistemden silinebilmelidir.
- Personel listesi görüntülenebilmelidir.
- Personel departman bilgisi ile ilişkilendirilebilmelidir.
#### Departman Yönetimi
- Yeni departman eklenebilmelidir
- Departman bilgileri güncellenebilmelidir
- Departman silinebilmelidir
- Personeller departmanlara atanabilmelidir
#### İzin Yönetimi
- İK personeli kaydı oluşturabilmelidir
- İzin başlangıç ve bitiş tarihleri girilebilmelidir
- İzin türü seçilebilmelidir (yıllık izin, raporlu vs.)
- İzin durumu (onaylandı, reddedildi, beklemede) güncellenebilmelidir
- İzin listesi görüntülenebilmelidir
#### Raporlama
- Personel listesi raporlanabilmelidir
- İzin raporları görüntülenebilmelidir
- Departman bazlı raporlar alınabilmelidir
### Non-Functional Requirements (Fonksiyonel Olmayan)
- Sistem kullanıcı dostu (user-friendly) bir arayüze sahip olmalıdır
- Sistem hızlı ve performanslı çalışmalıdır
- Veriler güvenli bir şekilde saklanmalıdır
- Sistem tarayıcı uyumlu (Chrome, Edge vb.) olmalıdır
- Kod yapısı sürdürülebilir ve geliştirilebilir olmalıdır
- Hatalı kullanıcı girişlerine karşı validasyon yapılmalıdır
#### Kullanılan Araçlar:
- Gereksinim Analizi : Manuel analiz, kullanıcı senaryoları
- Diyagramlar için : Draw.io / Excalidraw
#### Çıktı
- Detaylı gereksinim dokümanı
- Sistem modül detayları
- Kullanıcı akış diyagramları
- Veri modeli taslakları

## Tasarım
### 1. Veri Modeli Tasarımı (Data Model Design)
#### Amaç:
Sistem içerisinde kullanılacak veri yapıları tanımlanmış ve veri yönetimi katmanı modüler bir yapı ile tasarlanmıştır.
#### Veri Modelleri

**PERSONEL**
- Id (int)
- Ad (string)
- Soyad (string)
- Email (string)
- Telefon (string)
- DepartmanId (int)
- OlusturmaTarihi (datetime)

**Departman**
- Id (int)
- DepartmanAdi (string)

**İzin**
- Id (int)
- PersonelId (int)
- BaslangicTarih (datetime)
- BitisTarih (datetime)
- IzinTuru (string)
- Durum (string)

**İlişkiler**
- Bir departmana birden fazla personel atanabilir : 1 Departman → Çok Personel
- Bir personelin birden fazla izin kaydı olabilir : 1 Personel → Çok İzin

#### Veri Yönetim Stratejisi:
Sistem, veri erişim katmanını soyutlamak amacıyla **Repository Pattern** kullanılarak tasarlanmıştır.
- Geliştirme sürecinin ilk aşamasında veri yönetimi **dosya tabanlı (JSON)** olarak sağlanacaktır.
- Veri erişim katmanı soyutlandığı için ilerleyen aşamalarda ilişkisel veritabanına (SQL Server vb.) geçiş kolaylıkla sağlanabilecektir

### 2.Sistem Mimarisi (System Architecture)
#### Amaç:
Sistem, kullanıcı arayüzü ile iş mantığını birbirinden ayıran modüler, sürdürülebilir ve geliştirilebilir bir mimari ile tasarlanmıştır.

#### Mimari Yapı:
Sistem 3 ana katmandan oluşmaktadır:

#### 1.Frontend (Client Side - React)
- React kullanılarak geliştirilmiştir
- Kullanıcı arayüzü ve kullanıcı etkileşimleri bu katmanda yönetilir
- Backend API ile HTTP istekleri üzerinden iletişim kurulur

#### 2.Backend (Server Side - Node.js & Express)
- Node.js ve Express framework kullanılmıştır
- RESTful API mimarisi benimsenmiştir
- İş kuralları ve uygulama mantığı bu katmanda yer alır
- Controller, Service ve Repository katmanları ile modüler yapı oluşturulmuştur

#### 3.Veri Katmanı
- Veri erişimi Repository Pattern ile yönetilmektedir
- İlk aşamada JSON dosyaları kullanılmaktadır
- İlerleyen aşamalarda veritabanı entegrasyonu planlanmaktadır

#### Backend Klasör Yapısı 
Klasör yapısı şu şekilde olmalı:
```
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── models/
 ├── routes/
 └── data/   (json dosyaları burada)
 ```

#### Veri Akışı
1. Kullanıcı React arayüzünde işlem yapar
2. HTTP isteği backend API'ye gönderilir
3. Route → Controller → Service → Repository akışı çalışır
4. Veri JSON dosyasından okunur veya yazılır
5. Sonuç frontend'e döndürülür

### 3.API Tasarımı (API Design)
#### Amaç : 
Frontend ve backend arasındaki veri iletişimini standart ve sürdürülebilir bir yapı ile sağlamak.

#### Personel API :
    
    Endpointler :
    - GET    /api/personel
    - GET    /api/personel/:id
    - POST   /api/personel
    - PUT    /api/personel/:id
    - DELETE /api/personel/:id

    Request Body (POST / PUT)
    {
        "ad": "Büşra",
        "soyad": "Öztürk",
        "email": "busra@email.com",
        "telefon": "5551234567",
        "departmanId": 1,
        "olusturmaTarihi": "2026-05-05T10:00:00"
    }

    Response
    {
        "id": 1,
        "ad": "Büşra",
        "soyad": "Öztürk",
        "email": "busra@email.com",
        "departmanId": 1,
        "olusturmaTarihi": "2026-05-05T10:00:00"
    }

#### İzin API :
    
    Endpointler:
    - GET    /api/izin
    - POST   /api/izin
    - PUT    /api/izin/:id
    - DELETE /api/izin/:id

#### Departman API:

    Endpointler:
    - GET    /api/departman
    - POST   /api/departman
    - PUT    /api/departman/:id
    - DELETE /api/departman/:id

#### Status Code'lar
    - 200 → Başarılı
    - 201 → Oluşturuldu
    - 400 → Hatalı istek
    - 404 → Kayıt bulunamadı
    - 500 → Sunucu hatası

#### Genel Mimari Görünüm
```
React (Frontend)
        ↓
Node.js API (Backend)
        ↓
Repository Layer
        ↓
JSON Data (Geçici) → Database (Gelecek)
```

### 4.UI / UX Tasarım
#### Amaç :
Kullanıcıların sistemi kolay, hızlı ve hatasız bir şekilde kullanabilmesi için kullanıcı dostu, sade ve anlaşılır bir arayüz tasarlanmıştır.

Arayüz tasarımında, kullanıcı deneyimini artırmak ve işlem sürelerini azaltmak hedeflenmiştir.

#### Genel Arayüz Yapısı:

**Layout Bileşenleri**
- Navbar (Üst Menü)
    - Uygulama adı
    - Sayfa başlığı
- Sidebar (Yan Menü)
    - Dashboard
    - Personel Yönetimi
    - İzin Yönetimi
    - Departman Yönetimi
- Content Area (İçerik Alanı)
    - Seçilen sayfanın içerikleri burada gösterilir

#### Sayfa Navigasyonu
Kullanıcı, sidebar üzerinden modüller arasında geçiş yapabilir:
- Dashboard (Ana sayfa) : `/dashboard`
- Personel Listesi : `/personel`
- Personel Ekle : `/personel/ekle`
- İzin Listesi : `/izin`
- İzin Ekle : `/izin/ekle`
- Departman Yönetimi : `/departman`

#### Dashboard Sayfası
**Amaç:**
Sistemin genel durumunu özetlemek

**İçerik:**
- Toplam personel sayısı
- Toplam izin sayısı
- Departman sayısı

**UI Bileşenleri:**
- Kart yapıları (Card components)

#### Personel Yönetimi
**1. Personel Listesi Sayfası**

**Amaç:** Tüm personelleri görüntülemek ve yönetmek

**UI Bileşenleri:**
- Tablo (Table)
- Arama alanı (Search input)
- ***'Yeni Personel Ekle'*** butonu

**Tablo Kolonları:**
- Ad
- Soyad
- Email
- Telefon
- Departman
- İşlemler (Düzenle / Sil)

**2. Personel Ekle / Güncelle Sayfası**

**Amaç:** Yeni personel eklemek veya mevcut personeli düzenlemek

**Form Alanları:**
- Ad (input)
- Soyad (input)
- Email (input)
- Telefon (input)
- Departman (select dropdown)

**Butonlar:**
- Kaydet
- İptal

**Validasyon:**
- Zorunlu alan kontrolü
- Email format kontrolü
- Telefon format kontrolü

#### İzin Yönetimi
**1.İzin Listesi**

**Amaç:** Tüm izin kayıtlarını görüntülemek

**UI Bileşenleri:**
- Tablo
**Kolonlar:**
- Personel Adı
- Başlangıç Tarihi
- Bitiş Tarihi
- İzin Türü
- Durum

**2.İzin Ekle Sayfası**

**Amaç:** Yeni izin kaydı oluşturmak

**Form Alanları:**
- Personel (dropdown)
- Başlangıç Tarihi (date picker)
- Bitiş Tarihi (date picker)
- İzin Türü (select)
- Durum (select)

#### Departman Yönetimi

**Amaç:** Departmanları yönetmek

**UI Bileşenleri:**
- Liste veya tablo
- ***'Departman Ekle'*** butonu

**İşlemler:**
- Ekle
- Güncelle
- Sil

#### React Component Mimarisi
**Genel Component Yapısı:**
- Layout
    - Navbar
    - Sidebar
- Pages
    - DashboardPage
    - PersonelPage
    - IzinPage
    - DepartmanPage
- Components
    - PersonelTable
    - PersonelForm
    - IzinTable
    - IzinForm
    - DepartmanForm
    - Input, Select, Button (Reusable)

#### Kullanıcı Akışları (User Flow)
**Personel Ekleme Akışı:**
- Kullanıcı **'Personel Yönetimi'** sayfasına gider
- **'Yeni Personel Ekle'** butonuna tıklar
- Formu doldurur
- Kaydet butonuna basar
- Listeye yönlendirilir

**İzin Ekleme Akışı:**
- Kullanıcı **'İzin Yönetimi'** sayfasına gider
- **'Yeni İzin Ekle'** butonuna tıklar
- Formu doldurur
- Kaydet butonuna basar
- İzin listesine yönlendirilir

#### UI Tasarım Prensipleri
- Minimal ve sade tasarım
- Tutarlı bileşen kullanımı
- Responsive (mobil uyumlu) yapı
- Form validasyonları ile hata önleme
- Kullanıcı dostu navigasyon

## Testing (Test Aşaması)
### Amaç:

Bu aşamada geliştirilen sistemin doğru, hatasız ve kullanıcı ihtiyaçlarına uygun çalıştığının doğrulanması amaçlanmıştır.

Sistem üzerindeki fonksiyonların beklenen şekilde çalışıp çalışmadığı test edilmiştir.

### Test Türleri
#### 1.Fonksiyonel Testler (Functional Testing)
Sistemin belirlenen gereksinimleri doğru şekilde yerine getirip getirmediği test edilmiştir.
#### 2. Entegrasyon Testleri (Integration Testing)
Frontend (React) ile backend (Node.js API) arasındaki veri akışı test edilmiştir.

#### 3. Kullanıcı Arayüzü Testleri (UI Testing)
Kullanıcı arayüzündeki form ve listeleme işlemlerinin doğru çalışıp çalışmadığı kontrol edilmiştir.

#### 4. Hata ve Validasyon Testleri
- Boş alan gönderme
- Hatalı veri girişi
- Eksik bilgi girilmesi durumları test edilmiştir.

### Test Senaryoları
#### Personel Yönetimi
- Yeni personel başarıyla eklenebilmelidir
- Eksik bilgi ile personel eklenememelidir
- Personel bilgileri güncellenebilmelidir
- Personel silinebilmelidir

#### İzin Yönetimi
- Yeni izin kaydı oluşturulabilmelidir
- Tarih alanları doğru girilmelidir
- İzin listesi doğru görüntülenmelidir
#### Departman Yönetimi
- Yeni departman eklenebilmelidir
- Departman silinebilmelidir
- Personel departmana atanabilmelidir
#### API Testleri
- GET istekleri doğru veri döndürmelidir
- POST istekleri veri ekleyebilmelidir
- PUT istekleri güncelleme yapabilmelidir
- DELETE istekleri veri silebilmelidir

### Kullanılan Araçlar
- API testleri için: Postman
- Frontend testleri için: Tarayıcı (Chrome DevTools)
- Hata takibi için: Console logları

### Çıktı
- Test edilen modüllerin doğruluğu onaylandı
- Tespit edilen hatalar giderildi
- Sistem stabil hale getirildi

## Deployment (Yayınlama)
### Amaç :
Bu aşamada geliştirilen uygulamanın canlı ortama alınarak kullanıcıların erişimine açılması amaçlanmıştır.

Frontend ve backend bileşenlerinin entegre şekilde çalışması sağlanmıştır.

### Yayınlama Mimarisi
Sistem aşağıdaki yapı ile yayınlanmıştır:
```
React (Frontend)
      ↓
Node.js API (Backend)
      ↓
JSON / Database
```

### Kullanılan Platformlar
- Frontend:
    - Netlify veya Vercel
- Backend:
    - Render / Railway / Cyclic

### Yayınlama Adımları
#### Frontend (React) Yayınlama
- Proje build alınır:
`npm run build`
- Netlify / Vercel’e yüklenir
- API URL’leri güncellenir
```
    const API_URL = "https://your-api-url.com"
```

#### Backend (Node.js) Yayınlama
- Proje GitHub’a yüklenir
- Render / Railway platformuna bağlanır
- Environment ayarları yapılır
- API yayına alınır  

#### Entegrasyon
- Frontend → Backend URL bağlanır
- API istekleri test edilir
- CORS ayarları yapılır

### Dikkat Edilmesi Gerekenler
- API URL’lerinin doğru olması
- CORS hatalarının çözülmesi
- JSON veri yolunun doğru çalışması
- Ortam değişkenlerinin (env) doğru ayarlanması

### Çıktı
- Uygulama canlı ortama alınmıştır
- Kullanıcılar tarafından erişilebilir hale gelmiştir
- Frontend ve backend entegre şekilde çalışmaktadır

## Maintenance (Bakım)
### Amaç :

Bu aşamada, canlı ortama alınan sistemin sürekliliğinin sağlanması, ortaya çıkan hataların giderilmesi ve kullanıcı ihtiyaçlarına göre sistemin geliştirilmesi amaçlanmıştır.

Sistemin performanslı, güvenli ve güncel kalması hedeflenmiştir.

### Bakım Türleri : 
#### 1. Düzeltici Bakım (Corrective Maintenance)
Sistem kullanımı sırasında ortaya çıkan hataların tespit edilerek giderilmesini kapsar.

**Örnek:**
- API hatalarının düzeltilmesi
- Form validasyon hatalarının giderilmesi
- Yanlış veri kayıtlarının düzeltilmesi

#### 2. İyileştirici Bakım (Perfective Maintenance)
Sistemin performansını ve kullanıcı deneyimini artırmaya yönelik yapılan geliştirmeleri kapsar.

**Örnek:**
- Sayfa yüklenme hızının artırılması
- UI iyileştirmeleri
- Daha kullanıcı dostu form yapıları

#### 3. Önleyici Bakım (Preventive Maintenance)
İleride oluşabilecek hataların önüne geçmek amacıyla yapılan çalışmalardır.

**Örnek:**
- Kod refactoring
- Loglama sistemlerinin eklenmesi
- Hata yakalama (error handling) mekanizmalarının geliştirilmesi

#### 4. Uyarlayıcı Bakım (Adaptive Maintenance)
Sistemin yeni teknolojilere veya değişen ihtiyaçlara uyarlanmasını kapsar.

**Örnek:**
- JSON veri yapısından veritabanına geçiş
- Yeni API endpointlerinin eklenmesi
- Yeni modüllerin sisteme dahil edilmesi

### Yapılan / Planlanan Çalışmalar
- Sistem performansı düzenli olarak kontrol edilecektir
- Kullanıcı geri bildirimleri doğrultusunda iyileştirmeler yapılacaktır
- Veri yönetimi JSON’dan ilişkisel veritabanına taşınacaktır
- Güvenlik geliştirmeleri yapılacaktır (input validation, API güvenliği vb.)
- Kod yapısı düzenli olarak gözden geçirilip iyileştirilecektir

### Kullanılan Araçlar
- **Log takibi:** Console / (opsiyonel: log kütüphaneleri)
- **Versiyon kontrol:** Git / GitHub
- **Hata takibi:** Manuel testler

### Çıktı
- Sistem stabil ve sürdürülebilir hale getirilmiştir
- Hatalar minimize edilmiştir
- Yeni özellikler eklenmeye uygun hale getirilmiştir