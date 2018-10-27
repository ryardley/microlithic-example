const webpack = require('webpack');
const path = require('path');
const runPath = require('./lib').runPath;
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const { NODE_ENV } = process.env;

const prod = NODE_ENV === 'production';

const config = {
  devtool: prod ? 'source-map' : 'inline-source-map',
  entry: !prod
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
    ...(prod ? { path: runPath('static') } : {})
  },

  plugins: [
    new ReactLoadablePlugin({
      filename: `${prod ? 'build' : 'src'}/react-loadable.json`
    }),
    ...(!prod ? [new webpack.HotModuleReplacementPlugin()] : [])
  ]
};

module.exports = config;
