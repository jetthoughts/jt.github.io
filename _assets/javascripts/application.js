//= require form

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
      speed: 1000,
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
});