if (Modernizr.touch && window.homePage) {
  $('#swipe_feature_slider').show();
  $('#our_features').on('after-slide-change.fndtn.orbit', function() {
    $('#swipe_feature_slider').hide();
  });
}
