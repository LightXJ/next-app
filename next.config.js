// @ts-check

module.exports = {
  experimental: {
    runtime: 'nodejs',
    serverComponents: true,
  },
  reactStrictMode: true,
  env: {
    ROOT: __dirname
  },
  async rewrites() {
    return [
      {
        source: '/download/baidu/:path*',
        destination: 'https://www.baidu.com/:path*',
      }
  ]
  }
}
