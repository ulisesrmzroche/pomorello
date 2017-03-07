const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.join(__dirname, './../');
const prod = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');

module.exports = {
  context: ROOT_PATH,
  entry: ROOT_PATH + '/src/index.js',
  output: {
    path: ROOT_PATH + '/dist',
    filename: '[name].trello-pomodoro.js',
    publicPath: '/'
  },
  plugins: _.filter([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    prod && new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
    }),
    new HtmlWebpackPlugin({
      template: `${ROOT_PATH}/public/index.html`,
      inject: 'body',
      title: 'Ulises Ramirez-Roche | Software Engineer. JavaScript Enthusiast.',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ]),
  // TODO: Setup javascript loader
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        include: `${ROOT_PATH}/src`,
        query: {cacheDirectory: `${ROOT_PATH}/tmp/babel`}, // reduces initial start time by ~60%
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  }
}
