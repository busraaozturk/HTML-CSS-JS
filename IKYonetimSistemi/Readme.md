# İnsan Kaynakları Yönetim Sistemi (HRMS)
Modern web teknolojileri kullanılarak geliştirilen İnsan Kaynakları Yönetim Sistemi projesidir.

Bu proje, şirketlerin insan kaynakları süreçlerini dijital ortamda yönetebilmesini amaçlamaktadır.

## 🚀 Proje Özellikleri
- Personel Yönetimi (CRUD)
- İzin Yönetimi
- Departman Yönetimi
- Raporlama Modülü
- RESTful API Yapısı
- Modüler Mimari
- Responsive UI Tasarımı

## 🛠️ Kullanılan Teknolojiler
### Frontend
- React
- React Router
- Axios
- TailwindCSS

### Backend
- Node.js
- Express.js

### Veri Yönetimi
- JSON tabanlı veri saklama
- Repository Pattern

## 📂 Proje Yapısı
### Backend

```bash
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── models/
 ├── routes/
 └── data/
```

### Frontend

```bash
src/
 ├── components/
 ├── pages/
 ├── layouts/
 ├── services/
 ├── routes/
 └── assets/
```

## ⚙️ Kurulum
### 1.Projeyi Klonla
```
    git clone <repo-url>
```

### 2.Backend Kurulumu
```
    cd backend
    npm install
    npm run dev
```
Backend varsayılan olarak:
```
    http://localhost:----
```
adresinde çalışacaktır.

### 3.Frontend Kurulumu
```
    cd frontend
    npm install
    npm run dev
```
Frontend varsayılan olarak : 
```
    http://localhost:----
```
adresinde çalışacaktır.

## 🔄 API Endpointleri
### Personel API
| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/personel     |
| GET    | /api/personel/:id |
| POST   | /api/personel     |
| PUT    | /api/personel/:id |
| DELETE | /api/personel/:id |

### İzin API
| Method | Endpoint      |
| ------ | ------------- |
| GET    | /api/izin     |
| POST   | /api/izin     |
| PUT    | /api/izin/:id |
| DELETE | /api/izin/:id |

### Departman API
| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /api/departman     |
| POST   | /api/departman     |
| PUT    | /api/departman/:id |
| DELETE | /api/departman/:id |


## 🧪 Test
Test işlemleri aşağıdaki araçlar ile gerçekleştirilmiştir:
- Postman
- Chrome DevTools

## 🌐 Deployment
**Frontend**
- Vercel / Netlify
**Backend**
- Render / Railway

## 🔒 Gelecek Geliştirmeler
- JWT Authentication
- Rol bazlı yetkilendirme
- Gerçek veritabanı entegrasyonu
- Dashboard grafik sistemi
- E-posta bildirim sistemi
- Çalışan paneli

## 📸 Ekran Görüntüsü
### 🏠 Dashboard
Dashboard ekran görüntüsü burada yer alacaktır.

### 👤 Personel Yönetimi
Personel yönetim ekranı burada yer alacaktır.

### 📝 İzin Yönetimi
İzin yönetim ekranı burada yer alacaktır.

### 🎥 Proje Önizleme (GIF)
Projenin kullanım akışını gösteren GIF burada paylaşılacaktır.

## 📄 Proje Dokümantasyonu
Detaylı SDLC ve sistem tasarım dokümanı:
```
    PROJECT_DOCUMENTATION.md
```
## 📁 Proje Yapısı
IKYonetimSistemi/
│
├── backend/
├── frontend/
├── screenshots/
│
├── PROJECT_DOCUMENTATION.md
├── README.md
└── .gitignore

## 👩‍💻 Geliştirici
Büşra Öztürk / Frontend Developer

## 📄 Lisans
Bu proje eğitim ve portföy amaçlı geliştirilmiştir.