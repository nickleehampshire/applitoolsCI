const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname,'build')
    },
    devServer: {
      contentBase: './build',
      hot: true,
      port:9000
    },
  
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Applitools Test',
        filename: 'index.html',
        template: './src/template.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module:{
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins:  ["@babel/plugin-proposal-class-properties"]
            }
          }
        }
      ]
    }
  }