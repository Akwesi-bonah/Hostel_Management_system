$(document).ready(function () {
  $("#reserve").on("click", function (event) {
    event.preventDefault();

    var jsonData = {
      room_id: $("#room_name").val(),
      no_of_beds: $("#no_of_beds").val(),
    };

    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Confirm Reservation",
      text: "Are you sure you want to make this reservation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reserve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make a POST request to the reservation endpoint
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:5003/api/v1/reserve", // Replace with your Flask endpoint
          contentType: "application/json",
          data: JSON.stringify(jsonData),
          success: function (response) {
            // Handle successful reservation with SweetAlert
            Swal.fire({
              icon: "success",
              title: "Reservation Successful",
              text: "Room successfully reserved!",
              confirmButtonColor: "#3085d6",
            });
            console.log("Reservation successful:", response);
            // You can add further actions here if needed
          },
          error: function (error) {
            // Handle reservation error with SweetAlert
            Swal.fire({
              icon: "error",
              title: error.statusText,
              text: error.responseText,
              confirmButtonColor: "#d33",
            });
            console.error("Reservation error:", error.responseText);
            // You can display an error message or perform other actions here
          },
        });
      }
    });
  });

  var selectedRoomID; // Variable to store the selected room ID
  var selectedStudentID; // Variable to store the selected student ID
  $(".assign-room").on("click", function () {
    selectedRoomID = $(this).data("room-id");
  });
  $("#studentName").on("change", function () {
    selectedStudentID = $(this).val();
  });

  $(".proceed").on("click", function (event) {
    event.preventDefault();
    if (!selectedStudentID) {
      // Show SweetAlert if a student is not selected
      Swal.fire({
        title: "Select a Student",
        text: "Please select a student before proceeding.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    var bookingData = {
      room_id: selectedRoomID,
      student_id: selectedStudentID,
    };

    Swal.fire({
      title: "Confirm Booking",
      text: "Are you sure you want to book this room?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:5003/api/v1/booking",
          contentType: "application/json",
          data: JSON.stringify(bookingData),
          success: function (response) {
            console.log("Booking successful:", response);
            Swal.fire({
              title: "Success!",
              text: "Room booked successfully.",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            }).then(() => {
              location.reload();
            });
          },
          error: function (xhr, status, error) {
            let errorMessage = "You have already booked a room.";

            if (xhr.responseJSON && xhr.responseJSON.message) {
              errorMessage = xhr.responseJSON.message;
            }

            Swal.fire({
              title: "Error!",
              text: errorMessage,
              icon: "error",
              showCancelButton: false,
              confirmButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          },
        });
      }
    });
  });
  selectedRoomID = null;
  selectedStudentID = null;
});
