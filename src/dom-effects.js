// dom-effects.js: Injects global accessibility styles and manages DOM modifications

const GLOBAL_STYLE_ID = 'a11y-widget-global-styles';
const READING_GUIDE_ID = 'a11y-widget-reading-guide';

const BIG_CURSOR_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <path d="M4,4 L18,44 L25,27 L42,20 Z" fill="#000000" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
</svg>
`.trim());

const GLOBAL_CSS = `
/* OpenDyslexic Font */
@font-face {
  font-family: 'OpenDyslexic';
  src: url('https://cdn.jsdelivr.net/npm/opendyslexic@2.1.0-beta1/fonts/OpenDyslexic-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* 1. Text Resizing */
html.a11y-text-1 { font-size: 115% !important; }
html.a11y-text-2 { font-size: 130% !important; }
html.a11y-text-3 { font-size: 145% !important; }

/* 2. Dyslexia Font */
html.a11y-dyslexia,
html.a11y-dyslexia body,
html.a11y-dyslexia h1, html.a11y-dyslexia h2, html.a11y-dyslexia h3,
html.a11y-dyslexia h4, html.a11y-dyslexia h5, html.a11y-dyslexia h6,
html.a11y-dyslexia p, html.a11y-dyslexia span, html.a11y-dyslexia a,
html.a11y-dyslexia li, html.a11y-dyslexia input, html.a11y-dyslexia button {
  font-family: 'OpenDyslexic', 'Comic Sans MS', sans-serif !important;
}

/* 3. Text Spacing */
html.a11y-spacing-1 *:not(a11y-widget):not(a11y-widget *) {
  letter-spacing: 0.12em !important;
  word-spacing: 0.16em !important;
  line-height: 1.8 !important;
}
html.a11y-spacing-2 *:not(a11y-widget):not(a11y-widget *) {
  letter-spacing: 0.2em !important;
  word-spacing: 0.25em !important;
  line-height: 2.1 !important;
}

/* 4. Contrast Modes */
/* Invert */
html.a11y-contrast-invert {
  filter: invert(100%) hue-rotate(180deg) !important;
  background-color: #000000 !important;
}
html.a11y-contrast-invert img,
html.a11y-contrast-invert video,
html.a11y-contrast-invert canvas {
  filter: invert(100%) hue-rotate(180deg) !important;
}

/* Monochrome */
html.a11y-contrast-monochrome {
  filter: grayscale(100%) !important;
}

/* Dark Contrast */
html.a11y-contrast-dark {
  background-color: #121212 !important;
  color: #ffff00 !important;
}
html.a11y-contrast-dark body {
  background-color: #121212 !important;
  color: #ffff00 !important;
}
html.a11y-contrast-dark *:not(a11y-widget):not(a11y-widget *):not(img):not(video):not(svg):not(svg *) {
  background-color: #121212 !important;
  color: #ffffff !important;
  border-color: #555555 !important;
  box-shadow: none !important;
}
html.a11y-contrast-dark a:not(a11y-widget *),
html.a11y-contrast-dark a:not(a11y-widget *) * {
  color: #ffff00 !important;
}
html.a11y-contrast-dark svg:not(a11y-widget *) {
  color: #ffff00 !important;
  fill: currentColor !important;
}
html.a11y-contrast-dark svg:not(a11y-widget *) * {
  fill: currentColor !important;
  background-color: transparent !important;
}

/* Light Contrast */
html.a11y-contrast-light {
  background-color: #ffffff !important;
  color: #000000 !important;
}
html.a11y-contrast-light body {
  background-color: #ffffff !important;
  color: #000000 !important;
}
html.a11y-contrast-light *:not(a11y-widget):not(a11y-widget *):not(img):not(video):not(svg):not(svg *) {
  background-color: #ffffff !important;
  color: #000000 !important;
  border-color: #000000 !important;
}
html.a11y-contrast-light a:not(a11y-widget *),
html.a11y-contrast-light a:not(a11y-widget *) * {
  color: #0000ee !important;
  font-weight: bold !important;
}
html.a11y-contrast-light svg:not(a11y-widget *) {
  color: #000000 !important;
  fill: currentColor !important;
}
html.a11y-contrast-light svg:not(a11y-widget *) * {
  fill: currentColor !important;
  background-color: transparent !important;
}

/* 5. Highlight Links */
html.a11y-highlight-links a:not(a11y-widget *) {
  background-color: #ffeb3b !important;
  color: #000000 !important;
  text-decoration: underline !important;
  text-decoration-thickness: 3px !important;
  text-underline-offset: 3px !important;
  padding: 1px 4px !important;
  border-radius: 2px !important;
}

/* 6. Pause Animations */
html.a11y-pause-animations *,
html.a11y-pause-animations *::before,
html.a11y-pause-animations *::after {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
  scroll-behavior: auto !important;
}

/* 7. Cursor Enlargement */
html.a11y-cursor-big,
html.a11y-cursor-big * {
  cursor: url("data:image/svg+xml,${BIG_CURSOR_SVG}") 4 4, auto !important;
}
`;

export class DomEffectsManager {
  constructor() {
    this.readingGuideEl = null;
    this.boundMouseMove = this.onMouseMove.bind(this);
    this.injectGlobalStyles();
  }

  injectGlobalStyles() {
    if (document.getElementById(GLOBAL_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = GLOBAL_STYLE_ID;
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }

  applyState(state) {
    const root = document.documentElement;

    // 1. Text Size
    root.classList.remove('a11y-text-1', 'a11y-text-2', 'a11y-text-3');
    if (state.textSize > 0) {
      root.classList.add(`a11y-text-${state.textSize}`);
    }

    // 2. Contrast
    root.classList.remove(
      'a11y-contrast-dark',
      'a11y-contrast-light',
      'a11y-contrast-invert',
      'a11y-contrast-monochrome'
    );
    if (state.contrast !== 'normal') {
      root.classList.add(`a11y-contrast-${state.contrast}`);
    }

    // 3. Dyslexia Font
    if (state.dyslexiaFont) {
      root.classList.add('a11y-dyslexia');
    } else {
      root.classList.remove('a11y-dyslexia');
    }

    // 4. Text Spacing
    root.classList.remove('a11y-spacing-1', 'a11y-spacing-2');
    if (state.textSpacing > 0) {
      root.classList.add(`a11y-spacing-${state.textSpacing}`);
    }

    // 5. Highlight Links
    if (state.highlightLinks) {
      root.classList.add('a11y-highlight-links');
    } else {
      root.classList.remove('a11y-highlight-links');
    }

    // 6. Pause Animations
    if (state.pauseAnimations) {
      root.classList.add('a11y-pause-animations');
    } else {
      root.classList.remove('a11y-pause-animations');
    }

    // 7. Cursor
    root.classList.remove('a11y-cursor-big');
    if (state.cursor === 'big') {
      root.classList.add('a11y-cursor-big');
      this.destroyReadingGuide();
    } else if (state.cursor === 'readingGuide') {
      this.initReadingGuide();
    } else {
      this.destroyReadingGuide();
    }
  }

  initReadingGuide() {
    if (!this.readingGuideEl) {
      const guide = document.createElement('div');
      guide.id = READING_GUIDE_ID;
      guide.style.cssText = `
        position: fixed;
        left: 0;
        right: 0;
        height: 12px;
        background: rgba(255, 235, 59, 0.45);
        border-top: 2px solid #fbc02d;
        border-bottom: 2px solid #fbc02d;
        pointer-events: none;
        z-index: 999998;
        transform: translateY(-50%);
        transition: top 0.05s linear;
        display: block;
      `;
      document.body.appendChild(guide);
      this.readingGuideEl = guide;
      window.addEventListener('mousemove', this.boundMouseMove, { passive: true });
    }
  }

  destroyReadingGuide() {
    if (this.readingGuideEl) {
      window.removeEventListener('mousemove', this.boundMouseMove);
      this.readingGuideEl.remove();
      this.readingGuideEl = null;
    }
  }

  onMouseMove(e) {
    if (this.readingGuideEl) {
      this.readingGuideEl.style.top = `${e.clientY}px`;
    }
  }
}
