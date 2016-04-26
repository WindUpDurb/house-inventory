"use strict"

var database = require("../config/db");

var operations = {
    
    getRoomData : function (roomNumber, callback) {
        database.query(`SELECT * FROM ${roomNumber}`, callback);
    },

    addItemToRoom : function (itemData, tableName, callback) {
        var roomNumber = tableName.replace(/[a-z]+?\s/gi, "");
        var description = itemData.description;
        var category = itemData.category;
        var itemValue = itemData.itemValue;
       database.query(`INSERT INTO room${roomNumber} VALUES ("${roomNumber}", "${description}", "${category}", "${itemValue}")`, function (error) {
           callback(error);
       })
    }
    
};

module.exports = operations;