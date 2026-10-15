import { fileURLToPath } from 'node:url';
import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The page logic registers global listeners in componentDidMount; the design
  // runtime mounted once, so skip Strict Mode's dev-only double mount.
  reactStrictMode: false,
  // This app lives inside the AB-website repo; keep builds scoped to this folder.
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
};

export default nextConfig;
