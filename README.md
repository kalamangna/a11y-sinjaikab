# a11y-sinjaikab ♿

Widget aksesibilitas web mandiri (*standalone*) berbasis Web Component & Shadow DOM untuk portal Pemerintah Kabupaten Sinjai dan website publik. Ringan (~8.1 KB gzipped), kebal konflik CSS dengan website induk, dan tanpa dependensi eksternal (*Zero Dependencies*).

---

## 🚀 Cara Pasang

### 1. via CDN (Paling Praktis)
Tempelkan tag berikut tepat sebelum penutup `</body>`:

```html
<!-- Widget Aksesibilitas Sinjai -->
<script 
  src="https://cdn.jsdelivr.net/gh/kalamangna/a11y-sinjaikab@main/dist/widget.min.js" 
  data-position="bottom-left" 
  data-lang="id" 
  data-color="#0056b3" 
  defer>
</script>
```

### 2. Mandiri (Self-Hosted)
Unduh berkas `dist/widget.min.js`, lalu panggil dari direktori aset website Anda:

```html
<script src="/path/to/widget.min.js" defer></script>
```

---

## ⚙️ Konfigurasi Atribut

Semua opsi dapat dikonfigurasi langsung melalui atribut HTML pada tag `<script>`:

| Atribut | Pilihan Nilai | Default | Keterangan |
| :--- | :--- | :--- | :--- |
| `data-position` | `bottom-left`, `bottom-right`, `top-left`, `top-right` | `bottom-left` | Posisi tombol pemicu (*floating trigger button*) |
| `data-lang` | `id`, `en` | `id` | Bahasa antarmuka modal aksesibilitas |
| `data-color` | Kode HEX (misal: `#0056b3`) | `#0056b3` | Warna aksen utama tombol dan status aktif |
| `data-logo` | URL Gambar / Path | `https://sinjaikab.go.id/sinjai.webp` | URL lambang daerah Sinjai pada tautan footer |
| `data-telemetry` | `true`, `false` | `true` | Pengiriman data analitik pemakaian ke server (*Zero-PII*) |
| `data-telemetry-endpoint` | URL Endpoint | `https://sinjaikab.go.id/api/a11y/telemetry` | URL tujuan penerima telemetri kustom |

---

## ✨ Fitur Lengkap

- 🏛️ **Identitas Resmi Sinjai**: Menampilkan lambang daerah Kabupaten Sinjai dan tautan langsung ke portal resmi `sinjaikab.go.id`.
- ⌨️ **Aksesibilitas Keyboard Penuh**: Dilengkapi *focus trap* (navigasi Tab / Shift+Tab berputar di dalam modal), penutupan cepat dengan tombol `Escape`, serta atribut `inert` dan `visibility: hidden` saat modal tertutup (lulus audit WCAG & Lighthouse).
- 🔍 **Ukuran Teks**: Penyesuaian bertingkat (+15%, +30%, +45%).
- 🌓 **4 Mode Kontras Tinggi**: Gelap (*Dark*), Terang (*Light*), Balikkan (*Invert*), dan Monokrom (*Grayscale*).
- 📖 **Font Disleksia**: Mengganti tipografi ke *OpenDyslexic* yang ramah pembaca disleksia.
- 📏 **Spasi Teks**: Penyesuaian jarak spasi huruf (*letter-spacing*) dan tinggi baris (*line-height*).
- 🔗 **Sorot Tautan**: Penanda visual garis bawah tebal dan warna kontras untuk semua hyperlink.
- 🎯 **Panduan Baca**: Pembesar kursor mouse (*Big Cursor*) dan garis panduan baca horizontal (*Reading Guide*).
- ⏸️ **Hentikan Animasi**: Menghentikan pergerakan kedipan dan animasi CSS secara seketika.
- 🌐 **Dwibahasa (i18n)**: Mendukung Bahasa Indonesia (ID) dan Bahasa Inggris (EN) dengan pendeteksian otomatis dari atribut `lang` dokumen.
- 📊 **Statistik & Telemetri Ringan**: Pelacakan domain pengguna dan preferensi aksesibilitas non-blocking via `navigator.sendBeacon` yang ramah privasi (*Zero-PII*, tanpa IP/cookie).
- 💾 **Penyimpanan Preferensi**: Preferensi pengguna tersimpan otomatis di `localStorage` per domain.

---

## 💻 JavaScript Global API

Widget menyediakan objek global `window.A11yWidget` untuk kontrol terprogram:

```javascript
// Membuka modal pengaturan
window.A11yWidget.open();

// Menutup modal
window.A11yWidget.close();

// Mengembalikan seluruh pengaturan ke default
window.A11yWidget.reset();

// Membaca status preferensi yang sedang aktif
const state = window.A11yWidget.getState();

// Mengubah setelan secara programatik
window.A11yWidget.set('textSize', 2);
window.A11yWidget.set('contrast', 'dark');
```

---

## 🛠️ Pengembangan Lokal

```bash
# 1. Instalasi dependensi pengembangan
npm install

# 2. Jalankan server lokal demo interaktif
npm run dev

# 3. Kompilasi bundle produksi mandiri ke dist/
npm run build
```

---

## 📄 Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE).
