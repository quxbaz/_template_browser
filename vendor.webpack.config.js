var path = require('path')
var webpack = require('webpack')

// <TODO> If NODE_ENV === 'production', minify code

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

// module.exports = {
//   entry: {
//     vendor: [path.join(__dirname, 'vendor/index.js')],
//   },
//   output: {
//     path: path.join(__dirname, 'build', 'dll'),
//     filename: 'dll.[name].js',
//     library: '[name]',
//   },
//   plugins: [
//     new webpack.DllPlugin({
//       path: path.join(__dirname, 'dll', '[name]-manifest.json'),
//       name: '[name]',
//       context: path.resolve(__dirname, 'vendor'),
//     }),
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.optimize.UglifyJsPlugin(),
//   ],
//   resolve: {
//     root: path.resolve(__dirname, 'vendor'),
//     modulesDirectories: ['node_modules'],
//   },
// }
