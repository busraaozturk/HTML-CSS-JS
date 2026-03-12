# ToDoList React + Tailwind CSS Projesi

Bu proje, React ve Tailwind CSS kullanarak oluşturulmuş modern bir yapılacaklar listesi uygulamasıdır.

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir React bileşenleri
│   ├── Layout.jsx      # Ana sayfa düzeni
│   ├── Header.jsx      # Üst bilgi bileşeni
│   ├── Footer.jsx      # Alt bilgi bileşeni
│   ├── TodoList.jsx    # Yapılacaklar listesi
│   └── TodoItem.jsx    # Yapılacak öğesi
├── pages/              # Sayfa bileşenleri
│   └── Home.jsx        # Ana sayfa
├── hooks/              # Özel React hooks'ları
│   └── useTodos.js     # Yapılacaklar yönetimi hook'u
├── context/            # React Context'ler
│   └── TodoContext.js  # Global Todo Context
├── utils/              # Yardımcı fonksiyonlar
│   └── helpers.js      # Genel yardımcı fonksiyonlar
├── assets/             # Resimler, fontlar vb.
├── App.js              # Ana uygulama bileşeni
├── App.css             # App stileri
├── index.js            # React'i başlatır
└── index.css           # Global stiller + Tailwind directives
```

## ⚙️ Kurulum

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatın
```bash
npm start
```

Uygulamaya `http://localhost:3000` adresinden erişebilirsiniz.

## 🎨 Tailwind CSS Yapılandırması

- **tailwind.config.js** - Tailwind konfigürasyonu
- **postcss.config.js** - PostCSS eklentileri

## 📦 Kullanılan Teknolojiler

- **React 18.2.0** - UI kütüphanesi
- **Tailwind CSS 4.2.1** - Utility-first CSS framework
- **PostCSS** - CSS dönüştürücü
- **react-scripts** - Create React App araçları

## 🚀 Kullanılabilir Komutlar

- `npm start` - Geliştirme mod sunucusunu başlatır
- `npm build` - Üretim build'ini oluşturur
- `npm test` - Testleri çalıştırır
- `npm eject` - CRA konfigürasyonunu ortaya çıkarır (geri alınamaz)

## 💡 Özellikler

- ✅ Görev ekleme
- ✅ Görev tamamlamayı işaretleme
- ✅ Görev silme
- ✅ Responsive tasarım
- ✅ LocalStorage desteği
- ✅ Tailwind CSS ile modern stil

## 📝 Bileşen Örnekleri

### Layout Bileşeni
```jsx
<Layout>
  <div>İçerik buraya gelir</div>
</Layout>
```

### TodoContext Kullanımı
```javascript
import { useTodoContext } from './context/TodoContext';

const MyComponent = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoContext();
  // ...
};
```

## 🔧 Tailwind CSS Özel Sınıfları

```css
.btn-primary    /* Mavi buton */
.btn-secondary  /* Gri buton */
.card           /* Kart bileşeni */
```

## 📖 Best Practices

1. **Bileşenleri organize edin** - Sayfa, düzen, ve genel bileşenler
2. **Hooks kullanın** - Bileşen mantığını ayırmak için
3. **Context API** - Global durum yönetimi için
4. **Tailwind Classes** - İnline stilleme yerine
5. **Dosya adlandırması** - PascalCase bileşenler (.jsx), camelCase diğerleri (.js)
