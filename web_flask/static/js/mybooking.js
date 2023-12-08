document.getElementById('quickPayBtn').addEventListener('click', function() {
var HOST = "https://www.aflahgh.tech/api/";
    var booking_id = $(this).data('book-id');
    var paymentReference = 'PAYREF_' + Math.floor((Math.random() * 1000000000) + 1);

    // Fetch payment info for the booking ID
    $.ajax({
        url: HOST + "paymentInfo/" + booking_id,
        method: 'GET',
        success: function(response) {
            var paymentDetails = response.booking_info;

            const swalWithInput = Swal.mixin({
                input: 'number',
                inputAttributes: {
                    autocapitalize: 'off',
                    placeholder: 'Enter amount to pay',
                    step: '0.01'
                },
                confirmButtonText: 'Proceed',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                showLoaderOnConfirm: true,
                preConfirm: (amount) => {
                    if (!amount || amount <= 0) {
                        Swal.showValidationMessage(`Please enter a valid amount.`);
                    }
                    return amount;
                },
                allowOutsideClick: () => !Swal.isLoading()
            });

            swalWithInput.fire({
                title: 'Payment Details',
                html: `<div>Amount to be paid: ${paymentDetails.room_type_price}</div>
                       <div>Amount already paid: ${paymentDetails.paid}</div>`,
                icon: 'info'
            }).then((result) => {
                if (result.isConfirmed) {
                    var amountToPay = result.value;

                    var handler = PaystackPop.setup({
                        key: 'pk_test_4ccdf50310beaaefdde4febbcef5fee8fbbd7011',
                        email: paymentDetails.student_email,
                        amount: parseFloat(amountToPay) * 100,
                        currency: 'GHS',
                        ref: paymentReference,
                        metadata: {
                            custom_fields: [
                                {
                                    display_name: paymentDetails.student_name,
                                    variable_name: paymentDetails.room_name,
                                    value: paymentDetails.booking_id
                                }
                            ]
                        },
                        callback: function(response){
                            $.ajax({
                                url: HOST + "payment",
                                method: 'POST',
                                data: JSON.stringify({
                                    booking_id: booking_id,
                                    amount: parseFloat(amountToPay),
                                    student_id: paymentDetails.student_id,
                                    reference_id: response.reference,
                                    room_type_price: paymentDetails.room_type_price,
                                }),
                                contentType: 'application/json',
                                success: function(response) {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'Payment recorded successfully.',
                                        icon: 'success'
                                    });
                                },
                                error: function(xhr, status, error) {
                                    var errorMessage = "An error occurred.";
                                    if (xhr.responseJSON && xhr.responseJSON.error) {
                                        errorMessage = xhr.responseJSON.error;
                                    }
                                    Swal.fire({
                                        title: 'Error',
                                        text: errorMessage,
                                        icon: 'error'
                                    });
                                }
                            });
                        },
                        onClose: function(){
                            console.log('Payment modal closed');
                        }
                    });
                    handler.openIframe();
                }
            });
        },
        error: function(xhr, status, error) {
            var errorMessage = "An error occurred.";
            if (xhr.responseJSON && xhr.responseJSON.error) {
                errorMessage = xhr.responseJSON.error;
            }
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error'
            });
        }
    });
});
