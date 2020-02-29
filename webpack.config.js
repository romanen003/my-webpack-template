const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.jsx',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.s[ac]ss$/i,
				use: ExtractTextPlugin.extract(
					{
						fallback: 'style-loader',
						use: ['css-loader', 'sass-loader']
					})
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"]
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 1701,
		watchContentBase: true,
		progress: true
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'style.css'
		}),
		new HtmlWebpackPlugin({
			inject: false,
			hash: true,
			template: './src/index.html',
			filename: 'index.html'
		})
	],
	devtool: 'inline-cheap-source-map'
};
