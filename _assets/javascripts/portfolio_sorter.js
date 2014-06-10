function portfolioSorter() {
    var sorter = $('[data-sort-type]');

    sorter.on('click', function(e){
        e.preventDefault();
        var $self = $(this),
            type = $self.data('sortType'),
            items = $('[data-portfolio]');

        $self.addClass('active').siblings().removeClass('active');
        if (type === "all") {
//            items.removeClass('hide_el').addClass('show_el');
            items.each(function(){
                var $this = $(this);
                $this.fadeIn(200);
//                TODO: Rewrite with css3 animations
//                    $this.removeClass('hide_el').addClass('show_el');
//                    $this.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
//                        function(e) {
//                            $this.css("height","auto");
//                        });
            });
//            items.slideDown(400);
        } else {
//            items.slideUp(200).filter('[data-portfolio='+type+']').slideDown(500);
            items.each(function(){
               var $this = $(this);
               if ($this.data('portfolio') === type) {
                   $this.fadeIn(200);
//                   $this.removeClass('hide_el').addClass('show_el');
//                   $this.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
//                       function(e) {
//                           $this.css("height","auto");
//                       });
               } else {
                   $this.fadeOut(150);
//                   $this.removeClass('show_el').addClass('hide_el');
//                   $this.on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
//                       function(e) {
//                           $this.css("height",0);
//                       });
               }
            });
//            items.removeClass('show_el').addClass('hide_el').hide(250).filter('[data-portfolio='+type+']').removeClass('hide_el').addClass('show_el').show(1000);
        }
    })
}

if(window.portfolioPage) {
    portfolioSorter();
}