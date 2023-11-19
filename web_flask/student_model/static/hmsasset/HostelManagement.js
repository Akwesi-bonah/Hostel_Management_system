



/**
 * Author: Emmanuel & Mathias
 * Contact: 0249901686
 *
 *
 * */


var obj;
//var basUrl = '/HMSFrontEnd';
var basUrl = '';

$(document).ready(function () {
    $(document).on('change', '.btn-file :file', function () {
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function (event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }

    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    function readURLmy(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img-myphoto').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function () {
        readURL(this);
    });

    $("#imgInpMy").change(function () {
        readURLmy(this);
    });

    getcheckindate();
});


function successmessage(message) {
    Swal.fire(
        message,
        'Thank you!',
        'success'
    );
}


function warningmessage(message) {


    Swal.fire(
        message,
        'Please try again!',
        'warning'
    );
}

function ShowLoader(message) {

    swal({
        title: 'Processing...Please wait!'
    });
    swal.showLoading();
}


$('.showloader').click(function () {
    Swal.fire(
        'Processing...Please wait!'
    );
    swal.showLoading();
});

$(document).ready(function () {
    $('.displaytablelist').DataTable();

    //Initialize Select2 Elements
    $('.select2').select2();

});



$("#printme").click(function () {
    $("#invoice").printThis();
});
$(function () {
    //$('#dob').datetimepicker();
    $('#dob').glDatePicker(
        {
            formatDate: 'yyyy-mm-dd',
            cssName: 'flatwhite',

        });


});
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, day, month].join('-');
}

console.log(formatDate('04/07/2023'));


//$(document).ready(function () {
//    var date_input = $('input[name="dob"]'); //our date input has the name "date"
//    //var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
//    var options = {
//        format: 'yyyy-mm-dd',
//        endDate: '-11y',
//        autoclose: true,
//    };
//    date_input.datepicker(options);
//})


$("#RegisterFormPost").submit(function (e) {
    e.preventDefault();
});

$('#btnsubmitregister').on("click", function () {
    var date = $("#dob").val();
    newdate = date.split("/").reverse().join("-");





    var pass = $("#password").val();
    var confirmpass = $("#confirmpass").val();

    var message = "Invalid Input";
    if (pass =="") {

        Swal.fire(
            message,
            'Invalid password',
            'warning'
        );
        $("#campusID").focus();
        return;
    }
    if (pass != confirmpass) {

        Swal.fire(
            message,
            'passwords do not match!',
            'warning'
        );
        $("#campusID").focus();
        return;
    }
    var cardimage = $("#cardimage").val();
    var termscon = $("#terms-con").val();
    var myphoto = $("#myphoto").val();

    if (myphoto=="") {

        Swal.fire(
            message,
            'Id card upload is required',
            'warning'
        );
        $("#cardimage").focus();
        return;
    }

    if ($("#terms-con").prop("checked") == false) {

        Swal.fire(
            message,
            'You must accept the terms and conditions',
            'warning'
        );
        $("#terms-con").focus();
        return;
    }

    if (checkStrength(pass) != "Strong") {

        Swal.fire(
            message,
            'You password is weak. consider adding lower, upper and numeric cases',
            'warning'
        );
        return;
    }
    //var files = $('.img1 img').attr('src');
    var myphoto = $("#img-myphoto").attr('src');
    var cardimage = "";// $("#imgInp").attr('src');

    var data = new FormData();
    var files = $("#imgInpMy").get(0).files;
    var filescard = $("#imgInp").get(0).files;
    if (files.length > 0) {
        data.append("studentPic", files[0]);
    }

    //alert(files);
    //return;
    obj = {
        "institutionID": $("#studInstitution").val(),
        "campusID": $("#campusID").val(),
        "idType": $("#idtype").val(),
        "idNumber": $("#idnumber").val(),
        "password": $("#password").val(),
        "studentNumber": $("#idnumber").val(),
        "program": $("#programme").val(),
        "studentLevel": $("#studentLevel").val(),
        "firstName": $("#firstname").val(),
        "lastName": $("#lastname").val(),
        "email": $("#email").val(),
        "phoneNumber": $("#phone").val(),
        "dateOfBirth": newdate,
        "gender": $("input[name='gender']:checked").val(),
        "guidianName": $("#idguardianname").val(),
        "guidianPhoneNo": $("#GuardianContact").val(),
        "address": $("#address").val(),
        "studentPic": "yes",
        "idFront": "yes",
        "region": $("#religion").val(),
        "nationality": $("#nationality").val(),
        "studentType": $("#studenttype").val(),
        "medicalCondition": $("#madical").val(),
        "unlawfulAct": $("#unlawfulyes").val(),
        "levelOfInvolvement": $("#unlawful").val(),
        "fathersName": $("#fathername").val(),
        "fathersPhone": $("#FatherContact").val(),

    };
   console.log(obj);
    addstudent(obj);

});

$("#imgInp").change(function () {
    return;
    /*
    var data = new FormData();
    var files = $("#imgInp").get(0).files;
    if (files.length > 0) {
        data.append("MyCard", files[0]);
    }
    $.ajax({
        url: basUrl + "/Default/UploadCard/",
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        success: function (response) {
            //code after success
            console.log(response)

        },
        error: function (er) {
            alert(er);
        }

    });
    */
});
$("#imgInpMy").change(function () {
    var data = new FormData();
    var files = $("#imgInpMy").get(0).files;
    if (files.length > 0) {
        data.append("MyImage", files[0]);
    }
    $.ajax({
        url: basUrl +"/Default/UploadImage/",
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        success: function (response) {
            //code after success
            console.log(response);

        },
        error: function (er) {
            alert(er);
        }

    });
});

function addstudent(ReserveObject) {


    swal.queue([{
        title: 'Confirm Registration',
        confirmButtonText: 'Proceed',
        text: 'Are you sure you want to register ',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: function () {
            return new Promise(function (resolve) {
                $.ajax({
                    contentType: 'application/json',
                    //dataType: 'json',
                    data: JSON.stringify(ReserveObject),
                    success: function (data) {
                        //console.log(data);
                        if (data.status == 1) {

                            $("#email").val("");
                            $("#password").val("");
                            $("#confirmpass").val("");

                            Swal.fire({
                                title: "Registration was successful!",
                                text: "Redirecting in 3 seconds.",
                                type: "success",
                                timer: 2000,
                                showConfirmButton: true
                            }).then(function () {
                                window.location.href = basUrl + "/Student/index";
                            });

                        } else {
                            Swal.fire(
                                data.message,
                                'Try again!',
                                'warning'
                            );

                        }
                    },
                    error: function (data) {
                        //app.log("Device control failed");
                        //console.log(data);

                        swal('Error', 'Unable to process request', 'error')
                        //resolve()
                    },
                    processData: false,
                    type: 'POST',
                    url: basUrl + '/Default/Register'
                });

            })
        }
    }])

}




$('#btnproceed').on("click", function () {

    Swal.fire(
        'Redirecting...Please wait!'
    );
    swal.showLoading();
    window.location.href = basUrl + "/Default/Index";

});
$('#btnverify').on("click", function () {

    var email = $("#studid").val();
    var pass = "$eeeA#672";

    var message = "Invalid Input";
    if (email == "") {

        Swal.fire(
            message,
            'Student ID is required',
            'warning'
        );
        $("#studid").focus();
        return;
    }


    obj = {
        "email": email,
        "password": pass,

    };
    valstudent(obj, email);

});

function valstudent(logindata, studid) {


    swal.queue([{
        title: 'Confirm ' + studid,
        confirmButtonText: 'Proceed',
        text: 'Are you sure you own the specified ID? ',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: function () {
            return new Promise(function (resolve) {
                $.ajax({
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(logindata),
                    success: function (data) {
                        //console.log(data);
                        if (data.status == 1) {
                            $("#studname").val(data.data);
                            $("#studname").show();
                            $("#studholder").show();

                            $("#btnverify").hide();
                            $("#btnproceed").show();
                            Swal.close();
                        } else {
                            Swal.fire(
                                data.message,
                                'Try again!',
                                'warning'
                            );

                        }
                    },
                    error: function (data) {
                        //app.log("Device control failed");
                        //console.log(data);

                        swal('Error', 'Unable to process request', 'error')
                        //resolve()
                    },
                    processData: false,
                    type: 'POST',
                    url: basUrl + '/Default/VerifyStudent'
                });

            })
        }
    }])

}

$('#btnlogin').on("click", function () {

    var email = $("#loginemail").val();
    var pass = $("#loginpassword").val();

    var message = "Invalid Input";
    if (pass == "" || email=="") {

        Swal.fire(
            message,
            'Email and password are required',
            'warning'
        );
        $("#loginemail").focus();
        return;
    }


    obj = {
        "email": email,
        "password": pass,

    };
    loginstudent(obj);

});


function loginstudent(logindata) {


    swal.queue([{
        title: 'Confirm Login',
        confirmButtonText: 'Proceed',
        text: 'Are you sure you want to login ',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: function () {
            return new Promise(function (resolve) {
                $.ajax({
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(logindata),
                    success: function (data) {
                        //console.log(data);
                        if (data.status == 1) {
                            $("#loginemail").val("");
                            $("#loginpassword").val("");
                            Swal.fire({
                                title: "Login was successful!",
                                text:"Redirecting in 3 seconds.",
                                type: "success",
                                timer: 1000,
                                showConfirmButton: true
                            }).then(function () {
                                window.location.href =basUrl+ "/Student/index";
                            });

                        } else {
                            Swal.fire(
                                data.message,
                                'Try again!',
                                'warning'
                            );

                        }
                    },
                    error: function (data) {
                        //app.log("Device control failed");
                        //console.log(data);

                        swal('Error', 'Unable to process request', 'error')
                        //resolve()
                    },
                    processData: false,
                    type: 'POST',
                    url: basUrl + '/Default/Login'
                });

            })
        }
    }])

}


function checkStrength(password) {
    var strength = 0
    if (password.length < 6) {
        $('#strengthMessage').removeClass()
        $('#strengthMessage').addClass('Short')
        return 'Too short'
    }
    if (password.length > 7) strength += 1
    // If password contains both lower and uppercase characters, increase strength value.
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
    // If it has numbers and characters, increase strength value.
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
    // If it has one special character, increase strength value.
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
    // If it has two special characters, increase strength value.
    if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
    // Calculated strength value, we can return messages
    // If value is less than 2
    if (strength <= 2) {

        return 'Weak'
    } else {

        return 'Strong'
    }
}


$('#blockid').change(function () {

    LoadAvailableBed();
});

$('#roomtypeid').change(function () {

    LoadAvailableBed();
});

setInterval(function () { LoadAvailableBed(); }, 10000);

function LoadAvailableBed() {

    var blockid = $("#blockid").val();
    var roomtypeid = $("#roomtypeid").val();

    if (blockid == "none" && roomtypeid == "none") {
        return;
    }

    if (blockid == null && roomtypeid == null) {
        return;
    }
    //alert(blockid + " " + roomtypeid)
    var obj = {
        "blockID": blockid,
        "roomTypeID": roomtypeid
    };
    ////console.log(obj);
    $.ajax({
        type: 'GET',
        url: basUrl+'/Student/FilterAvailableBeds',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: obj,
        success: function (result) {
            $('#recentbeds tbody').empty();
            //console.log(result.data);
            if (result.status == 1) {
                //console.log(result.data);
                //data-id="@item.roomID" title="Delete" data-staffname="@item.roomName"
                var a = 1;
                var item = result.data;
                $.each(result.data, function (i, item) {
                    var rname = item.roomName;
                    //console.log(rname);
                    var rows = "<tr>"
                        + "<td><a href='#'>" + item.Block.name + "</a></td>"
                        + "<td>" + item.RoomType.name + "</td>"
                        + "<td>" + item.floor + "</td>"
                        + "<td>" + item.gender + "</td>"
                        + "<td><div class='product-color'><strong>Room # : </strong> " + item.roomName + "</div> <div class='product-size'><strong>Description : </strong>" + item.description + "</div></td>"
                        + "<td><button type='button' class='btn btn-sm btn-outline-info round'>" + item.bedsAvailable + "</button></td>"
                        + "<td>" + item.RoomType.amount + "</td>"
                        + "<td><div><a href ='#0' class='btn btn-info btn-glow round px-2 bkrm studbook'  data-id='" + item.roomID + "' data-staffname='" + rname + "' data-blockid='" + item.Block.blockID +"' title='Book now'> Book Now</a></div></td>"
                        + "</tr>";
                    $('#recentbeds tbody').append(rows);
                    a++;
                });
            } else {
                var rows = "<tr >"
                    + "<td style='color:red'>No bed available</td>"
                    + "</tr>";
                $('#recentbeds tbody').append(rows);

            }

        },
        error: function (result) { }
    });
}


/* function for controller actions */


$(document).on('click', '.studbook', function () {

    var roomid = $(this).attr("data-id");
    var roomname = $(this).attr("data-staffname");
    var blockid = $(this).attr("data-block");
    bookroomnow(roomid, roomname, blockid);

});
function bookroomnow(roomid, roomname, blockid) {

    obj = {
        "roomID": roomid
    };
    console.log(blockid);
    if (blockid == "7b03dfd8-e6bd-470e-9044-0123e82b07ac") {
        swal.fire({
            title: "Terms & Conditions", text: "Dear Cherished Student, on the perseverance block The rate is still Ghc9600, But pay your hostel fee fully by the end of the first semester to enjoy the GHC1,000 Discount.", type: "info", showCancelButton: true, confirmButtonClass: "btn-success", confirmButtonText: "Agree", preConfirm: function () {
                return new Promise(function (resolve) {
                    Swal.queue([{
                        title: 'Book Room',
                        confirmButtonText: 'Book',
                        text: 'Are you sure you want to book ' + roomname,
                        showCancelButton: true,
                        showLoaderOnConfirm: true,
                        preConfirm: function () {
                            return new Promise(function (resolve) {
                                $.ajax({
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    data: JSON.stringify(obj),
                                    success: function (data) {
                                        //console.log(data);
                                        if (data.status == 1) {

                                            Swal.fire({
                                                title: "Booking was successful!",
                                                text: "Redirecting in 3 seconds.",
                                                type: "success",
                                                timer: 1000,
                                                showConfirmButton: false
                                            }).then(function () {
                                                window.location.href = basUrl + "/Student/Allotment";
                                            });

                                        } else {
                                            Swal.fire(
                                                data.message,
                                                'Try again!',
                                                'warning'
                                            );
                                        }
                                    },
                                    error: function (data) {
                                        //console.log(data);
                                        swal('Error', 'Unable to book', 'error');
                                    },
                                    processData: false,
                                    type: 'POST',
                                    url: basUrl + '/Student/BookNow'
                                });

                            })
                        }
                    }])
                });
            }
        })

    }
    else {
        swal.fire({
            title: "Terms & Conditions", text: "I am aware that I must pay my hostel fees in full to secure a bed in Bani Hostel for the 2023/2024 academic year. I have agreed to complete my installment payment by 5th October 2023, or else my bed space will be sold and 80% of the payment made refunded back to me", type: "info", showCancelButton: true, confirmButtonClass: "btn-success", confirmButtonText: "Agree", preConfirm: function () {
                return new Promise(function (resolve) {
                    Swal.queue([{
                        title: 'Book Room',
                        confirmButtonText: 'Book',
                        text: 'Are you sure you want to book ' + roomname,
                        showCancelButton: true,
                        showLoaderOnConfirm: true,
                        preConfirm: function () {
                            return new Promise(function (resolve) {
                                $.ajax({
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    data: JSON.stringify(obj),
                                    success: function (data) {
                                        //console.log(data);
                                        if (data.status == 1) {

                                            Swal.fire({
                                                title: "Booking was successful!",
                                                text: "Redirecting in 3 seconds.",
                                                type: "success",
                                                timer: 1000,
                                                showConfirmButton: false
                                            }).then(function () {
                                                window.location.href = basUrl + "/Student/Allotment";
                                            });

                                        } else {
                                            Swal.fire(
                                                data.message,
                                                'Try again!',
                                                'warning'
                                            );
                                        }
                                    },
                                    error: function (data) {
                                        //console.log(data);
                                        swal('Error', 'Unable to book', 'error');
                                    },
                                    processData: false,
                                    type: 'POST',
                                    url: basUrl + '/Student/BookNow'
                                });

                            })
                        }
                    }])
                });
            }
        })
    }
    }




$(document).on('click', '.quickpay', function () {

    var allotid = $(this).attr("data-id");
    var bal = $(this).attr("data-balance");
    var payments = $(this).attr("data-count");
    quickpaynow(allotid, bal, payments);

});

function checkamount(amount) {

    return amount;
}
function quickpaynow(allotid, balance, payments) {
    swal.fire({
        title: "Terms & Conditions", text: "I am aware that I must pay my hostel fees in full to secure a bed in Bani Hostel for the 2023/2024 academic year. I have agreed to complete my installment payment by 5th October 2023, or else my bed space will be sold and 80% of the payment made refunded back to me", type: "info", showCancelButton: true, confirmButtonClass: "btn-success", confirmButtonText: "Agree", preConfirm: function () {
            return new Promise(function (resolve) {

    Swal.fire({

        title: 'Make Payment',
        confirmButtonText: 'Pay Now',
        html: 'Are you sure you want to pay online.<br> <b>Amount Due:</b> ' + balance + '<br>',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            placeholder: 'Enter amount to pay'

        },
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: 'Pay now',
        showLoaderOnConfirm: true,
        preConfirm: (amount) => {

            return new Promise(function (resolve, reject) {

                var amountpaid = parseFloat(amount);
                var avBalance = parseFloat(balance)

                if (amount === '' || !$.isNumeric(amountpaid) || amount === 0 || amount <= 0) {

                    Swal.fire(
                        'Request failed',
                        'Invalid Amount',
                        'warning'
                    )

                } else if (payments < 1 && avBalance > 2000 && amountpaid <2000) {

                    Swal.fire(
                        'Request failed',
                        'Cannot Pay less than 2000',
                        'warning'
                    )

                }
                else if (amountpaid > avBalance) {

                    Swal.fire(
                        'Request failed',
                        'Amount cannot be greator than available balance',
                        'warning')
                }
                     else {
                    //
                    resolve(amount)
                }
            })

        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.value) {
            var postdata = {
                "allotmentID": allotid,
                "Amount": result.value
            };
            Swal.fire(
                'Processing...Please wait!'
            );
            Swal.showLoading();
            $.ajax({
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(postdata),
                success: function (data) {
                    //app.log("device control succeeded");
                    console.log(data);
                    if (data.status == 1) {
                        Swal.close();
                        Swal.fire({
                            title: "Request was successful",
                            text: "Redirecting...please wait!",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: true
                        }).then(function () {
                            window.location.href = data.data;

                        });

                    } else {
                        Swal.close();
                        Swal.fire(
                            'Ooops!',
                            data.message,
                            'error'
                        )
                    }


                },
                error: function (data) {
                    Swal.close();
                    Swal.fire(
                        'Ooops!',
                        'Failed to process payment',
                        'error'
                    )
                    //swal('Error', 'Failed to process payment', 'error')
                    //resolve()
                },
                processData: false,
                type: 'POST',
                url: basUrl + '/Student/PayNow'
            });
        }
    })

    /*
    Swal.queue([{
        title: 'Make Payment',
        confirmButtonText: 'Pay Now',
        html: 'Are you sure you want to pay online.<br> <b>Amount Due:</b> ' + balance +'<br>',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            placeholder: 'Enter amount to pay'

        },
        allowOutsideClick: false,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: function (value) {
            return new Promise(function (resolve) {
                alert(value);

                $.ajax({
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(obj),
                    success: function (data) {
                        //console.log(data);
                        if (data.status == 1) {

                            Swal.fire({
                                title: "Booking was successful!",
                                text: "Redirecting in 3 seconds.",
                                type: "success",
                                timer: 1000,
                                showConfirmButton: false
                            }).then(function () {
                                window.location.href = basUrl + "/Student/Allotment";
                            });

                        } else {
                            Swal.fire(
                                data.message,
                                'Try again!',
                                'warning'
                            );
                        }
                    },
                    error: function (data) {
                        //console.log(data);
                        swal('Error', 'Unable to book', 'error');
                    },
                    processData: false,
                    type: 'POST',
                    url: basUrl + '/Student/BookNow'
                });

            })
        }
    }])

    */
            })
        },
    });
}


$(document).on('click', '.checkin', function () {

    var allotid = $(this).attr("data-id");
    var bal = $(this).attr("data-balance");
    getcheckindate(allotid, bal);

});

function getcheckindate(allotid) {

    var postdata = {
        "allotmentID": allotid
    };
    Swal.fire({
        title: 'Processing...Please wait!'
    });
    Swal.showLoading();
    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(postdata),
        success: function (data) {
            //console.log(data);
            if (data.status == 1) {

                //var stdate = data.data.FormatedstartDate;
                var stdate = new Date();
                var eddate = data.data.FormatedendDate;

               // console.log(stdate + "===" + eddate);
                $('#mycheckindate').datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    startDate: stdate,
                    endDate: eddate,
                });
                $("#mycheckin").modal("show");

            } else {

                Swal.fire(
                    'Ooops!',
                    data.message,
                    'warning'
                )
            }

            Swal.close();
        },
        error: function (data) {
            //app.log("Device control failed");
            console.log(data);
            Swal.close();
            Swal.fire(
                'Ooops!',
                'Failed to get checkin dates',
                'error'
            )
        },
        processData: false,
        type: 'POST',
        url: basUrl + '/Student/CheckInDate'
    });
}

$('#mycheckindate').change(function () {
    var mydt = $("#mycheckindate").val();
    if (mydt == "") {
        return;
    }
    verifycheckindate(mydt);
});

function verifycheckindate(date) {

    var postdata = {
        "CheckInDate": date
    };
    Swal.fire({
        title: 'Processing...Please wait!'
    });
    Swal.showLoading();
    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(postdata),
        success: function (data) {
            console.log(data);
            if (data.status == 1) {

                $("#btncheckin").show();
                Swal.close();
            } else {


                $("#mycheckindate").val("");
                $("#btncheckin").hide();
                Swal.close();
                Swal.fire(
                    'Ooops!',
                    data.message,
                    'warning'
                )
            }


        },
        error: function (data) {
            //app.log("Device control failed");
            console.log(data);
            Swal.close();
            Swal.fire(
                'Ooops!',
                'Failed to get checkin dates',
                'error'
            )
        },
        processData: false,
        type: 'POST',
        url: basUrl + '/Student/VerifyCheckInDate'
    });
}



$(document).on('click', '#btncheckin', function () {

    var mydt = $("#mycheckindate").val();
    if (mydt == "") {
        Swal.fire(
            'Check in date is required',
            'Try again!',
            'warning'
        );
        return;
    }
    RequestCheckIn(mydt);

});

function RequestCheckIn(mydt) {

    var obj = {
        "CheckInDate": mydt
    };

    swal.queue([{
        title: 'Confirm Check',
        confirmButtonText: 'Proceed',
        html: 'Are you sure you want to check for <b>' + mydt+'</b> ?',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: function () {
            return new Promise(function (resolve) {
                $.ajax({
                    contentType: 'application/json',
                    //dataType: 'json',
                    data: JSON.stringify(obj),
                    success: function (data) {
                        //console.log(data);
                        if (data.status == 1) {

                            $("#mycheckindate").val("");

                            Swal.fire({
                                title: "Request was successful!",
                                text: "Redirecting in 3 seconds.",
                                type: "success",
                                timer: 2000,
                                showConfirmButton: true
                            }).then(function () {
                                location.reload();
                            });

                        } else {
                            Swal.fire(
                                data.message,
                                'Try again!',
                                'warning'
                            );

                        }
                    },
                    error: function (data) {
                        //app.log("Device control failed");
                        //console.log(data);

                        swal('Error', 'Unable to process request', 'error')
                        //resolve()
                    },
                    processData: false,
                    type: 'POST',
                    url: basUrl + '/Student/RequestCheckInDate'
                });

            })
        }
    }])

}





$('#btnvabregister').on("click", function () {

    var pass = $("#vacpass").val();
    var confirmpass = $("#vacconpass").val();

    var message = "Invalid Input";
    if (pass == "") {

        Swal.fire(
            message,
            'Invalid password',
            'warning'
        );
        $("#campusID").focus();
        return;
    }
    if (pass != confirmpass) {

        Swal.fire(
            message,
            'passwords do not match!',
            'warning'
        );
        $("#campusID").focus();
        return;
    }
    var cardimage = "";
    var termscon = "1";
    var myphoto = "";



    if (checkStrength(pass) != "Strong") {

        Swal.fire(
            message,
            'You password is weak. consider adding lower, upper and numeric cases',
            'warning'
        );
        return;
    }
    //var files = $('.img1 img').attr('src');
    var myphoto = "";
    var cardimage = "";

    //alert(files);
    //return;
    obj = {
        "password": pass,
        "confirmpass": confirmpass,
        "studentNumber": $("#idnumber").val(),
        "studentLevel": $("#level").val(),
        "name": $("#vacname").val(),
        "lastName": "",
        "email": $("#vacemail").val(),
        "phone": $("#vacphone").val(),
        "emcontactperson": $("#vacemperson").val(),
        "emcontactphone": $("#vacemphone").val(),

    };
    addVacstudent(obj);

});

function addVacstudent(ReserveObject) {


    swal.queue([{
        title: 'Confirm Registration',
        confirmButtonText: 'Proceed',
        text: 'Are you sure you want to register ',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: function () {
            return new Promise(function (resolve) {
                $.ajax({
                    contentType: 'application/json',
                    //dataType: 'json',
                    data: JSON.stringify(ReserveObject),
                    success: function (data) {
                        //console.log(data);
                        if (data.status == 1) {

                            $("#vacemail").val("");
                            $("#vacpass").val("");
                            $("#vacconpass").val("");

                            Swal.fire({
                                title: "Registration was successful!",
                                text: "Redirecting in 3 seconds.",
                                type: "success",
                                timer: 2000,
                                showConfirmButton: true
                            }).then(function () {
                                window.location.href = basUrl + "/Vacation/index";
                            });

                        } else {
                            Swal.fire(
                                data.message,
                                'Try again!',
                                'warning'
                            );

                        }
                    },
                    error: function (data) {
                        //app.log("Device control failed");
                        //console.log(data);

                        swal('Error', 'Unable to process request', 'error')
                        //resolve()
                    },
                    processData: false,
                    type: 'POST',
                    url: basUrl + '/Default/RegisterVac'
                });

            })
        }
    }])

}


var Postobj;
var message = "Invalid request";
function FormatFormFieldData(RequestType) {
    // type 1 == confirm
    // type 2 == post


    var FieldData = [];
    var basicData;
    var valid = false;
    var message = "Failed";

    var form_id = "";//$('#form_id').val();
    var customer_id = "";//$('#customer_id').val();

    $('#itemstable tbody tr').each(function () {

        var item = {};


        $(this).find('td').each(function () {

            var id = $(this).attr("id");

            var fieldString = $(this).attr("data-field");


            if (id != '' && id != 'undefined' && id != null) {

                //console.log(fieldObj);
                var fieldObj = JSON.parse(fieldString);

                var value = $('#Value-' + fieldObj.roomTypeID).val();

                if (value == null || value == "") {
                    value = 0;
                }

                if (value > 0) {
                    fieldObj.RequestValue = value;
                    fieldObj.numberOfPeople = value;
                    FieldData.push(fieldObj);
                }



            }

        })
        valid = true;



    });

    if (!valid) {
        Swal.fire('Error', message, 'error')
    } else {
        //console.log(FieldData);
        Postobj = {
            "checkedInDate": $('#txtcheckindate').val(),
            "checkedOutDate": $('#txtcheckoutdate').val(),
            "period": $('#booktype').val(),
            "number": $('#typrnumber').val(),
            "roomTypes": FieldData,

        };

    }

    return valid;

}


$('#vacverify').click(function (e) {


    var valid = FormatFormFieldData(1);

    if (valid) {

        //console.log(JSON.stringify(PostCollectobj));

        Swal.queue([{
            title: 'Verify Details',
            confirmButtonText: 'Continue',
            text: 'Click continue to get total cost',
            allowOutsideClick: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: function () {
                return new Promise(function (resolve) {


                    $.ajax({
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(Postobj),
                        success: function (data) {

                            //console.log(data);
                            if (data.status == 1) {


                                var fields = data.data.BookData.roomTypes;

                                fields.forEach(function (oneField) {
                                    $('#' + oneField.roomTypeID).attr('data-field', JSON.stringify(oneField));
                                    $('#Cost-' + oneField.roomTypeID).val(oneField.cost);

                                });

                                $('#vackbook').show();
                                $('#vacverify').hide();
                                $('#vacreset').show();
                                $('.ttcost').show();
                                $('#ttcost').html(data.data.mytotal.TotalCost);

                                var ttt = "Days";
                                if (Postobj.period=="WEEKLY") {
                                    ttt = "Weeks";
                                } else if (Postobj.period == "MONTHLY") {
                                    ttt = "Months";
                                }
                                $('#ttdays').html(ttt + ":  " +  Postobj.number);


                                //data.dismiss;
                                Swal.close();

                            } else {
                                Swal.fire('Failed', data.message, 'warning');
                            }




                            // resolve()
                        },
                        error: function (data) {
                            //app.log("Device control failed");
                            //console.log(data);

                            Swal.fire('Error', 'Failed to add Customer details', 'error')
                            //resolve()
                        },
                        processData: false,
                        type: 'POST',
                        url: basUrl + '/Vacation/VerifyVac'
                    });





                })
            }
        }])

    } else {

        Swal.fire(message);
    }






});


$('#vackbook').click(function (e) {


    var valid = FormatFormFieldData(2);

    if (valid) {


        Swal.queue([{
            title: 'Complete Booking',
            confirmButtonText: 'Complete',
            text: 'Click complete button to submit booking details',
            allowOutsideClick: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: function () {

                $('#vackbook').hide();
                return new Promise(function (resolve) {


                    $.ajax({
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(Postobj),
                        success: function (data) {

                            if (data.status == 1) {

                                $('#vacverify').hide();
                                $('#vackbook').hide();
                                $('#aprint').show();
                                $('input[type=text]').val('');

                                Swal.fire({
                                    title: "Booking was successful!",
                                    text: "Redirecting in 3 seconds.",
                                    type: "success",
                                    timer: 2000,
                                    showConfirmButton: true
                                }).then(function () {
                                    window.location.href = basUrl + "/Vacation/MyBook";
                                });



                            } else {
                                $('#vackbook').show();
                                Swal.fire('Error', data.message, 'error');
                            }




                            // resolve()
                        },
                        error: function (data) {
                            //app.log("Device control failed");
                            //console.log(data);
                            $('#vackbook').show();
                            Swal.fire('Error', 'Failed to add  details', 'error');
                            //resolve()
                        },
                        processData: false,
                        type: 'POST',
                        url: basUrl + '/Vacation/BookVac'
                    });





                })
            }
        }])

    }






});


$(document).on('click', '.Vacquickpay', function () {

    var allotid = $(this).attr("data-id");
    var bal = $(this).attr("data-balance");

    vacquickpaynow(allotid, bal)

});


function vacquickpaynow(allotid, balance) {



    Swal.fire({
        title: 'Make Payment',
        confirmButtonText: 'Pay Now',
        html: 'Are you sure you want to pay online.<br> <b>Amount Due:</b> ' + balance + '<br>',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            placeholder: 'Enter amount to pay'

        },
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: 'Pay now',
        showLoaderOnConfirm: true,
        preConfirm: (amount) => {

            return new Promise(function (resolve, reject) {

                var amountpaid = parseFloat(amount);
                var avBalance = parseFloat(balance)

                if (amount === '' || !$.isNumeric(amountpaid) || amount === 0 || amount <= 0) {

                    Swal.fire(
                        'Request failed',
                        'Invalid Amount',
                        'warning'
                    )

                } else if (amountpaid > avBalance) {

                    Swal.fire(
                        'Request failed',
                        'Amount cannot be greator than available balance',
                        'warning'
                    )

                } else {
                    //
                    resolve(amount)
                }
            })

        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.value) {
            var postdata = {
                "allotmentID": allotid,
                "Amount": result.value
            };
            Swal.fire(
                'Processing...Please wait!'
            );
            Swal.showLoading();

            $.ajax({
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(postdata),
                success: function (data) {

                    if (data.status == 1) {
                        Swal.close();
                        Swal.fire({
                            title: "Request was successful",
                            text: "Redirecting...please wait!",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: true
                        }).then(function () {
                            window.location.href = data.data;
                        });

                    } else {
                        Swal.close();
                        Swal.fire(
                            'Error!',
                            data.message,
                            'error'
                        )
                    }


                },
                error: function (data) {
                    Swal.close();
                    //console.log(data);
                    Swal.fire(
                        'Ooops!',
                        'Failed to process payment',
                        'error'
                    )
                    //swal('Error', 'Failed to process payment', 'error')
                    //resolve()
                },
                processData: false,
                type: 'POST',
                url: basUrl + '/Vacation/PayNow'
            });
        }
    })


}


function getcheckindate(){

    var tt = $('#txtcheckindate').val();

    if (tt != 1) {

        return;
    }
    var postdata = {

    };
    $('#txtcheckindate').val("");
    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(postdata),
        success: function (data) {
            //console.log(data);
            if (data.status == 1) {

                //var stdate = data.data.FormatedstartDate;
                var stdate = data.data.FormatedStartDate;
                var eddate = data.data.FormatedEndDate;

                // console.log(stdate + "===" + eddate);
                $('#txtcheckindate').datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    startDate: stdate,
                    endDate: eddate,
                });


            } else {

                Swal.fire(
                    'Ooops!',
                    data.message,
                    'warning'
                )
            }

        },
        error: function (data) {

        },
        processData: false,
        type: 'POST',
        url: basUrl + '/Vacation/GetDates'
    });
}





$('#btnchgepass').click(function (e) {

    var pass = $("#curpass").val();
    var newpass = $("#newpass").val();
    var Connewpass = $("#Connewpass").val();

    var message = "Invalid Input";
    if (pass == "") {

        Swal.fire(
            message,
            'Current password is required',
            'warning'
        );
        $("#curpass").focus();
        return;
    }
    if (newpass == "") {

        Swal.fire(
            message,
            'password is required',
            'warning'
        );
        $("#newpass").focus();
        return;
    }
    if (newpass != Connewpass) {

        Swal.fire(
            message,
            'password do not much',
            'warning'
        );
        $("#newpass").focus();
        return;
    }

    if (checkStrength(newpass) != "Strong") {

        Swal.fire(
            message,
            'You password is weak. consider adding symbol, lower, upper and numeric cases',
            'warning'
        );
        return;
    }
    var valid = true;

    if (valid) {
        var pobj = {
            "email": pass,
            "password": newpass,
            "NewPass": Connewpass

        };

        Swal.queue([{
            title: 'Change Password',
            confirmButtonText: 'Change',
            text: 'Click change button to submit request details',
            allowOutsideClick: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: function () {

                return new Promise(function (resolve) {


                    $.ajax({
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(pobj),
                        success: function (data) {

                            if (data.status == 1) {


                                Swal.fire({
                                    title: "update was successful!",
                                    text: "Redirecting in 3 seconds.",
                                    type: "success",
                                    timer: 2000,
                                    showConfirmButton: true
                                }).then(function () {
                                    window.location.reload();
                                });



                            } else {

                                Swal.fire('Error', data.message, 'error');
                            }




                            // resolve()
                        },
                        error: function (data) {

                            Swal.fire('Error', 'Failed to add  details', 'error');
                            //resolve()
                        },
                        processData: false,
                        type: 'POST',
                        url: basUrl + '/Student/ChPassword'
                    });





                })
            }
        }])

    }

});

$("#myInput").keyup(function () {
    myRoomFunction();
});
function myRoomFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("recentbeds");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

$('#fpass').click(function (e) {

    var email = $("#email").val();

    var message = "Invalid Input";
    if (email == "") {

        Swal.fire(
            message,
            'Please provide your email',
            'warning'
        );
        $("#email").focus();
        return;
    }

    var valid = true;

    if (valid) {
        var pobj = {
            "email": email

        };

        Swal.queue([{
            title: 'Reset Password',
            confirmButtonText: 'Change',
            text: 'Click change button to submit request details',
            allowOutsideClick: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: function () {

                return new Promise(function (resolve) {


                    $.ajax({
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(pobj),
                        success: function (data) {

                            if (data.status == 1) {


                                Swal.fire({
                                    title: "Request was successful!",
                                    text: data.message,
                                    type: "success",
                                    timer: 10000,
                                    showConfirmButton: true
                                }).then(function () {
                                    window.location.reload();
                                });



                            } else {

                                Swal.fire('Error', data.message, 'error');
                            }




                            // resolve()
                        },
                        error: function (data) {

                            Swal.fire('Error', 'Failed to add  details', 'error');
                            //resolve()
                        },
                        processData: false,
                        type: 'POST',
                        url: basUrl + '/Default/ForgotPassword'
                    });





                })
            }
        }])

    }

});


$(document).on('click', '#cancelallot', function () {

    var roomid = $(this).attr("data-id");
    var roomname = $(this).attr("data-name");
    CancelBooking(roomid, roomname);

});
function CancelBooking(roomid, roomname) {

    obj = {
        "roomID": roomid
    };

    Swal.queue([{
        title: 'Cancel Booking',
        confirmButtonText: 'Book',
        text: 'Are you sure you want to cancel booking for toom ' + roomname,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve) {
                $.ajax({
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(obj),
                    success: function (data) {
                        //console.log(data);
                        if (data.status == 1) {

                            Swal.fire({
                                title: "Booking was successful!",
                                text: "Redirecting in 3 seconds.",
                                type: "success",
                                timer: 1000,
                                showConfirmButton: false
                            }).then(function () {
                                location.reload();
                            });

                        } else {
                            Swal.fire(
                                data.message,
                                'Try again!',
                                'warning'
                            );
                        }
                    },
                    error: function (data) {
                        //console.log(data);
                        swal('Error', 'Unable to book', 'error');
                    },
                    processData: false,
                    type: 'POST',
                    url: basUrl + '/Student/CancelBooking'
                });

            })
        }
    }])

}
