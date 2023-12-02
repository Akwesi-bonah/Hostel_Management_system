$(document).ready(function() {
    $('#block, #room_type').on('change', function() {
        var block = $('#block').val();
        var roomType = $('#room_type').val();

        // Check if both Block and Room Type are selected
        if (block && roomType) {
            // Show SweetAlert "Please wait" message
            Swal.fire({
                title: 'Please wait',
                html: 'Fetching room details...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });

            fetchRooms(block, roomType);
        }
    });

    function fetchRooms(block, roomType) {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:5003/api/v1/fetch',
            data: {
                block_id: block,
                room_type_id: roomType
            },
            success: function(response) {
                Swal.close();
                var roomSelect = $('#room_name');
     // Clear existing options


    // Add fetched room names and IDs to the select field
    $.each(response.rooms, function(index, room) {
        roomSelect.append($('<option>', {
            value: room.id,
            text: room.room_name
        }));
    });
            },
            error: function(error) {
                // Close SweetAlert and show an error message if there's an error
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch room details. Please try again.',
                });
                console.log('Error:', error);
            }
        });
    }



});
