const server = require('http').createServer();
const io = require('socket.io')(server);

// fake db
const comments = [
  {
    id: 1,
    name: 'Civic Champs',
    title: 'Let\'s talk',
    text: 'Civic Champs helps nonprofits get back their time to do the things that matter most.',
    time: '4 PM',
  },
  {
    id: 2,
    name: 'Ergels Gaxhaj',
    title: 'Cool',
    text: 'How can I find out more?',
    time: '5 PM',
  },
  {
    id: 3,
    name: 'Civic Champs',
    title: 'Let\'s talk',
    text: 'Find out how we can help in a quick conversation.',
    time: '6 PM',
  },
];

// emit a comment every 2 seconds to simulate a user posting
io.on('connection', socket => {
  io.emit('comments', comments); // emit an event to all connected sockets
  socket.on('comment', data => {
    comments.push(data);
    io.emit('comment', data);
  }); // listen to the event
});

server.listen(8000, () => 
  console.log('WS Server listening on ws://localhost:8000/')
);