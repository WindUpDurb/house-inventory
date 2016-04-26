"use strict"

var database = require("../config/db");

var operations = {
    
    getRoomData : function (roomNumber, callback) {
        database.query(`SELECT * FROM ${roomNumber}`, callback);
    },

    addItemToRoom : function (itemData, roomNumber, callback) {

    }
    
};

module.exports = operations;