# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



📦 FRONTEND YAPISI (React)

Şu yapı başlangıç için çok doğru:

frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   ├── tables/
│   │   └── ui/
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   └── DashboardPage.jsx
│   │   │
│   │   ├── Personel/
│   │   │   ├── PersonelPage.jsx
│   │   │   ├── PersonelFormPage.jsx
│   │   │   └── PersonelDetailPage.jsx
│   │   │
│   │   ├── Izin/
│   │   │   ├── IzinPage.jsx
│   │   │   └── IzinFormPage.jsx
│   │   │
│   │   └── Departman/
│   │       └── DepartmanPage.jsx
│   │
│   ├── routes/
│   │   └── AppRouter.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── personelService.js
│   │   ├── izinService.js
│   │   └── departmanService.js
│   │
│   ├── data/ **Şimdilikmock data database kullanılmadığı için**
│   │   ├── personeller.json
│   │   ├── izinler.json
│   │   └── departmanlar.json
│   │
│   ├── hooks/
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── index.html

--------------------------------

📁 public/

Direkt tarayıcıya açık dosyalar.

Örnek:

favicon
logo
robots.txt
📁 src/

Gerçek React kodlarının olduğu yer.

En önemli klasör.

📁 assets/

Statik dosyalar.

📁 images/

Resimler

📁 icons/

İkonlar

📁 styles/

CSS dosyaları

Örnek:

global.css
variables.css
📁 components/

Tekrar kullanılabilir parçalar.

📁 common/

Genel componentler

Örnek:

Loader
Modal
Pagination
📁 forms/

Form componentleri

Örnek:

Input
Select
FormGroup
📁 tables/

Tablo componentleri

Örnek:

PersonelTable
IzinTable
📁 ui/

UI parçaları

Örnek:

Button
Card
Badge
📁 layouts/

Sayfa iskeletleri.

MainLayout

En önemli layout.

Şunu içerir:

Navbar
Sidebar
Content
📁 pages/

Gerçek ekranlar.

📁 routes/

React Router yönetimi.

Tüm route sistemi burada.

📁 services/

API işlemleri.

Çok önemli klasör.

api.js

Axios ayarları

personelService.js

Personel API istekleri

Örnek:

getAllPersonels()
createPersonel()
deletePersonel()
📁 data/

Şimdilik mock data.

Çünkü:
👉 database kullanmıyoruz.

İleride kaldırılabilir.

📁 hooks/

Custom React hookları.

Şimdilik boş olabilir.

İleri seviye.

📁 utils/

Yardımcı fonksiyonlar.

Örnek:

formatDate.js
validateEmail.js