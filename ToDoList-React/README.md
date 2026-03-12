# Todo List - React

React ile yapılmış bir Todo List uygulaması. Bu proje, React'in temel konseptlerini (state management, hooks, event handling) kullanarak bir yapılacaklar listesi uygulaması sunar.

## 🚀 Proje Yapısı

```
ToDoList-React/
├── public/
│   └── index.html          # Ana HTML dosyası
├── src/
│   ├── index.js            # React uygulamasının giriş noktası
│   ├── App.js              # Ana bileşen (Todo List'in ana mantığı)
│   ├── App.css             # App bileşeni için CSS
│   └── index.css           # Global CSS stilleri
├── package.json            # Bağımlılıklar ve script'ler
└── .gitignore              # Git'ten hariç tutulacak dosyalar
```

## ✨ Özellikler

- ✅ **Todo Ekleme**: Yapılacak işleri listeye ekleyin
- ✅ **Todo Silme**: Yapılacak işleri silin
- ✅ **Todo Tamamlama**: Yapılacak işleri tamamlanan olarak işaretleyin
- ✅ **Enter Tuşu Desteği**: Enter tuşu ile hızlı ekleme
- ✅ **İstatistikler**: Toplam ve tamamlanan görevlerin sayısı
- ✅ **Responsive Tasarım**: Mobil ve desktop cihazlarda uyumlu
- ✅ **Modern UI**: Hoş ve kullanıcı dostu arayüz

## 📋 Kurulum

### Adım 1: Bağımlılıkları Yükleyin

```bash
npm install
```

### Adım 2: Geliştirme Sunucusunu Başlatın

```bash
npm start
```

Tarayıcı otomatik olarak `http://localhost:3000` adresine yönlendirilecektir.

## 📦 Kullanılan Teknolojiler

- **React 18.2.0** - UI kütüphanesi
- **React DOM 18.2.0** - React'i DOM'a render etme
- **React Scripts 5.0.1** - Build ve bundling araçları

## 🎨 Stil

- Modern gradient arka plan
- Smooth geçişler ve animasyonlar
- Responsive tasarım
- Erişilebilir form elemanları

## 📱 Responsive Tasarım

Uygulama mobile, tablet ve desktop cihazlarda düzgün çalışacak şekilde tasarlanmıştır.

## 🔧 Kullanılabilir Script'ler

- `npm start` - Geliştirme modunda çalıştır
- `npm build` - Production için build et
- `npm test` - Testleri çalıştır
- `npm eject` - Create React App konfigürasyonundan çık (geri alınamaz!)

## 📝 Notlar

- Eğer Create React App konfigürasyonundan çıkmak (eject) istiyorsanız, bu işlem geri alınamaz. Emin olduktan sonra yapın!
- Proje state management için React Hooks kullanmaktadır.

## 🚀 Ek Özellikler için İdealer

- **Local Storage Entegrasyonu**: Verileri tarayıcıda saklama
- **Filtreleme**: Tümü, Aktif, Tamamlanan sekmelerini gösterme
- **Kategoriler**: Todo'ları kategorilere ayırma
- **Öncelik Seviyeleri**: Görevlere öncelik atama
- **Drag & Drop**: Görevleri sürükleyerek sıralama
- **Backend Bağlantısı**: Verileri bir sunucuya kaydetme

## 👨‍💻 Geliştirme

Projeyi geliştirmeye başlamak için:

1. Yeni bileşenler oluşturmak için `src/components/` klasörü oluşturun
2. Durum yönetimini iyileştirmek için Context API veya Redux kullanmayı düşünün
3. Form validasyonu ekleyin
4. Birim testler yazın
