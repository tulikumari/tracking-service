const mysql = require("mysql");

var connection;

module.exports = {
  dbConnection: function() {
    connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "gpstrackingnew"
    });
    connection.connect();
    return connection;
  }
};
