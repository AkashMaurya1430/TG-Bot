const mongoose = require("mongoose");

const initDB = () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // setting up DB_URI
  // let db_URI = "";
  let dbUri = process.env.DB_URI;
  if (process.env.NODE_ENV === "dev") {
    dbUri = process.env.DB_DEV_URI;
  }

  // connection to db
  mongoose.connect(dbUri, options);

  //access connection object
  const connection = mongoose.connection;

  // Event listeners for connection objects
  connection.on("connected", () => {
    console.log("Connected to the database successfully");
  });

  connection.on("error", (err) => {
    console.log(err);
  });

  connection.on("disconnected", () => {
    console.log("Disconnected");
  });
};

// initDatabase();

module.exports = initDB;
