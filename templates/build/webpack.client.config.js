const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const { isProd ,isHotfix, isRelease} = require('../env_config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = merge(base, {
	entry: {
		app: './src/entry-client.js',
		vendor: [
			'es6-promise',
			'isomorphic-fetch',
			'babel-polyfill',
			'vue',
			'vue-router',
			'vuex',
			'vuex-router-sync'
		],
		utils: [
			'./src/mixins/index.js',
			'./src/common/dateUtils.js',
			'./src/common/utils.js',
			'./src/services/index.js'
		]
	},
	plugins: [
		// strip dev-only code in Vue source
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"client"'
		}),
		// extract vendor chunks for better caching
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'utils']
		}),
		new VueSSRClientPlugin()
	]
})


module.exports = config
