'use-strict';

jest.mock('fs');

const {readFile, writeFile, uppercaseFile} = require('../src/edit-file');
const events = require('../src/events/file-events');

events.on('error', (...args) => {
  console.error(...args);
});

describe('Edit file', () => {

  beforeEach(() => {
    jest.spyOn(events, 'emit');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('readFile', () => {
    it('Can read files', async () => {
      await readFile('rando.txt');
      expect(events.emit).toHaveBeenCalledWith('read', 'rando.txt', Buffer.from('rando.txt Contents'));
    });
    it('Cannot read files with malformed names', async () => {
      await readFile('bad');
      expect(events.emit).toHaveBeenCalledWith('error', 'Invalid File');
    });
  });

  describe('writeFile', () => {
    it('Can write files', async () => {
      await writeFile('rando.txt', 'stuff');
      expect(events.emit).toHaveBeenCalledWith('write', 'rando.txt', Buffer.from('stuff'));
    });

    it('Cannot write files with malformed names', async () => {
      await writeFile('bad.text', 'stuff');
      expect(events.emit).toHaveBeenCalledWith('error', 'Invalid File');
    });
  });

  describe('uppercaseFile', () => {
    it('Will uppercase the contents of a valid file', async () => {
      await uppercaseFile('rando.txt');
      jest.restoreAllMocks();
      jest.spyOn(events, 'emit');
      await readFile('rando.txt');
      expect(events.emit).toHaveBeenCalledWith('read', 'rando.txt', Buffer.from('STUFF'));
    });

    it('Will not work if the file name is invalid', async () => {
      await uppercaseFile('bad.txt');
      expect(events.emit).toHaveBeenCalledWith('error', 'Invalid File');
    });
  });
});
