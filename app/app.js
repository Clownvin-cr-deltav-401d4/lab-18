'use strict';

const events = require('./src/events/file-events');

const {uppercaseFile} = require('./src/edit-file');
const eventClient = require('./src/event-client');

events.on('read', (file) => {
  eventClient.write(`read: ${file}`);
});

events.on('write', (file) => {
  console.log(file);
  eventClient.write(`write: ${file}`);
});

events.on('error', (error) => {
  eventClient.write(`error: ${error}`);
});

if (process.argv.length > 2) {
  uppercaseFile(process.argv.slice(2).shift());
}

eventClient.unref();
