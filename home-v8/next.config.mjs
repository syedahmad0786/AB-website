import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The page logic registers global listeners in componentDidMount; the design
  // runtime mounted once, so skip Strict Mode's dev-only double mount.
  reactStrictMode: false,
  // This app lives inside the AB-website repo (Vercel Root Directory: home-v8).
  // Pin both roots here so the parent site's lockfile isn't taken as the workspace.
  outputFileTracingRoot: here,
  turbopack: { root: here },
  // The new home page replaces only "/". Every path this app doesn't serve
  // (/work, /blog, /about, case studies, their assets) falls through to the
  // existing site, so its pages and links keep working on ahmadbukhari.com.
  async rewrites() {
    return { fallback: [{ source: '/:path*', destination: 'https://ab-website-nine.vercel.app/:path*' }] };
  },
};

export default nextConfig;
