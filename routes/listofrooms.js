"use strict";

var express = require("express");
var router = express.Router();
var RoomListOperations = require("../models/listofrooms");
var RoomOperations = require("../models/rooms");

router.route("/")
    .get(function (request, response) {
            RoomListOperations.getListOfRooms(function(error, listOfRooms) {
               if (error) {
                       return response.status(400).send(error);
               }
                console.log("Room List ", listOfRooms)
                response.render("../views/index", {
                    roomList : listOfRooms
                });

            });
    })
    .post(function (request, response) {
       RoomListOperations.addNewRoom(request.body, function(error) {
               if (error) {
                       return response.status(400).send(error);
               }
               response.send("Request Processed")
       })
    })
    .delete(function (request, response) {
        var toDelete = request.body.roomToDelete;
        var roomNumber = request.body.roomNumber;
        RoomListOperations.deleteRoom(toDelete, roomNumber, function (error) {
           if (error) {
               return response.status(400).send(error);
           }
            RoomListOperations.getListOfRooms(function(error, listOfRooms) {
                if (error) {
                    return response.status(400).send(error);
                }
                console.log("Room List ", listOfRooms)
                response.send("../views/index", {
                    roomList : listOfRooms
                });
            });
        });
    });

router.route("/:roomNumber")
    .get(function (request, response) {
        var roomNumber = request.params.roomNumber;
        RoomOperations.getRoomData(roomNumber, function(error, roomData) {
            if (error) {
                return response.status(400).send(error);
            }
            RoomListOperations.getListOfRooms(function(error, listOfRooms) {
                if (error) {
                    return response.status(400).send(error);
                }
                //so the current room and can be double clicked and delete event can be triggered
                var currentRoomInData = 0;
                for (var i = 0; i < listOfRooms.length; i++) {
                    if (roomNumber.substr(4) === listOfRooms[i].roomNumber.toString()) {
                        currentRoomInData = i;
                    }
                }
                var currentRoomData = listOfRooms[currentRoomInData];
                //listOfRooms.splice(currentRoomInData, 1);
                console.log(roomData)
                    response.render("../views/rooms", {
                        itemsInRoom : roomData,
                        roomNumberIn : roomNumber.substr(4),
                        roomList : listOfRooms,
                        currentRoom : currentRoomData
                        }
                    );
                });
             });
    })
    .post(function (request, response) {

        var itemData = request.body;
        var tableName =request.params.roomNumber;
        console.log("parameters :", request.params);
        console.log("itemData ", itemData);
        RoomOperations.addItemToRoom(itemData, tableName, function (error, roomData) {
            if (error) {
                return response.status(400).send(error);
            }
            response.render("../views/rooms");
        });
    })
    .delete(function (request, response) {
        var toDelete = request.body.toDelete;
        var tableToUpdate = request.body.tableToUpdate;
        RoomOperations.deleteItemFromRoom(toDelete, tableToUpdate, function (error) {
           if (error) {
               return response.status(400).send(error);
           }
            response.send();
        });
    });

module.exports = router;