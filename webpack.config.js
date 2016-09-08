var webpack = require('webpack');
var vue = require("vue-loader");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
  entry: {
    app: [
      './src/main.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
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
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }, {
      test: /\.(png|jpg|gif|svg)$/,
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
        NODE_ENV: 'production'
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
