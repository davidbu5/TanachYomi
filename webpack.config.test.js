const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    excels: './tests/excels.ts', icses: './tests/icses.ts'
  },
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
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "./tests"),
  },
};