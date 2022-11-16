const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/client', (req, res) => {
  res.sendFile(__dirname + '/client.html');
});

io.on("connection", (socket) => {
  console.log(`New socket - ${socket.id}`);

  // Declare as client
  socket.on('set-client', (msg) => {
    socket.join("client");
  });

  // Declare as provider
  socket.on('set-provider', (msg) => {
    socket.join("provider");
  });

  // Proxy
  socket.on('payload', (data) => {
    socket.to("client").emit('update', data);
  });

});

// Private Message
// io.on("connection", socket => {
//   socket.on("private message", (anotherSocketId, msg) => {
//     socket.to(anotherSocketId).emit("private message", socket.id, msg);
//   });
// });

// Global Broadcast
// io.on('connection', (socket) => {
//   io.local.emit("global");
// });

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
