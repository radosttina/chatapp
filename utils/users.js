const { addUserToRoom, removeUserFromRoom } = require("./rooms");

const connectUser = (io, socket, room, botName, user) => {
  addUserToRoom(room, user);
  socket.join(room);
  io.in(room).emit("userJoined", user.name);

  socket.to(room).emit("message", {
    user: botName,
    msg: `${user.name} joined ${room}`,
  });

  return user;
};

const disconnectUser = (io, socket, room, botName, user) => {
  removeUserFromRoom(room, socket.id);
  io.to(room).emit("userLeft", user.name);

  socket.in(room).emit("message", {
    user: botName,
    msg: `${user.name} has left ${room}`,
  });
};

module.exports = { connectUser, disconnectUser };
