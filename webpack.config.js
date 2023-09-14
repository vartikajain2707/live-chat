const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {
    return {
        output: {
            path: path.join(__dirname, "/build"), // the bundle output path
            filename: "bundle.js", // the name of the bundle
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
                inject: false,
                filename: 'index.html',
            }),
            new webpack.DefinePlugin({ environment: JSON.stringify(env) }),
            new CopyWebpackPlugin({
                patterns: [
                  {
                    from: './public/prod-embed.js',
                    to: './scripts/',
                  },
                  {
                    from: './public/test-embed.js',
                    to: './scripts/',
                  },
                ],
              }),
        ],
        devServer: {
            port: 3000, // you can change the port
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/, // .js and .jsx files
                    exclude: /node_modules/, // excluding the node_modules folder
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/, // styles files
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
                    loader: "url-loader",
                    options: {
                        limit: false
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.mjs', '.js', '.jsx']
        }
    }
};
