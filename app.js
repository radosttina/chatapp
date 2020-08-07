const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const { saveMessage } = require("./utils/messages");
const {
  checkIfRoomExists,
  saveRoom,
  addUserToRoom,
  removeUserFromRoom,
} = require("./utils/rooms");
require("dotenv/config");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());
const postsRoute = require("./routes/chat");

app.use("/", postsRoute);
app.use(express.static(path.join(__dirname, "client/public")));

mongoose.set('bufferCommands', false);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .catch((err) => console.log("Could not connect to db!!!"))

const botName = "VioChat";

io.on("connection", (socket) => {
  console.log("Connected!")
  socket.emit("message", {
    user: botName,
    msg: "Welcome to VioChat!",
  });

  socket.on("joinRoom", async ({ username, room }) => {
    socket.join(room);

    saveRoom(room)
      .then((data) => {
        console.log("Saved room:", data);
      })
      .catch((err) => {
        console.log("Cannot save room");
      });

    addUserToRoom(room, username)
      .catch(err => console.log("User not added to active chat users."));

    io.in(room).emit("userJoined", username);

    socket.to(room).emit("message", {
      user: botName,
      msg: `${username} joined ${room}`,
    });

    socket.on("disconnect", () => {
       
      io.to(room).emit("userLeft", username);

      socket.in(room).emit("message", {
        user: botName,
        msg: `${username} has left ${room}`,
      });
    });

    socket.on("chatMessage", (msg) => {
      io.to(room).emit("message", {
        user: username,
        msg: msg,
      });
      saveMessage(username, msg, room)
    });
  });
});

const PORT = 4000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
