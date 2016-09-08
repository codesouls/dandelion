var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

config.entry.app.unshift('webpack-dev-server/client?http://localhost:9090', 'webpack/hot/dev-server');

config.plugins.push(new webpack.HotModuleReplacementPlugin());

var proxy = {
  '/sharing/*': {
    target: 'https://apollo.gisportal.com/arcgis',
    ignorePath: true,
    changeOrigin: true,
    secure: false
  }
};

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: proxy,
  stats: {
    colors: true
  }
});

server.listen(9090, '0.0.0.0', function (error) {
  if (error) {
    console.log(error);
  }

  console.log('Listening at localhost:3000');
});
