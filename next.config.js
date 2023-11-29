/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    experimental: { appDir: true },
    compiler: { styledComponent: true },
    transpilePackages: ['three'],
  };

  const webpackConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.(glsl)$/,
        type: 'asset/source',
      });

      return config;
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...nextConfig,
      ...webpackConfig,
    };
  }

  return {
    ...nextConfig,
    ...webpackConfig,
  };
};
