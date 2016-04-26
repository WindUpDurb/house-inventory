"use strict";

var database = require("../config/db");

var operations = {

    getListOfRooms : function (callback) {
        database.query("SELECT * FROM listOfRooms", callback);
    },

    addNewRoom : function (newRoom, callback) {
        database.query(`INSERT INTO listOfRooms VALUES ("${newRoom.roomNumber}", "${newRoom.room}")`);
        database.query(`CREATE TABLE room${newRoom.roomNumber} (roomNumberIn Integer, description TEXT, category TEXT, itemValue Integer)`, function (error) {
            callback(error);
        });

    },

    deleteRoom : function (roomToDelete, roomNumber, callback) {
        database.query(`DELETE FROM listOfRooms WHERE room = "${roomToDelete}";`);
        database.query(`DROP TABLE room${roomNumber};`, function (error) {
            callback(error);
        });
    }


};

module.exports = operations;