const EXPRESS = require("express");
const cors = require("cors");
const parser = require("body-parser");
const { initiateDBConnection } = require("./database");

const HTTP_SERVER = EXPRESS();
const PORT = 4000;

initiateDBConnection();

var whitelist = ["http://127.0.0.1:5500", undefined, "http://localhost:5173"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

HTTP_SERVER.use(cors(corsOptions));
HTTP_SERVER.use(parser.json());

HTTP_SERVER.use("/api", require("./app"));

HTTP_SERVER.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started successfully at ${PORT}`);
});
