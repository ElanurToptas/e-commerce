import React from "react";
import "./Contracts.scss";
import { ConstractsItem } from "./ConstractsItem/ConstractsItem";

export const Contracts = () => {
  return (
    <div className="contracts-container">
      <div className="contracts-title">
        <h3>Contracts</h3>
      </div>

      <ConstractsItem
        header={"Ön bilgilendirme Formu"}
        inHeader={"ÖN BİLGİLENDİRME FORMU"}
        inText={`1. TARAFLAR VE KONU
İşbu Ön Bilgilendirme Formu’nun konusu, Alıcı ve Satıcı arasındaki Sözleşme’ye ilişkin Kanun ve Yönetmelik hükümleri uyarınca bilgilendirilmesidir. Ayrıca Yönetmelik uyarınca yer verilmesi zorunlu olan hususlar Ön Bilgilendirme Formu’nda yer almaktadır.
ALICI, Ön Bilgilendirme Formu ve Sözleşme’ye ilişkin bilgileri üyeliğinin bağlı olduğu “Hesabım” sayfasından takip edebilecek olup değişen bilgilerini bu sayfa üstünden güncelleyebilecektir. Ön Bilgilendirme Formu ve Sözleşme’nin bir nüshası Alıcı’nın üyelik hesabında mevcuttur ve talep edilmesi halinde ayrıca elektronik posta ile de gönderilebilecektir.
2. TANIMLAR
Ön Bilgilendirme Formu ve Sözleşme’nin uygulanmasında ve yorumlanmasında aşağıda yazılı terimler karşılarındaki yazılı açıklamaları ifade edeceklerdir.
ALICI	:	Bir Mal veya Hizmet’i ticari veya mesleki olmayan amaçlarla edinen, kullanan veya yararlanan gerçek kişiyi,
Bakanlık	:	Türkiye Cumhuriyeti Ticaret Bakanlığı’nı,
Banka	:	5411 sayılı Bankacılık Kanunu uyarınca kurulan lisanslı kuruluşları,
DSM veya Elektronik Ticaret Aracı Hizmet Sağlayıcı	:	Oluşturduğu sistem ile Satıcı’nın Ürün/Hizmet’i satışa sunduğu Platform’u işleten ve Satıcı adına mesafeli sözleşme kurulmasına aracılık eden DSM Grup Danışmanlık İletişim ve Satış Ticaret Anonim Şirketi’ni,
Hizmet	:	Bir ücret veya menfaat karşılığında yapılan ya da yapılması taahhüt edilen Ürün sağlama dışındaki her türlü tüketici işleminin konusunu,
Kanun	:	6502 sayılı Tüketicinin Korunması Hakkında Kanun’u,
Kargo Şirketi	:	Ürün’ün Alıcı’ya ulaştırılmasını, iade süreçlerinde Alıcı’dan alınarak Satıcı veya DSM’ye ulaştırılmasını sağlayan anlaşmalı kargo veya lojistik şirketini,
Ön Bilgilendirme Formu	:	Sözleşme kurulmadan ya da buna karşılık herhangi bir teklif Alıcı tarafından kabul edilmeden önce Alıcı’yı Yönetmelik’te belirtilen asgari hususlar konusunda bilgilendirmek için hazırlanan formu,
Platform	:	DSM’ye ait www.trendyol.com adlı internet sitesini ve mobil uygulamasını,
Satıcı	:	Kamu tüzel kişileri de dahil olmak üzere ticari veya mesleki amaçlarla tüketiciye Ürün/Hizmet sunan ya da Ürün/Hizmet sunanın adına ya da hesabına hareket eden ve aşağıda bilgileri bulunan gerçek ve/veya tüzel kişiyi,
Sözleşme	:	Satıcı ve Alıcı arasında akdedilen Sözleşme’yi,
Trendyol Teslimat Noktası	:	Alıcı’nın satın aldığı Ürünler’i kolayca teslim alabildiği anlaşmalı esnaf noktalarını, kargo şubelerini ve zincir mağazalarını,
Ürün	:	Alışverişe konu olan taşınır eşya, konut veya tatil amaçlı taşınmaz mallar ile elektronik ortamda kullanılmak üzere hazırlanan yazılım, ses, görüntü ve benzeri her türlü gayri maddi malı,
Yönetmelik	:	Mesafeli Sözleşmeler Yönetmeliği’ni ifade eder.
3. ALICI, SATICI VE ELEKTRONİK TİCARET ARACI HİZMET SAĞLAYICI
ALICI BİLGİLERİ
Teslim Edilecek Kişi	:	Elanur Toptaş
Teslimat Adresi	:	Gülbahar hatun kız öğrenci yurdu. Bostancı aile mezarlığı karşısı /Trabzon
Telefon	:	536*****28
Faks	:	536*****28
E-posta/Kullanıcı Adı	:	elanur.toptass@gmail.com`}
      />
      <ConstractsItem
        header={"Mesafeli Satış Sözleşmesi"}
        inHeader={"MESAFELİ SATIŞ SÖZLEŞMESİ"}
        inText={`1. TARAFLAR
İşbu Mesafeli Satış Sözleşmesi ("Sözleşme"), Alıcı ve Satıcı arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde elektronik ortamda kurulmuştur. Alıcı ve Satıcı, Sözleşme kapsamında birlikte “Taraflar”, ayrı ayrı “Taraf” olarak anılacaktır.
2. TANIMLAR
Sözleşme’nin uygulanmasında ve yorumlanmasında aşağıda yazılı terimler karşılarındaki yazılı açıklamaları ifade edeceklerdir.
ALICI	:	Bir Mal veya Hizmet’i ticari veya mesleki olmayan amaçlarla edinen, kullanan veya yararlanan gerçek kişiyi,
Bakanlık	:	Türkiye Cumhuriyeti Ticaret Bakanlığı’nı,
Banka	:	5411 sayılı Bankacılık Kanunu uyarınca kurulan lisanslı kuruluşları,
DSM veya Elektronik Ticaret Aracı Hizmet Sağlayıcı	:	Oluşturduğu sistem ile Satıcı’nın Ürün/Hizmet’i satışa sunduğu Platform’u işleten ve Satıcı adına mesafeli sözleşme kurulmasına aracılık eden DSM Grup Danışmanlık İletişim ve Satış Ticaret Anonim Şirketi’ni,
Hizmet	:	Bir ücret veya menfaat karşılığında yapılan ya da yapılması taahhüt edilen Ürün sağlama dışındaki her türlü tüketici işleminin konusunu,
Kanun	:	6502 sayılı Tüketicinin Korunması Hakkında Kanun’u,
Kargo Şirketi	:	Ürün’ün Alıcı’ya ulaştırılmasını, iade süreçlerinde Alıcı’dan alınarak Satıcı veya DSM’ye ulaştırılmasını sağlayan anlaşmalı kargo veya lojistik şirketini,
Ön Bilgilendirme Formu	:	Sözleşme kurulmadan ya da buna karşılık herhangi bir teklif Alıcı tarafından kabul edilmeden önce Alıcı’yı Yönetmelik’te belirtilen asgari hususlar konusunda bilgilendirmek için hazırlanan formu,
Platform	:	DSM’ye ait www.trendyol.com adlı internet sitesini ve mobil uygulamasını,
Satıcı	:	Kamu tüzel kişileri de dahil olmak üzere ticari veya mesleki amaçlarla tüketiciye Ürün/Hizmet sunan ya da Ürün/Hizmet sunanın adına ya da hesabına hareket eden ve Sözleşme’nin 5. maddesinde bilgileri bulunan gerçek ve/veya tüzel kişiyi,
Sözleşme	:	Satıcı ve Alıcı arasında akdedilen Sözleşme’yi,
Trendyol Teslimat Noktası	:	Alıcı’nın satın aldığı Ürünler’i kolayca teslim alabildiği anlaşmalı esnaf noktalarını, kargo şubelerini ve zincir mağazalarını,
Ürün	:	Alışverişe konu olan taşınır eşya, konut veya tatil amaçlı taşınmaz mallar ile elektronik ortamda kullanılmak üzere hazırlanan yazılım, ses, görüntü ve benzeri her türlü gayri maddi malı,
Yönetmelik	:	Mesafeli Sözleşmeler Yönetmeliği’ni ifade eder.
3. SÖZLEŞMENİN KONUSU ve KAPSAMI
3.1. Sözleşme’nin konusu Alıcı'nın, Platform’da, Ürün/Hizmet’in satın alınmasına yönelik elektronik olarak sipariş verdiği, Sözleşme’de belirtilen niteliklere sahip Ürün/Hizmet’in satışı ve teslimi ile ilgili olarak Kanun ve Yönetmelik hükümleri gereğince Taraflar’ın hak ve yükümlülüklerinin belirlenmesi olup Taraflar, Sözleşme tahtında Kanun ve Yönetmelik’ten kaynaklanan yükümlülük ve sorumluluklarını bildiklerini ve anladıklarını kabul, beyan ve taahhüt ederler.
3.2. Sözleşme’nin akdedilmesi Taraflar’ın ayrı ayrı DSM ile akdetmiş oldukları sözleşmelerin hükümlerinin ifasını engellemeyecek olup, Taraflar, DSM’nin Ürün/Hizmet’in satışına ve Sözleşme’ye herhangi bir şekilde taraf olmadığını ve Sözleşme kapsamında Taraflar’ın yükümlülüklerini yerine getirmeleri ile ilgili Kanun ve Yönetmelik çerçevesinde kendisine yüklenmiş olanlar hariç olmak üzere herhangi bir sorumluluğu ve taahhüdü bulunmadığını kabul, beyan ve taahhüt ederler.
3.3. Mevzuat uyarınca aşağıdaki Ürün/Hizmet satışları Sözleşme’nin kapsamında değildir.
a) Finansal hizmetler,
b) Otomatik makineler aracılığıyla yapılan satışlar,
c) Halka açık telefon vasıtasıyla telekomünikasyon operatörleriyle bu telefonun kullanımı,`}
      />

      <ConstractsItem
        header={"Cayma Hakkı"}
        inHeader={""}
        inText={`Cayma Hakkı Nedir? Nasıl Kullanılır?
7/11/2013 tarihli ve 6502 sayılı Tüketicinin Korunması Hakkında Kanunun 48 inci ve 84 üncü maddelerine dayanılarak hazırlanmış olan Mesafeli Sözleşmeler Yönetmeliği'nin ("Yönetmelik") 9. maddesi uyarınca:
Alıcı, on dört gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir.
Cayma Hakkının İstisnaları*
Bununla birlikte aynı Yönetmeliğin 15. maddesi ile cayma hakkının kullanılamayacağı istisnai durumlar belirtilmiştir. Bu istisnai durumlar çerçevesinde Alıcı, Sözleşme’ye konu Ürün bakımından Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesinde cayma hakkının kullanılabileceği ürünlerin istisnaları yer almaktadır.
Cayma Hakkı Kullanılabilen Ürünleri Nasıl İade Ederim?
1. "Hesabım" > “Siparişlerim'' > “Sipariş detay” adımlarını takip edin.
2. İade Kargo Kodu Oluştur butonuna tıklayın.
3. İade edilecek ürün ve iade nedeni seçin. Aynı üründen birden fazla satın aldıysanız iade edilecek ürün adedini de seçmeniz gerekir.
4. İade etmek istediğiniz ürünlerin uygunluğuna göre size önerilen iade yöntemlerinden birini seçin.
5. Birden fazla kargo seçeneği çıktığı durumda kargo seçiminizi yapın.
6. Ekranda çıkan iade kargo kodunu not alın. İade kargo kodunuza siparişlerim sayfasından da ulaşabilirsiniz.
7. İade kodu aynı olan ürünleri faturasıyla beraber aynı pakete koyun ve paketin sağlam olduğundan emin olun.
8. İade kodu farklı olan ürünler aynı kargoya verilse bile farklı paketler halinde verilmelidir.
9. Seçtiğiniz iade yöntemine göre 7 gün içinde paketinizi seçeceğiniz gel al noktası veya kargo şubesine teslim edin veya randevu gününde adresinize gelecek görevliye teslim edin.
10. 7 günü geçirdiğiniz durumda yeniden iade kargo kodu almanız gerekir
İade Koşulları:
1- Ürünün paketi hasar görmemiş ve kullanılmamış olması gerekmektedir.
2- Ürünün tüm aksesuarları ve orijinal kutusu ile beraber iade edilmesi gerekmektedir.
3- Aşağıdaki ürün gruplarının ambalajı açılmamış, denenmemiş, bozulmamış ve kullanılmamış olmaları halinde iadesi kabul edilir.
• Sağlık ve hijyen açısından uygun olmayan ürünlerin (Kozmetik ve kişisel bakım ürünleri,parfüm, epilatör, tıraş makinesi, kulaklık, iç giyim ürünleri, mayo, bikini vb.)`}
      />
    </div>
  );
};
