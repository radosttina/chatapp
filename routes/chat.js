const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Room = require("../models/Room");
const { saveMessage } = require("../utils/messages");
const { checkIfRoomExists, saveRoom } = require("../utils/rooms");

router.get("/", (req, res) => {
  res.send("Welcome to VioChat!");
});

router.post("/createRoom", async (req, res) => {
  const roomName = req.body.name;

  if (!roomName) {
    return res.status(400).json({
      message: "No room name was defined.",
    });
  }

  saveRoom(roomName)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      return res.status(400).json({
        message: `Failed to create room ${roomName}`,
      });
    });
});

//TODO: Handle non existing rooms
router.post("/post", async (req, res) => {
  const room = req.body.room;
  const msg = req.body.msg;
  const user = req.body.user;

  const message = saveMessage(user, msg, room);

  message
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/get", async (req, res) => {
  const DEFAULT_MSG_LIMIT = 20;
  const room = req.query.room;
  let limit = parseInt(req.query.limit);

  limit = limit && limit <= 100 ? limit : DEFAULT_MSG_LIMIT;

  try {
    messages = await Message.find({
      room: room,
    })
      .sort({ date: -1 })
      .limit(limit);

    messages = messages.reverse();
    messages = messages.map((msg) => {
      return {
        user: msg.user,
        msg: msg.msg,
      };
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({
      message: "Failed to retrieve messages",
      error: err,
    });
  }
});

router.get("/getUsersInRoom", async (req, res) => {
  const roomName = req.query.room;

  try {
    const room = await Room.findOne({
      name: roomName,
    });

    room.
      catch(err => {
        res.status(400).json("ERROR")
      })

    const usersInRoom = room ? room.activeUsers : [];
    res.status(200).json(usersInRoom);
  } catch (err) {
    res.status(400).json({
      message: "Failed to retrieve the active users.",
      error: err,
    });
  }
});

module.exports = router;
