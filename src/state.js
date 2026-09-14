const STORAGE_KEY = 'a11y_widget_prefs_v1';

export const DEFAULT_STATE = {
  textSize: 0,        // 0: Normal, 1: +15%, 2: +30%, 3: +45%
  contrast: 'normal', // 'normal' | 'dark' | 'light' | 'invert' | 'monochrome'
  dyslexiaFont: false,// boolean
  textSpacing: 0,     // 0: Normal, 1: Wide, 2: Extra Wide
  highlightLinks: false, // boolean
  cursor: 'normal',   // 'normal' | 'big' | 'readingGuide'
  pauseAnimations: false // boolean
};

export class StateManager {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadState();
  }

  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.warn('[A11yWidget] Failed to read preferences from localStorage:', e);
    }
    return { ...DEFAULT_STATE };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('[A11yWidget] Failed to save preferences to localStorage:', e);
    }
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;
    this.saveState();
    this.notify();
  }

  update(patch) {
    this.state = { ...this.state, ...patch };
    this.saveState();
    this.notify();
  }

  reset() {
    this.state = { ...DEFAULT_STATE };
    this.saveState();
    this.notify();
  }

  getActiveCount() {
    let count = 0;
    if (this.state.textSize > 0) count++;
    if (this.state.contrast !== 'normal') count++;
    if (this.state.dyslexiaFont) count++;
    if (this.state.textSpacing > 0) count++;
    if (this.state.highlightLinks) count++;
    if (this.state.cursor !== 'normal') count++;
    if (this.state.pauseAnimations) count++;
    return count;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // trigger initial
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}
