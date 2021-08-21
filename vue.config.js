// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ProvidePlugin } = require('webpack');

module.exports = {
  transpileDependencies: [
    'vuetify', /@koumoul/,
  ],
  devServer: {
    disableHostCheck: true,
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
      // fix "process is not defined" error:
      // (do "npm install process" before running the build)
      new ProvidePlugin({
        process: 'process/browser',
      }),
      new ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
};
