// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

// As stated in the Lab 6 directions, this is from the lecture code, but slightly edited for my purposes.

const MongoClient = require('mongodb').MongoClient;
const settings = require("./settings");
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};