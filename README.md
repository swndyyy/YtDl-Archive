## 🛠️ YtDl-Archive
![YtDL](https://files.catbox.moe/ov32ud.jpg)

- *Effortlessly download and manage YouTube videos with YtDl-Archive.*

---

## 📜 Description
**YtDl-Archive** adalah alat yang memungkinkan Anda untuk mengunduh video YouTube dan mengarsipkannya dengan mudah. Dengan antarmuka yang sederhana, alat ini cocok untuk pengguna yang ingin mengelola koleksi video mereka, dengan dukungan berbagai format, metadata, dan kemudahan sinkronisasi dengan arsip lokal.

Fitur utama meliputi:
- **Automasi unduhan** dengan pengelolaan arsip.
- Dukungan berbagai format file (MP4, MP3, dll.).
- Ekstraksi metadata lengkap (judul, deskripsi, thumbnail, dll.).
- Kompatibilitas dengan pustaka pihak ketiga seperti `yt-dlp`.

---

## ⚙️ How to Use
### **1. Installasi**
Untuk menggunakan **YtDl-Archive**, pastikan Anda memiliki **Node.js** dan **npm** terinstal di komputer Anda.

Clone repository dan instal dependensi:
```bash
git clone https://github.com/TanakaDomp/YtDl-Archive.git
cd YtDl-Archive
npm install
```

*2. Menjalankan Alat*
Gunakan perintah berikut untuk mengunduh video:
```bash
 curl "https://ytdl.archive-ui.biz.id/video?url=hhttps://www.youtube.com/watch?v=example"
```

*3. Argument dan Opsi*
- *`--format`* : Tentukan format file yang diunduh (contoh: `mp4`, `mp3`).  
  Contoh:
  ```bash
  curl "https://ytdl.archive-ui.biz.id/video?urlhhttps://www.youtube.com/watch?v=example"
  ```
- *`video`* : Mendapatkan hasil dalam bentuk video.
- *`audio`* : Mendapatkan hasil dalam bentuk audio.  

---

*📝 Documentation*
Untuk dokumentasi lengkap, kunjungi:
- Website: [YtDL Main](https://ytdl.archive-ui.biz.id)
- API Reference: [Archive Api's](https://archive-ui.biz.id)

---

*👨‍💻 Author*
YtDl-Archive dibuat dan dipelihara oleh:
- *Nama:* SennNevertheless 
- *GitHub:* [@SennaNetwork](https://github.com/swndyy)  
- *Email:* sennanetwork@gmail.com  

---

*📂 Folder Structure*
```
YtDl-Archive/
├── index.js          # File utama untuk menjalankan aplikasi
├── cookie.json         # cookie from yotube.com to retrieve data
├── app.txt           # Dokumentasi Penggunaan
├── README.md       # Dokumentasi
├── package.json    # Dependensi aplikasi
```

---

*🛠 Dependencies*
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Core library untuk mengunduh video.
- [axios](https://www.npmjs.com/package/axios) - Untuk melakukan request HTTP.
- [chalk](https://www.npmjs.com/package/chalk) - Untuk output terminal berwarna.
- [form-data](https://www.npmjs.com/package/form-data) - Untuk pengelolaan form upload.

---

*❤️ Support*
Jika Anda menemukan bug atau memiliki ide fitur baru, silakan buat issue di [GitHub Issues](https://github.com/swndyy/YtDl-Archive/issues). Kami menghargai kontribusi Anda!

---
