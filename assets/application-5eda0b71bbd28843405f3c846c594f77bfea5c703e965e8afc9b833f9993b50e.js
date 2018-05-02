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
        return res.json()
      })
      .then(function (jsn) {
        formHasSent(form)
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

$(document).ready(function () {
  // scroll animation
  setTimeout(function() {
    $('.header, .main-screen').addClass('animation');
    if ($(window).width() < 768) {
      $('.section').addClass('animation');
    }
  }, 500);

  // slideshow
  if ($('.services-slideshow').length) {
    var $servicesSlideshow = $('.services-slideshow');

    $servicesSlideshow.on('init', function(event, slick, currentSlide, nextSlide) {
      $('.services-slideshow-current-slide span').text(slick.currentSlide + 1);
    });

    $servicesSlideshow.on('afterChange', function(event, slick, currentSlide, nextSlide) {
      $('.services-slideshow-current-slide span').text(slick.currentSlide + 1);
    });

    $servicesSlideshow.slick({
      fade: true,
      infinite: true,
      nextArrow: '.services-slideshow-next',
      prevArrow: '.services-slideshow-prev',
    });
  }

  if ($('.post-slideshow').length) {
    var $postSlideshow = $('.post-slideshow');

    $postSlideshow.slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });
  }

  if ($('.uses-cases-slideshow').length) {
    var usesCasesState = { isPlay: false }
    var $usesCasesSlideshow = $('.uses-cases-slideshow');

    $usesCasesSlideshow.on('init', function(event, slick, currentSlide, nextSlide) {
      onAtive($('.slick-current').index());
    });

    $usesCasesSlideshow.on('afterChange', function(event, slick, currentSlide, nextSlide) {
      onAtive(currentSlide);
    });

    $usesCasesSlideshow.slick({
      infinite: true,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      pauseOnFocus: false,
      speed: 300,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true
          }
        },
      ]
    });

    $('.uses-cases-controls__link').on('click', function() {
      var indexElement = $(this).parent().index();

      $usesCasesSlideshow.slick('slickGoTo', indexElement, false);
      onAtive(indexElement);
      return false
    });

    function onAtive(index) {
      $('.uses-cases-controls__link').removeClass('uses-cases-controls__link_active');
      $('.uses-cases-controls__item').eq(index).children().addClass('uses-cases-controls__link_active');
    }
  }

  // modal
  $('.js-modal-opener').on('click', function() {
    var href = $(this).attr('href');
    $('.modal').fadeOut();
    $(href).fadeIn();
    $('body').addClass('modal-open');
    return false;
  });

  $('.js-modal-close').on('click', function(){
    $('.modal').fadeOut();
    $('body').removeClass('modal-open');
    return false;
  });

  // mobile menu
  $('.js-menu-opener').on('click', function() {
    $('body').toggleClass('menu-open');
    return false;
  });

  $(document).on('mouseup touchend',function (e) {
    var container = $('.blog-nav, .js-menu-opener');
    if (!container.is(e.target) && container.has(e.target).length === 0){
      $('body').removeClass('menu-open');
    }
  });

  // scroll go to
  $('.js-scroll').on('click', function(e) {
    var href =  $(this).attr('href');
    $('html, body').stop().animate({ 
      scrollTop: href === "#" ? 0 : $(href).offset().top
    }, 700);
    e.preventDefault();
  });

  $(window).scroll( function() {
    $('.section, .wave-wrapper').each(function() {
      var $this = $(this);
      var bottom_of_object = $this.offset().top + $this.outerHeight() / 5;
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_object) {
        $this.addClass('animation');
        if ($this.hasClass('uses-cases') && !usesCasesState.isPlay) {
          usesCasesState.isPlay = true;
          $('.uses-cases-slideshow').slick('slickPlay');
        }
      }
    });
  });

  document.onkeydown = function(e) {
    if (e.keyCode == 32 && !$('body.modal-open').length) {
      $('.section').each(function() {
          var windowHeight = $(window).height();
          var thisOffset = $(this).offset().top;
          var windowTop = $(window).scrollTop();

          if (windowTop < thisOffset) {
            $('html, body').stop().animate({
              scrollTop: thisOffset
            }, 300);
            return false
          } else {
            $('html, body').stop().animate({
              scrollTop: (windowTop + windowHeight)
            }, 250);
          }
      });
      e.preventDefault();
    };
  }

  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  var active = false;

  var lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");

          document.removeEventListener("scroll", lazyLoad);
          window.removeEventListener("resize", lazyLoad);
          window.removeEventListener("orientationchange", lazyLoad);
        });

        active = false;
      }, 500);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});

var font = new FontFaceObserver('Graphik Web');

font.load().then(function () {
  document.documentElement.className += " fonts-loaded";
});
