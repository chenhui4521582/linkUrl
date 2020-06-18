var webpack = require('webpack')
var path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
module.exports={
    mode: 'production',
    entry:{
      linkUrl:'./linkUrl.js',
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
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader'
            }
          ]
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
