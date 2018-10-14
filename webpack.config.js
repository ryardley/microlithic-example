const webpack = require('webpack');
const runPath = require('./lib').runPath;

const { NODE_ENV } = process.env;
const config = {
  entry:
    NODE_ENV === 'development'
      ? [
          'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
          './src/client.ts'
        ]
      : './src/client.ts',
  mode: NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
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
    NODE_ENV === 'development'
      ? [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin()
        ]
      : []
};

module.exports = config;
