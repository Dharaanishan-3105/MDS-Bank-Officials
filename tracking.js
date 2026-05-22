// MDS Bank tracking helper (GTM/GA4 compatible)
// Standardizes event payloads and ensures dataLayer.push happens after DOM updates.

(function () {
  'use strict';

  function ensureDataLayer() {
    window.dataLayer = window.dataLayer || [];
  }

  function safeJson(value) {
    try { return JSON.stringify(value); } catch (e) { return ''; }
  }

  function buildBase(eventName, extra) {
    extra = extra || {};
    return {
      event: eventName,
      page_location: window.location && window.location.href ? window.location.href : '',
      page_title: document && document.title ? document.title : '',
      ...extra
    };
  }

  function track(eventName, payload) {
    try {
      ensureDataLayer();
      var eventData = buildBase(eventName, payload);
      window.dataLayer.push(eventData);
    } catch (e) {
      // no-op
    }
  }

  // Push after DOM updates (prevents stale UI->analytics mismatches)
  function trackAfterRender(eventName, payload) {
    setTimeout(function () {
      track(eventName, payload);
    }, 0);
  }

  window.MDSTracking = {
    track: track,
    trackAfterRender: trackAfterRender,
    safeJson: safeJson
  };
})();

