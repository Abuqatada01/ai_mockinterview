module.exports = {
  webpack: (config: { resolve: { fallback: any } }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      http2: false,
      http: false,
      https: false,
      tls: false,
      net: false,
      dns: false,
      zlib: false,
      stream: false,
      crypto: false,
    };
    return config;
  },
};
