const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const getFileName = type => isDev ? `[name].${type}` : `[name].[hash].${type}`; // получение имен файлов
const getCssLoaders = () => ([
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
        loader: 'css-loader',
        options: {
            modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:5]',
                hashPrefix: 'my-custom-hash',
            }
        }
    },
    'sass-loader'
]);
const getJsLoaders = () => {
    const loaders = ['babel-loader'];

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders;
};
const getPlugins = () => {
    const plugins = [
        new CleanWebpackPlugin(),  // очистка папки dist
        new HtmlWebpackPlugin({
            template: '../index.html', // путь к шаблону html
            title: 'Roman\'s app',  // заголовок страницы
            minify: {
                collapseWhitespace: isProd // минификация html
            }
        }),
        new MiniCssExtractPlugin({
            filename: getFileName('css'),  // название финального файла css
            chunkFilename: '[id].[hash].css' // имена чанков стилей
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/favicon.ico'), // копирование фавиконки
            to: path.resolve(__dirname, 'dist') // в папку дист
        }])
    ];

    if (isProd) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
};
const getRules = () => ([
    { //правила для ts/tsx файлов
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: getJsLoaders()
    },
    { //правила для scss файлов
        test: /\.s[ac]ss$/,
        use: getCssLoaders()
    },
    { //правила для pictures
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'file-loader'
    },
    { //правила для fonts
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader'
    }
]);
const getOptimization = () => ({ // обьект оптимизаций
    splitChunks: {
        chunks: "all"
    },
    ...(isProd && {
        minimizer: [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]})
});

module.exports = {
    context: path.resolve(__dirname, 'src'), //контекст для конфига
    entry: ['@babel/polyfill', './app.tsx'], // исходный файл + полифилы для новых фич js
    output: { // обьект для настройка бандла
        path: path.resolve(__dirname, 'dist'), // куда положить бандл
        filename: getFileName('js') // имя - маска  бандла
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.jpeg', '.jpg'], // импорт файлов данного формата без указания формата
        alias: {
            '@src': path.resolve(__dirname, 'src') // относительный путь в импортах
        }
    },
    plugins: getPlugins(), // массив вспомогательных плагинов
    optimization: getOptimization(), // обьект оптимизаций
    module: {
        rules: getRules()  // правила обработки файлов
    },
    devServer: { //настройка дев сервера
        port: 1111,
        hot: isDev
    },
    ...(isDev && {devtool: 'source-map'}) // сорс мапа для девелоп режима
};
