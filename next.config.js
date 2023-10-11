/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.discordapp.com', 'gnbufszcvbhrauxksshd.supabase.co'],
  },

  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx', 'ts'],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
}

module.exports = nextConfig
