const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 3001;
// const index = require("./routes/index");
const app = express();
app.use(express.static('../..socket-io-client/build'));
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!


io.origins('*:*')

io.on("connection", socket => {
  console.log('client connected!');
  socket.on('SEND_MESSAGE', function(data){
        console.log('emitting message back to client');
        io.sockets.emit('RECEIVE_MESSAGE', data);
    })
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


server.listen(port, () => console.log(`Listening on port ${port}`));