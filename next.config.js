/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@quable/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
    ],
  },
}

module.exports = nextConfig
