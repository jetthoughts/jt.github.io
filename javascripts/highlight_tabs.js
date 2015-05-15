(function () {
  var url = window.location,
    link = url.toString().slice(26, 31);
    if(url.toString() !== 'http://www.jetthoughts.com/') {
      $('.menu_item a[href^="'+link+'"]').addClass('active');
    }
}());
