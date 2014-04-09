$(document).ready(function () {
    var contact_form = $('.contact_form'),
        field1 = contact_form.find(".name_input"),
        field1_val = field1.val(),
        field2 = contact_form.find(".email_input"),
        field2_val = field2.val(),
        field3 = contact_form.find('.message_input'),
        field3_val = field3.val(),
        submit_btn = $('.submit_btn');

    function postToGoogle(form, name, email, message, source) {

        $.ajax({
            url       : "https://docs.google.com/forms/d/19gksTm0W2HhbBV1jmaHO9O4wPGoO0KC2zEZkrCIwKsg/formResponse",
            data      : {"entry.408156996": name.val(), "entry.1818089031": email.val(), "entry.1509418088": message.val(), "entry.1693009463": source},
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
        return val.length ? 1 : 0;
    }

    field2.on('blur', function (e) {
        var $this = $(this),
            form = $this.parents('.contact_form');
        $this.parent().toggleClass('invalid', !validateEmail($this));
        checkValidity(form);
    });

    field3.on('blur', function (e) {
        var $this = $(this),
            form = $this.parents('.contact_form');
        $this.parent().toggleClass('invalid', !requiredInput($this));
        checkValidity(form);
    });

    function checkValidity(form) {
        var _email = form.find('.email_input'),
            _message = form.find('.message_input');
        form.toggleClass('invalid', !(validateEmail(_email) && requiredInput(_message)));
    }
    contact_form.each(function(){
       var self = $(this);
        checkValidity(self);
    });

    submit_btn.on('click', function(e){
        e.preventDefault();
        var self = $(this),
            form = self.parents('.contact_form:not(.invalid)'),
            _name = form.find('.name_input'),
            _email = form.find('.email_input'),
            _message = form.find('.message_input'),
            _source = form.data('source');
        postToGoogle(form, _name, _email, _message, _source);
    });

});
