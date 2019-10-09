'use strict';

const io = require('socket.io');

const uuid = require('uuid');

const port = process.env.PORT || 3000;
const server = io(port);

console.log(`Server listening on port: ${port}`);

let socketPool = {};

const eventNames = ['file-save', 'file-error'];

server.on('connection', (socket) => {
  const id = `Socket-${uuid()}`;
  console.log(`Added connection: ${id}`);
  socketPool[id] = socket;

  for (const event of eventNames) {
    socket.on(event, dispatchEvent(id, event));
  }

  socket.on('disconnect', () => {
    console.log(`${id} closed`);
    delete socketPool[id];
  });
});

let dispatchEvent = (sourceId, event) => (buffer) => {
  for (let id in socketPool) {
    if (id === sourceId) {
      continue;
    }
    console.log(`Sending to ${id}: ${event}: ${buffer}`);
    socketPool[id].emit(event, buffer);
  }
};
