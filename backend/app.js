const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const User = require("./models/user");
const Message = require("./models/message");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

//database associations
User.hasMany(Message);
Message.belongsTo(User);

//Api routes
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

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
