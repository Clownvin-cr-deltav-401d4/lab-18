'use strict';

const io = require('socket.io-client');

const url = process.env.URL || 'http://localhost:3000';

const socket = io.connect(url);
console.log(`Connected to ${url}`);

const events = require('../src/events/file-events');
const {uppercaseFile} = require('../src/edit-file');

events.on('read', (file, data) => {
  socket.emit('file-read', {file, data});
});

events.on('write', (file, data) => {
  socket.emit('file-save', {file, data});
});

events.on('error', (error) => {
  socket.emit('file-error', error.message);
});

if (process.argv.length > 2) {
  uppercaseFile(process.argv.slice(2).shift());
}
