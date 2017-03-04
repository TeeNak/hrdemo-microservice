var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },{
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    },
      // settings for bootstrap fonts
      // the url-loader uses DataUrls.
      // the file-loader emits files.
    {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: './dist',
    proxy: {
      '/hrdemo*': {
        target: 'http://localhost:8091',
        secure: false,
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
