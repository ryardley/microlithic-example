const webpack = require('webpack');
const runPath = require('./lib').runPath;

const { NODE_ENV } = process.env;
const config = {
  entry:
    NODE_ENV === 'development'
      ? ['webpack-hot-middleware/client', './src/client']
      : './src/client',
  mode: NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true //HMR doesn't work without this
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
    ...(NODE_ENV === 'production' ? { path: runPath('static') } : {})
  },
  plugins:
    NODE_ENV === 'development' ? [new webpack.HotModuleReplacementPlugin()] : []
};

module.exports = config;
