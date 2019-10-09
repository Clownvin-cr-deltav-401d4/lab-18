# LAB - 17

## TCP Server / Messages
Refactor some filesystem logic to use events

### Author: Calvin Hall

### Links and Resources
* [submission PR](https://github.com/Clownvin-cr-deltav-401d4/lab-17/pull/1)
* [travis](https://www.travis-ci.com/Clownvin-cr-deltav-401d4/lab-17)

## Modules
### edit-file
#### readFile(file)
Reads a file and returns its contents. Also emits a "read" event to the file-events
#### writeFile(file, data)
Writes a file with the data. Also emits a "write" event to the file-events
### file-events
An EventEmitter which represents events for files
### logger
Listens for file-events, and logs them.
### event-server
Connects to clients and relays event data between them
### event-client
Connects to an event server and re-emits any events that it sends.

#### Running the app
You'll have to start 3 apps:
* `node event-server.js`
* `node logger.js`
* `node app.js test.txt`
  
#### Tests
* `npm test`
