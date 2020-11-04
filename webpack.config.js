var webpack = require('webpack')
var path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    linkUrl: './linkUrl.js',
    server: './server.js',
  },
  output: {
    filename: './[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'ErrorPage.html',
      minify:{    //压缩HTML文件
         removeComments:true,    //移除HTML中的注释
         collapseWhitespace:true,    //删除空白符与换行符
         collapseInlineTagWhitespace:true,
         minifyJS:true,
         minifyCSS:true
      },
      template: 'src/ErrorPage.html',
      chunks:[]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader?limit=20000',
            options:{
              esModule:false
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/i,
        use:['html-withimg-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
      //uglify js
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      })
    ],
  }
}
