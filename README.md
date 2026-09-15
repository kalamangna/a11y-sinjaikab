# A11y Widget ♿

Widget aksesibilitas web mandiri (*standalone*) berbasis Web Component & Shadow DOM. Ringan (~7.4 KB gzipped), kebal konflik CSS, dan tanpa dependensi eksternal.

## 🚀 Cara Pasang

### 1. via CDN (Paling Praktis)
Tempelkan tag berikut tepat sebelum `</body>`:

```html
<script 
  src="https://cdn.jsdelivr.net/gh/kalamangna/a11y-sinjaikab@main/dist/widget.min.js" 
  data-position="bottom-right" 
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

| Atribut | Pilihan Nilai | Default | Keterangan |
| :--- | :--- | :--- | :--- |
| `data-position` | `bottom-left`, `bottom-right`, `top-right`, `top-left` | `bottom-left` | Posisi tombol pemicu |
| `data-lang` | `id`, `en` | `id` | Bahasa antarmuka modal |
| `data-color` | Kode HEX (misal: `#0056b3`) | `#0056b3` | Warna aksen utama tombol |

---

## ✨ Fitur

- 🔍 **Ukuran Teks**: Penyesuaian bertingkat (Normal, +15%, +30%, +45%).
- 🌓 **4 Mode Kontras**: Gelap (*Dark*), Terang (*Light*), Balikkan (*Invert*), Monokrom (*Grayscale*).
- 📖 **Font Disleksia**: Tipografi ramah pembaca disleksia (*OpenDyslexic*).
- 📏 **Spasi Teks**: Pengaturan spasi huruf dan jarak baris (*text spacing*).
- 🔗 **Sorot Tautan**: Penanda visual kontras untuk hyperlink.
- 🎯 **Panduan Baca**: Kursor besar & garis panduan baca horizontal (*reading guide*).
- ⏸️ **Hentikan Animasi**: Mematikan animasi dan transisi CSS.
- 🌐 **Dwibahasa**: Bahasa Indonesia (ID) & English (EN).
- 💾 **Penyimpanan State**: Preferensi otomatis tersimpan di `localStorage`.

---

## 🛠️ Pengembangan Lokal

```bash
npm install      # Instalasi dependensi
npm run dev      # Jalankan demo lokal (playground)
npm run build    # Kompilasi bundle produksi ke dist/widget.min.js
```

---

## 📄 Lisensi

[MIT](LICENSE)
