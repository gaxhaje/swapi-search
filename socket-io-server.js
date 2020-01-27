const server = require('http').createServer();
const io = require('socket.io')(server);

Date.prototype.addDays = days => {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// fake db
const comments = [
  {
    id: 1,
    name: 'Ergels Gaxhaj',
    title: 'Comment title',
    text: 'A comment about a film',
    date: new Date('2019-01-25').toLocaleDateString('en-US', { dateStyle: 'medium' })
  },
  {
    id: 2,
    name: 'John Smith',
    title: 'Comment title 2',
    text: 'A comment about a film 2',
    date: new Date('2019-01-26').toLocaleDateString('en-US', { dateStyle: 'medium' })
  }
];

// emit a comment every 2 seconds to simulate a user posting
io.on('connection', socket => {
  io.emit('comments', comments); // emit an event to all connected sockets
  socket.on('comment', data => comments.push(data)); // listen to the event
});

server.listen(8000, () => 
  console.log('WS Server listening on ws://localhost:8000/')
);