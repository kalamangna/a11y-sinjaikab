# A11y Widget ♿

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/badge/bundle%20size-~7.4%20KB%20(gzip)-success.svg)]()
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0%20runtime-brightgreen.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Widget aksesibilitas web mandiri (*standalone* & *reusable*) modern, terinspirasi oleh UserWay. Dibuat dengan arsitektur **Web Component (Shadow DOM)** sehingga kebal dari benturan CSS situs induk (*zero CSS leak*), tanpa dependensi eksternal (*zero runtime dependencies*), dan dapat dipasang ke platform web apa pun (PHP/CMS, Laravel, Nuxt/Vue, React, WordPress, atau HTML statis) cukup dengan **satu baris tag `<script>`**.

---

## ✨ Fitur Utama

- 🔍 **Ukuran Teks Dinamis**: Pembesaran teks bertingkat (*Normal, +15%, +30%, +45%*).
- 🌓 **4 Mode Kontras Tinggi**:
  - **Kontras Gelap (*Dark Contrast*)**: Latar belakang hitam dengan teks kontras tinggi.
  - **Kontras Terang (*Light Contrast*)**: Teks hitam pekat di atas putih bersih.
  - **Balikkan Warna (*Invert Colors*)**: Inversi warna layar dengan perlindungan otomatis untuk gambar/video.
  - **Monokrom (*Grayscale*)**: Tampilan hitam-putih untuk pengguna dengan sensitivitas warna tertentu.
- 📖 **Font Ramah Disleksia**: Mengganti tipografi ke *OpenDyslexic* untuk mempermudah pengejaan kata.
- 📏 **Penjarakan Teks (*Text Spacing*)**: Mengatur *letter-spacing* dan *line-height* untuk kenyamanan membaca.
- 🔗 **Sorot Tautan (*Highlight Links*)**: Memberikan penanda latar dan garis bawah kontras pada semua tautan.
- 🎯 **Kursor & Garis Panduan (*Reading Guide*)**:
  - **Kursor Besar**: Kursor kontras tinggi berukuran besar.
  - **Garis Baca**: Garis panduan horizontal interaktif yang mengikuti posisi kursor mouse pembaca.
- ⏸️ **Hentikan Animasi (*Pause Motion*)**: Mematikan pergerakan transisi dan animasi CSS secara seketika.
- 💾 **Persistensi State Otomatis**: Preferensi pengguna tersimpan aman di `localStorage` per-domain.
- 🌐 **Dukungan Dwibahasa (i18n)**: Tersedia dalam **Bahasa Indonesia (ID)** dan **English (EN)** dengan tombol switch instan.
- 🛡️ **Shadow DOM Terenkapsulasi**: Tampilan tombol dan pop-up modal tidak akan merusak atau dirusak oleh stylesheet host (Bootstrap, Tailwind, Bulma, dsb.).
- ⚡ **Super Ringan**: Berkas bundle produksi tunggal `dist/widget.min.js` hanya berukuran **~7.4 KB (gzipped)**.

---

## 🚀 Panduan Pemasangan Cepat

Cukup sisipkan tag `<script>` berikut sebelum tag penutup `</body>` pada template atau berkas HTML Anda:

```html
<!-- Pasang widget aksesibilitas -->
<script 
  src="path/to/dist/widget.min.js" 
  data-position="bottom-right" 
  data-lang="id" 
  data-color="#0056b3" 
  defer>
</script>
```

---

## ⚙️ Opsi Konfigurasi Atribut

Anda dapat menyesuaikan perilaku dan tampilan widget melalui atribut data pada tag `<script>`:

| Atribut | Pilihan Nilai | Default | Penjelasan |
| :--- | :--- | :--- | :--- |
| `data-position` | `bottom-right`, `bottom-left`, `top-right`, `top-left` | `bottom-right` | Posisi mengambang tombol pemicu (*floating trigger button*) |
| `data-lang` | `id`, `en` | `id` | Bahasa awal antarmuka modal (Bahasa Indonesia atau English) |
| `data-color` | Kode warna HEX (misal: `#0056b3`, `#10b981`) | `#0056b3` | Warna aksen utama tombol dan badge |

---

## 💻 JavaScript API (Opsional)

Widget ini menyediakan objek antarmuka global `window.A11yWidget` yang dapat diakses secara terprogram dari skrip situs Anda:

```javascript
// Membuka modal pengaturan aksesibilitas
window.A11yWidget.open();

// Menutup modal
window.A11yWidget.close();

// Mengembalikan seluruh pengaturan ke default
window.A11yWidget.reset();

// Mendapatkan snapshot preferensi pengguna yang sedang aktif
const currentSettings = window.A11yWidget.getState();
console.log(currentSettings);

// Mengubah preferensi secara manual via kode
window.A11yWidget.set('textSize', 2);
window.A11yWidget.set('contrast', 'dark');
```

---

## 🛠️ Pengembangan Lokal & Build

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18+ direkomendasikan).

```bash
# 1. Masuk ke direktori repositori
cd a11y-widget

# 2. Instalasi dependensi pengembangan
npm install

# 3. Jalankan development server dan demo playground
npm run dev

# 4. Kompilasi bundle produksi mandiri (output: dist/widget.min.js)
npm run build
```

---

## 📂 Struktur Repositori

```text
a11y-widget/
├── dist/
│   ├── widget.min.js         # Berkas produksi mandiri (IIFE format, ~7.4 KB gzipped)
│   └── demo.html             # Contoh implementasi mandiri dengan file produksi
├── src/
│   ├── dom-effects.js        # Pengendali kelas aksesibilitas & injeksi efek global
│   ├── i18n.js               # Terjemahan dwibahasa (ID & EN)
│   ├── icons.js              # Kumpulan ikon SVG inlined mandiri
│   ├── main.js               # Entry point, auto-mount & inisialisasi API
│   ├── state.js              # State manager & sinkronisasi localStorage
│   ├── ui-styles.css         # CSS antarmuka terenkapsulasi di dalam Shadow DOM
│   └── widget-component.js   # Web Component kustom <a11y-widget>
├── index.html                # Playground interaktif pengujian fitur
├── package.json              # Metadata proyek & konfigurasi skrip npm
├── vite.config.js            # Konfigurasi bundler Vite
├── CHANGELOG.md              # Riwayat perubahan versi proyek
└── README.md                 # Dokumentasi proyek
```

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi [MIT](LICENSE). Silakan gunakan dan modifikasi secara bebas untuk kebutuhan situs web personal, komersial, maupun pemerintahan.
