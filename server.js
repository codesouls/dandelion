var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config');

var proxy = {
  "/rest/*": {
    target: "https://fatteru.cloud.com/arcgis/sharing",
    host: "fatteru.cloud.com",
    secure: false
  }
};

var app = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  proxy: proxy,
  hot: true,
  stats: {
    colors: true
  }
});

app.listen(3000, '0.0.0.0', function(err, result) {
  console.log('http://localhost:3000');
  if (err) {
    console.log(err);
  }
});
