!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'));
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
