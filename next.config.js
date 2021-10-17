/** @type {import('next').NextConfig} */
module.exports = {
  pageExtensions: ['page.tsx'],
  reactStrictMode: true,
  target: 'serverless',
  webpack: (config) => {
    // https://stackoverflow.com/a/68610114/8014660
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm|txt|mp3)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]',
      },
    });

    // https://stackoverflow.com/a/66089082/8014660
    config.module.rules.push({
      test: /\.geojson$/,
      use: ['json-loader'],
    });

    return config;
  },
};
