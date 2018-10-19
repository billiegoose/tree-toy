const path = require('path')
module.exports = [
  {
    target: 'web',
    entry: {
      index: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    mode: 'development',
    devtool: false,
  }
]
