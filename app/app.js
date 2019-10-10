'use strict';

const {uppercaseFile} = require('../src/edit-file');

if (process.argv.length > 2) {
  uppercaseFile(process.argv.slice(2).shift());
}
