const path = require("path")
const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, "./src/index.js")
    },
    output: {
        filename: "[name][contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        assetModuleFilename: "[name][ext]"
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 8080,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".jsx", ".js"]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
            filename: "index.html",
            title: "SEND SMS"
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],
}