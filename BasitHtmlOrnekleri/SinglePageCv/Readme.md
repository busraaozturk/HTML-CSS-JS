# Single Page CV

Kaynak: [roadmap.sh - Single Page CV](https://roadmap.sh/projects/single-page-cv)

Bu proje, yalnızca HTML kullanarak tek sayfalık bir özgeçmiş (CV) oluşturmayı amaçlayan basit bir alıştırmadır. Amaç görsel tasarım değil; içeriği doğru anlamsal etiketlerle yapılandırmak, arama motorları ve sosyal medya için temel meta bilgilerini eklemek ve sayfayı ileride CSS ile kolayca biçimlendirilebilecek şekilde hazırlamaktır.

## Gereksinimler

- **Anlamsal HTML**: Özgeçmişi yapılandırmak için uygun HTML etiketleri kullanılmalı (`header`, `main`, `section`, `article`, `address`, `nav` vb.).
- **SEO Meta Etiketleri**: `head` içinde `description`, `author`, `keywords`, `canonical` gibi temel SEO etiketleri bulunmalı.
- **Open Graph (OG) Etiketleri**: Sayfa sosyal medyada paylaşıldığında düzgün bir önizleme kartı çıkması için `og:title`, `og:description`, `og:type`, `og:image`, `og:url` etiketleri eklenmeli.
- **Favicon**: Sayfa için bir favicon eklenmeli ve `head` içinden bağlanmalı.
- **Yapı**: Sayfa kolay anlaşılır bir yapıda olmalı ve gelecekte CSS ile biçimlendirilmeye hazır olmalı (inline stillerden kaçınmak, anlamlı `id`/`class` kullanmak).

## Gönderim Kontrol Listesi

- [x] Anlamsal olarak doğru HTML yapısı
- [x] Eğitim, beceriler ve kariyer geçmişi için bölümler içeren tek sayfalık düzen
- [x] Başlık (`head`) bölümünde SEO meta etiketleri
- [x] Daha iyi sosyal medya paylaşımı için OG etiketleri
- [x] Başlık bölümünde favicon bağlantısı

## Sayfa İçeriği

Sayfa şu bölümlerden oluşur:

1. **Header** — İsim, unvan ve iletişim bilgileri (`address` içinde konum, telefon, e-posta)
2. **Skills** — Teknik ve kişisel beceriler
3. **Education** — Eğitim geçmişi
4. **Experience** — İş deneyimleri (her kayıt bir `article`)
5. **Across the Internet** — LinkedIn, GitHub gibi profil bağlantıları (`nav`)

## Notlar

- `og:image`, `og:url` ve `canonical` içindeki adresler şu an placeholder'dır; sayfa gerçek bir adrese (örn. GitHub Pages) deploy edildiğinde güncellenmelidir.
- Proje sadece HTML odaklı olduğu için görsel tasarım minimum tutulmuştur; ileride ayrı bir CSS dosyasıyla geliştirilebilir.
