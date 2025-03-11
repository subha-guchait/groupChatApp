const { Server } = require("socket.io");
const express = require("express");
const { createServer } = require("http");
const GroupMember = require("../models/groupMember");
const { socketAuth } = require("../middlewares/socketAuth");

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use(socketAuth);

const activeUsers = new Map();

io.on("connection", async (socket) => {
  console.log("user connected", socket.id);

  const userId = socket.user.id;
  const userName = socket.user.name;

  activeUsers.set(userId, socket.id);

  try {
    const userGroups = await GroupMember.findAll({ where: { userId: userId } });
    userGroups.forEach((group) => {
      const groupId = group.groupId;
      socket.join(groupId);
      console.log(`User ${userId} auto-joined group ${groupId}`);
    });
  } catch (err) {
    console.error("Error fetching user groups:", err);
  }

  //join a group or room
  socket.on("join-group", ({ groupId, userId }) => {
    socket.join(groupId);
    console.log(`User ${userId} joined group ${groupId}`);
  });

  socket.on("send-message", ({ groupId, message, media, createdAt }) => {
    //for chcking if the user is still in the room
    if (!socket.rooms.has(groupId)) {
      console.log(`User ${userId} is not a member of the group ${groupId}.`);

      socket.emit("removed-from-group", {
        error: "You are no longer a member of this group.",
      });
      return;
    }

    const newMessage = {
      message,
      media,
      userId,
      userName,
      createdAt,
    };

    socket.to(groupId).emit("receive-message", newMessage);
    console.log(newMessage);
  });

  socket.on("add-user", ({ groupId, groupName, addedUserId }) => {
    const userSocketId = activeUsers.get(addedUserId);

    if (!userSocketId) {
      console.log(`User ${addedUserId} is not active.`);
      return;
    }

    const userSocket = io.sockets.sockets.get(userSocketId);

    if (userSocket) {
      userSocket.join(groupId);
      userSocket.emit("added-group", { groupId, groupName });
    }
  });

  socket.on("remove-user", async ({ groupId, removedUserId }) => {
    const userSocketId = activeUsers.get(removedUserId);
    if (!userSocketId) {
      console.log(`User ${removedUserId} is not active.`);
      return;
    }

    const isAdmin = await GroupMember.findOne({
      where: { userId: userId, groupId: groupId, isAdmin: true },
    });

    if (!isAdmin) {
      console.log(`User ${userId} is not an admin of the group ${groupId}.`);
      return;
    }

    const userSocket = io.sockets.sockets.get(userSocketId);

    if (userSocket) {
      userSocket.leave(groupId);
      userSocket.emit("removed-from-group", { groupId });
      console.log(`User ${userId} was removed from group ${groupId}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    activeUsers.delete(socket.userId);
  });
});

module.exports = { app, server, io };
