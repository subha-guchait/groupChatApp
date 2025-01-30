const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");

const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

//Api routes
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
