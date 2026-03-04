'use client'

/**
 * Client component for analytics scripts
 * This needs to be a client component to render script tags with React
 */
export function AnalyticsScript({ measurementId }: { measurementId?: string }) {
  if (!measurementId || process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      {/* Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Plausible Analytics (alternative, privacy-focused) */}
      {/* <script defer data-domain="bigbio.ai" src="https://plausible.io/js/script.js" /> */}
    </>
  )
}
