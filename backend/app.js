const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const groupRoutes = require("./routes/groupRoutes");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/user");
const Message = require("./models/message");
const Group = require("./models/group");
const GroupMember = require("./models/groupMember");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

//database associations
User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);

User.belongsToMany(Group, { through: GroupMember });
Group.belongsToMany(User, { through: GroupMember });

//Api routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/user", userRoutes);

const startServer = async (port) => {
  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer(process.env.PORT || 3000);
