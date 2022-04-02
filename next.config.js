// @ts-check

module.exports = {
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
