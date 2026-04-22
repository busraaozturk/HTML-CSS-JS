# Projenin Genel Mantığı

Bu yapı 3 ana parçadan oluşur:
- **Uygulamanın Giriş Noktası**
- **Component'ler (UI parçaları)**
- **Style & config dosyaları**

## `src` Klasörü (En Önemli Yer)
Tüm React kodlarının olduğu yer burasıdır.

### `main.jsx` -> Uygulamanın Başlangıç Noktası
React burada başlar
```
    import { StrictMode } from 'react'
    import { createRoot } from 'react-dom/client'
    import './index.css'
    import App from './App.jsx'

    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
```
**Mantık :**
- HTML'deki `<div id="root">` içine React'ı basar
- İlk render edilen component: **App.jsx**

### `App.jsx` -> Ana Container 
Tüm uygulamanın ana bileşeni
Burada genelde : 
- Component'ler çağrılır
- Layout kurulur
Örnek Mantık : 
```
    import UploadProgress from "./components/UploadProgress";

    export default function App() {
        return <UploadProgress />;
    }
```
Yani:
- App = sahne
- Component'ler = oyuncular

### `components/UploadProgress.jsx`
Asıl iş burada dönüyor.
- Upload UI
- Progress Bar
- Butonlar
- Logic
Bu dosya **"Tek bir işi yapan UI bileşeni".**

### `assets/`
Statik Dosyalar
- Resimler
- Iconlar
- Svg'ler

## CSS Dosyaları

### `index.css`
Global stil dosyasıdır. Buraya genelde şunlar yazılır:
```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```
- Tailwind burada projeye dahil edilir.

### `App.css`
App.jsx'e özel stil. Tailwind kullanıldığı için çok gerek kalmıyor kullanmaya.

### `upload-progress.css`
Upload component'ine özel CSS. Tailwind kullanıldığı için kullanmaya gerek kalmaz.

## Config Dosyaları (Arka Plan)
Bunlar çok önemli ama genelde elle dokunulmaz

### `package.json`
İçinde:
- Bağımlılıklar (react, vite vs.)
- Scriptler

```
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "lint": "eslint .",
        "preview": "vite preview"
    },
```

### `vite.config.js`
Vite ayarları
- Hızlı build
- Development server

### `tailwind.config.js`
Tailwind ayarları. Tailwind hangi dosyaları tarayacağını buradan öğrenir.

Örnek:
```
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
```

### `postcss.config.js`
Tailwind'in çalışması için gerekli

### `eslint.config.js`
Kod kuralları
- Hataları yakar
- Temiz kod yazmayı sağlar

## Root Seviyesi
### `index.html`
- Tek Html dosyası
- React buraya render edilir

```
    <div id="root"></div>
```

### README.md
Proje Açıklaması

### `.gitignore`
Git'in yüklemeyeceği dosyalar

# Proje Özeti
- `index.html` - Boş sayfa
- `main.jsx` - React başlatır
- `App.jsx` - Ana yapı
- `components/` - UI parçaları
- CSS - Görünüm
- config - Sistem ayarları

# Bu Proje Özelinde
- Upload UI = `UploadProgress.jsx`
- App = Sadece bunu çağırıyor
- Tailwind = Tüm tasarım