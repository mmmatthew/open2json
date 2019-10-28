var path = require('path');
var webpack = require('webpack');


module.exports = {
    mode: "development",
    entry: {
      'open2json.min': './src/index.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist/webpack'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'open2json',
      umdNamedDefine: true
    },
    resolve: {
        // defines rules for how Webpack will handle resolving modules.
      extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({ "global.GENTLY": false })
    ],
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }]
    }
  }