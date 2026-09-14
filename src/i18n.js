export const translations = {
  id: {
    widgetTitle: 'Aksesibilitas Web',
    reset: 'Reset Pengaturan',
    close: 'Tutup',
    activeCount: '{count} aktif',
    readingGuideHint: 'Gerakkan kursor untuk memandu bacaan',
    features: {
      textSize: {
        title: 'Ukuran Teks',
        desc: 'Perbesar atau sesuaikan ukuran teks',
        levels: ['Normal', '+15%', '+30%', '+45%']
      },
      contrast: {
        title: 'Mode Kontras',
        desc: 'Pilihan tampilan kontras tinggi',
        modes: {
          normal: 'Normal',
          dark: 'Kontras Gelap',
          light: 'Kontras Terang',
          invert: 'Balikkan Warna',
          monochrome: 'Monokrom'
        }
      },
      dyslexiaFont: {
        title: 'Font Disleksia',
        desc: 'Ganti ke font ramah disleksia',
        active: 'Aktif',
        inactive: 'Nonaktif'
      },
      textSpacing: {
        title: 'Jarak Teks',
        desc: 'Atur jarak huruf dan tinggi baris',
        levels: ['Normal', 'Lebar', 'Sangat Lebar']
      },
      highlightLinks: {
        title: 'Sorot Tautan',
        desc: 'Garis bawah tebal & sorotan link',
        active: 'Aktif',
        inactive: 'Nonaktif'
      },
      cursor: {
        title: 'Kursor & Panduan',
        desc: 'Perbesar kursor atau garis baca',
        modes: {
          normal: 'Normal',
          big: 'Kursor Besar',
          readingGuide: 'Garis Baca'
        }
      },
      pauseAnimations: {
        title: 'Hentikan Animasi',
        desc: 'Hentikan kedipan dan gerakan CSS',
        active: 'Aktif',
        inactive: 'Nonaktif'
      }
    }
  },
  en: {
    widgetTitle: 'Web Accessibility',
    reset: 'Reset Settings',
    close: 'Close',
    activeCount: '{count} active',
    readingGuideHint: 'Move cursor to guide reading',
    features: {
      textSize: {
        title: 'Text Size',
        desc: 'Enlarge or adjust text scale',
        levels: ['Normal', '+15%', '+30%', '+45%']
      },
      contrast: {
        title: 'Contrast Mode',
        desc: 'High contrast display options',
        modes: {
          normal: 'Normal',
          dark: 'Dark Contrast',
          light: 'Light Contrast',
          invert: 'Invert Colors',
          monochrome: 'Monochrome'
        }
      },
      dyslexiaFont: {
        title: 'Dyslexia Font',
        desc: 'Switch to dyslexia-friendly font',
        active: 'Active',
        inactive: 'Inactive'
      },
      textSpacing: {
        title: 'Text Spacing',
        desc: 'Adjust letter and line spacing',
        levels: ['Normal', 'Wide', 'Extra Wide']
      },
      highlightLinks: {
        title: 'Highlight Links',
        desc: 'Underline and highlight all links',
        active: 'Active',
        inactive: 'Inactive'
      },
      cursor: {
        title: 'Cursor & Guide',
        desc: 'Enlarge cursor or reading guide line',
        modes: {
          normal: 'Normal',
          big: 'Big Cursor',
          readingGuide: 'Reading Guide'
        }
      },
      pauseAnimations: {
        title: 'Pause Animations',
        desc: 'Stop blinking and CSS transitions',
        active: 'Active',
        inactive: 'Inactive'
      }
    }
  }
};

export function detectLanguage(configuredLang) {
  if (configuredLang && translations[configuredLang]) {
    return configuredLang;
  }
  const htmlLang = document.documentElement.lang?.toLowerCase().slice(0, 2);
  if (htmlLang && translations[htmlLang]) {
    return htmlLang;
  }
  return 'id'; // default Bahasa Indonesia
}
