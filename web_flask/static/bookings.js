$(document).ready(function() {
  // Code to handle filter change
  $('#blockFilter, #roomTypeFilter').change(function() {
    var selectedBlock = $('#blockFilter').val();
    var selectedRoomType = $('#roomTypeFilter').val();

    // Loop through table rows to show/hide based on selected filters
    $('.datatable tbody tr').each(function() {
      var blockValue = $(this).find('td:eq(2)').text();
      var roomTypeValue = $(this).find('td:eq(1)').text();

      if ((selectedBlock === '' || blockValue === selectedBlock) &&
          (selectedRoomType === '' || roomTypeValue === selectedRoomType)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
