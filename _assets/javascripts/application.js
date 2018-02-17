//= require vendor/zepto.min.js
//= require vendor/smooth-scroll.min.js
//= require vendor/noframework.waypoints.min.js
//= require vendor/slick.min
//= require form


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
    var $teamSlider = $('.services-slideshow');

    $teamSlider.on('init', function(event, slick, currentSlide, nextSlide) {
      $('.services-slideshow-current-slide span').text(slick.currentSlide + 1);
    });

    $teamSlider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
      $('.services-slideshow-current-slide span').text(slick.currentSlide + 1);
    });

    $teamSlider.slick({
      fade: true,
      infinite: true,
      nextArrow: '.services-slideshow-prev',
      prevArrow: '.services-slideshow-next',
    });
  }

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
