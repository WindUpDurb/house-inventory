"use strict";

var express = require("express");
var router = express.Router();
var RoomOperations = require("../models/listofrooms");

router.route("/")
    .get(function (request, response) {
            RoomOperations.getListOfRooms(function(error, listOfRooms) {
               if (error) {
                       return response.status(400).send(error);
               }

                response.render("../views/index", {
                    roomList : listOfRooms
                });

            });
    })
    .post(function (request, response) {
       RoomOperations.addNewRoom(request.body, function(error) {
               if (error) {
                       return response.status(400).send(error);
               }

               response.send("Request Processed")
       })
    });


module.exports = router;