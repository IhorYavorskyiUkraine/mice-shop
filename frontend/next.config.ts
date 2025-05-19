import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         { protocol: 'https', hostname: 'www.atk.store' },
         { protocol: 'https', hostname: 'attackshark.com' },
         { protocol: 'https', hostname: 'placehold.co' },
      ],
   },
   experimental: {
      authInterrupts: true,
   },
};

export default nextConfig;
