import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         { protocol: 'https', hostname: 'www.atk.store' },
         { protocol: 'https', hostname: 'attackshark.com' },
      ],
   },
};

export default nextConfig;
