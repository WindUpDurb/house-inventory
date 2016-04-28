"use strict";

var mysql = require("mysql");

var database = mysql.createConnection("mysql://d2d0kcj5hc7r1ohz:cb2gsgzi205houee@tviw6wn55xwxejwj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/bdydhhppkz47fixx" || {
    host : "localhost",
    user : "root",
    "password" : "Ibanez19",
    "database" : "houseInventory"
});

database.connect();

database.query(`CREATE TABLE IF NOT EXISTS listOfRooms (roomNumber INT, room TEXT)`);

module.exports = database;