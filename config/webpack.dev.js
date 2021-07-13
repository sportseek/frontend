const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  target: "web",
  devServer: {
    contentBase: path.resolve(__dirname, "..", "dist"),
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    writeToDisk: true,
    historyApiFallback: true,
  },
})
