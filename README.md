# LAB - 18

## TCP Server / Messages
Refactor some filesystem logic to use events

### Author: Calvin Hall

### Links and Resources
* [submission PR](https://github.com/Clownvin-cr-deltav-401d4/lab-18/pull/1)
* [travis](https://www.travis-ci.com/Clownvin-cr-deltav-401d4/lab-18)

## Modules
### app
Connects to the server and emits any events that happen.
Reads a file given in the command line, and saves the file but all uppercased. Emits events based on what happens.
### edit-file
#### readFile(file)
Reads a file and returns its contents. Also emits a "read" event to the file-events
#### writeFile(file, data)
Writes a file with the data. Also emits a "write" event to the file-events
### file-events
An EventEmitter which represents events for files
### logger
Listens for file-events, and logs them.
### server
Connects to clients and relays event data between them

#### Running the app
You'll have to start 3 apps:
* `node server/server.js`
* `node logger/logger.js`
* `node app/app.js test.txt`
  
#### Tests
* `npm test`
