// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ProvidePlugin } = require('webpack');

module.exports = {
  transpileDependencies: [
    'vuetify', /@koumoul/,
  ],
  devServer: {
    allowedHosts: 'all',
    port: 8050,
    client: {
      progress: true,
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        http: require.resolve('http-browserify'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
      },
      aliasFields: ['browser'],
    },
    plugins: [
      new ProvidePlugin({
        process: 'process/browser',
      }),
      new ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
};
