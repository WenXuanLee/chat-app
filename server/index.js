const express = require('express');
const socketio = require('socket.io');
const http = require('http');


const PORT = process.env.PORT || 4000;

const router = require('./router.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

server.listen(PORT, (token) => {
  console.warn(`Server has started on port ${PORT}`);
  if (!token) {
    console.warn("port already in use");
  }
});