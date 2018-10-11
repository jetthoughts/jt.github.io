/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
//= require form

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

function removeAnimationForIpad(animationClass) {
  var elementsWithClass = document.getElementsByClassName(animationClass);

  while (elementsWithClass.length > 0) {
     elementsWithClass[0].classList.remove(animationClass);
  }
};

$(document).ready(function () {
  var heightParam = getUrlParameter('height');
  var stopAnimationParam = getUrlParameter('stop_animation');
  var activeScreenHeight = false;
  var screenWidth = $(window).width();
  var setScreenHeight = function() {
    var screenHeight = $(window).height();
    $('.js-min-full-vh').css('min-height', screenHeight);
    $('.js-full-vh').css('height', screenHeight);
  }
  var checkOrientation = function() {
    if (activeScreenHeight === false) {
      activeScreenHeight = true;
      var currentScreenWidth = $(window).width();
      if (screenWidth !== currentScreenWidth) {
        setScreenHeight();
        screenWidth = currentScreenWidth
      }
      setTimeout(function() {
        activeScreenHeight = false;
      }, 200);
    }
  }
  // set fixed height on mobile
  if ($(window).width() <= 1024 && !heightParam) {
    setScreenHeight();
    window.addEventListener('resize', checkOrientation);
  }
  // fixed section height (for tests)
  if (heightParam) {
    $('.js-min-full-vh').css('min-height', heightParam);
    $('.js-full-vh').css('height', heightParam);
    $('.lets-talk .cell').eq(1).css('height', 'auto');
  }
  // disable animation for IPad
  var isIPad = /iPad/.test(navigator.userAgent);
  if (isIPad) {
    removeAnimationForIpad('fade-up');
    removeAnimationForIpad('fade-right');
    removeAnimationForIpad('fade-down');
    removeAnimationForIpad('fade-left');
  }
  // scroll animation
  setTimeout(function() {
    $('.header, .main-screen, .ai-main-banner').addClass('animation');
    if ($(window).width() < 768) {
      $('.section').addClass('animation');
    }
  }, 500);
  // slideshow
  if ($('.ai-customers-carousel').length) {
    var $customersCarousel = $('.ai-customers-carousel');

    $customersCarousel.slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    });
  }

  if ($('.ai-testimonials .list').length) {
    var $customersCarousel = $('.ai-testimonials .list');

    $customersCarousel.slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        },
      ]
    });
  }

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
      responsive: [
        {
          breakpoint: 768,
          settings: {
            adaptiveHeight: true
          }
        },
      ]
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
    var usesCasesState = { isPlay: false };
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
      autoplaySpeed: stopAnimationParam ? 10000000 : 5000,
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
      return false;
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
  $('.js-anchor').on('click', function(e) {
    var href =  $(this).attr('href');
    $('html, body').stop().animate({
      scrollTop: href === '#' ? 0 : $(href).offset().top
    }, 700);
    e.preventDefault();
  });

  var animationAppear = function() {
    $('.section, .wave-wrapper, .ai-section').each(function() {
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
  }
  animationAppear();

  $(window).scroll( function() {
    animationAppear();
  });

  document.onkeydown = function(e) {
    if (e.keyCode == 32 && !$('body.modal-open').length) {
      $('.js-scroll').each(function() {
        var windowHeight = $(window).height();
        var thisOffset = $(this).offset().top;
        var windowTop = $(window).scrollTop();

        if (windowTop < thisOffset) {
          $('html, body').stop().animate({
            scrollTop: thisOffset
          }, 300);
          return false;
        } else {
          $('html, body').stop().animate({
            scrollTop: (windowTop + windowHeight)
          }, 250);
        }
      });
      e.preventDefault();
    }
  };

  var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
  var active = false;

  var lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove('lazy');

          document.removeEventListener('scroll', lazyLoad);
          window.removeEventListener('resize', lazyLoad);
          window.removeEventListener('orientationchange', lazyLoad);
        });

        active = false;
      }, 500);
    }
  };

  document.addEventListener('scroll', lazyLoad);
  window.addEventListener('resize', lazyLoad);
  window.addEventListener('orientationchange', lazyLoad);
});

var font = new FontFaceObserver('Graphik Web');
font.load().then(function () {
  document.documentElement.className += ' fonts-loaded';
});

(function() {
  var bgVideos = [].slice.call(document.querySelectorAll('video.video-bg'));

  if (window.innerWidth < 1366) {
    return false;
  }

  bgVideos.forEach(function(video) {
    for (var source in video.children) {
      var videoSource = video.children[source];
      if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
        videoSource.src = videoSource.dataset.src;
      }
    }
  });
})();
