const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: process.env.NODE_ENV,
    target: 'browserslist',
    entry: './index.js',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src', 'Components'),
            '@styles': path.resolve(__dirname, 'src', 'styles'),
            '@pages': path.resolve(__dirname, 'src', 'pages'),
            '@utils': path.resolve(__dirname, 'src', 'utils'),
        },
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, 'public', 'index.html'),
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            },
        }),
        new MiniCssExtractPlugin({
            //filename: filename('css'),
            filename: "[name].css",
            chunkFilename: '[id].css'
        }),
        new ESLintPlugin({
            fix: true,
            context: path.resolve(__dirname, 'src'),
            extensions: ['.js', '.jsx'],
            lintDirtyModulesOnly: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                //use: ['style-loader', 'css-loader', 'sass-loader'],
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.js$|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                },
                            ],
                            ['@babel/preset-react', {
                                development: isDev,
                                runtime: 'automatic',
                            }],
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ],
                    },
                },
            },
        ],
    },
};
