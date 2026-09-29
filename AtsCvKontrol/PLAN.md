# ATS CV Kontrol Sitesi — Uygulama Planı (v1)

## Bağlam
Kullanıcılar CV'lerini (PDF/DOCX) yükleyecek; sistem CV'yi bir ATS (Applicant Tracking System) gibi okuyup **ATS uyumlu mu değil mi**, **neyin düzeltilmesi gerektiği** ve **neyin zaten iyi olduğu (dokunulmaması gereken)** bilgisini verecek.

Kararlar:
- Analiz **hibrit**: deterministik kural motoru puan verir + Claude API yorum/öneri üretir.
- İş ilanı eşleştirme **v2'ye** bırakıldı (v1 sadece genel ATS kontrolü, ama mimari buna açık olacak).
- Hesap/geçmiş **yok**; CV'ler diske kaydedilmez, bellekte işlenip atılır (KVKK açısından güvenli).
- Konum: `HTML-CSS-JS/AtsCvKontrol/{frontend,backend}` — `IKYonetimSistemi` ile aynı stack (React 19 + Vite + Tailwind 4 / Express 5, ESM).

## Mimari
```
[React] Yükle (PDF/DOCX) ──POST /api/analyze (multipart)──▶ [Express]
                                                            1. multer (memoryStorage, 5MB, tip kontrolü)
                                                            2. parser: pdf → metin (pdf-parse), docx → metin (mammoth)
                                                            3. ruleEngine → { score, checks[] }
                                                            4. aiService (Claude) → { summary, fixes[], keep[] }
                                                            5. birleştir → JSON yanıt
[React] Sonuç sayfası ◀───────────────────────────────────┘
```
API anahtarı yalnızca backend `.env` içinde (`ANTHROPIC_API_KEY`) — frontend'e asla gitmez. AI çağrısı başarısız olursa kural motoru sonucu yine döner (graceful degradation).

## Backend — `AtsCvKontrol/backend`
IKYonetimSistemi/backend yapısı örnek alınır (`src/app.js`, `routes/`, `controllers/`, `config/swagger.js`, `utils/validation.js` desenleri).

```
src/
  app.js                      # express, cors, json, swagger, /api/analyze
  routes/analyze.routes.js
  controllers/analyzeController.js
  middleware/upload.js        # multer memoryStorage, limit 5MB, sadece pdf/docx
  middleware/errorHandler.js
  services/parser.service.js  # buffer → { text, meta: {pageCount, hasImagesOnly...} }
  services/ruleEngine/
    index.js                  # tüm kuralları çalıştırır, ağırlıklı puan hesaplar
    rules/*.js                # her kural ayrı dosya: { id, title, weight, run(text, meta) → {status, message, detail} }
  services/ai.service.js      # @anthropic-ai/sdk, tool-use ile yapılandırılmış JSON çıktı
  config/swagger.js
```
Bağımlılıklar: `express cors dotenv multer pdf-parse mammoth @anthropic-ai/sdk swagger-*`, dev: `nodemon`.

### Kural motoru (v1 kuralları)
Her kural `pass | warn | fail` döner; ağırlıklı toplamdan 0–100 puan. **≥75 Uygun, 50–74 Geliştirilmeli, <50 Uygun Değil.**

| Kategori | Kontrol |
|---|---|
| Okunabilirlik | Metin çıkarılabiliyor mu (taranmış görsel PDF → fail), karakter bozulması/tuhaf semboller |
| İletişim | E-posta, telefon, (opsiyonel) LinkedIn/GitHub var mı |
| Bölümler | Deneyim, Eğitim, Yetenekler, Özet başlıkları (TR + EN eş anlamlılar) |
| Format | Tablo/çok sütun izleri, header/footer'da kritik bilgi, aşırı özel karakter/ikon |
| Uzunluk | Sayfa sayısı (1–2 ideal), kelime sayısı aralığı |
| Tarihler | Deneyimlerde tutarlı tarih formatı (Ay Yıl – Ay Yıl / Günümüz) |
| İçerik | Madde işaretleri, aksiyon fiilleri, sayısal başarılar (%, rakam) oranı |
| Dosya | Tür (PDF/DOCX), dosya adı anlamlı mı |

Başlık/fiil listeleri `rules/keywords/tr.js` ve `en.js` içinde; CV dili basit sezgiyle tespit edilir.

### AI servisi
- Model: `claude-sonnet-5` (maliyet/kalite dengesi; `.env` ile değiştirilebilir).
- Girdi: CV metni + kural motoru sonuçları. Çıktı tool-use şemasıyla zorunlu JSON:
  `{ summary, fixes: [{section, problem, suggestion, example?, priority}], keep: [{section, reason}] }`
- Sistem prompt: Türkçe yanıt, puan uydurmama (puan kural motorundan gelir), CV'de olmayan bilgi uydurmama.
- Timeout + hata yakalama → AI yoksa `ai: null` döner.

### API
`POST /api/analyze` → 
```json
{ "score": 68, "verdict": "improve", "checks": [...], "ai": { "summary": "...", "fixes": [...], "keep": [...] }, "meta": { "pageCount": 2, "wordCount": 540, "language": "tr" } }
```
Hatalar: 400 (tür/boyut/boş metin), 422 (metin çıkarılamadı), 500. Swagger dokümantasyonu `/api-docs`.

## Frontend — `AtsCvKontrol/frontend`
IKYonetimSistemi/frontend'deki desenler yeniden kullanılır: `index.css` @theme token yapısı, `components/common/{Button,Input,IconButton}`, `api/` axios instance, `react-toastify`.

```
src/
  api/axios.js, api/analyzeApi.js
  pages/HomePage.jsx          # hero + yükleme alanı + "ATS nedir" kısa bilgi
  pages/ResultPage.jsx        # analiz sonucu (state ile taşınır, kalıcı değil)
  components/upload/Dropzone.jsx       # sürükle-bırak, tip/boyut kontrolü, yükleme ilerlemesi (UploadProgress-React projesinden fikir)
  components/result/ScoreGauge.jsx     # dairesel puan + verdict rozeti
  components/result/ChecklistPanel.jsx # kategori bazlı pass/warn/fail listesi
  components/result/FixList.jsx        # AI önerileri, öncelik sırasına göre, örnek yeniden yazım
  components/result/KeepList.jsx       # "Bunlara dokunma" — güçlü yönler
  components/common/...
  routes/AppRoutes.jsx
```
Akış: Dosya seç → "Analiz Et" → yükleniyor ekranı (AnimasyonluLoading örneği) → `/sonuc` sayfası. Sonuçta "Yeni CV yükle" butonu. Mobil uyumlu.

## Geliştirme Adımları
1. **İskelet**: klasörler, Vite+React+Tailwind, Express+nodemon, `.env.example`, README.
2. **Yükleme + parse**: multer + pdf-parse/mammoth; endpoint ham metni döndürsün, frontend Dropzone ile bağla.
3. **Kural motoru**: kurallar tek tek + puanlama; örnek CV'lerle ayarla.
4. **Sonuç ekranı**: ScoreGauge, ChecklistPanel (AI olmadan çalışır hâlde).
5. **AI entegrasyonu**: ai.service + FixList/KeepList; fallback davranışı.
6. **Cilalama**: hata mesajları, rate limit (`express-rate-limit`), Swagger, landing metinleri, KVKK notu ("CV'niz saklanmaz").
7. **v2 hazırlığı (not)**: `/api/analyze` isteğine opsiyonel `jobDescription` alanı eklenerek anahtar kelime eşleşmesi yapılacak; kural motoru `context` parametresi alacak şekilde tasarlanır.

## Doğrulama
- `backend/test-cvs/` altında 4–5 örnek CV (iyi PDF, çok sütunlu/tablolu, taranmış görsel PDF, DOCX, 3+ sayfa) ile manuel test; beklenen verdict'ler tutuyor mu.
- Kural motoru için `node --test` ile birim testleri (her kural için pass/fail örneği).
- Swagger'dan `/api/analyze` denenir; `ANTHROPIC_API_KEY` boşken AI'sız yanıt döndüğü doğrulanır.
- `npm run dev` ile iki uygulama çalıştırılıp tarayıcıda uçtan uca: yükle → sonuç → yeni CV; mobil genişlikte görünüm kontrolü.
