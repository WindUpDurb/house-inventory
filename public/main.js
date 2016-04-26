"use strict";

var roomListOperations = {

    openAddRoomModal : function () {
        $("#clickToAddRoom").click(function () {
             $("#addRoomModal").modal("show");
        });
    },

    addNewRoom : function () {
        $("#addRoomButton").click(function () {
            var $newRoomName = $("#newRoomName").val();
            var $newRoomNumber = $("#newRoomNumber").val();
            var newRoomData = {
                roomNumber : $newRoomNumber,
                room : $newRoomName
            };
            $.ajax({
               url : "/api/listofrooms",
               method : 'POST',
               data : newRoomData,
               success : function () {
                   console.log("New Room Created")
               }
            });
        });
    },
    
    askRoomToDelete : function () {
        $(".room").on("dblclick", function () {
            var roomToDelete = $(this).attr("data-room");
            $("#roomToDeleteSpan").text(roomToDelete);
            $("#deleteRoomModal").modal("show");
        })
    },

    deleteRoom : function () {
        $("#deleteRoomButton").click(function () {
           var $roomToDelete = $("#roomToDeleteSpan").text().split("-");
           var toDeleteData = {
               roomToDelete : $roomToDelete[0],
               roomNumber : $roomToDelete[1]
           };
           $.ajax({
               url : "/api/listofrooms",
               method : "DELETE",
               data : toDeleteData,
               success : function () {
                   console.log("Room has been deleted")
               }
           })
        });

    }


};


var initialize = function () {
    roomListOperations.openAddRoomModal();
    roomListOperations.addNewRoom();
    roomListOperations.askRoomToDelete();
    roomListOperations.deleteRoom();
};

$(document).ready(initialize);