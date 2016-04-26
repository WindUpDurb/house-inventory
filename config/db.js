"use strict";

var mysql = require("mysql");

var database = mysql.createConnection({
    host : "localhost",
    user : "root",
    "password" : "Ibanez19",
    "database" : "houseInventory"
});

database.connect();

module.exports = database;