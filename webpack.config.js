const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

module.exports = {
  entry: {
    vendor: [
      // 'jquery',
      'lodash',
    ],
    bundle: path.join(dirApp, 'index'),
  },
  resolve: {
    modules: [
      'node_modules',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV,
    }),

    // new webpack.ProvidePlugin({
    //   // lodash
    //   '_': 'lodash',
    // }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.ejs'),
      title: 'TheOne.io 个人简介',
    }),
  ],
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true,
        },
      },
      // STYLES
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV,
            },
          },
        ],
      },
      // CSS / SASS
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV,
            },
          },
          {
            // 以看到在原来的基础上增加了sassOptions属性，并且把includePaths放在了该属性内
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
              sassOptions: {
                includePaths: [dirAssets],
              },
            },
          },
        ],
      },

      // EJS
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
      },

      // IMAGES
      {
        test: /\.(jpe*g|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2',
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]',
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=8192',
      },
    ],
  },
};
