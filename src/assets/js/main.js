(function ($) {
	"use strict";

    $(document).ready(function($){


        $(".embed-responsive iframe").addClass("embed-responsive-item");
        $(".carousel-inner .item:first-child").addClass("active");
        $('[data-toggle="tooltip"]').tooltip();
		//Fixed nav on scroll
		$(document).on('scroll',function(e){
			var scrollTop = $(document).scrollTop();
			if(scrollTop > $('#navbar-1').height()){
				$('#navbar-1').addClass('fixed-top');
				$('#navbar-1').removeClass('navbar-1');
				$('.desktop').attr('src', 'assets/images/logo/mainLogo.png');
			}
			else {
				$('#navbar-1').addClass('navbar-1');
				$('#navbar-1').removeClass('fixed-top');
				$('.desktop').attr('src', 'assets/images/logo/mainLogo.png');
			}
		});

		//Search
		$("#addClass").on('click',function () {
          $('#qnimate').addClass('popup-box-on');
        });
          
        $("#removeClass").on('click',function () {
          $('#qnimate').removeClass('popup-box-on');
        });

        


    });


    $(window).on('load',function(){
		
		
		//Portfolio container			
		var $container = $('.portfolioContainer');
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
 
		$('.portfolioFilter a').on('click', function(){
			$('.portfolioFilter a').removeClass('current');
			$(this).addClass('current');
	 
			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			 });
			 return false;
		}); 

        
    });


}(jQuery));	