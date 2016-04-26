"use strict";

var database = require("../config/db");

var operations = {

    getListOfRooms : function (callback) {
        database.query("SELECT * FROM listOfRooms", callback);
    },

    addNewRoom : function (newRoom, callback) {
        database.query(`INSERT INTO listOfRooms VALUES ("${newRoom.roomNumber}", "${newRoom.room}")`, function (error) {
            callback(error);
        })
    },

    deleteRoom : function (roomToDelete, callback) {
        console.log("The room to delete ", roomToDelete)
        database.query(`DELETE FROM listOfRooms WHERE room = "${roomToDelete}";`, function (error) {
            callback(error);
        });
    }


};

module.exports = operations;