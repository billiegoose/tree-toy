const path = require('path')
const webpack = require('webpack')

module.exports = [
  {
    entry: {
      app: './src/app.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    mode: 'production'
    // mode: 'development',
    // devtool: 'none',
    // plugins: [
    //   new webpack.optimize.ModuleConcatenationPlugin()
    // ],
    // stats: {
    //   // Examine all modules
    //   maxModules: Infinity,
    //   // Display bailout reasons
    //   optimizationBailout: true
    // },
  }
]
