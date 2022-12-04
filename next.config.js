/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = { reactStrictMode: true, swcMinify: true };

  const webpackConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.(glsl)$/,
        use: ['glslify-import-loader', 'raw-loader', 'glslify-loader'],
      });

      return config;
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...nextConfig,
      ...withVanillaExtract(webpackConfig),
      experimental: { esmExternals: false },
    };
  }

  return {
    ...nextConfig,
    ...withVanillaExtract(webpackConfig),
  };
};
