function portfolioHeights() {
    var content_item = $('[data-portfolio-id]');
    content_item.each(function () {
        var $self = $(this),
            id = $self.data('portfolio-id'),
            height = $self[0].clientHeight,
            thumb = $(id);
        $self.css('visibility', 'visible');
        thumb.css({'height': height + 'px', 'visibility': 'visible'});
    });
}

if (window.portfolioPage) {
    $(window).on('load resize', function () {
        portfolioHeights();
    });
}
