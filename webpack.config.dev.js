const path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json' ],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, "./dist/"),
  },
};