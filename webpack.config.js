const path = require('path')

const src_path = path.join(__dirname, 'src')
const out_path = path.join(__dirname, 'docs')

module.exports = {
  mode: process.env.NODE_ENV || 'production',

  entry: src_path,

  output: {
    filename: 'game.js',
    path: path.join(out_path, 'public'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: src_path,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },

  devtool: 'source-map',

  devServer: {
    static: {
      directory: out_path
    },
    compress: true,
    hot: true,
    port: 9000
  }
}