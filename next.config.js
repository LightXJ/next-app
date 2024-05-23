// @ts-check

module.exports = {
  reactStrictMode: false,
  env: {
    ROOT: __dirname
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/download/baidu/:path*',
        destination: 'https://www.baidu.com/:path*',
      }
  ]
  },
}
