const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");
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

const { connectUser, disconnectUser } = require("./utils/users");
require("dotenv/config");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());
const postsRoute = require("./routes/chat");

app.use("/", postsRoute);
app.use(express.static(path.join(__dirname, "client/public")));

mongoose.set("bufferCommands", false);
mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .catch((err) => console.log("Could not connect to db!!!"));

const botName = "VioChat";

io.on("connection", (socket) => {
  console.log("Connected!");
  socket.emit("message", {
    user: botName,
    msg: "Welcome to VioChat!",
  });

  socket.on("joinRoom", async ({ username, room }) => {
    const userInstance = new User({ _id: socket.id, name: username });

    Promise.all([
      saveRoom(room), 
      userInstance.save()
    ])
      .then(([roomInstance, user]) => connectUser(io, socket, room, botName, user))
      .catch((err) => {
        res.status(500).json("The app cannot connect you to the chat room!");
      });


    socket.on("disconnect", () => {
      disconnectUser(io, socket, room, botName, userInstance);
    });

    socket.on("chatMessage", (msg) => {
      io.to(room).emit("message", {
        user: username,
        msg: msg,
      });
      saveMessage(username, msg, room);
    });
  });
});

const PORT = 4000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
