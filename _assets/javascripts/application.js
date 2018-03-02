const passAnimationClass = 'passed-animation';

function animateShowing(element, direction, effect = 'fadeInUp') {
  if ($(element).hasClass(passAnimationClass))  return false;
  if (direction === 'down') {
    $(element).addClass([effect, passAnimationClass].join(' '));
  }
}

function toggleForm() {
  $('.js-lets-talk .container').removeClass('fadeInLeft').addClass('fadeOutLeft');
  $('.js-lets-talk .controls, .js-lets-talk .contact-form')
    .removeClass('fadeOutRight hide')
    .addClass('fadeInRight');
  $('.js-lets-talk').toggleClass('lets-talk contact-form-wrapper');
}

$(document).ready(function () {

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
      nextArrow: '.services-slideshow-prev',
      prevArrow: '.services-slideshow-next',
    });
  }

  if ($('.post-slideshow').length) {
    var $postSlideshow = $('.post-slideshow');

    $postSlideshow.slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
    });
  }

  if ($('.uses-cases-slideshow').length) {
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
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false,
      pauseOnFocus: false,
      speed: 1000,
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

  $('.modal-opener').click(function() {
    var modalId = $(this).attr('href');
    $('.modal').fadeOut();
    $(modalId).fadeIn();
    $('body').addClass('modal-open');
    return false;
  });

  $('.modal__close').click(function(){
    $('.modal').fadeOut();
    $('body').removeClass('modal-open');
    return false;
  });

  $('.header, .main-screen').addClass('animation');

  var wow = new WOW({
    boxClass: 'section',
    animateClass: 'animation',
    offset: 300,
    mobile: true,
    live:  true,
    scrollContainer: null
  });
  wow.init();

  $('.uses-cases-controls__item').each(function() {
    var $this = $(this);
    var index = $this.index();

    $this.addClass('delay-' + index);
  });

  $('.blog-nav__item').each(function() {
    var $this = $(this);
    var index = $this.index() + 3;

    $this.addClass('delay-' + index);
  });

  $('.post-slideshow__item').each(function() {
    var $this = $(this);
    var index = $this.index() + 2;

    $this.addClass('delay-' + index);
  });

  $('.menu-opener').click(function(){
    $('body').toggleClass('menu-open');
    return false;
  });

  $(document).on('mouseup touchend',function (e){
    var container = $('.blog-nav, .menu-opener');
    if (!container.is(e.target) && container.has(e.target).length === 0){
      $('body').removeClass('menu-open');
    }
  });

  smoothScroll.init();

  $('.js-hire-us').on('click', () => {
    if ($('#js-lets-talk').hasClass('lets-talk')) {
      $('.js-open-form').click();
    }
  });


  $('.js-open-form').on('click', () => toggleForm());

  $('.js-back, .js-close').on('click', () => {
    $('.js-lets-talk .container').toggleClass('fadeOutLeft fadeInLeft');
    $('.js-lets-talk .controls, .js-lets-talk .contact-form').toggleClass('fadeOutRight fadeInRight');
    $('.js-lets-talk').toggleClass('lets-talk contact-form-wrapper');
    $('.form-sent').addClass('hide');
  });

  if(window.innerWidth > 768) {
    $('.main .title').addClass(`bounceInDown ${passAnimationClass}`);
    $('.blog-articles').addClass('bounceInRight');

    if ($('#js-services').length) {
      const Team = new Waypoint({
        element: document.getElementById('js-services'),
        handler: (direction) => {
          animateShowing('.team .description', direction);
          animateShowing('.slider', direction);
        },
        offset: '30%'
      });

      const UseCase = new Waypoint({
        element: document.getElementById('js-use-cases'),
        handler: (direction) => {
          animateShowing('.slide', direction);
        },
        offset: '40%'
      })
    }
  } 

  const LetsTalk = new Waypoint({
    element: document.getElementById('js-lets-talk'),
    handler: () => {
      $('.js-wave-cover').addClass('wave-overlap')
    }
  })
});
