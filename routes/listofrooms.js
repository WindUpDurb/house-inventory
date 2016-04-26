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
            response.send("Delete Processed");
        });
    });

router.route("/:roomNumber")
    .get(function (request, response) {

        response.send();
    });

module.exports = router;