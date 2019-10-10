'use-strict';

jest.mock('fs');

const {readFile, writeFile, uppercaseFile} = require('../src/edit-file');
const Q = require('@nmq/q/client');

describe('Edit file', () => {

  beforeEach(() => {
    jest.spyOn(Q, 'publish');
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('readFile', () => {
    it('Can read files', async () => {
      await readFile('rando.txt');
      expect(Q.publish).toHaveBeenCalledWith('files', 'read', {file: 'rando.txt', data: Buffer.from('rando.txt Contents')});
    });
    it('Cannot read files with malformed names', async () => {
      await readFile('bad');
      expect(Q.publish).toHaveBeenCalledWith('files', 'error', {error: 'Invalid File'});
    });
  });

  describe('writeFile', () => {
    it('Can write files', async () => {
      await writeFile('rando.txt', 'stuff');
      expect(Q.publish).toHaveBeenCalledWith('files', 'save', {file: 'rando.txt', data: Buffer.from('stuff')});
    });

    it('Cannot write files with malformed names', async () => {
      await writeFile('bad.text', 'stuff');
      expect(Q.publish).toHaveBeenCalledWith('files', 'error', {error: 'Invalid File'});
    });
  });

  describe('uppercaseFile', () => {
    it('Will uppercase the contents of a valid file', async () => {
      await uppercaseFile('rando.txt');
      jest.restoreAllMocks();
      jest.spyOn(Q, 'publish');
      await readFile('rando.txt');
      expect(Q.publish).toHaveBeenCalledWith('files', 'read', {file: 'rando.txt', data: Buffer.from('STUFF')});
    });

    it('Will not work if the file name is invalid', async () => {
      await uppercaseFile('bad.txt');
      expect(Q.publish).toHaveBeenCalledWith('files', 'error', {error: 'Invalid File'});
    });
  });
});
