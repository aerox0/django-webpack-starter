const path = require('path')

const src = path.resolve(__dirname, 'main')
const distPath = { private: path.resolve(__dirname, 'dist'), public: '/static/dist/' }

module.exports = {
	mode: 'development',
	entry: ['./main/index.js'],
	output: {
		filename: 'main.js',
		path: distPath.private,
		publicPath: distPath.public,
	},
	devServer: {
		contentBase: distPath.private,
		hot: true,
		inline: true,
		proxy: {
			[`!${distPath.public}/**`]: {
				target: 'http://localhost:4000', // points to django dev server
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			'~': src,
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: src,
				loader: 'babel-loader',
			},
			{
				test: /\.s?css$/i,
				use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: ['file-loader'],
			},
		],
	},
}
