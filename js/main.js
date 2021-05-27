jQuery(function ($) {
  'use strict';

  // Navigation Scroll
  $(window).scroll(function (event) {
    Scroll();
  });

  $('.navbar-collapse ul li a').on('click', function () {
    $('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
    return false;
  });

  // User define function
  function Scroll() {
    var contentTop = [];
    var contentBottom = [];
    var winTop = $(window).scrollTop();
    var rangeTop = 200;
    var rangeBottom = 500;
    $('.navbar-collapse').find('.scroll a').each(function () {
      contentTop.push($($(this).attr('href')).offset().top);
      contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
    })
    $.each(contentTop, function (i) {
      if (winTop > contentTop[i] - rangeTop) {
        $('.navbar-collapse li.scroll')
            .removeClass('active')
            .eq(i).addClass('active');
      }
    })
  };

  $('#tohash').on('click', function () {
    $('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
    return false;
  });

  //Slider
  $(document).ready(function () {
    var time = 7; // time in seconds

    var $progressBar,
        $bar,
        $elem,
        isPause,
        tick,
        percentTime;

    //Init the carousel
    $("#main-slider").find('.owl-carousel').owlCarousel({
      slideSpeed: 500,
      paginationSpeed: 500,
      singleItem: true,
      navigation: true,
      navigationText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>"
      ],
      afterInit: progressBar,
      afterMove: moved,
      startDragging: pauseOnDragging,
      //autoHeight : true,
      transitionStyle: "fadeUp"
    });

    //Init progressBar where elem is $("#owl-demo")
    function progressBar(elem) {
      $elem = elem;
      //build progress bar elements
      buildProgressBar();
      //start counting
      start();
    }

    //create div#progressBar and div#bar then append to $(".owl-carousel")
    function buildProgressBar() {
      $progressBar = $("<div>", {
        id: "progressBar"
      });
      $bar = $("<div>", {
        id: "bar"
      });
      $progressBar.append($bar).appendTo($elem);
    }

    function start() {
      //reset timer
      percentTime = 0;
      isPause = false;
      //run interval every 0.01 second
      tick = setInterval(interval, 10);
    };

    function interval() {
      if (isPause === false) {
        percentTime += 1 / time;
        $bar.css({
          width: percentTime + "%"
        });
        //if percentTime is equal or greater than 100
        if (percentTime >= 100) {
          //slide to next item
          $elem.trigger('owl.next')
        }
      }
    }

    //pause while dragging
    function pauseOnDragging() {
      isPause = true;
    }

    //moved callback
    function moved() {
      //clear interval
      clearTimeout(tick);
      //start again
      start();
    }
  });

  //Initiat WOW JS
  new WOW().init();

  //smoothScroll
  smoothScroll.init();

  $(document).ready(function () {
    //Animated Progress
    $('.progress-bar').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
      if (visible) {
        $(this).css('width', $(this).data('width') + '%');
        $(this).unbind('inview');
      }
    });

    //Animated Number
    $.fn.animateNumbers = function (stop, commas, duration, ease) {
      return this.each(function () {
        var $this = $(this);
        var start = parseInt($this.text().replace(/,/g, ""));
        commas = (commas === undefined) ? true : commas;
        $({value: start}).animate({value: stop}, {
          duration: duration == undefined ? 1000 : duration,
          easing: ease == undefined ? "swing" : ease,
          step: function () {
            $this.text(Math.floor(this.value));
            if (commas) {
              $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            }
          },
          complete: function () {
            if (parseInt($this.text()) !== stop) {
              $this.text(stop);
              if (commas) {
                $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
              }
            }
          }
        });
      });
    };
  });

  //Pretty Photo
  $("a[rel^='prettyPhoto']").prettyPhoto({
    social_tools: false
  });

  //Google Map
  var latitude = $('#google-map').data('latitude');
  var longitude = $('#google-map').data('longitude');

  function initialize_map() {
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
      zoom: 16,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      navigationControl: true,
      mapTypeControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true
    };
    var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });
    // add information window
    var infowindow = new google.maps.InfoWindow({
      content: '<div class="info"><strong>Quedex Ltd</strong><br/>are here:<br/><br/>4th Floor, Radius House,<br/>51 Clarendon Road,<br/>Watford,<br/>Hertfordshire WD17 1HP<br/>UK</div>'
    });

    // add listener for a click on the pin
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });

  }

  google.maps.event.addDomListener(window, 'load', initialize_map);

});
