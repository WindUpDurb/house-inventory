"use strict";

var roomListOperations = {

    openAddRoomModal : function () {
        $("#clickToAddRoom").click(function () {
            console.log("Woriking")
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
                   $("#addRoomModal").modal("hide");
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
                   $("#deleteRoomModal").modal("hide");
               }
           })
        });
    },
    
    openAddItemModal : function () {
        $("#addItemModalButton").click(function () {
            $("#addItemModal").modal("show");
        });
    },

    addItem : function () {
        $("#addItemButton").click(function () {
           var $itemDescription = $("#newItemDescription").val();
           var $itemCategory = $("#newItemCategory").val();
           var $itemValue = $("#newItemValue").val();
           var $roomNumber = $("#roomNumber").text();
           var itemData = {
               description : $itemDescription,
               category : $itemCategory,
               itemValue : $itemValue
           };
           $.ajax({
               url : `/api/listofrooms/room${$roomNumber}`,
               method : "POST",
               data : itemData,
               success : function () {
                   $("#addItemModal").modal("hide");
                   console.log("Response Received")
               }
           })

        });
    },

    openDeleteItemModal : function () {
        $(".deleteItemButton").click(function () {
            var toDelete = $(this).attr("data-name");
            $("#itemToDeleteSpan").text(toDelete);
            $("#deleteItemModal").modal("show");

        });
    },

    deleteItem : function () {
        $("#confirmDeleteItemButton").click(function () {
           var $toDelete = $("#itemToDeleteSpan").text();
           var roomNumber = $("#roomNumber").text().toLowerCase().split(" ").join("");
           var toDeleteData = {
             toDelete : $toDelete,
             tableToUpdate : roomNumber
           };
           $.ajax({
              url : `/api/listofrooms/${roomNumber}`,
              method : "DELETE",
              data : toDeleteData,
              success : function () {
                  $("#deleteItemModal").modal("hide");
                  console.log("Response Received ")
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
    roomListOperations.openAddRoomModal();
    roomListOperations.openAddItemModal();
    roomListOperations.addItem();
    roomListOperations.openDeleteItemModal();
    roomListOperations.deleteItem();
};

$(document).ready(initialize);