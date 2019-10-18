var path = require('path');
var webpack = require('webpack');


module.exports = {
    mode: "development",
    entry: {
      'wiki2json': './src/index.ts',
      'wiki2json.min': './src/index.ts'
    },
    output: {
      path: path.resolve(__dirname, '_bundles'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'wiki2json',
      umdNamedDefine: true
    },
    resolve: {
        // defines rules for how Webpack will handle resolving modules.
      extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [],
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }]
    }
  }