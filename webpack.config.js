var webpack = require('webpack')
var path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
module.exports={
    mode: 'production',
    entry:{
        index:'./linkUrl.js',
        server:'./server.js'
    },
    output:{
        filename:'./[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    optimization: {
        minimizer: [
          //uglify js
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
          }),
        ],
    }
}
