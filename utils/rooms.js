const Room = require("../models/Room");

async function checkIfRoomExists(roomName) {
  const count = await Room.countDocuments({ name: roomName });
  return !!count;
}

async function saveRoom(room) {
  const roomCount = await Room.countDocuments({ name: room })

  if (roomCount > 0) {
    throw Error('Room already exists.')
  }

  const newRoom =  new Room({
    name: room,
  });

  return newRoom
    .save()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw Error('Room was not created.');
    });
}

async function addUserToRoom(roomName, username) {
    return await Room.update(
        { name: roomName }, 
        { $push: { activeUsers: username } }
    )
}

async function removeUserFromRoom(roomName, username) {
    return await Room.update(
        { name: roomName }, 
        { $pull: { activeUsers: username } }
    )
}

module.exports = { checkIfRoomExists, saveRoom, addUserToRoom, removeUserFromRoom };
