const mongoose = require("mongoose");
const config = require('./config')
const uri = `mongodb://${config.development.mongodb.hostname}:${config.development.mongodb.port}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

function connect() {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, options, () => {
      console.log("succesfully connected with mongodb");
      resolve()
    });
    mongoose.connection.on("error", err => {
      console.log(`mongodb connection error: ${err}`);
      process.exit()
    });
  })
}
module.exports = {
  connect
};
