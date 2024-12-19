# ChatRoom UI - SignalR ile Gerçek Zamanlı Chat Uygulaması

Bu proje, .NET Core backend ile geliştirilen ChatRoom API'yi kullanarak gerçek zamanlı bir chat uygulaması sunar. React kütüphanesi ile geliştirilmiş bu frontend uygulaması, kullanıcıların kayıt olmasını, giriş yapmasını, sohbet odalarına katılmasını ve mesajlaşmasını sağlar.

![chat-room](https://github.com/user-attachments/assets/47dccf49-c0c9-412d-ad4b-502468f3ef6a)



## Giriş

Bu frontend uygulaması, React ile yazılmıştır ve backend API ile bağlantı kurarak kullanıcıların oturum açmasını, sohbet odalarına katılmasını ve mesaj göndermesini sağlar. Kullanıcılar, JWT token ile kimlik doğrulaması yaparak API'ye erişir. SignalR kullanılarak gerçek zamanlı mesajlaşma sağlanır.

## Teknolojiler

-   **React:** Kullanıcı arayüzü oluşturmak için JavaScript kütüphanesi.
-   **React Router:** Sayfalar arasında geçiş yapmak için.
-   **Axios:** API istekleri yapmak için HTTP istemcisi.
-   **SignalR Client:** SignalR sunucusuna bağlanmak ve gerçek zamanlı iletişim kurmak için.
-   **Bootstrap:** Stil oluşturmak için yardımcı bir frontend framework.
-   **Font Awesome::** İkonlar için.

## Özellikler

-   **Kullanıcı Kayıt ve Girişi:** Kullanıcıların güvenli bir şekilde hesap oluşturmasını ve giriş yapmasını sağlar.
-   **JWT Token ile Kimlik Doğrulama:** Kullanıcının kimlik bilgilerini güvenli bir şekilde saklar ve yönetir.
-   **Gerçek Zamanlı Chat:** SignalR ile anlık mesajlaşma deneyimi sunar.
-   **Sohbet Odaları:** Kullanıcılar mevcut sohbet odalarına katılabilir ve yeni sohbet odaları oluşturabilir.
-   **Kullanıcıların Çevrimiçi Durumlarını Gösterme:** Kullanıcıların çevrimiçi olup olmadığını gösterir.
-   **Mesaj Geçmişini Görüntüleme:** Kullanıcıların geçmiş mesajları görebilmesini sağlar.
-   **Mesaj Okundu Bilgisi:** Mesajların okundu bilgisini gösterir.
-   **Mobil Uyumlu Tasarım:** Farklı ekran boyutlarına uyumlu duyarlı arayüz.
-   **Hızlı ve Verimli Arayüz:** React'in performansı sayesinde hızlı ve akıcı bir kullanıcı deneyimi.

## Kurulum

1.  **Depoyu Klonlayın:**
    ```bash
    git clone https://github.com/mevlutayilmaz/chat-room-ui.git
    ```

2.  **Gerekli Paketleri Yükleyin:**
    ```bash
    npm install
    ```

3.  **Uygulamayı Çalıştırın:**
    ```bash
    npm run dev
    ```

Uygulama çalıştırıldıktan sonra tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı kullanabilirsiniz.

## Kullanım

1.  **Kayıt Ol/Giriş Yap:**
    -   Uygulamayı ilk açtığınızda kayıt veya giriş sayfasına yönlendirilirsiniz.
    -   Kayıt için gerekli bilgileri girin ve hesap oluşturun.
    -   Mevcut bir hesabınız varsa, giriş yapın.
2.  **Sohbet Odaları:**
    -   Giriş yaptıktan sonra, mevcut sohbet odalarını görebilirsiniz.
    -   İstediğiniz sohbet odasına tıklayarak sohbete katılabilirsiniz.
3.  **Mesaj Gönderme:**
    -   Sohbet odasına girdikten sonra, alttaki mesaj kutusuna mesajınızı yazın ve gönderin.
    -   Mesajlar anında diğer katılımcılara iletilecektir.
4.  **Sohbet Odası Oluşturma:**
   - Yeni bir sohbet odası oluşturabilirsiniz.
5.  **Çevrimiçi Durum:**
    -   Sohbet odasındaki kullanıcıların çevrimiçi durumlarını ya da son görülme tarihlerini takip edebilirsiniz.

## Ekran Görüntüleri

<table style="border-spacing: 0; border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/28b82fa2-7356-46ec-9268-12f3c38d9509" width="400" />
      <p style="text-align: center;">Login</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/a41971ad-a552-42a3-8847-ebf302d9d6f1" width="400" />
      <p style="text-align: center;">Signup</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/75c99446-6a62-4523-8811-206d90b819ba" width="400" />
      <p style="text-align: center;">Mesaj Bildirimi</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/84a6d88b-82b2-4685-8c0f-e1f4f99b79c2" width="400" />
      <p style="text-align: center;">Grup Üyeleri</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/73f4c19b-4c80-47a1-8ec3-d8dcede7f61d" width="400" />
      <p style="text-align: center;">Kullanıcı Aktiflik Durumu</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/bef5fa67-c69a-4a88-8f86-cfc1319cf665" width="400" />
      <p style="text-align: center;">Kullanıcı Son Görülme Tarihi</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/7c365db5-dfae-408f-9628-2136b73cc34f" width="400" />
      <p style="text-align: center;">Direct Chat Oluşturma</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/87ae2fe7-8d35-44b8-8a58-e7b84299c6a6" width="400" />
      <p style="text-align: center;">Group Chat Oluşturma</p>
    </td>
  </tr>
</table>


