$(document).ready(function () {
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

  // Event listener for form submission
  $('#registerStudent').on('click', function(event) {
    event.preventDefault();

    // Check form validation
    var form = $('#registerForm')[0];
    if (!form.checkValidity()) {
      form.reportValidity(); // Trigger HTML5 form validation
      return;
    }

    var formData = {
      first_name: $('#first_name').val(),
      last_name: $('#last_name').val(),
      other_name: $('#other_name').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      date_of_birth: $('#date_of_birth').val(),
      gender: $('#gender').val(),
      address: $('#address').val(),
      disability: $('#disability').val(),
      password: $('#password').val(),
      guardian_name: $('#guardian_name').val(),
      guardian_phone: $('#guardian_phone').val(),
      student_number: $('#student_number').val(),
      program: $('#program').val(),
      level: $('#level').val()
    };

    // Show confirmation dialog using SweetAlert
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
        // If confirmed, proceed with form submission
        $.ajax({
          url: 'http://127.0.0.1:5003/api/v1/student', // Update the correct URL here
          type: 'POST',
          data: JSON.stringify(formData),
          contentType: 'application/json',
          success: function(response) {
            Swal.fire({
              title: 'Form Submitted!',
              text: 'Your form has been submitted successfully.',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
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
        });
      }
    });
  });


});