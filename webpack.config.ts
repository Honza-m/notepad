import path from "path";
import webpack from "webpack";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config: webpack.Configuration = {
  entry: "./react/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader']
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "app.js",
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'app.css' })],
};

export default config;