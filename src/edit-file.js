'use strict';

const fs = require('fs');

const events = require('./events/file-events');

async function readFile(file) {
  let fileData;
  let readError;

  await new Promise(resolve => fs.readFile(file, (err, data) => {
    readError = err;
    fileData = data;
    resolve();
  }));

  if (readError) {
    events.emit('error', readError);
  } else {
    events.emit('read', file, fileData);
    return fileData;
  }
}

async function writeFile(file, data) {
  let writeError;
  if (!(data instanceof Buffer)) {
    data = Buffer.from(data);
  }

  await new Promise(resolve => fs.writeFile(file, data, (err) => {
    writeError = err;
    resolve();
  }));

  if (writeError) {
    events.emit('error', writeError);
  } else {
    events.emit('write', file, data);
  }
}

async function uppercaseFile(file) {
  let fileData = await readFile(file);
  if (!fileData) {
    return;
  }
  fileData = Buffer.from(fileData.toString().toUpperCase());
  await writeFile(file, fileData);
}

module.exports = exports = {readFile, writeFile, uppercaseFile};
