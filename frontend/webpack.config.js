const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './scripts/mainPage.ts',
        slider: './scripts/slider.ts',
        card: './scripts/singleCardPage.ts',
        createPost: './scripts/postPage.ts',
        signIn: './scripts/loginPage.ts',
        singleTag: './scripts/singleTagPage.ts',
    },
    output:  {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 4200,
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['main', 'slider']
        }),
        new HTMLWebpackPlugin({
            filename: 'card.html',
            template: './card.html',
            chunks: ['card']
        }),
        new HTMLWebpackPlugin({
            filename: 'createPost.html',
            template: './createPost.html',
            chunks: ['createPost']
        }),
        new HTMLWebpackPlugin({
            filename: 'signIn.html',
            template: './signIn.html',
            chunks: ['signIn']
        }),
        new HTMLWebpackPlugin({
            filename: 'pageSingleTag.html',
            template: './pageSingleTag.html',
            chunks: ['singleTag']
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, "src", "assets"),
                to: path.resolve(__dirname, "dist", "assets")
            }]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {}
                }, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {}
                }, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.ttf$/,
                type: 'asset/resource'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use:'ts-loader'
            },
        ]
    }
}