$(document).ready(function () {
    var field1 = $("#name"),
        field1_val = field1.val(),
        field2 = $("#email"),
        field2_val = field2.val(),
        field3 = $('#message'),
        field3_val = field3.val(),
        contact_form = $('#contact_form');

    function postToGoogle(name, email, message) {

        $.ajax({
            url       : "https://docs.google.com/forms/d/19gksTm0W2HhbBV1jmaHO9O4wPGoO0KC2zEZkrCIwKsg/formResponse",
            data      : {"entry.408156996": name.val(), "entry.1818089031": email.val(), "entry.1509418088": message.val()},
            type      : "POST",
            dataType  : "xml",
            statusCode: {
                0  : function () {
                    //Success message
//                    alert('all good')
                },
                200: function () {
//                    alert('all good 200')
                    //Success Message
                }
            }
        }).always(function (msg) {
            formHasSent(contact_form);
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
        return val.length ? 1 : 0;
    }

    field2.on('blur', function (e) {
        var $this = $(this);
        $this.parent().toggleClass('invalid', !validateEmail($this));
        checkValidity();
    });

    field3.on('blur', function (e) {
        var $this = $(this);
        $this.parent().toggleClass('invalid', !requiredInput($this));
        checkValidity();
    });

    function checkValidity() {
        contact_form.toggleClass('invalid', !(validateEmail(field2) && requiredInput(field3)));
    }
    checkValidity();

    contact_form.not('invalid').submit(function () {
        var $this = $(this),
            _name = $this.find('#name'),
            _email = $this.find('#email'),
            _message = $this.find('#message');
        postToGoogle(_name, _email, _message);
        return false;
    });


});
