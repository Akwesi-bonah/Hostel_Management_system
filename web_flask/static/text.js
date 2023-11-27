$(document).ready(function() {
    // Function to show validation errors using SweetAlert
    function showValidationErrors(errors) {
      var errorMessage = 'Please check the following fields:\n\n';
      for (var i = 0; i < errors.length; i++) {
        errorMessage += '- ' + errors[i] + '\n';
      }
      Swal.fire({
        title: 'Validation Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
    }

  $("#AddRoomData").on("click", function(event) {
    event.preventDefault();

    var form = $("#RoomForm")[0];
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var formData = {
      room_name: $("#roomNo").val(),
      room_type: $("#roomType").val(),
      block: $("#blockId").val(),
      gender: $("#gender").val(),
      floor: $("#floor").val(),
      no_of_beds: $("#noOfBeds").val()
    };

  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to submit the form?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, submit it!'
  }).then((result) => {
    if (result.isConfirmed) {
    $.ajax({
      url: "http://127.0.0.1:5003/api/v1/rooms",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function(response) {
        console.log("Room created:", response);
        Swal.fire({
          title: "Success!",
          text: "Room has been created successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK"
        }).then(() => {
          $("#roomCreateUpdate").modal("hide");
          location.reload();
        });
      },
      error: function(xhr, status, error) {
        console.error("Error creating room:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error creating the room.",
          icon: error,
          confirmButtonColor: "#d33",
          confirmButtonText: "OK"
        });
      }
    });
  });
  });

  // For editing a room (Assuming it's similar to the user edit function)
  $(".edit-room").on("click", function(event) {
    event.preventDefault();

  });

  // For deleting a room
  $(".delete-room").on("click", function(event) {
    event.preventDefault();
    var roomId = $(this).data("room-id");

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this room. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "http://127.0.0.1:5003/api/v1/rooms/" + roomId,
          method: "DELETE",
          success: function(response) {
            console.log("Room deleted:", response);
            Swal.fire({
              title: "Deleted!",
              text: "The room has been deleted.",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK"
            }).then(() => {
              location.reload();
            });
          },
          error: function(xhr, status, error) {
            console.error("Error deleting room:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the room.",
              icon: "error",
              confirmButtonColor: "#d33",
              confirmButtonText: "OK"
            });
          }
        });
      }
    });
  });
});
