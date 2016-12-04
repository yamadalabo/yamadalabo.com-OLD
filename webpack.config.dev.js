const path = require('path');
const webpack = require('webpack');
const findCacheDir = require('find-cache-dir');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const publicPath = '/';
const publicUrl = '';
const htmlPath = 'static/index.html';

module.exports = {
  devtool: 'eval',
  devServer: {
    contentBase: 'static',
    port: 3000,
  },
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    './src/js/index.jsx',
    './src/scss/style.scss',
    './src/scss/responsive.scss',
  ],
  output: {
    path: path.join(__dirname, 'static'),
    pathinfo: true,
    filename: 'bundle.js',
    publicPath,
  },
  plugins: [
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: htmlPath,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          cacheDirectory: findCacheDir({
            name: 'app-scripts',
          }),
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  sassLoader: {
    includePaths: [
      path.join(__dirname, '../src/scss/style.scss'),
      path.join(__dirname, '../src/scss/responsive.scss'),
    ],
  },
};
