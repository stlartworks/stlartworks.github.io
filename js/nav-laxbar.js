

    var previousScroll = 0, // previous scroll position
        menuOffset = 54, // height of menu (once scroll passed it, menu is hidden)
        detachPoint = 650, // point of detach (after scroll passed it, menu is fixed)
        hideShowOffset = 6, // scrolling value after which triggers hide/show menu
        $laxnav = $(".laxnav"),
        $laxnav__menu = $('#laxnav__menu'),
        $laxnav__menu_a = $laxnav__menu.find("a"),
        $container = $('.container'),
        $navicon = $laxnav.find(".icon"),
        $icon =  $('.icon'),
        $body = $('body');

    // on scroll hide/show menu
    $(window).scroll(function() {
      if (!$laxnav.hasClass('expanded')) {
        var currentScroll = $(this).scrollTop(), // gets current scroll position
            scrollDifference = Math.abs(currentScroll - previousScroll); // calculates how fast user is scrolling

        // if scrolled past menu
        if (currentScroll > menuOffset) {
          // if scrolled past detach point add class to fix menu
          if (currentScroll > detachPoint) {
            if (!$laxnav.hasClass('detached'))
              $laxnav.addClass('detached');
          }

          // if scrolling faster than hideShowOffset hide/show menu
          if (scrollDifference >= hideShowOffset) {
            if (currentScroll > previousScroll) {
              // scrolling down; hide menu
              if (!$laxnav.hasClass('invisible'))
                $laxnav.addClass('invisible');
            } else {
              // scrolling up; show menu
              if ($laxnav.hasClass('invisible'))
                $laxnav.removeClass('invisible');
            }
          }
        } else {
          // only remove “detached” class if user is at the top of document (menu jump fix)
          if (currentScroll <= 0){
            $laxnav.removeClass('detached');
          }
        }

        // if user is at the bottom of document show menu
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          $laxnav.removeClass('invisible');
        }

        // replace previous scroll position with new one
        previousScroll = currentScroll;
      }
    })

    // shows/hides $laxnav__bar’s popover if class "expanded"
    $laxnav.on('click touchstart', function(event) {
      showHideNav();
      event.preventDefault();
    })

    // clicking anywhere inside $laxnav__bar or heading won’t close $laxnav__bar’s popover
    $laxnav__menu.on('click touchstart', function(event){
        event.stopPropagation();
    })

    // checks if $laxnav__bar’s popover is shown
    function showHideNav() {
      if ($laxnav.hasClass('expanded')) {
        hideNav();
      } else {
        showNav();
      }
    }

    // shows the $laxnav__bar’s popover
    function showNav() {
      $laxnav.removeClass('invisible').addClass('expanded');
      $container.addClass('blurred');
      window.setTimeout(function(){$body.addClass('no_scroll');}, 200); // Firefox hack. Hides scrollbar as soon as menu animation is done
      $laxnav__menu_a.attr('tabindex', ''); // links inside $laxnav__bar should be TAB selectable
    }

    // hides the $laxnav__bar’s popover
    function hideNav() {
      $container.removeClass('blurred');
      window.setTimeout(function(){$body.removeClass();}, 10); // allow animations to start before removing class (Firefox)
      $laxnav.removeClass('expanded');
      $laxnav__menu_a.attr('tabindex', '-1'); // links inside hidden $laxnav__bar should not be TAB selectable
      $icon.blur(); // deselect icon when $laxnav__bar is hidden
    }

    // keyboard shortcuts
    $body.keydown(function(e) {
      // menu accessible via TAB as well
      if ($navicon.is(":focus")) {
        // if ENTER/SPACE show/hide menu
        if (e.keyCode === 13 || e.keyCode === 32) {
          showHideNav();
          e.preventDefault();
        }
      }

      // if ESC show/hide menu
      if (e.keyCode === 27 || e.keyCode === 77) {
        showHideNav();
        e.preventDefault();
      }
    })
