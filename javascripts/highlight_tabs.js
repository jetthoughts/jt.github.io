(function () {
  var url = window.location,
    link = url.pathname;
    if(url.toString() !== 'http://www.jetthoughts.com/') {
      $('.menu_item a[href^="'+link+'"]').addClass('active');
    }
}());
