const path = require('path')

const dist_path = path.join(__dirname, 'dist')

module.exports = {
  mode: 'production',

  entry: './src/index.js',
  output: {
    filename: 'game.js',
    path: path.join(dist_path, 'public')
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

  devtool: 'source-map',

  devServer: {
    static: {
      directory: dist_path
    },
    compress: true,
    port: 9000
  }
}