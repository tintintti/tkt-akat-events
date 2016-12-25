module.exports = {
  entry: {
    'dist/react-date-time-picker': './index.js',
    'example/bundle': './example/app.js',
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.less$/, loader: "style-loader!css-loader!less-loader"}
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'moment': 'moment'
  },
  devtool: 'source-map'
};
