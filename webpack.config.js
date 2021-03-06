/*jshint esversion: 6 */

const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// workaround to remove empty js files generated by mini css
class MiniCssExtractPluginCleanup {
  constructor(deleteWhere = /emma-app\.(dark|light)\.js(\.map)?$/) {
    this.shouldDelete = new RegExp(deleteWhere);
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync("MiniCssExtractPluginCleanup", (compilation, callback) => {
      Object.keys(compilation.assets).forEach((asset) => {
        if (this.shouldDelete.test(asset)) {
          delete compilation.assets[asset];
        }
      });
      callback();
    });
  }
}

module.exports = {
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  devtool: "inline-source-map",
  mode: 'development',
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: ['src/**/*.js', 'node_modules']
  },
  node: {
    fs: 'empty'
  },
  target: 'node',
  context: path.join(__dirname, 'src'),
  entry: {
    'module': './module.ts',
    'components/config/config' : path.resolve(__dirname, 'src/components/config/config.ts'),
    'components/servers/servers' : path.resolve(__dirname, 'src/components/servers/servers.ts'),
    'components/server_info/info' : path.resolve(__dirname, 'src/components/server_info/info.ts'),
    'datasource/sensu-core/module' : path.resolve(__dirname, 'src/datasource/sensu-core/module.ts'),
    'datasource/emma-core/module' : path.resolve(__dirname, 'src/datasource/emma-core/module.ts'),
    'panels/sensu-overview/module' : path.resolve(__dirname, 'src/panels/sensu-overview/module.tsx'),
    'emma-app.dark': path.resolve(__dirname, 'src/sass/emma-app.dark.scss'),
    'emma-app.light': path.resolve(__dirname, 'src/sass/emma-app.light.scss'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'amd'
  },
  externals: [
    'angular',
    'lodash',
    'react',
    'react-dom',
    'app/core/utils/kbn',
    function (context, request, callback) {
      var prefix = 'grafana/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    }
  ],
  plugins: [
    new CleanWebpackPlugin('dist', { allowExternal: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new MiniCssExtractPluginCleanup(),
    new CopyWebpackPlugin([
      { from: 'plugin.json', to: '.' },
      { from: '../README.md', to: '.' },
      { from: '../LICENSE', to: '.' },
      { from: 'partials/*', to: '.' },
      { from: 'img/*', to: '.' },
      { from: 'dashboards/*', to: '.' },
      { from: 'components/config/*.html', to: '.' },
      { from: 'components/servers/partials/*', to: '.' },
      { from: 'components/server_info/partials/*', to: '.' },
      { from: 'panels/external/*', to: '.' },
      { from: 'panels/sensu-overview/*.json', to: '.' },
      { from: 'panels/sensu-overview/partials/*', to: '.' },
      { from: 'panels/sensu-overview/img/*', to: '.' },
      { from: 'datasource/sensu-core/*.json', to: '.' },
      { from: 'datasource/sensu-core/css/*', to: '.' },
      { from: 'datasource/sensu-core/img/*', to: '.' },
      { from: 'datasource/sensu-core/partials/*', to: '.' },
      { from: 'datasource/emma-core/*.json', to: '.' },
      { from: 'datasource/emma-core/css/*', to: '.' },
      { from: 'datasource/emma-core/img/*', to: '.' },
      { from: 'datasource/emma-core/partials/*', to: '.' },
    ])
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/,
          loaders: [
            "ts-loader"
          ],
          exclude: [/(node_modules)/],
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/],
        use: {
          loader: 'html-loader'
        },
      },
      {
        test: /\.s[c|a]ss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  }
};
