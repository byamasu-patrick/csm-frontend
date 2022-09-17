/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { loader: 'custom' },
  swcMinify: true,

  experimental: {
    newNextLinkBehavior: true,

    images: {
      unoptimized: true,
      allowFutureImage: true,

    },
  },
}

module.exports = nextConfig
