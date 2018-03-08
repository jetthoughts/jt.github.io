//= require form

$(document).ready(function () {
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
  $('.js-scroll').on('click', function(e){
    var href =  $(this).attr('href');
    $('html, body').stop().animate({ 
      scrollTop: href === "#" ? 0 : $(href).offset().top
    }, 700);
    e.preventDefault();
  });

  // scroll animation
  $('.header, .main-screen').addClass('animation');
  if ($(window).width() < 768) {
    $('.section').addClass('animation');
  }

  $(window).scroll( function(){
    $('.section').each(function() {
      var $this = $(this);
      var bottom_of_object = $this.offset().top + $this.outerHeight() / 5;
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_object) {
        $this.addClass('animation');
        if ($this.hasClass('uses-cases')) {
          $('.uses-cases-slideshow').slick('slickPlay');
        }
      }
    });
  });


  // delay animation
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
});
