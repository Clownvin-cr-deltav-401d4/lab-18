'use-strict';

require('./src/event-client');

const events = require('./src/events/file-events');

let count = 0;

function log(string) {
  console.log(`Log #${++count}: ${string}`);
}

function err(string) {
  console.error(`Log #${++count}: ${string}`);
}

events.on('error', error => err(`Experienced error: ${error}`));

//events.on('read', file => log(`Read ${file}.`));

events.on('write', file => log(`${file} saved.`));
