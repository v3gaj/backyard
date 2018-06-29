// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require twitter/bootstrap
//= require activestorage
//= require turbolinks
//= require_tree .
//= require swiper

//= require masonry/jquery.masonry
//= require masonry/jquery.imagesloaded.min
//= require masonry/jquery.infinitescroll.min
//= require masonry/modernizr-transitions

//= slick

//= require underscore
//= require gmaps/google

$(document).on('turbolinks:load', function() {

	$('html, body').animate({scrollTop: 1}, 'normal');

  homeSlider();
  testimonialSlider();
  $(".slide img").load(function(){
        homeSliderHeight();
	});
	checkGradeient();
	serviceTabs();
	jQuery(window).scroll(function() {
	    scroll_anim();
	});

	$(window).resize( function() {
		setTimeout(function(){
			homeSliderHeight();
		}, 250);
	});

	$(window).scroll(function () {
      var $scroll = $(window).scrollTop();
      var $navbar = $(".navbar");
      if ($scroll > 30) {
          $navbar.addClass("fixedmenu");
      } else {
          $navbar.removeClass("fixedmenu");
      }
  });
  animation();
	googleMaps();


	/* ------- Smooth scroll ------- */
  $(".scroll").on("click", function (event) {
      var menu = $("nav.navbar").innerHeight();
      event.preventDefault();
      $("html,body").animate({
          scrollTop: ($(this.hash).offset().top - 10)
      }, 1000);
  });
    
   /*------ MENU Fixed ------*/
  

  
});


function scroll_anim() {
    "use strict";
    var scroll_offset = jQuery(window).scrollTop() + 70;
    jQuery('[data-animation^="animated"]:not(.animated)').each(function () {
        if (jQuery(this).offset().top < scroll_offset + jQuery(window).height())
            jQuery(this).addClass(jQuery(this).data('animation'));
    });
}

function homeSlider(){

	$('.home-slider').slick({
		arrows: true,
		dots: true,
		infinite: true,
		speed: 1000,
		fade: true,
		autoplay: true,
	  	autoplaySpeed: 5000,
	  	pauseOnHover: false,
		cssEase: 'linear'
    });

    $(".slick-current").removeClass("slick-active");
    $(".home-slider-content").css("display", 'none');
    
    setTimeout(function() {
        $(".slick-current").addClass("slick-active");
        $(".home-slider-content").css("display", 'block');
    }, 500);
}

function testimonialSlider(){

	$('.testimonial-slider').slick({
		arrows: false,
		dots: true,
		infinite: true,
		speed: 500,
		autoplay: true,
  	autoplaySpeed: 4000,
  	pauseOnHover: false,
		cssEase: 'linear'
    });
}

function animation(){
	var array = $( ".animation" ).toArray()
	var win = $(window).scrollTop() + $(window).height();

	for (var i = 0; i < array.length; i++) {
		var attribute = $(array[i]).offset().top;

		if (true) {}
		if (attribute > win) {
			//$(array[i]).css("opacity", 0);
			$(array[i]).addClass("animation2");
			$(array[i]).removeClass("animation");
		}
	}
	//$('.animation2').css("opacity", 0);
}

function homeSliderHeight(){
	if ($('.slide img').length != 0) {
		var array = $( ".slide img" ).toArray()
		var height = 0;
		var win = $(window).height();
		var menuOffset = $('.navbar').offset();
		var menuHeight = $('.navbar').height();

		var menu = menuOffset.top + menuHeight;
		var menu = win - menu;

		for (var i = 0; i < array.length; i++) {
			var attribute = $(array[i]).height();
			if (height == 0) {
				height = attribute
			}else if (attribute < height) {
				height = attribute
			}
		}

		if(height < 512){
			height = 512
		}

		if (height > win) {
			$('#home-slider').css('height', win );
		    $('#home-slider .slide').css('height', win );
		}else{
			$('#home-slider').css('height', height);
		    $('#home-slider .slide').css('height', height);
		}
	}
}

function checkGradeient() {
	//gradient animations
	var colors = new Array(
		[62,35,255],
		[60,255,60],
		[255,35,98],
		[45,175,230],
		[255,0,255],
		[255,128,0]);

	var step = 0;
//color table indices for:
// current color left
// next color left
// current color right

// next color right
	var colorIndices = [0,1,2,3];

//transition speed
	var gradientSpeed = 0.002;

	function updateGradient()
	{

		if ( $===undefined ) return;

		var c0_0 = colors[colorIndices[0]];
		var c0_1 = colors[colorIndices[1]];
		var c1_0 = colors[colorIndices[2]];
		var c1_1 = colors[colorIndices[3]];

		var istep = 1 - step;
		var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
		var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
		var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
		var color1 = "rgb("+r1+","+g1+","+b1+")";

		var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
		var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
		var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
		var color2 = "rgb("+r2+","+g2+","+b2+")";

		$('.gradient').css({
			background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
			background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

		step += gradientSpeed;
		if ( step >= 1 )
		{
			step %= 1;
			colorIndices[0] = colorIndices[1];
			colorIndices[2] = colorIndices[3];

			//pick two new target color indices
			//do not pick the same as the current one
			colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
			colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

		}
	}

	setInterval(updateGradient,10);
}

if($('body').hasClass("gradientLayout")){
	checkGradeient()
}

function serviceTabs(){
	$(".header-service").click(function () {

		if (!$(this).hasClass('service-toogle')) {

			$(".header-service").each(function(index, block) {
				if ($(block).hasClass('service-toogle')) {
					$(block).parent().next().slideToggle('normal');
					$(block).toggleClass('service-toogle gradient');
					$(block).css('background', '#008cba');
				}
			});

			var header = $(this) // Get clicked element
			var winHeight = $(window).height(); // Get window height
			var winScrollTop = $(window).scrollTop(); // Get window scrolled section
			var panel = $(this).parent().next(); // Get panel to show
			var height
			var blocks = $(".header-service")

			$(header).toggleClass('service-toogle');
			$(header).toggleClass('gradient');
			$(panel).slideToggle('normal', function () { // Declare function
				if ($(header).hasClass('service-toogle')) {
					height = panel.outerHeight(); // Get element height after slide down
					if ((winScrollTop + winHeight) < (panel.offset().top + height)) { // If window botton is less than panel botton shown, animate the window to show the panel 
						$('html, body').animate({scrollTop: ($(panel).offset().top) - winHeight + height}, 'normal');
					}
				};
			}).promise().done(); // Declare promise to obtain height after slide down
		}
	});
}

function googleMaps(){

		var mapStyle = [
	    {
	        "featureType": "administrative",
	        "elementType": "all",
	        "stylers": [
	            {
	                "saturation": "-100"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.province",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "all",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 65
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "all",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": "50"
	            },
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "all",
	        "stylers": [
	            {
	                "saturation": "-100"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "all",
	        "stylers": [
	            {
	                "lightness": "30"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "all",
	        "stylers": [
	            {
	                "lightness": "40"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "elementType": "all",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "hue": "#ffff00"
	            },
	            {
	                "lightness": -25
	            },
	            {
	                "saturation": -97
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "lightness": -25
	            },
	            {
	                "saturation": -100
	            }
	        ]
	    }
	]

	handler = Gmaps.build('Google');
	handler.buildMap({
    provider: {
      disableDefaultUI: true,
      zoom:      15,
      center:    new google.maps.LatLng(9.996533, -84.149734),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles:    mapStyle
    },
    internal: {
      id: 'map',
    }
  },
  function(){
    markers = handler.addMarkers([
      {
        "lat": 9.996533,
        "lng": -84.149734,
        "picture": {
          "url": "assets/marker.png",
          "width":  78,
          "height": 78
        },
        "infowindow": "BackyardLinks!"
      }
    ]);
    handler.bounds.extendWith(markers);
  });
}