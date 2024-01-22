const nextConfig = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'pt-BR', 'es-ES'],
  },

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
}

module.exports = nextConfig
