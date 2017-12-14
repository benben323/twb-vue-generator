module.exports = {
	preserveWhitespace: false,
	postcss: [
		require('autoprefixer')({
			browsers: ['> 5%']
		})
	],
	cssModules:{
		camelCase:true
	}
}
