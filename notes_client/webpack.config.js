const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => {
  return {
    mode: 'development',
    devtool: false,
    entry: {
      index: './src/index.ts',
      edit: './src/edit.ts',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/index.html', to: 'index.html' },
          { from: 'src/edit.html', to: 'edit.html' }
        ],
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new MiniCssExtractPlugin({
        filename: 'dark_mode.css',
      }),
    ],
  }
}
