// Webpack uses this to work with directories
const path = require('path');
const fs = require('fs');
const express = require('express');
const { random } = require('lodash');
const bodyParser = require('body-parser');
const { v4 } = require('uuid');

// This is the main configuration object.

module.exports = {
  
  entry: './src/api/index.js',

  output: {
    path: path.resolve(__dirname, 'dist/api'),
    publicPath: '',
    filename: 'index.js'
  },
 
  mode: 'development'
};