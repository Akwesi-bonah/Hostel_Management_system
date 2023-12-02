$(document).ready(function () {

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

  function submitForm(formData) {
    $.ajax({
      url: "http://127.0.0.1:5003/api/v1/staff",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        console.log("Success:", response);
        Swal.fire({
          title: "Form Submitted!",
          text: "Your form has been submitted successfully.",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);

  let errorMessage = "An error occurred. Please try again.";

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

function editUser() {
  $(".edit-user").on("click", function (event) {
    event.preventDefault();
    var row = $(this).closest("tr");
    var campus = row.find("td:eq(1)").text();
    var name = row.find("td:eq(2)").text();
    var email = row.find("td:eq(3)").text();
    var phone = row.find("td:eq(4)").text();
    var role = row.find("td:eq(5)").text();
    var status = row.find("td:eq(6)").text();

    $("#campus").val(campus);

    // For role (assuming "staffRole" is the select element)
    $("#staffRole option").filter(function () {
      return $(this).text() === role;
    }).prop("selected", true);

    // For status (assuming "status" is the select element)
    $("#status option").filter(function () {
      return $(this).text() === status;
    }).prop("selected", true);

    $("#staffName").val(name);
    $("#staffEmail").val(email);
    $("#staffPhone").val(phone);

    $("#staffCreateUpdate").modal("show");
  });
}

  function updateUser() {
    $("#updateUser").on("click", function (event) {
      event.preventDefault();
      var form = $("#staffFrom")[0];
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var formData = {
        campus: $("#campus").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        role: $("#role").val(),
        status: $("#status").val(),
      };
      var userId =  $(this).data('staff-id');;
      $.ajax({
        url: "http://127.0.0.1:5003/api/v1/staff/" + userId,
        type: "PUT",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function (response) {
          console.log("User updated:", response);
          Swal.fire({
            title: "Success!",
            text: "User has been updated successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then(() => {
            $("#staffCreateUpdate").modal("hide");
          });
        },
        error: function (xhr, status, error) {
          Swal.fire({
            title: "Error!",
            text: error,
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        },
      });
    });
  }

function deleteUser() {
  $(".delete-user").on("click", function (event) {
    event.preventDefault();
    var userId = $(this).data("user-id");
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this user. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "http://127.0.0.1:5003/api/v1/staff/" + userId,
          method: "DELETE",
          success: function (response) {
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            }).then(() => {
              // Reload the page after successful deletion
              location.reload();
            });
          },
          error: function (xhr, status, error) {
            console.error("Error deleting user:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the user.",
              icon: "error",
              confirmButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          },
        });
      }
    });
  });
}

  $("#Addstaff").on("click", function (event) {
    event.preventDefault();
    var form = $("#staffFrom")[0];
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var formData = {
      campus: $("#campus").val(),
      name: $("#staffName").val(),
      email: $("#staffEmail").val(),
      phone: $("#staffPhone").val(),
      password: $("#staffPassword").val(),
      role: $("#staffRole").val(),
      status: $("#status").val(),
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit the form?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        submitForm(formData);
      }
    });
  });
function selfUser() {
    $("#uStaff").on("click", function (event) {
        event.preventDefault();
        var form = $("#staffFrom")[0];
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        var formData = {
            campus: $("#campus").val(),
            name: $("#name").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
        };

        var userId = $(this).data('staff-id');

        // Show confirmation dialog using SweetAlert
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to update the user. Confirm?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with the AJAX request
                $.ajax({
                    url: "http://127.0.0.1:5003/api/v1/staff/" + userId,
                    type: "PUT",
                    data: JSON.stringify(formData),
                    contentType: "application/json",
                    success: function (response) {
                        console.log("User updated:", response);
                        Swal.fire({
                            title: "Success!",
                            text: "User has been updated successfully.",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "OK",
                        }).then(() => {
                            $("#staffCreateUpdate").modal("hide");
                        });
                    },
                    error: function (xhr, status, error) {
                        Swal.fire({
                            title: "Error!",
                            text: error,
                            icon: "error",
                            confirmButtonColor: "#d33",
                            confirmButtonText: "OK",
                        });
                    },
                });
            }
        });
    });
}


selfUser();
  editUser();
  updateUser();
  deleteUser();
});
