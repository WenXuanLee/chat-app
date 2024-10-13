const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUserInRoom } = require('./user.js')
const PORT = process.env.PORT || 4000;

const router = require('./router.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      callback({ error: 'error' });
    }
    console.log('user', user);
    if (user) {
      console.log('inside welcome')
      // welcome to the specific user
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
      // system hint for other in room user
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined`})

      socket.join(user.room)

      callback();
    }

  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  })

  socket.on('disconnect', () => {
    console.log('User had left!!!');
  });
});

app.use(router);

server.listen(PORT, (token) => {
  console.warn(`Server has started on port ${PORT}`);
  if (!token) {
    console.warn("port already in use");
  }
});