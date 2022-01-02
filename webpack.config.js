const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const public_path = path.join(__dirname, 'public')

module.exports = {
  mode: process.env.NODE_ENV || 'production',

  output: {
    filename: 'game.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    // Script files get linked automatically.
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],

  devtool: 'source-map',

  devServer: {
    static: {
      directory: public_path
    },
    compress: true,
    hot: true,
    port: 9000
  }
}