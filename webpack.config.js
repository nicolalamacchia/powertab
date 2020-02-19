const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const Critters = require('critters-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: __dirname + '/src/index.js',

  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new CopyPlugin([{ from: 'public/*', flatten: true }]),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: './index.html',
      inlineSource: '.(js|css)$',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new Critters({
      preload: 'body',
    }),
  ],
}
