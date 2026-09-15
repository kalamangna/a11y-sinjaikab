// telemetry.js: Lightweight, privacy-friendly telemetry tracker (Zero-PII)

export class TelemetryManager {
  constructor(options = {}) {
    this.enabled = options.telemetry !== false && options.telemetry !== 'false';
    this.endpoint = options.telemetryEndpoint || 'https://sinjaikab.go.id/api/a11y/telemetry';
    this._debounceTimer = null;
  }

  send(data) {
    if (!this.enabled || typeof window === 'undefined' || !this.endpoint) return;

    // Filter out internal local testing unless desired
    const hostname = window.location.hostname;
    if (!hostname) return;

    const payload = {
      domain: hostname,
      path: window.location.pathname || '/',
      timestamp: Date.now(),
      ...data
    };

    const jsonStr = JSON.stringify(payload);

    try {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const queued = navigator.sendBeacon(this.endpoint, blob);
        if (queued) return;
      }

      fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonStr,
        keepalive: true,
        mode: 'cors'
      }).catch(() => {
        // Silently catch to never interrupt host website
      });
    } catch {
      // Silently catch any transmission errors
    }
  }

  trackPageView() {
    this.send({ type: 'impression' });
  }

  trackModalOpen() {
    this.send({ type: 'modal_open' });
  }

  trackFeature(featureName, featureValue) {
    clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(() => {
      this.send({
        type: 'feature_toggle',
        feature: featureName,
        value: String(featureValue)
      });
    }, 400);
  }

  trackReset() {
    this.send({ type: 'reset' });
  }
}
