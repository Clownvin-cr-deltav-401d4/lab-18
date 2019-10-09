'use strict';

const events = require('./events/file-events');

const net = require('net');
const port = process.env.PORT || 3001;
const addr = process.env.ADDRESS || 'localhost';

const socket = new net.Socket();
socket.connect(port, addr);

function parseData(buffer) {
  let string = buffer.toString();
  const indexOfColon = string.indexOf(':');
  const event = string.slice(0, indexOfColon);
  const data = string.slice(indexOfColon + 2, string.lastIndexOf('\r\n'));
  return {event, data};
}

socket.on('data', data => {
  const parsed = parseData(data);
  events.emit(parsed.event, parsed.data);
});

socket.on('close', () => {
  console.log('Connection reset');
});

module.exports = exports = socket;

