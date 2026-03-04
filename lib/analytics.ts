/**
 * Analytics utilities for tracking user interactions
 * Supports multiple analytics providers
 */

// Types for analytics events
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

/**
 * Tracks a custom event
 * Works with Google Analytics, Plausible, or other providers
 */
export function trackEvent(name: string, properties?: Record<string, any>) {
  // Only track in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics Event:', { name, properties })
    return
  }

  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', name, properties)
  }

  // Plausible Analytics
  if (typeof window !== 'undefined' && (window as any).plausible) {
    ;(window as any).plausible(name, { props: properties })
  }
}

/**
 * Tracks a page view
 */
export function trackPageView(url: string) {
  trackEvent('page_view', { page_location: url })
}

/**
 * Tracks a click event
 */
export function trackClick(label: string, category?: string) {
  trackEvent('click', { event_label: label, event_category: category })
}

/**
 * Tracks form submissions
 */
export function trackFormSubmit(formName: string, success = true) {
  trackEvent('form_submit', {
    form_name: formName,
    success,
  })
}

/**
 * Tracks file downloads
 */
export function trackDownload(fileName: string) {
  trackEvent('file_download', {
    file_name: fileName,
  })
}

/**
 * Tracks outbound links
 */
export function trackOutboundLink(url: string) {
  trackEvent('outbound_link', {
    link_url: url,
  })
}

/**
 * Get analytics script tags for injection
 * Returns HTML string for analytics scripts
 */
export function getAnalyticsScripts(measurementId?: string): string {
  if (!measurementId || process.env.NODE_ENV !== 'production') {
    return ''
  }

  return `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        page_path: window.location.pathname,
      });
    </script>
  `
}
