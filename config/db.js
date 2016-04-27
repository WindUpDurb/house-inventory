"use strict";

var mysql = require("mysql");

var database = mysql.createConnection(process.env.JAWSDB_URL || {
    host : "localhost",
    user : "root",
    "password" : "Ibanez19",
    "database" : "houseInventory"
});


database.query(`CREATE TABLE IF NOT EXISTS listOfRooms VALUES (roomNumber INTEGER, room TEXT)`);



database.connect();

module.exports = database;