if (Modernizr.touch) {
    $("#swipe_feature_slider").show();
}

$("#our_features").on("after-slide-change.fndtn.orbit", function(event, orbit) {
    $("#swipe_feature_slider").hide();
});