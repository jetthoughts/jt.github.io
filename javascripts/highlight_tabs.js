(function () {
  var url = window.location,
    link = url.toString().slice(26, 33);
    if(url.toString() !== 'http://www.jetthoughts.com/') {
      $('.menu_item a[href^="'+link+'"]').addClass('active');
    }
}());
