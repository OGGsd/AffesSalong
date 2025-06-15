/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['affessalong.se', 'hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
  async redirects() {
    return [
      // Redirect from Axiestudio.se to the main Affes Salong website
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'axiestudio.se',
          },
        ],
        destination: 'https://affessalong.axiestudio.se',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.axiestudio.se',
          },
        ],
        destination: 'https://affessalong.axiestudio.se',
        permanent: true,
      },
      // Redirect section-specific URLs to the main website with hash
      {
        source: '/om-oss',
        destination: '/#om-oss',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/#team',
        permanent: true,
      },
      {
        source: '/tjanster',
        destination: '/#tjanster',
        permanent: true,
      },
      {
        source: '/galleri',
        destination: '/#galleri',
        permanent: true,
      },
      {
        source: '/kontakt',
        destination: '/#kontakt',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
