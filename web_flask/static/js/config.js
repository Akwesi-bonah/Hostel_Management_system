 $(document).ready(function() {
    $("#setConfig").on("click", function(event) {
      event.preventDefault();

      var startDate = new Date($("#startDate").val());
      var expiryDate = new Date($("#endDate").val());
      var currentDate = new Date();
      var sixMonthsLater = new Date(startDate);
      sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

      if (startDate < currentDate) {
        Swal.fire({
          title: "Error!",
          text: "Start date should not be less than today's date.",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      } else if (expiryDate <= sixMonthsLater) {
        Swal.fire({
          title: "Error!",
          text: "Expiry date should be at least 6 months greater than start date.",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      }

      var formData = {
        "start_date": startDate,
        "expiry_date": expiryDate,
        "user_id": $("#setConfig").data("user-id")
      };

      $.ajax({
        url: "http://127.0.0.1:5003/api/v1/configure",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function(response) {
          Swal.fire({
            title: "Success!",
            text: "Configuration set successfully.",
            icon: "success",
            confirmButtonText: "OK"
          }).then(function() {
            location.reload();
          });
        },
        error: function(xhr, status, error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to set configuration. Please try again.",
            icon: "error",
            confirmButtonText: "OK"
          });
        }
      });
    });
  });