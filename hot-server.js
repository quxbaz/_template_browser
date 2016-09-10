/*
  Script for running react hot loader enabled server.
*/

var path = require('path')
var resolve = path.resolve
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

var port = parseInt(process.env.port)
if (port === null || port === undefined || isNaN(port)) {
  port = 8000
}

// Altering config

config.entry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:' + port,
  'webpack/hot/only-dev-server',
].concat(config.entry)

config.output.path = '/asset/'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
])

//

var contentBase = process.env.NODE_ENV === 'test' ? 'public_test' : 'public'
contentBase = resolve(__dirname, contentBase)

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: contentBase,
})

server.listen(port, 'localhost', function(error, result) {
  if (error) {
    return console.log(error)
  }
  console.log('port=' + port)
  console.log('contentBase=' + contentBase)
})
