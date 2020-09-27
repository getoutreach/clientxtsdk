const DtsBundleWebpack = require('dts-bundle-webpack')

const path = require('path')

module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new DtsBundleWebpack({
      name: '@outreach/client-addon-sdk',
      main: 'build/index.d.ts',
      out: '../dist/index.d.ts'
    })
  ]
}
