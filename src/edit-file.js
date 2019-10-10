'use strict';

const fs = require('fs');

const Q = require('@nmq/q/client');

async function readFile(file) {
  let fileData;
  let readError;

  await new Promise(resolve => fs.readFile(file, (err, data) => {
    readError = err;
    fileData = data;
    resolve();
  }));

  if (readError) {
    Q.publish('files', 'error', {error: readError});
  } else {
    Q.publish('files', 'read', {file, data: fileData});
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
    Q.publish('files', 'error', {error: writeError});
  } else {
    Q.publish('files', 'save', {file, data: data});
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
