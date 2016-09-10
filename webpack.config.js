require('es6-promise').polyfill()
var path = require('path')
var resolve = path.resolve

var config = {

  cache: true,
  devtool: 'source-map',
  entry: resolve(__dirname, 'index'),

  output: {
    filename: 'bundle.js',
    publicPath: '/assets/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: [
          resolve(__dirname, 'index'),
          resolve(__dirname, 'lib'),
          resolve(__dirname, 'src'),
          resolve(__dirname, 'tests'),
        ],
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      // {
      //   test: /\.less$/,
      //   loaders: ['style', 'css', 'less']
      // },
    ],
  },

  resolve: {
    root: resolve(__dirname),
    extensions: ['', '.js'],
    alias: {
      // APP_NAME: resolve(__dirname),
    },
  },

}

if (process.env.NODE_ENV === 'production') {

  Object.assign(config, {

    cache: undefined,
    devtool: undefined,

    output: {
      path: 'dist',
      filename: 'build.min.js',
    },

    plugins: [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      // , new webpack.optimize.OccurrenceOrderPlugin(),
    ],

  })

}

module.exports = config
