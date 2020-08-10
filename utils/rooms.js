const Room = require("../models/Room");

async function checkIfRoomExists(roomName) {
  const count = await Room.countDocuments({ name: roomName });
  return !!count;
}

async function saveRoom(room) {
  const chatRoom = await Room.findOne({ name: room })

  if (chatRoom) {
    return chatRoom;
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

async function addUserToRoom(roomName, user) {
    await Room.update(
        { name: roomName }, 
        { $push: { activeUsers: user } }
    )

    return user
}

async function removeUserFromRoom(roomName, userId) {
    return await Room.update(
        { name: roomName }, 
        { $pull: { activeUsers: {_id: userId} } }
    )
}

module.exports = { checkIfRoomExists, saveRoom, addUserToRoom, removeUserFromRoom };
