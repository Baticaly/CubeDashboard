const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.local.emit('clientUpdate','new client connected');
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

// Global Broadcast
// io.on('connection', (socket) => {
//   io.local.emit("global");
// });

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
