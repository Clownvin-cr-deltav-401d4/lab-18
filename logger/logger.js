'use-strict';

const io = require('socket.io-client');

const url = process.env.URL || 'http://localhost:3000';

const socket = io.connect(url);
console.log(`Connected to ${url}`);

let count = 0;

function log(string) {
  console.log(`Log #${++count}: ${string}`);
}

function err(string) {
  console.error(`Log #${++count}: ${string}`);
}

socket.on('file-error', error => {
  err(`Experienced error: ${error}`);
});

//events.on('read', file => log(`Read ${file}.`));

socket.on('file-save', data => log(`${data.file} saved.`));
