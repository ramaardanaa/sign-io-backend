if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const errorHandler = require("./middlewares/errorHandlers");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");
const cors = require("cors");

const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server);

//body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

// io.on("connection", (socket) => {
//   console.log("client connected on websocket");
// });

// real time web socket
io.on('connection', (socket) => {
  console.log(socket.id, 'CONNECT CONNECT CONNECT')
  
  socket.on('join', id => {
    socket.join(id)
  })
  
  socket.on('sendMessage', ({id, name, message, createdAt}) => {
    io.in(id).emit('newMessage', {name, message, createdAt})
  });
  
  socket.on('disconnecting', (id) => {
    socket.leave(id)
  });

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected');
    socket.leaveAll()
  });
});

server.listen(port, () => {
  console.log(`http://localhost:` + port);
});

app.listen(port, () => {
  console.log(`http://localhost:` + port);
});

module.exports = app;
