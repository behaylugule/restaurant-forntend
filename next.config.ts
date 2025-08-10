import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
      {
      protocol: 'https',
      hostname: 'restaurantsaasmenuimage.s3.amazonaws.com',
      port: '',
      pathname: '/**',
    },
    ],
  },

};

export default nextConfig;


