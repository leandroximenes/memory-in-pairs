const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    publicPath: '/static/dist/js/',
    path: path.resolve(__dirname, '..','app', 'static', 'dist', 'js'),
    clean: true
  },
  
};