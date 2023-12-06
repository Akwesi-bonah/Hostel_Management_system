$(document).ready(function () {
  $("#blockFilter, #roomTypeFilter").change(function () {
    var selectedBlock = $("#blockFilter").val();
    var selectedRoomType = $("#roomTypeFilter").val();

    $(".datatable tbody tr").each(function () {
      var blockValue = $(this).find("td:eq(2)").text();
      var roomTypeValue = $(this).find("td:eq(1)").text();

      if (
        (selectedBlock === "" || blockValue === selectedBlock) &&
        (selectedRoomType === "" || roomTypeValue === selectedRoomType)
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
$(".studbook").on("click", function (event) {
  event.preventDefault();

  var roomID = $(this).data("room-id");
  var studentID = $(this).data("user-id");

  var bookingData = {
    room_id: roomID,
    student_id: studentID
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
                  error: function(xhr, status, error) {
           var errorMessage = "An error occurred.";
    if (xhr.responseJSON && xhr.responseJSON.error) {
      errorMessage = xhr.responseJSON.error;
    }

    Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
          }
,
      });
    }
  });
});

});
