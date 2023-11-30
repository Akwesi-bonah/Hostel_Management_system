$(document).ready(function () {
  $("#register").click(function () {
    $('#newRegistration').modal('show');
  });

  var current = null;

  document.querySelector('#email').addEventListener('focus', function(e) {
    if (current) current.pause();
    current = anime({
      targets: 'path',
      strokeDashoffset: {
        value: 0,
        duration: 700,
        easing: 'easeOutQuart'
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart'
      }
    });
  });

  document.querySelector('#password').addEventListener('focus', function(e) {
    if (current) current.pause();
    current = anime({
      targets: 'path',
      strokeDashoffset: {
        value: -336,
        duration: 700,
        easing: 'easeOutQuart'
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart'
      }
    });
  });

  var submitButton = document.querySelector('#submit');
  if (submitButton) {
    submitButton.addEventListener('focus', function(e) {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -730,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '530 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });
  }
});
