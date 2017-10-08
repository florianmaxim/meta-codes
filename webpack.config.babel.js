import path from 'path';
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import copyWebpackPlugin from 'copy-webpack-plugin';

export default {

  entry: {
    app:path.join(__dirname, '/src/public')
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/lib/public/static')
  },

  module: {

    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },

  plugins: [

      new copyWebpackPlugin([{
        from: path.join(__dirname, '/src/public/static'),
        to: path.join(__dirname, '/lib/public/static')
      }])

  ]

}
