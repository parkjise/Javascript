$(document).ready(function() {

	var aprtime = 1;
	$(window).scroll(function() {
		var winh = $(window).height()*0.8;
		var hh = $(this).scrollTop();
		$('.off').each(function(i) {
			var $li = $(this);
			var thish = $(this).offset().top;
			if (hh >= thish - winh) {
				setTimeout(function() {
					$li.addClass('on');
				}, i*aprtime);
			} else {
				setTimeout(function() {
					$li.removeClass('on');
				}, i*aprtime);
			}
		});

		if ( $(".last-sec").length ) {
			var lastSec = $(".last-sec").offset().top;
			if (hh >= lastSec - winh/2) {
				$("#totop").addClass("act");
			} else {
				$("#totop").removeClass("act");
			}
		}
		$('.imgoff').each(function(i) {
			var $li = $(this);
			var thish = $(this).offset().top;
			if (hh >= thish - winh) {
				$li.addClass('imgon');
			} else {
				$li.removeClass('imgon');
			}
		});
	});
	// iframe 100% 확대
	var ratio = 281/500;
	$(window).resize(function() {
		$('iframe').height($('iframe').width()*ratio);
	}).resize();
	// end iframe 100% 확대

	// hamberger 
	$('#hamberger').click(function(){
		$('#hamberger').toggleClass('open');
		if($(this).hasClass('open')) {
			$('#nav').addClass('act nice');
			$("body").addClass("open");
		} else {
			$('#nav').removeClass('act');
			$("body").removeClass("open");
		}
	});

	var flag = 30;
	$(window).scroll(function() {
		var winw = $(this).width();
		var winh = $(this).height();
		var hscroll = $(this).scrollTop();

		if ( hscroll >= flag ) {
			$('header').addClass('act nice');
		} else {
			$('header').removeClass('act');
		}
	}).scroll();
/*
	setTimeout(function() {
	}, 300);
*/
	
	$('#totop').click(function () {
		$('html, body').animate({
			scrollTop:0
		}, 600);
		return false;
	});

	$(".menu-gnb-container .menu li").addClass("dib");
	$(".menu-gnb-container .menu li a").addClass("under");
});

function addClickCount(link, item1, item2){
    jQuery.post(ajax_object.ajax_url
    	, {action: 'click'
    		, link : link
    		, item1 : item1
    		, item2 : item2}
    	, function(response) {
    });
}