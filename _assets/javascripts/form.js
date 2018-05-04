$(document).ready(function () {
  var contactForm = $('.contact-form'),
    submitBtn = $('.contact-form__btn'),
    requiredFields = $('[required]');

  function postToGoogle(form, name, email, message, source) {
    var params = {
      data: {
        'entry.408156996': name,
        'entry.1818089031': email,
        'entry.1509418088': message,
        'entry.1693009463': source
      },
      type: 'POST',
      dataType: 'xml'
    };

    fetch('https://docs.google.com/forms/d/19gksTm0W2HhbBV1jmaHO9O4wPGoO0KC2zEZkrCIwKsg/formResponse', params)
      .then(function (res) {
        return res.json();
      })
      .then(function (jsn) {
        formHasSent(form);
      });
    formHasSent(form);
  }

  function formHasSent(form) {
    $('#form-success').fadeIn().siblings('.modal').fadeOut();
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

  requiredFields.keyup(function () {
    var self = $(this),
      form = self.parents('.contact-form');
    checkRequired(self);
    checkValidity(form);
  });

  requiredFields.on('blur', function () {
    var self = $(this),
      form = self.parents('.contact-form');
    checkRequired(self);
    checkValidity(form);
  });

  function checkValidity(form) {
    var _email = form.find('.email'),
      _message = form.find('.message-txt');
    form.toggleClass('invalid', !(validateEmail(_email) && requiredInput(_message)));
  }

  contactForm.each(function () {
    var self = $(this);
    checkValidity(self);
  });

  function checkRequired(el) {
    $el = (typeof el !== 'undefined') ? $(el) : $('[required]');
    $el.each(function () {
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

  submitBtn.on('click', function (e) {
    e.preventDefault();
    var self = $(this),
      form = self.parents('.contact-form:not(.invalid)'),
      requiredInputs = self.parents('form').find('[required]'),
      _name = form.find('.name').val(),
      _email = form.find('.email').val(),
      _message = form.find('.message-txt').val(),
      _source = form.data('source');
    if (form.length) {
      postToGoogle(form, _name, _email, _message, _source);
    } else {
      checkRequired(requiredInputs);
    }
  });
});