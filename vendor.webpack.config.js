var path = require('path')
var webpack = require('webpack')

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: {
    vendor: [path.join(__dirname, 'vendor/index.js')],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, 'build', '[name]-manifest.json'),
    })
  ],
}
