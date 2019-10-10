
const Q = require('@nmq/q/client');

const db = new Q('database');
const files = new Q('files');

db.subscribe('create', payload => {
  console.log('create:', payload);
});

db.subscribe('read', payload => {
  console.log('read:', payload);
});

db.subscribe('update', payload => {
  console.log('update:', payload);
});

db.subscribe('delete', payload => {
  console.log('delete:', payload);
});

files.subscribe('save', payload => {
  console.log('save:', payload);
});

files.subscribe('error', payload => {
  console.error('error:', payload);
});
