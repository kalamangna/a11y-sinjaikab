import { StateManager } from './state.js';
import { DomEffectsManager } from './dom-effects.js';
import { AccessibilityWidgetElement } from './widget-component.js';

(function () {
  if (typeof window === 'undefined') return;

  function initWidget() {
    // Check if script tag has custom configs
    const currentScript = document.currentScript || document.querySelector('script[src*="widget"]');
    const options = {
      position: currentScript?.getAttribute('data-position') || 'bottom-left',
      primaryColor: currentScript?.getAttribute('data-color') || '#0056b3',
      lang: currentScript?.getAttribute('data-lang') || null,
      logo: currentScript?.getAttribute('data-logo') || null,
      telemetry: currentScript?.getAttribute('data-telemetry') !== 'false',
      telemetryEndpoint: currentScript?.getAttribute('data-telemetry-endpoint') || null
    };

    const stateManager = new StateManager();
    const domEffects = new DomEffectsManager();

    // Check if element already exists or create new
    let widgetEl = document.querySelector('a11y-widget');
    if (!widgetEl) {
      widgetEl = document.createElement('a11y-widget');
      document.body.appendChild(widgetEl);
    }

    widgetEl.init(stateManager, domEffects, options);

    // Global API
    window.A11yWidget = {
      open: () => widgetEl.openModal(),
      close: () => widgetEl.closeModal(),
      reset: () => stateManager.reset(),
      getState: () => ({ ...stateManager.state }),
      set: (key, val) => stateManager.set(key, val)
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
