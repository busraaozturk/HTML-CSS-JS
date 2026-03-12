# ToDoList_React

Bu proje, React ve Tailwind CSS kullanılarak oluşturulmuş basit bir yapılacaklar listesi uygulamasıdır. Vite base edilmiştir ve TypeScript desteği vardır.

## 📦 Yapı

- `src/` – Uygulama kaynak kodu
  - `components/` – `TodoInput`, `TodoItem`, `TodoList` bileşenleri
  - `App.tsx` – Ana bileşen
  - `index.css` – Tailwind direktifleri ve genel stiller
- `public/` – Statik varlıklar
- `package.json` – Bağımlılıklar ve script'ler
- `tsconfig.json`, `vite.config.ts` vb. – Proje yapılandırması

## 🚀 Başlatma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   # veya yarn
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
3. Tarayıcınızda `http://localhost:5173` adresini açın.

## ✨ Özellikler

- Todo ekleme, silme ve tamamlandı olarak işaretleme
- Tailwind CSS ile kısmi responsive tasarım
- TypeScript ile tip güvenliği

## 🛠 Geliştirme

- `npm run build` – Üretim için paketleme
- `npm run lint` – Eslint kontrolü
