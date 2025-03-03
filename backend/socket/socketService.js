const { Server } = require("socket.io");
const express = require("express");
const { createServer } = require("http");
const GroupMember = require("../models/groupMember");

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("user-connected", async ({ userId }) => {
    socket.userId = userId;
    console.log(socket.id);
    activeUsers.set(userId, socket.id);
    try {
      const userGroups = await GroupMember.findAll({ where: { userId } });
      userGroups.forEach((group) => {
        const groupId = group.groupId;
        socket.join(groupId);
        console.log(`User ${userId} auto-joined group ${groupId}`);
      });
    } catch (err) {
      console.error("Error fetching user groups:", err);
    }
  });

  //join a group room
  socket.on("join-group", ({ groupId, userId }) => {
    socket.join(groupId);
    console.log(`User ${userId} joined group ${groupId}`);
  });

  socket.on(
    "send-message",
    ({ groupId, message, userId, userName, createdAt }) => {
      const newMessage = {
        message,
        userId,
        userName,
        createdAt,
      };

      socket.to(groupId).emit("receive-message", newMessage);
      console.log(newMessage);
    }
  );

  socket.on("remove-user", ({ groupId, userId }) => {
    console.log("removed user", groupId, userId);
    console.log(activeUsers);
    const userSocketId = activeUsers.get(userId);
    console.log(userSocketId);
    if (!userSocketId) {
      console.log(`User ${userId} is not active.`);
      return;
    }

    const userSocket = io.sockets.sockets.get(userSocketId);

    if (userSocket) {
      userSocket.leave(groupId);
      console.log("userSocket:", userSocket);
      userSocket.emit("removed-from-group", { groupId });
      console.log(`User ${userId} was removed from group ${groupId}`);
    }
  });

  socket.on("hi", ({ ok }) => {
    console.log(ok);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    activeUsers.delete(socket.userId);
  });
});

module.exports = { app, server, io };
