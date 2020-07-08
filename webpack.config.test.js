const path = require('path');

module.exports = {
  mode: 'development',
  entry: './tests/excels.ts',
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
    filename: 'excels.js',
    path: path.resolve(__dirname, "./tests"),
  },
};