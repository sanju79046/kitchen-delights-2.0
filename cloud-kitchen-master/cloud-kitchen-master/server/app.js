const express = require("express");
const app = express();
const authRouter = require("./router/auth");
const kitchensRoute = require("./router/kitchens");
const ordersRoute = require("./router/orders");
const dbConnection = require("./model/db");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);

app.use("/kitchens", kitchensRoute);

app.use("/orders", ordersRoute);

const start = async () => {
  try {
    console.log("Connecting...");
    await dbConnection();
    console.log("Connected to Db Successfully.");
    app.listen(5050, console.log("Server running in port 5050."));
  } catch (err) {
    console.log(err);
  }
};

start();
