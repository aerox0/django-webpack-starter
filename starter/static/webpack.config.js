const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const src = path.resolve(__dirname, 'main')
const distPath = { dist: path.resolve(__dirname, 'dist'), public: '/static/dist/' }

module.exports = {
	mode: 'development',
	entry: ['./main/index.js'],
	output: {
		filename: 'main.js',
		path: distPath.dist,
		publicPath: distPath.public,
	},
	devServer: {
		contentBase: distPath.dist,
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
		modules: [path.resolve(), 'node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: src,
				loader: 'babel-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: 'postcss.config.js',
							},
							plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')],
						},
					},
					{
						loader: 'sass-loader?sourceMap',
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|png|jpg|gif|css)(\?v=\d+\.\d+\.\d+)?$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin()],
}
