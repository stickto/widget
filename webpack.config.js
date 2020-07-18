const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolvePath(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      // {
      //   test: /\.widget$/,
      //   loader: 'url-loader',
      //   options: {
      //     limits: 10000,
      //     name: 'widgets/[name].[ext]',
      //   },
      // },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'src@': resolvePath('src'),
      'model@': resolvePath('src/model'),
      // 'utils@': resolvePath('src/utils'),
      'persistence@': resolvePath('src/persistence'),
    },
  },
  // resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
    writeToDisk: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: 'widget', to: 'widget',
      }],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
