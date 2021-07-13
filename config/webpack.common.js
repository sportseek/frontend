const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const DotenvWebpackPlugin = require("dotenv-webpack")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    modules: ["node_modules", path.resolve(__dirname, "..", "src")],
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: "app",
      filename: "index.html",
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new DotenvWebpackPlugin({
      path: "config/.env",
    }),
    new FaviconsWebpackPlugin({
      logo: "./public/logo.png",
      mode: "webapp",
      manifest: "./public/manifest.json",
    }),
  ],
}

module.exports = config
