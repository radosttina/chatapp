const Message = require("../models/Message");

async function saveMessage(user, msg, room) {
  const message = new Message({
    user: user,
    msg: msg,
    room: room,
  });

  return message.save()
    .then((data) => {
      return data;
    }, (err) => {
      throw new Error();
    })
}

module.exports = { saveMessage };
