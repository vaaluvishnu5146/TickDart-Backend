const mongoose = require("mongoose");

function initiateDBConnection() {
  mongoose
    .connect("mongodb://localhost:27017/TikDart")
    .then((res) => {
      console.log("Connection successful");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  initiateDBConnection,
};
