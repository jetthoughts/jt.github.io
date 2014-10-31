function portfolioSorter() {
  var sorter = $('[data-sort-type]');

  sorter.on('click', function (e) {
    e.preventDefault();
    var $self = $(this),
      type = $self.data('sortType'),
      items = $('[data-portfolio]');

    $self.addClass('active').siblings().removeClass('active');
    if (type === "all") {
      items.each(function () {
        var $this = $(this);
        $this.fadeIn(200);
//                TODO: Rewrite with css3 animations

      });
    } else {
      items.each(function () {
        var $this = $(this);
        if ($this.data('portfolio') === type) {
          $this.fadeIn(200);
        } else {
          $this.fadeOut(150);
        }
      });
    }
  })
}

if (window.portfolioPage) {
  portfolioSorter();
}
