// telemetry.js: Lightweight, privacy-friendly telemetry tracker (Zero-PII)

export class TelemetryManager {
  constructor(options = {}) {
    this.enabled = options.telemetry !== false && options.telemetry !== 'false';
    this.endpoint = options.telemetryEndpoint || 'https://sinjaikab.go.id/api/a11y/telemetry';
    this._debounceTimer = null;
  }

  send(data) {
    if (!this.enabled || typeof window === 'undefined' || !this.endpoint) return;

    // Filter out internal local testing or admin stats page
    const hostname = window.location.hostname;
    const pathname = window.location.pathname || '/';
    if (!hostname || pathname.includes('/admin/a11y-stats')) return;

    const payload = {
      domain: hostname,
      path: pathname,
      timestamp: Date.now(),
      ...data
    };

    const jsonStr = JSON.stringify(payload);

    try {
      if (typeof fetch !== 'undefined') {
        fetch(this.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: jsonStr,
          keepalive: true,
          mode: 'cors'
        }).catch(() => {});
        return;
      }

      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([jsonStr], { type: 'text/plain' });
        navigator.sendBeacon(this.endpoint, blob);
      }
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
    this.send({
      type: 'feature_toggle',
      feature: featureName,
      value: String(featureValue)
    });
  }

  trackReset() {
    this.send({ type: 'reset' });
  }
}
