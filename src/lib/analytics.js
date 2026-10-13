/**
 * Ziggers Conversion & Journey Analytics
 * Privacy-safe event tracking (No PII / personal data logged to analytics)
 */

export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, {
        ...params,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Analytics event dispatch error:', err);
    }
  }
}

export function trackHiringPageView(service, city, path) {
  trackEvent('hiring_page_view', {
    service: service || 'general',
    city: city || 'chennai',
    page_path: path || (typeof window !== 'undefined' ? window.location.pathname : ''),
    event_category: 'engagement',
  });
}

export function trackQuoteFormStart(service, city) {
  trackEvent('quote_form_start', {
    service: service || 'general',
    city: city || 'chennai',
    event_category: 'conversion_funnel',
  });
}

export function trackQuoteFormSubmit(service, city, headcount, referenceId) {
  trackEvent('quote_form_submit', {
    service: service || 'general',
    city: city || 'chennai',
    headcount: Number(headcount) || 1,
    reference_id: referenceId || 'N/A',
    event_category: 'conversion',
  });
}

export function trackCallClick(service, city, phone) {
  trackEvent('call_click', {
    service: service || 'general',
    city: city || 'chennai',
    target: phone || '+919499008993',
    event_category: 'conversion',
  });
}

export function trackWhatsAppClick(service, city) {
  trackEvent('whatsapp_click', {
    service: service || 'general',
    city: city || 'chennai',
    event_category: 'conversion',
  });
}

export function trackAppDownloadClick(source, role) {
  trackEvent('app_download_click', {
    source: source || 'landing_page',
    role: role || 'general',
    event_category: 'conversion',
  });
}

export function trackWorkerApplicationStart(role, city) {
  trackEvent('worker_application_start', {
    role: role || 'general',
    city: city || 'chennai',
    event_category: 'worker_funnel',
  });
}
