import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const privatePreview = process.env.AB_PRIVATE_PREVIEW === '1';

// Canonical host. Everything the site says about itself (canonical, sitemap, schema, llms.txt) uses this.
// Set NEXT_PUBLIC_SITE_URL in Vercel to override; the redirect below sends the other host here.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmadbukhari.com';
const canonicalHost = new URL(SITE_URL).host;
const otherHost = canonicalHost.startsWith('www.') ? canonicalHost.slice(4) : `www.${canonicalHost}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The page logic registers global listeners in componentDidMount; the design
  // runtime mounted once, so skip Strict Mode's dev-only double mount.
  reactStrictMode: false,
  env: { NEXT_PUBLIC_AB_PRIVATE_PREVIEW: privatePreview ? '1' : '0' },
  // This app lives inside the AB-website repo (Vercel Root Directory: home-v8).
  // Pin both roots here so the parent site's lockfile isn't taken as the workspace.
  outputFileTracingRoot: here,
  turbopack: { root: here },
  async redirects() {
    if (privatePreview) return [];
    return [
      // One host. 308 keeps the method and tells search engines the move is permanent.
      { source: '/:path*', has: [{ type: 'host', value: otherHost }], destination: `${SITE_URL}/:path*`, permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/cv', destination: '/about', permanent: true },
    ];
  },
  // The new home page replaces only "/" and the machine-readable routes under app/.
  // Every other path (/work, /blog, /about, case studies, their assets) falls through to the
  // existing site, so its pages and links keep working on the canonical host.
  async rewrites() {
    if (privatePreview) return { beforeFiles: [
      { source: '/api/:path*', destination: '/preview-network-disabled' },
      { source: '/mcp/:path*', destination: '/preview-network-disabled' },
      { source: '/work/:path*', destination: 'http://127.0.0.1:4225/work/:path*' },
      { source: '/case-studies/:path*', destination: 'http://127.0.0.1:4225/case-studies/:path*' },
      { source: '/use-cases-v7.css', destination: 'http://127.0.0.1:4225/use-cases-v7.css' },
      { source: '/case-studies-v7.js', destination: 'http://127.0.0.1:4225/case-studies-v7.js' },
      { source: '/platform-logos/:path*', destination: 'http://127.0.0.1:4225/platform-logos/:path*' },
      { source: '/portfolio-brand/:path*', destination: 'http://127.0.0.1:4225/portfolio-brand/:path*' },
      { source: '/work-walkthrough/:path*', destination: 'http://127.0.0.1:4225/work-walkthrough/:path*' },
      { source: '/workflow-templates/:path*', destination: 'http://127.0.0.1:4225/workflow-templates/:path*' },
      { source: '/licenses/:path*', destination: 'http://127.0.0.1:4225/licenses/:path*' },
    ], fallback: [] };
    return { fallback: [{ source: '/:path*', destination: 'https://ab-website-nine.vercel.app/:path*' }] };
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...(privatePreview ? [
            { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
            { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self'; frame-src 'self'; media-src 'self' blob:; form-action 'none'; object-src 'none'; base-uri 'self'" },
          ] : []),
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
