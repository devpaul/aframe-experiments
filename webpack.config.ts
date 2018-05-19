import * as webpack from 'webpack';
import * as path from 'path';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

export function getConfig() {
	return {
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				}
			]
		},
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ]
		},
		output: {
			filename: '[name].[chunkhash].js',
			chunkFilename: '[name].[chunkhash].js',
			path: path.resolve(__dirname, 'dist')
		},
		plugins: [
			new CopyWebpackPlugin([
				{ context: path.resolve(__dirname, 'assets'), from: '**/*', to: 'assets' }
			]),
			new HtmlWebpackPlugin({
				inject: 'head',
				template: './src/index.html'
			})
		],
		mode: 'production'
	};
}
