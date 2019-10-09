'use strict';

const net = require('net');
const uuid = require('uuid');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Event Server up on ${port}`) );

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${uuid()}`;
  console.log(`Added connection: ${id}`);
  socketPool[id] = socket;
  socket.on('data', dispatchEvent(id));
  socket.on('close', () => {
    console.log(`${id} closed`);
    delete socketPool[id];
  });
});

let dispatchEvent = (sourceId) => (buffer) => {
  let text = buffer.toString().trim();
  for (let id in socketPool) {
    if (id === sourceId) {
      continue;
    }
    console.log(`Sending ${text} to ${id}`);
    socketPool[id].write(`${text}\r\n`);
  }
};
