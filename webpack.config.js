const path = require('path');
const outputDirectory = 'dist';

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, outputDirectory)
  },
  mode: 'production'
};
