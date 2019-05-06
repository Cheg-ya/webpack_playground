const path = require('path');
const outputDirectory = 'dist';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, outputDirectory)
  }
};
