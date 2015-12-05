var webpack = require('webpack');
var vue = require("vue-loader");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file?name=[name].[ext]?[hash]'
    }]
  },
  vue: {
    loaders: {
      sass: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ],
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
