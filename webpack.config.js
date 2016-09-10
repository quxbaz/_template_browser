require('es6-promise').polyfill()
var path = require('path')
var resolve = path.resolve
var webpack = require('webpack')

var config = {

  cache: true,
  devtool: 'source-map',
  entry: [
    'regenerator-runtime/runtime',
    resolve(__dirname, 'index'),
  ],

  node: {
    fs: 'empty',
  },

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
          plugins: [
            'transform-object-rest-spread',
            'transform-class-properties',
            'syntax-trailing-function-commas',
            'transform-export-extensions',
            'transform-async-to-generator',
            'transform-regenerator',
          ],
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

  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./build/vendor-manifest.json'),
    })
  ],

  resolve: {
    root: resolve(__dirname),
    extensions: ['', '.js'],
    alias: {
      // APP_NAME: resolve(__dirname),
    },
  },

}

if (process.env.NODE_ENV === 'test') {

  config.entry[1] = resolve('tests/')

} else if (process.env.NODE_ENV === 'production') {

  Object.assign(config, {

    cache: undefined,
    devtool: undefined,

    output: {
      path: 'build',
      filename: 'bundle.min.js',
    },

    plugins: config.plugins.concat([
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      // , new webpack.optimize.OccurrenceOrderPlugin(),
    ]),

  })

}

module.exports = config
