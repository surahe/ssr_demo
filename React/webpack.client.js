//webpack.client.js
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base');

const clientConfig = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['isomorphic-style-loader', 'style-loader', {
        loader: 'css-loader',
        options: {
          esModule: false,
        }
      }]
    }]
  }
}

module.exports = merge.merge(config, clientConfig);