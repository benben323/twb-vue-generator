const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {isProd,isRelease,isHotfix, sourceUrl} = require('../env_config.js')


let config = {
	devtool: isProd
		? false
		: '#cheap-module-source-map',
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: sourceUrl,
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		alias: {
			// 'public': path.resolve(__dirname, '../public')
		}
	},
	module: {
		noParse: /es6-promise\.js$/, // avoid webpack shimming process
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueConfig
			},
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 1024,
					name: 'images/[name].[ext]?[hash]'
				}
			}
		]
	},
	plugins:[]
}



if(isProd || isRelease || isHotfix){
	vueConfig.loaders = {
		less: ExtractTextPlugin.extract({
			loader: 'css-loader!less-loader',
			fallbackLoader: 'vue-style-loader'
		})
	}

	config.plugins.push(
		new ExtractTextPlugin({
			filename: 'styles.[hash].css',
			allChunks:true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true
			}
		})
	)
}

module.exports = config
