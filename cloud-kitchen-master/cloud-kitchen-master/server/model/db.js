const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = () => {
  return mongoose.connect(process.env.URI);
};

module.exports = dbConnection;
