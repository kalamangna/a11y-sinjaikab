# Changelog

Semua perubahan penting pada proyek ini akan dicatat dalam berkas ini.

Format pencatatan ini berpedoman pada [Keep a Changelog](https://keepachangelog.com/id/1.0.0/),
dan proyek ini mematuhi [Semantic Versioning](https://semver.org/lang/id/).

## [Unreleased]

### Ditambahkan
- Panduan pemasangan cepat widget melalui jsDelivr CDN pada `README.md`.

### Diubah
- Menyederhanakan dokumentasi `README.md` agar lebih padat (*to the point*) dan fokus pada langkah penggunaan serta konfigurasi penting.

## [1.0.0] - 2026-09-14

### Ditambahkan
- Inisialisasi arsitektur widget aksesibilitas mandiri berbasis Web Component (`<a11y-widget>`).
- Enkapsulasi antarmuka tombol pemicu (*trigger*) dan modal dialog menggunakan Shadow DOM untuk mencegah benturan CSS host.
- Fitur penyesuaian ukuran teks bertingkat (Normal, +15%, +30%, +45%).
- 4 varian mode kontras tinggi: Dark Contrast, Light Contrast, Invert Colors, dan Monochrome.
- Mode font ramah disleksia (*OpenDyslexic*).
- Penyesuaian penjarakan teks (*letter-spacing* dan *line-height*).
- Fitur penyorotan tautan (*highlight links*) dengan warna dan garis bawah kontras.
- Pembesar kursor mouse dan fitur garis panduan horizontal membaca (*reading guide line*).
- Fitur penghentian animasi CSS dan transisi secara seketika (*pause motion*).
- Tombol reset untuk mengembalikan seluruh preferensi ke kondisi awal.
- Persistensi state preferensi pengguna di `localStorage` per-domain.
- Dukungan dwibahasa antarmuka (*i18n*) untuk Bahasa Indonesia (ID) dan Bahasa Inggris (EN).
- Konfigurasi tag `<script>` via atribut `data-position`, `data-lang`, dan `data-color`.
- Antarmuka terprogram global `window.A11yWidget`.
- Halaman demo interaktif `index.html` dan `dist/demo.html`.
- Berkas kompilasi produksi mandiri `dist/widget.min.js` (~7.4 KB gzipped).
- Dokumentasi `README.md` lengkap untuk repositori GitHub.
