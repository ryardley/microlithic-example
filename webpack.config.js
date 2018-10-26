const webpack = require('webpack');
const runPath = require('./lib').runPath;
const StatsPlugin = require('stats-webpack-plugin');

const { NODE_ENV } = process.env;
const config = {
  entry:
    NODE_ENV === 'development'
      ? ['webpack-hot-middleware/client', './src/view/renderBrowser']
      : './src/view/renderBrowser',
  mode: NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true, //HMR doesn't work without this
            configFile: 'tsconfig-client.json'
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js']
  },
  output: {
    filename: 'client.js',
    publicPath: '/',
    chunkFilename: '[name].bundle.js',
    ...(NODE_ENV === 'production' ? { path: runPath('static') } : {})
  },
  plugins: [
    new StatsPlugin('../../stats.json'),
    ...(NODE_ENV === 'development'
      ? [new webpack.HotModuleReplacementPlugin()]
      : [])
  ]
};

module.exports = config;
