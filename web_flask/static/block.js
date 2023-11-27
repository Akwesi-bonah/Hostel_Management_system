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

// Event listener for form submission
$('#AddData').on('click', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Check form validation
  var form = $('#FormPost')[0];
  if (!form.checkValidity()) {
    form.reportValidity(); // Trigger HTML5 form validation
    return;
  }

  // Construct JSON object from form data
  var formData = {
    campus: $('#campus').val(),
    name: $('#name').val(),
    description: $('#description').val(),
    status: $('#status').val()
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
        url: 'http://127.0.0.1:5003/api/v1/block',
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
          // On error, handle the error
          console.error('Error:', error);

          // Show SweetAlert error message or handle the error appropriately
          Swal.fire({
            title: 'Error!',
            text: "Block Name already exists",
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

// Edit button click event to populate modal fields with block data and show modal
$('.blockEditBtn').on('click', function(event) {
  event.preventDefault();

  // Get the block ID from the data attribute
  var blockId = $(this).data('block-id');

  // Fetch block data for editing
  $.get({
    url: 'http://127.0.0.1:5003/api/v1/block/' + blockId, // Endpoint for fetching block data by ID
    success: function(block) {
      // Populate the modal form fields with fetched block data for editing
      $('#campus').val(block.campus);
      $('#name').val(block.name);
      $('#description').val(block.name);
      $('#status').val(block.status)

      // show form
      $('#createUpdate').modal('show');
    },
    error: function(xhr, status, error) {
      console.error('Error fetching block:', error);
    }
  });
});


// Delete button click event
$('.blockDeleteBtn').on('click', function(event) {
 event.preventDefault();
    var blockId = $(this).data("block-id");
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this block. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "http://127.0.0.1:5003/api/v1/block/" + blockId,
          method: "DELETE",
          success: function (response) {
            Swal.fire({
              title: "Deleted!",
              text: "The block has been deleted.",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
            }).then(() => {
              // Reload the page after successful deletion
              location.reload();
            });
          },
          error: function (xhr, status, error) {
            console.error("Error deleting block:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the block.",
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