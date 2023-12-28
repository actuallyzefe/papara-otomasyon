# MultiLang Excel Generator

Bu araç, çoklu dil destekli web sayfalarının çeviri anahtarlarını otomatik oluşturan ve yönetmenize yardımcı olan bir Node.js tabanlı araçtır.

## Kullanım Alanları

Bu araç, aşağıdaki işlemler için kullanılabilir:

- Web sayfasında bulunan başlıkların çeviri anahtarlarını oluşturmak.
- Web sayfasında bulunan form etiketlerinin çeviri anahtarlarını oluşturmak.
- Web sayfasında bulunan tablo sütunlarının çeviri anahtarlarını oluşturmak.

## Kullanım

1. **Node.js Kurulumu:**

   - Node.js yüklü değilse [Node.js'i indirip yükleyin](https://nodejs.org/).

2. **Proje Başlatma:**

   - Konsol üzerinden proje dizininde `npm init -y` komutunu çalıştırın.
   - Ardından, gerekli paketleri yüklemek için `npm install` komutunu kullanın.

3. **.env Dosyası Oluşturma:**

   - Proje dizinine `.env` adında bir dosya oluşturun.
   - Oluşturulan dosyaya Google Cloud API anahtarınızı ekleyin.

4. **CSHTML Dosyası Ayarları:**

   - Çalıştığınız CSHTML dosyasını projedeki editörde yeni dosya olarak ekleyin.
   - Dosya adını "papara.cshtml" olarak kaydedin.
   -  16. satırda bulunan `pageName` değişkenine, CSHTML dosyanızdaki başlıkla uyumlu bir değer verin (örneğin: `ViewBag.Title = "Checkout 3DS Ödemeleri";`).

5. **Placeholder Keyleri Oluşturma:**

   - `script.js` dosyasında 113. satırda bulunan `loadFile("")` fonksiyonuna, CSHTML dosyanızdaki `@Html.TextBoxFor` olan div'in class'ını ekleyin.
   - Aynı işlemi, çeviri anahtarlarını düzenlemek için `edit.js` dosyasında 88. satırda bulunan `loadFile("")` fonksiyonu için de yapın.

6. **Çalıştırma:**

   - Konsola `node script.js` komutunu yazarak çeviri anahtarlarını oluşturun.
   - CSHTML dosyanızı düzenlemek için `node edit.js` komutunu kullanabilirsiniz.

7. **Çeviri Kontrolü:**
   - Oluşan "transformed.xlsx" dosyasını masaüstüne taşıyın.
   - Çevirileri kontrol edip, panele yükleyebilirsiniz.

## Bilgilendirme

- `modified_papara.cshtml` dosyanızda, form etiketleri, form yer tutucuları ve tablo sütunlarındaki `data-i18n` dönüşümü yapılmış olmalıdır.
- Script hala geliştirme aşamasında olduğundan oluşturulan çeviri anahtarlarını ve CSHTML dosyanızı kontrol edin.
- API kaynaklı çevirilerde sorun yaşanabilir. Oluşturulan `adminMultiLang.xlsx` dosyasını alıp Excel'de toplu değiştirme yaparak devam edebilirsiniz.

- CSHTML dosyanızda bulunan title etiketinizin h değerini lütfen kontrol edin ve script.js dosyasında 50.satırda bulunan loadFile("") içerisine o değeri koyun.
