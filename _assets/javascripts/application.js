//= require vendor/zepto.min
//= require vendor/smooth-scroll.min.js
//= require vendor/noframework.waypoints.min.js


const passAnimationClass = 'passed-animation';

function animateShowing(element, direction, effect = 'fadeInUp') {
  if ($(element).hasClass(passAnimationClass))  return false;
  if (direction === 'down') {
    $(element).addClass([effect, passAnimationClass].join(' '));
  }
}

$(document).ready(function () {
  smoothScroll.init();

  $('.js-hire-us').on('click', () => {
    if ($('#js-lets-talk').hasClass('lets-talk')) {
      $('.js-open-form').click();
    }
  });

  $('.main .title').addClass(`bounceInDown ${passAnimationClass}`);
  $('.blog-articles').addClass('bounceInRight');

  $('.js-open-form').on('click', () => {
    $('.js-lets-talk .container').removeClass('fadeInLeft').addClass('fadeOutLeft');
    $('.js-lets-talk .controls, .js-lets-talk .contact-form')
      .removeClass('fadeOutRight hide')
      .addClass('fadeInRight');
    $('.js-lets-talk').toggleClass('lets-talk contact-form-wrapper');
  });

  $('.js-back, .js-close').on('click', () => {
    $('.js-lets-talk .container').toggleClass('fadeOutLeft fadeInLeft');
    $('.js-lets-talk .controls, .js-lets-talk .contact-form').toggleClass('fadeOutRight fadeInRight');
    $('.js-lets-talk').toggleClass('lets-talk contact-form-wrapper');
  });

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

  const LetsTalk = new Waypoint({
    element: document.getElementById('js-lets-talk'),
    handler: () => {
      $('.js-wave-cover').addClass('wave-overlap')
    }
  })
});
