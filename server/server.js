const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const router = require("./router");
const http = require("http");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  console.log("We have a new connection!");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User left!");
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
