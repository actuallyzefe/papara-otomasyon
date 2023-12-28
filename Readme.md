# MultiLang Excel Generator

## Neler için kullanılabilir?

👉 Sayfa içerisinde bulunan title(h3) ın keyini oluşturmak için

👉 Sayfa içerisinde bulunan form labellarının keyini oluşturmak için

👉 Sayfa içerisinde bulunan table columnlarının keyini oluşturmak için

## Kullanım

1 - NodeJS yüklü değilse öncesinde kurmanız gerekiyor.

2 - konsola npm init -y

3 - npm install

4 - .env dosyası oluşturup google cloud keyinizi girmelisiniz

5 - Çalıştığınız cshtml dosyasını bu kodun bulundugu editorde yeni dosya olarak ekleyin.

6 - Dosya adının papara.cshtml olduğundan emin olun.

7 - 16. satırda bulunan pageName değişkeninin değerini, cshtml dosyanızda bulunan title ile değiştirin (ViewBag.Title = "Checkout 3DS Ödemeleri";)

7a => Title'ı manuel olarak pageName değişkenine snake_case ve ingilizce olarak girmeniz daha verimli sonuç sağlayacaktır.

8 - Placeholder Keylerini oluşturmak için script.js dosyasında 113.satırda bulunan loadFile("") içerisine papara.cshtml dosyanızda @Html.TextBoxFor hangi divin içerisindeyse o divin classını koymalısınız. | cshtml dosyasında placeholderları modify etmek için ise edit.js dosyasında 88. satırda bulunan loadFile("") fonksiyonuna da aynı işlemi uygulamalısınız

9 - konsola node script.js yazdığımızda excele key oluşturma işlemi çalışacak

9a - cshtml dosyasını modify etmek için node edit.js komutunu kullanabilirsiniz.

10 - Oluşan "transformed.xlsx" dosyasını masaüstüne taşıyıp çevirileri kontrol edip panele yükleyebilirsiniz.

## Bilgilendirme

!! modified_papara.cshtml dosyanızda form-label | form-placeholder | table sütularında data-i18n dönüşümü yapılmış olmalı.

!! Script hala geliştirme aşamasında olduğundan oluşturulan keyleri ve cshtml dosyanızı lütfen kontrol edin.

!!! API KAYNAKLI ÇEVİRİLERDE SIKINTI YAŞANABİLİR! oluşturulan adminMultiLang.xlsx dosyasını alıp excelde toplu degıstırme yaparak devam edebılırsınız 3 tıkta hazır
