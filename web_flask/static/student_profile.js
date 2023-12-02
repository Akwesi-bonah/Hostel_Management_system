$(document).ready(function () {
  // Function to show validation errors using SweetAlert
  function showValidationErrors(errors) {
    var errorMessage = "Please check the following fields:\n\n";
    for (var i = 0; i < errors.length; i++) {
      errorMessage += "- " + errors[i] + "\n";
    }
    Swal.fire({
      title: "Validation Error",
      text: errorMessage,
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK",
    });
  }

  $("#updateSelf").submit(function (event) {
    event.preventDefault();
    var studentId = $(this).data("student-id");
    var formData = {
      first_name: $("#first_name").val(),
      last_name: $("#last_name").val(),
      other_name: $("#other_name").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      date_of_birth: $("#date_of_birth").val(),
      gender: $("#gender").val(),
      address: $("#address").val(),
      disability: $("#disability").val(),
      password: $("#password").val(),
      guardian_name: $("#guardian_name").val(),
      guardian_phone: $("#guardian_phone").val(),
      student_number: $("#student_number").val(),
      program: $("#program").val(),
    };
    console.log(formData);
    Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to update student information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "http://127.0.0.1:5003/api/v1/student/" + studentId,
          type: "PUT",
          contentType: "application/json",
          data: JSON.stringify(updatedData),
          success: function (response) {
            Swal.fire({
              title: "Success!",
              text: "Student information updated successfully.",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          },
          error: function (xhr, status, error) {
            Swal.fire({
              title: "Error!",
              text: "Failed to update student information. Please try again.",
              icon: "error",
              confirmButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          },
        });
      }
    });
  });
});
