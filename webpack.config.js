const webpack = require('webpack');
const path = require('path');
const PUBLIC_PATH = "./src";

const config = {
  entry: './src/index.js',
  publicPath: PUBLIC_PATH,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        use: 'file-loader'
      }
    ]
  }
};

module.exports = config;