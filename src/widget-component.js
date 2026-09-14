import uiStyles from './ui-styles.css?inline';
import { ICONS } from './icons.js';
import { translations, detectLanguage } from './i18n.js';

export class AccessibilityWidgetElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
    this.stateManager = null;
    this.domEffects = null;
    this.currentLang = 'id';
    this.position = 'bottom-right';
    this.primaryColor = '#0056b3';
  }

  init(stateManager, domEffects, options = {}) {
    this.stateManager = stateManager;
    this.domEffects = domEffects;
    this.position = options.position || this.getAttribute('data-position') || 'bottom-right';
    this.primaryColor = options.primaryColor || this.getAttribute('data-color') || '#0056b3';
    this.currentLang = detectLanguage(options.lang || this.getAttribute('data-lang'));

    this.render();
    this.bindEvents();

    // Subscribe to state changes
    this.stateManager.subscribe((state) => {
      this.domEffects.applyState(state);
      this.updateUI(state);
    });
  }

  get t() {
    return translations[this.currentLang] || translations.id;
  }

  render() {
    const shadow = this.shadowRoot;
    shadow.innerHTML = `
      <style>
        :host {
          --a11y-primary: ${this.primaryColor};
        }
        ${uiStyles}
      </style>

      <!-- Floating Trigger Button -->
      <button 
        type="button" 
        class="a11y-trigger-btn pos-${this.position}" 
        id="trigger-btn"
        aria-label="${this.t.widgetTitle}"
        aria-haspopup="dialog"
        aria-expanded="false"
      >
        ${ICONS.logo}
        <span class="a11y-badge" id="badge" style="display: none;">0</span>
      </button>

      <!-- Backdrop Overlay -->
      <div class="a11y-backdrop" id="backdrop" aria-hidden="true"></div>

      <!-- Pop-up Modal Window -->
      <div 
        class="a11y-modal modal-pos-${this.position}" 
        id="modal" 
        role="dialog" 
        aria-modal="true" 
        aria-label="${this.t.widgetTitle}"
        aria-hidden="true"
      >
        <header class="a11y-header">
          <div class="a11y-title-group">
            <span class="a11y-header-icon">${ICONS.logo}</span>
            <h2 class="a11y-title" id="title-text">${this.t.widgetTitle}</h2>
          </div>
          <div class="a11y-header-actions">
            <button type="button" class="a11y-lang-btn" id="lang-btn" aria-label="Toggle language">
              ${this.currentLang.toUpperCase()}
            </button>
            <button type="button" class="a11y-close-btn" id="close-btn" aria-label="${this.t.close}">
              ${ICONS.close}
            </button>
          </div>
        </header>

        <div class="a11y-body" id="body-grid">
          <!-- Text Size -->
          <button type="button" class="a11y-card-btn" id="btn-text-size">
            <div class="a11y-card-icon">${ICONS.textSize}</div>
            <div class="a11y-card-title">${this.t.features.textSize.title}</div>
            <span class="a11y-card-status" id="status-text-size">Normal</span>
          </button>

          <!-- Contrast -->
          <button type="button" class="a11y-card-btn" id="btn-contrast">
            <div class="a11y-card-icon">${ICONS.contrast}</div>
            <div class="a11y-card-title">${this.t.features.contrast.title}</div>
            <span class="a11y-card-status" id="status-contrast">Normal</span>
          </button>

          <!-- Dyslexia Font -->
          <button type="button" class="a11y-card-btn" id="btn-dyslexia">
            <div class="a11y-card-icon">${ICONS.dyslexia}</div>
            <div class="a11y-card-title">${this.t.features.dyslexiaFont.title}</div>
            <span class="a11y-card-status" id="status-dyslexia">${this.t.features.dyslexiaFont.inactive}</span>
          </button>

          <!-- Text Spacing -->
          <button type="button" class="a11y-card-btn" id="btn-spacing">
            <div class="a11y-card-icon">${ICONS.spacing}</div>
            <div class="a11y-card-title">${this.t.features.textSpacing.title}</div>
            <span class="a11y-card-status" id="status-spacing">Normal</span>
          </button>

          <!-- Highlight Links -->
          <button type="button" class="a11y-card-btn" id="btn-links">
            <div class="a11y-card-icon">${ICONS.links}</div>
            <div class="a11y-card-title">${this.t.features.highlightLinks.title}</div>
            <span class="a11y-card-status" id="status-links">${this.t.features.highlightLinks.inactive}</span>
          </button>

          <!-- Cursor & Guide -->
          <button type="button" class="a11y-card-btn" id="btn-cursor">
            <div class="a11y-card-icon">${ICONS.cursor}</div>
            <div class="a11y-card-title">${this.t.features.cursor.title}</div>
            <span class="a11y-card-status" id="status-cursor">Normal</span>
          </button>

          <!-- Pause Animations -->
          <button type="button" class="a11y-card-btn" id="btn-pause">
            <div class="a11y-card-icon">${ICONS.pause}</div>
            <div class="a11y-card-title">${this.t.features.pauseAnimations.title}</div>
            <span class="a11y-card-status" id="status-pause">${this.t.features.pauseAnimations.inactive}</span>
          </button>
        </div>

        <footer class="a11y-footer">
          <button type="button" class="a11y-reset-btn" id="reset-btn">
            ${ICONS.reset}
            <span>${this.t.reset}</span>
          </button>
          <span class="a11y-credit">A11y Helper</span>
        </footer>
      </div>
    `;
  }

  bindEvents() {
    const shadow = this.shadowRoot;
    const triggerBtn = shadow.getElementById('trigger-btn');
    const closeBtn = shadow.getElementById('close-btn');
    const backdrop = shadow.getElementById('backdrop');
    const langBtn = shadow.getElementById('lang-btn');
    const resetBtn = shadow.getElementById('reset-btn');

    triggerBtn.addEventListener('click', () => this.toggleModal());
    closeBtn.addEventListener('click', () => this.closeModal());
    backdrop.addEventListener('click', () => this.closeModal());

    // Language Toggle
    langBtn.addEventListener('click', () => {
      this.currentLang = this.currentLang === 'id' ? 'en' : 'id';
      this.render();
      this.bindEvents();
      this.updateUI(this.stateManager.state);
      this.openModal();
    });

    // Reset All
    resetBtn.addEventListener('click', () => {
      this.stateManager.reset();
    });

    // Feature Toggles
    // 1. Text Size (0 -> 1 -> 2 -> 3 -> 0)
    shadow.getElementById('btn-text-size').addEventListener('click', () => {
      const next = (this.stateManager.get('textSize') + 1) % 4;
      this.stateManager.set('textSize', next);
    });

    // 2. Contrast
    const contrastModes = ['normal', 'dark', 'light', 'invert', 'monochrome'];
    shadow.getElementById('btn-contrast').addEventListener('click', () => {
      const current = this.stateManager.get('contrast');
      const nextIdx = (contrastModes.indexOf(current) + 1) % contrastModes.length;
      this.stateManager.set('contrast', contrastModes[nextIdx]);
    });

    // 3. Dyslexia Font
    shadow.getElementById('btn-dyslexia').addEventListener('click', () => {
      this.stateManager.set('dyslexiaFont', !this.stateManager.get('dyslexiaFont'));
    });

    // 4. Text Spacing (0 -> 1 -> 2 -> 0)
    shadow.getElementById('btn-spacing').addEventListener('click', () => {
      const next = (this.stateManager.get('textSpacing') + 1) % 3;
      this.stateManager.set('textSpacing', next);
    });

    // 5. Highlight Links
    shadow.getElementById('btn-links').addEventListener('click', () => {
      this.stateManager.set('highlightLinks', !this.stateManager.get('highlightLinks'));
    });

    // 6. Cursor (normal -> big -> readingGuide -> normal)
    const cursorModes = ['normal', 'big', 'readingGuide'];
    shadow.getElementById('btn-cursor').addEventListener('click', () => {
      const current = this.stateManager.get('cursor');
      const nextIdx = (cursorModes.indexOf(current) + 1) % cursorModes.length;
      this.stateManager.set('cursor', cursorModes[nextIdx]);
    });

    // 7. Pause Animations
    shadow.getElementById('btn-pause').addEventListener('click', () => {
      this.stateManager.set('pauseAnimations', !this.stateManager.get('pauseAnimations'));
    });

    // ESC to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeModal();
      }
    });
  }

  toggleModal() {
    if (this.isOpen) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }

  openModal() {
    this.isOpen = true;
    const shadow = this.shadowRoot;
    shadow.getElementById('modal').classList.add('open');
    shadow.getElementById('backdrop').classList.add('open');
    shadow.getElementById('trigger-btn').setAttribute('aria-expanded', 'true');
    shadow.getElementById('modal').setAttribute('aria-hidden', 'false');
    // Focus first actionable element inside modal
    setTimeout(() => {
      const firstBtn = shadow.getElementById('btn-text-size');
      firstBtn?.focus();
    }, 50);
  }

  closeModal() {
    this.isOpen = false;
    const shadow = this.shadowRoot;
    shadow.getElementById('modal').classList.remove('open');
    shadow.getElementById('backdrop').classList.remove('open');
    shadow.getElementById('trigger-btn').setAttribute('aria-expanded', 'false');
    shadow.getElementById('modal').setAttribute('aria-hidden', 'true');
    shadow.getElementById('trigger-btn').focus();
  }

  updateUI(state) {
    const shadow = this.shadowRoot;
    const t = this.t;

    // 1. Badge count
    const activeCount = this.stateManager.getActiveCount();
    const badge = shadow.getElementById('badge');
    if (badge) {
      badge.textContent = activeCount;
      badge.style.display = activeCount > 0 ? 'flex' : 'none';
    }

    // 2. Text size
    const btnTextSize = shadow.getElementById('btn-text-size');
    const statusTextSize = shadow.getElementById('status-text-size');
    if (btnTextSize && statusTextSize) {
      const active = state.textSize > 0;
      btnTextSize.classList.toggle('active', active);
      statusTextSize.textContent = t.features.textSize.levels[state.textSize] || 'Normal';
    }

    // 3. Contrast
    const btnContrast = shadow.getElementById('btn-contrast');
    const statusContrast = shadow.getElementById('status-contrast');
    if (btnContrast && statusContrast) {
      const active = state.contrast !== 'normal';
      btnContrast.classList.toggle('active', active);
      statusContrast.textContent = t.features.contrast.modes[state.contrast] || 'Normal';
    }

    // 4. Dyslexia Font
    const btnDyslexia = shadow.getElementById('btn-dyslexia');
    const statusDyslexia = shadow.getElementById('status-dyslexia');
    if (btnDyslexia && statusDyslexia) {
      btnDyslexia.classList.toggle('active', state.dyslexiaFont);
      statusDyslexia.textContent = state.dyslexiaFont ? t.features.dyslexiaFont.active : t.features.dyslexiaFont.inactive;
    }

    // 5. Text Spacing
    const btnSpacing = shadow.getElementById('btn-spacing');
    const statusSpacing = shadow.getElementById('status-spacing');
    if (btnSpacing && statusSpacing) {
      const active = state.textSpacing > 0;
      btnSpacing.classList.toggle('active', active);
      statusSpacing.textContent = t.features.textSpacing.levels[state.textSpacing] || 'Normal';
    }

    // 6. Highlight Links
    const btnLinks = shadow.getElementById('btn-links');
    const statusLinks = shadow.getElementById('status-links');
    if (btnLinks && statusLinks) {
      btnLinks.classList.toggle('active', state.highlightLinks);
      statusLinks.textContent = state.highlightLinks ? t.features.highlightLinks.active : t.features.highlightLinks.inactive;
    }

    // 7. Cursor
    const btnCursor = shadow.getElementById('btn-cursor');
    const statusCursor = shadow.getElementById('status-cursor');
    if (btnCursor && statusCursor) {
      const active = state.cursor !== 'normal';
      btnCursor.classList.toggle('active', active);
      statusCursor.textContent = t.features.cursor.modes[state.cursor] || 'Normal';
    }

    // 8. Pause Animations
    const btnPause = shadow.getElementById('btn-pause');
    const statusPause = shadow.getElementById('status-pause');
    if (btnPause && statusPause) {
      btnPause.classList.toggle('active', state.pauseAnimations);
      statusPause.textContent = state.pauseAnimations ? t.features.pauseAnimations.active : t.features.pauseAnimations.inactive;
    }
  }
}

if (!customElements.get('a11y-widget')) {
  customElements.define('a11y-widget', AccessibilityWidgetElement);
}
