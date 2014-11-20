$(document).ready(function() {
  var contactForm = $('.contact_form'),
    submitBtn = $('.submit_btn'),
    requiredFields = $('[required]');

  function postToGoogle(form, name, email, message, source) {

    $.ajax({
      url: 'https://docs.google.com/forms/d/19gksTm0W2HhbBV1jmaHO9O4wPGoO0KC2zEZkrCIwKsg/formResponse',
      data: {'entry.408156996': name, 'entry.1818089031': email, 'entry.1509418088': message, 'entry.1693009463': source},
      type: 'POST',
      dataType: 'xml',
      statusCode: {
        0: function() {
          //Success message
//                    alert('all good')
        },
        200: function() {
//                    alert('all good 200')
          //Success Message
        }
      }
    }).always(function() {
      formHasSent(form);
    });
  }

  function formHasSent(form) {
    var mes = form.find('.form_sent');
    mes.show();
  }

  function validateEmail(email) {
    var val = email.val(),
      pat = new RegExp(/.+@.+\..+/i);
    return pat.test(val);
  }

  function requiredInput(input) {
    var val = input.val();
    return val.length > 0;
  }

  requiredFields.keyup(function() {
    var self = $(this),
      form = self.parents('.contact_form');
    checkRequired(self);
    checkValidity(form);
  });

  requiredFields.on('blur', function() {
    var self = $(this),
      form = self.parents('.contact_form');
    checkRequired(self);
    checkValidity(form);
  });

  function checkValidity(form) {
    var _email = form.find('.email_input'),
      _message = form.find('.message_input');
    form.toggleClass('invalid', !(validateEmail(_email) && requiredInput(_message)));
  }

  contactForm.each(function() {
    var self = $(this);
    checkValidity(self);
  });

  function checkRequired(el) {

    $el = (typeof el !== 'undefined') ? $(el) : $('[required]');
    $el.each(function() {
      var self = $(this);
      if (!requiredInput(self)) {
        self.parent().toggleClass('invalid', !requiredInput(self));
      } else if (self.attr('type') === 'email') {
        self.parent().toggleClass('invalid', !validateEmail(self));
      } else {
        self.parent().toggleClass('invalid', !requiredInput(self));
      }
    });

  }

  submitBtn.on('click', function(e) {
    e.preventDefault();
    var self = $(this),
      form = self.parents('.contact_form:not(.invalid)'),
      requiredInputs = self.parents('form').find('[required]'),
      _name = form.find('.name_input').val(),
      _email = form.find('.email_input').val(),
      _message = form.find('.message_input').val(),
      _source = form.data('source');
    if (form.length) {
      postToGoogle(form, _name, _email, _message, _source);
    } else {
      checkRequired(requiredInputs);
    }
  });

});
