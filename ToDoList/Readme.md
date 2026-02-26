# 📝 To Do List (Vanilla JavaScript)

Basit ve sade bir To Do List uygulaması.  
Tamamen HTML + CSS (inline) + Vanilla JavaScript kullanılarak geliştirilmiştir.

---

## 🚀 Özellikler

- Yeni görevler eklenmesi
- Tamamlandı olarak işaretlenmesi
- Silme işlemi
- Görev düzenleme
- Tamamlanan görevlerin listenin sonuna taşınması
- Tamamlanan görevlerin üstünün çizilmesi
- Kullanıcıların tamamlanan görevi tekrar bekleyen listeye döndürebilmesi

---

## 🧠 Proje Geliştirme Notlarım

Projeyi geliştirirken belirlediğim gereksinimler:

- Yeni Görevler Eklenmesi
- Tamamlandı olarak işaretlenmesi
- Silmesini sağlayacak
- Görev Düzenleme
- Tamamlanan görevler listenin sonuna taşınmalı
- Üstü çizili olacak
- Kullanıcılar bekleyen listeye geri döndürmek için görev işaretleri kaldırılabilir

---

## ⚙️ Fonksiyonlar

- Görev Ekleme    → `AddTask()`
- Görev Silme     → `DeleteTask()`
- Görev Tamamlama → `CompleteTask()`
- Görev Düzenleme → `EditTask()`

---

## 📦 Kullanılan Array Fonksiyonları

- Ekleme → `push()`
- Son ekleneni çıkarma → `pop()`
- İlk elemanı çıkarma → `shift()`
- Belirli index silme → `splice()`
- Index bulma → `indexOf()`
- Koşullu arama → `find()` / `findIndex()`

---

## 🔄 State ve Render Mantığı

Uygulama bir `tasks` dizisi üzerinden çalışır:

```javascript
let tasks = [];
```

Her görev şu yapıya sahiptir:

```javascript
{
  id: Number,
  text: String,
  completed: Boolean
}
```

Tüm UI güncellemeleri `RenderTask()` fonksiyonu üzerinden yapılır.

Her işlemden sonra:

```javascript
RenderTask();
```

Bu yaklaşım sayesinde:

- UI her zaman state ile senkron kalır
- DOM manuel olarak güncellenmez
- State bozulmaz
- Daha öngörülebilir bir yapı oluşur

Bu küçük ölçekte basit bir state management mantığıdır.

---

## 📂 Proje Yapısı

/project-folder  
│  
├── index.html  
├── script.js  
└── README.md  

---

## 📌 Nasıl Çalıştırılır?

1. Dosyaları aynı klasöre koyun
2. `index.html` dosyasını tarayıcıda açın
3. Kullanıma hazır 🚀

---

## 👨‍💻 Amaç

Bu proje:

- DOM manipulation pratiği yapmak
- State mantığını anlamak
- Render yaklaşımını öğrenmek
- Array metotlarını aktif kullanmak
- Framework öncesi temel JavaScript pratiği yapmak

amacıyla geliştirilmiştir.