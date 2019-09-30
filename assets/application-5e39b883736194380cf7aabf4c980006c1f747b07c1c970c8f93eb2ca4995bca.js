function removeAnimationForIpad(e){for(var n=document.getElementsByClassName(e);n.length>0;)n[0].classList.remove(e)}$(document).ready(function(){function e(e,t,s,o,i){var a={url:"https://docs.google.com/forms/u/1/d/e/1FAIpQLSfVPGr85GXcV6WJw9zLnMazielXhuIBW6kZCWVjwmbMO2ABuA/formResponse",data:{"entry.408156996":t,"entry.1818089031":s,"entry.1509418088":o,"entry.1693009463":i},type:"POST",dataType:"xml"};$.ajax(a).always(function(){n(e)})}function n(){$("#form-success").fadeIn().siblings(".modal").fadeOut()}function t(e){var n=e.val();return new RegExp(/.+@.+\..+/i).test(n)}function s(e){return e.val().length>0}function o(e){var n=e.find(".email"),o=e.find(".message-txt");e.toggleClass("invalid",!(t(n)&&s(o)))}function i(e){$el=void 0!==e?$(e):$("[required]"),$el.each(function(){var e=$(this);s(e)&&"email"===e.attr("type")?e.parent().toggleClass("invalid",!t(e)):e.parent().toggleClass("invalid",!s(e))})}var a=$(".contact-form"),r=$(".contact-form__btn"),l=$("[required]");l.keyup(function(){var e=$(this),n=e.parents(".contact-form");i(e),o(n)}),l.on("blur",function(){var e=$(this),n=e.parents(".contact-form");i(e),o(n)}),a.each(function(){o($(this))}),r.on("click",function(n){n.preventDefault();var t=$(this),s=t.parents(".contact-form:not(.invalid)").find("form"),o=t.parents("form").find("[required]"),a=s.find(".name").val(),r=s.find(".email").val(),l=s.find(".message-txt").val(),c=s.data("source");s.length?e(s,a,r,l,c):i(o)})});var getUrlParameter=function(e){var n,t,s=decodeURIComponent(window.location.search.substring(1)).split("&");for(t=0;t<s.length;t++)if((n=s[t].split("="))[0]===e)return n[1]===undefined||n[1]};$(document).ready(function(){var e=getUrlParameter("height"),n=getUrlParameter("stop_animation"),t=!1,s=$(window).width(),o=function(){var e=$(window).height();$(".js-min-full-vh").css("min-height",e),$(".js-full-vh").css("height",e)},i=function(){if(!1===t){t=!0;var e=$(window).width();s!==e&&(o(),s=e),setTimeout(function(){t=!1},200)}};if($(window).width()<=1024&&!e&&(o(),window.addEventListener("resize",i)),e&&($(".js-min-full-vh").css("min-height",e),$(".js-full-vh").css("height",e),$(".lets-talk .cell").eq(1).css("height","auto")),/iPad/.test(navigator.userAgent)&&(removeAnimationForIpad("fade-up"),removeAnimationForIpad("fade-right"),removeAnimationForIpad("fade-down"),removeAnimationForIpad("fade-left")),setTimeout(function(){$(".header, .main-screen, .ai-main-banner, .oa-main-banner").addClass("animation"),$(window).width()<768&&$(".section").addClass("animation")},500),$(".ai-customers-carousel").length){var a=$(".ai-customers-carousel"),r=!1;function l(e){const n=e.originalEvent.deltaY;n>0&&r?(a.slick("slickPrev"),e.preventDefault()):n<0&&r&&(a.slick("slickNext"),e.preventDefault())}a.slick({infinite:!0,slidesToShow:1,slidesToScroll:1,arrows:!1}),a.hover(function(){r=!0,$(window).on("wheel",l)},function(){r=!1})}$(".ai-testimonials .list").length&&$(".ai-testimonials .list").slick({infinite:!0,slidesToShow:2,slidesToScroll:1,arrows:!1,responsive:[{breakpoint:768,settings:{slidesToShow:1}}]});if($(".services-slideshow").length){var c=$(".services-slideshow");c.on("init",function(e,n){$(".services-slideshow-current-slide span").text(n.currentSlide+1)}),c.on("afterChange",function(e,n){$(".services-slideshow-current-slide span").text(n.currentSlide+1)}),c.slick({fade:!0,infinite:!0,nextArrow:".services-slideshow-next",prevArrow:".services-slideshow-prev",responsive:[{breakpoint:768,settings:{adaptiveHeight:!0}}]})}$(".post-slideshow").length&&$(".post-slideshow").slick({infinite:!1,slidesToShow:3,slidesToScroll:1,responsive:[{breakpoint:768,settings:{slidesToShow:1}}]});if($(".uses-cases-slideshow").length){var d={isPlay:!1},u=$(".uses-cases-slideshow");function f(e){$(".uses-cases-controls__link").removeClass("uses-cases-controls__link_active"),$(".uses-cases-controls__item").eq(e).children().addClass("uses-cases-controls__link_active")}u.on("init",function(){f($(".slick-current").index())}),u.on("afterChange",function(e,n,t){f(t)}),u.slick({infinite:!0,fade:!0,slidesToShow:1,slidesToScroll:1,arrows:!1,autoplaySpeed:n?1e7:5e3,pauseOnHover:!1,pauseOnFocus:!1,speed:300,responsive:[{breakpoint:768,settings:{arrows:!0}}]}),$(".uses-cases-controls__link").on("click",function(){var e=$(this).parent().index();return u.slick("slickGoTo",e,!1),f(e),!1})}$(".js-modal-opener").on("click",function(){var e=$(this).attr("href");return $(".modal").fadeOut(),$(e).fadeIn(),$("body").addClass("modal-open"),!1}),$(".js-modal-close").on("click",function(){return $(".modal").fadeOut(),$("body").removeClass("modal-open"),!1}),$(".js-menu-opener").on("click",function(){return $("body").toggleClass("menu-open"),!1}),$(document).on("mouseup touchend",function(e){var n=$(".blog-nav, .js-menu-opener");n.is(e.target)||0!==n.has(e.target).length||$("body").removeClass("menu-open")}),$(".js-anchor").on("click",function(e){var n=$(this).attr("href");$("html, body").stop().animate({scrollTop:"#"===n?0:$(n).offset().top},700),e.preventDefault()});var h=function(){$(".section, .wave-wrapper, .ai-section").each(function(){var e=$(this),n=e.offset().top+e.outerHeight()/5;$(window).scrollTop()+$(window).height()>n&&(e.addClass("animation"),e.hasClass("uses-cases")&&!d.isPlay&&(d.isPlay=!0,$(".uses-cases-slideshow").slick("slickPlay")))})};h(),$(window).scroll(function(){h()}),document.onkeydown=function(e){32!=e.keyCode||$("body.modal-open").length||($(".js-scroll").each(function(){var e=$(window).height(),n=$(this).offset().top,t=$(window).scrollTop();if(t<n)return $("html, body").stop().animate({scrollTop:n},300),!1;$("html, body").stop().animate({scrollTop:t+e},250)}),e.preventDefault())};var m=[].slice.call(document.querySelectorAll("img.lazy")),v=!1,p=function(){!1===v&&(v=!0,setTimeout(function(){m.forEach(function(e){e.src=e.dataset.src,e.srcset=e.dataset.srcset,e.classList.remove("lazy"),document.removeEventListener("scroll",p),window.removeEventListener("resize",p),window.removeEventListener("orientationchange",p)}),v=!1},500))};document.addEventListener("scroll",p),window.addEventListener("resize",p),window.addEventListener("orientationchange",p)});var font=new FontFaceObserver("Graphik Web");font.load().then(function(){document.documentElement.className+=" fonts-loaded"}),function(){var e=[].slice.call(document.querySelectorAll("video.video-bg"));if(window.innerWidth<1366)return!1;e.forEach(function(e){for(var n in e.children){var t=e.children[n];"string"==typeof t.tagName&&"SOURCE"===t.tagName&&(t.src=t.dataset.src)}})}();