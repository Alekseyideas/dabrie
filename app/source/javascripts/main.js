
jQuery(function($) {

  var main_slider =  $("#main-slider").owlCarousel({
        items: 1,
        loop:true,
        nav:true,
        navText: ['', ''],
        responsive:{
          0:{
              mouseDrag: true,
              touchDrag: true,
              nav:false
          },
          1201:{
              mouseDrag: false,
              touchDrag: false
          }
        }
    });

    function setAnimation ( _elem, _InOut ) {
        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        _elem.each ( function () {
            var $elem = $(this);
            var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

            $elem.addClass($animationType).one(animationEndEvent, function () {
                $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
            });
        });
    }
    main_slider.on('changed.owl.carousel', function(event) {

        var $currentItem = $('.owl-item', main_slider).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-in]");
        setAnimation ($elemsToanim, 'in');
    });

    $(document).on('click', '.has-child > a', function (e) {
        e.preventDefault();
        var $this = $(this),
            $parent = $this.closest('.has-child'),
            $child = $this.siblings('.child-item');

        if(!$parent.hasClass('open')) {
            $child.addClass('active');
            $parent.addClass('open');
            $child.stop().slideDown();
        } else {

            $child.stop().slideUp("slow", function () {
                $child.removeClass('active');
                $parent.removeClass('open');
            });
        }
    });


    $(document).on('click', '.mobile-menu__nav a', function (e) {
        var menu = $('.drop-menu'),
            $body = $('body, html');

        $('.burger a').removeClass('show');
        TweenLite.to(menu, 1, {left: "-100%", opacity:1, ease:Expo.easeInOut});
        enableScrolling();

    });






    checkMenu();
    $(window).scroll(function () {
        checkMenu();
    });

    function checkMenu() {
        var menu = $('.second-menu'),
            main_menu = $('.header-menu'),
            menu_heigth = menu.outerHeight(),
            main_menu_heigth = main_menu.outerHeight(),
            scroll = $(window).scrollTop();

        if($('.burger a').hasClass('show'))
            return false;

        if(scroll > menu_heigth + main_menu_heigth){
            menu.addClass('fixed');
        } else {
            menu.removeClass('fixed');
        }
    }

   var owl =  $("#history").owlCarousel({
        dotsContainer: '#history-dots',
        items: 1,
        loop:true,
    });

    $('#history-dots .history-dots__item').click(function (e) {
        e.preventDefault();
        owl.trigger('to.owl.carousel', [$(this).index(), 300]);
    });


    var reviewSlider = $('#reviews-slider').owlCarousel({
        dotsContainer: '#reviews-slider-dots',
        items: 1,
        loop:true,
    });

    $('#reviews-slider-dots .reviews-slider-dots__item').click(function (e) {
        e.preventDefault();
        reviewSlider.trigger('to.owl.carousel', [$(this).attr('data-target'), 300]);
    });

    $('.reviews-slider-controls__prev a').click(function (e) {
        e.preventDefault();
        reviewSlider.trigger('prev.owl.carousel');
    });

    $('.reviews-slider-controls__next a').click(function (e) {
        e.preventDefault();
        reviewSlider.trigger('next.owl.carousel');
    });
    
    initTabs();

    function initTabs() {
       var $linksContainer = $('.worldwide-presence__tab-links'),
           $tabContainer = $('.worldwide-presence__tab-content');

        $linksContainer.find('a').click(function (e) {
            e.preventDefault();
            var $this = $(this),
                target = $this.attr('data-target'),
                $map = $tabContainer.find('.tab-content__map')[0];
            $tabContainer.find('.active').removeClass('active');
            $tabContainer.find('#'+target).addClass('active');
            $linksContainer.find('.active').removeClass('active');
            $this.closest('li').addClass('active');



            initMaps();
        })
    }

    
    
    $(document).on('click', '.burger a', function (e) {
       e.preventDefault();
        var menu = $('.drop-menu'),
            $body = $('body, html');
        $(this).addClass('show');
        TweenLite.to(menu, .5, { left: "0", opacity:1, ease:Expo.easeInOut});
        // $body.addClass('show-menu');
        disableScrolling();
    });

    $(document).on('click', '.drop-menu__close, .mobile-menu__close a', function (e) {
        e.preventDefault();
       var menu = $('.drop-menu'),
           $body = $('body, html');

        $('.burger a').removeClass('show');
        TweenLite.to(menu, 1, {left: "-100%", opacity:1, ease:Expo.easeInOut});
        // $body.removeClass('show-menu');
        enableScrolling();
    });


    var lastId,
        topMenu = $(".second-menu, .mobile-menu__nav"),
        topMenuHeight = topMenu.outerHeight(),
        menuItems = topMenu.find(".second-menu__container a"),
        scrollItems = menuItems.map(function(){
            var $anchor = $(this).attr("href");
            var item = $($anchor);
            if (item.length) { return item; }
        });


    menuItems.click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 1000);
        e.preventDefault();
    });


    $(window).scroll(function(){
        var fromTop = $(this).scrollTop()+topMenuHeight;

        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }
    });


    function disableScrolling(){
        var x=window.scrollX;
        var y=window.scrollY;
        window.onscroll=function(){window.scrollTo(x, y);};
    }

    function enableScrolling(){
        window.onscroll=function(){};
    }


    // $.landingSeo({
    //     offsetTop: 110,
    //     yaCounter: null,
    //     addGoogleAnalytics: !1,
    //     onBlockChange: function() {}
    // });


    var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null // optional scroll container selector, otherwise use window
        }
    );
    wow.init();

    /*tabs*/
    (function () {
        var btn = $('.prTab__btn');
        btn.click(function () {
            $(this).parent('.prTab').toggleClass('prTab--active').find('.prTab__content').slideToggle();

        });
    })();
    function ResizeWindow() {
        (function () {
            var img = $('.section-wrap__img');
            var text = $('.section-wrap__description');
            text.css({
                'height': img.height()
            });
        })();

    }
    ResizeWindow();

    window.addEventListener('resize', function () {
        ResizeWindow();
    });

    $('.references__slider').owlCarousel({

        loop: true,
        margin:10,
        navText: ['',''],
        responsive: {
            0 : {
                items: 2,
                nav: false
            },
            480 : {
                items: 3
            },
            1000 : {
                items: 5,
                nav:true
            }
        }
    });

});