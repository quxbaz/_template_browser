require('es6-promise').polyfill()
var path = require('path')
var resolve = path.resolve

var config = {

  cache: true,
  devtool: 'inline-source-map',
  entry: resolve(__dirname, 'index'),

  output: {
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/, /bower_components/],
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },

  resolve: {
    root: resolve(__dirname),
    extensions: ['', '.js'],
    alias: {
      // APP_NAME: resolve(__dirname)
    }
  }

}

module.exports = config
