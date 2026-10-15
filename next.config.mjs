import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));

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
  // This app lives inside the AB-website repo (Vercel Root Directory: home-v8).
  // Pin both roots here so the parent site's lockfile isn't taken as the workspace.
  outputFileTracingRoot: here,
  turbopack: { root: here },
  async redirects() {
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
    return { fallback: [{ source: '/:path*', destination: 'https://ab-website-nine.vercel.app/:path*' }] };
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
