$(function(){

	// main visual scrolltrigger
	gsap.registerPlugin(ScrollTrigger)
	
	gsap.timeline({
	  scrollTrigger : {
	    pin : '.sec-01'  ,
	    scrub: 1,
	    start: "top top",
	    end: '+=200%'
	  }
	})
	.fromTo(".video", 2,{clipPath:"inset(74% 4% 0% round 20px 20px 20px 20px)", y:20}, {clipPath:"inset(20% 15% 20% round 20px 20px 20px 20px)", y:0} , 'key')
	.to('.btn', {opacity:0}, 'key')
	.fromTo(".video img", 2,  {scale:1.1, y:500,}, {scale:1, y:0,} , 'key' )
	.fromTo(".video", 2,{clipPath:"inset(20% 15% 20% round 20px 20px 20px 20px)"}, {clipPath:"inset(0% 0% 0% round 0px)"} , 'key2')
	
	let lastScrollY = window.scrollY;
	
	$('.board_tab_list .board_tab_item .tab-btn').click(function(e) {
        var allMenu = $('.board_tab_list .board_tab_item');
        var allMenuBtn = $('.board_tab_list .board_tab_item .tab-btn');
        var menu = $(this).parent('.board_tab_item');
        var idx = menu.index();
        var tabContent = $('.board-panel');

        if (!menu.hasClass('active')) {

            allMenu.removeClass('active');
            allMenuBtn.attr('title', '해제됨');
            $(this).attr('title', '선택됨');
            menu.addClass('active');
            tabContent.hide();
            tabContent.eq(idx).stop().fadeIn(0);

            // 슬라이드가 첫 번째 게시물로 이동하도록 설정
            $('.slick-initialized').slick('slickGoTo', 0); 

            $('.slick-initialized').slick('setPosition');
        }
	});
	
	// board slide
	function board_slide_01 (){
		var slick_container = $('.board_container .board_slide_01');
		var slick_items = $('.board_container .board_slide_01 .board_slide_item');

		var slide_init = function(){
			slick_container.slick({
				slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                dots: false,
                adaptiveHeight: true,
                infinite: false, // 슬라이드가 마지막 게시물에서 멈추도록 설정
				prevArrow : $('.board_container .panel1 .board_slide_ctrl .slide-prev'),
				nextArrow : $('.board_container .panel1 .board_slide_ctrl .slide-next'),
				responsive: [
					{
						breakpoint: 1281,
						settings: {
							slidesToShow: 4,
							slidesToScroll:1,
							dots: false,
							infinite: false // 반응형에서도 동일하게 설정
						}
					},
					{
						breakpoint: 1025,
						settings: {
							slidesToShow: 3,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					},
					{
						breakpoint: 769,
						settings: {
							slidesToShow: 2,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					},
					{
						breakpoint: 641,
						settings: {
							slidesToShow: 1,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					}
				]
			})
		}

		var board_slide_init = function(){
			slide_init();
		}
	
		board_slide_init();

	}

	function board_slide_02 (){
		var slick_container = $('.board_container .board-panel .board_slide_02');
		var slick_items = $('.board_container .board-panel .board_slide_02 .board_slide_item');

		var slide_init = function(){
			slick_container.slick({
				slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                dots: false,
                adaptiveHeight: true,
                infinite: false, // 슬라이드가 마지막 게시물에서 멈추도록 설정
				prevArrow : $('.board_container .panel2 .board_slide_ctrl .slide-prev'),
				nextArrow : $('.board_container .panel2 .board_slide_ctrl .slide-next'),
				responsive: [
					{
						breakpoint: 1281,
						settings: {
							slidesToShow: 4,
							slidesToScroll:1,
							dots: false,
							infinite: false // 반응형에서도 동일하게 설정
						}
					},
					{
						breakpoint: 1025,
						settings: {
							slidesToShow: 3,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					},
					{
						breakpoint: 769,
						settings: {
							slidesToShow: 2,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					},
					{
						breakpoint: 641,
						settings: {
							slidesToShow: 1,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					}
				]
			})
		}

		var board_slide_init = function(){
			slide_init();
		}
	
		board_slide_init();

	}
	
	function board_slide_03 (){
		var slick_container = $('.board_container .board-panel .board_slide_03');
		var slick_items = $('.board_container .board-panel .board_slide_03 .board_slide_item');

		var slide_init = function(){
			slick_container.slick({
				slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                dots: false,
                adaptiveHeight: true,
                infinite: false, // 슬라이드가 마지막 게시물에서 멈추도록 설정
				prevArrow : $('.board_container .panel3 .board_slide_ctrl .slide-prev'),
				nextArrow : $('.board_container .panel3 .board_slide_ctrl .slide-next'),
				responsive: [
					{
						breakpoint: 1281,
						settings: {
							slidesToShow: 4,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					},
					{
						breakpoint: 1025,
						settings: {
							slidesToShow: 3,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					},
					{
						breakpoint: 769,
						settings: {
							slidesToShow: 2,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					},
					{
						breakpoint: 641,
						settings: {
							slidesToShow: 1,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					}
				]
			})
		}

		var board_slide_init = function(){
			slide_init();
		}
	
		board_slide_init();

	}
	
	function board_slide_04 (){
		var slick_container = $('.board_container .board-panel .board_slide_04');
		var slick_items = $('.board_container .board-panel .board_slide_04 .board_slide_item');

		var slide_init = function(){
			slick_container.slick({
				slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                dots: false,
                adaptiveHeight: true,
                infinite: false, // 슬라이드가 마지막 게시물에서 멈추도록 설정
				prevArrow : $('.board_container .panel4 .board_slide_ctrl .slide-prev'),
				nextArrow : $('.board_container .panel4 .board_slide_ctrl .slide-next'),
				responsive: [
					{
						breakpoint: 1281,
						settings: {
							slidesToShow: 4,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					},
					{
						breakpoint: 1025,
						settings: {
							slidesToShow: 3,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					},
					{
						breakpoint: 769,
						settings: {
							slidesToShow: 2,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					},
					{
						breakpoint: 641,
						settings: {
							slidesToShow: 1,
							slidesToScroll:1,
							dots: false,
							infinite: false
						}
					}
				]
			})
		}

		var board_slide_init = function(){
			slide_init();
		}
	
		board_slide_init();

	}
	
	// newsletter slide
	function newsletter_slide (){
		var slick_container = $('.newsletter_slide');
		var slick_items = $('.newsletter_slide .newsletter_slide_item');

		var slide_init = function(){
			slick_container.slick({
				slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                dots: true,
                appendDots: $('.newsletter .newsletter_slide_pager .pager'),
                adaptiveHeight: true,
				prevArrow : $('.newsletter .newsletter_slide_ctrl .slide-prev'),
				nextArrow : $('.newsletter .newsletter_slide_ctrl .slide-next'),
			})
		}

		var newsletter_slide_init = function(){
			slide_init();
		}
	
		newsletter_slide_init();

	}
	
	function quick_nav(){
        var el = $('.main-quicknav');
        var btns = el.find('[data-target]');
        var sections = $('.main-section');
		
        //ScrollTrigger.create({
        //   trigger: $('#sec-02'),
        //    start : 'top 24%',
        //    onEnter:  function(){
        //        el.addClass('on')
        //    },
        //    onLeaveBack : function(){
        //        el.removeClass('on')
        //    }
        //})

        function checkActiveSection(){
            var scrolling = $(this).scrollTop();
            var scroll_id = undefined;
			
			if(scrolling + $(window).height() == $(document).height()){
				 btns.removeClass('on');
				 $('.quick-list li:last-child a').addClass('on');
				 return;
			}

            for (var i = 0; i < sections.length; i++) {
	            var offset = sections.eq(i).attr('data-offset') || + 100;
	            if (scrolling > sections.eq(i).offset().top - offset) {
	                scroll_id = sections.eq(i).attr("id");
	            }
	        }
	        if (scroll_id) {
	            btns.removeClass('on');
	            $('[data-target="#'+scroll_id+'"]').addClass('on');
	        }
        }

        checkActiveSection();
		$(window).on('scroll', checkActiveSection)
        $(window).on('resize', checkActiveSection)
        
        el.find('[data-target]').on('click', function(e){
	        e.preventDefault();
	        var target = $(this).attr('data-target');
	        var targetOffset = $(target).offset().top;
	        
	        $('html, body').animate({
	            scrollTop: targetOffset
	        }, 600);
	    });
        
        function addTabIndex(){
            $('.main-section').each(function(){
                $(this).attr('tabindex', '0')
            })
        }
        function removeTabIndex(){
            $('.main-section').each(function(){
                $(this).removeAttr('tabindex')
            })
        }
        
    }

	function init(){
		board_slide_01();
		board_slide_02();
		board_slide_03();
		board_slide_04();
		newsletter_slide();
		quick_nav();
	};

	init();
	
	// popupzone slide
	var mainPop = $('.sec-05 .main_popupzone .popup_slide');
    var mainPopitem = $('.popup_slide .popup_item');

    function setImgAlt() {
        mainPopitem.each(function () {
            var title = $(this).attr('data-title');
            $(this).find('img').attr('alt', title);
        })
    }
    function setTitle() {
        var title = $('.main_popupzone .popup_slide .popup_slide_item').eq(0).find('a').attr('data-title');
    }
	function setHref(){
		var link = $('.main_popupzone .popup_slide .popup_slide_item').eq(0).find('a').attr('href');
	}
    function mainPopSlideInit() {
        setImgAlt();
        setTitle();
		setHref();
    }
    mainPopSlideInit();
    mainPop.slick({
    	slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        appendDots: $('.main_popupzone .popup_slide_pager .pager'),
        autoplaySpeed: 5000,
        autoplay: true,
        //prevArrow: $('.popup_slide_ctrl .ctrl_box .popup_prev'),
        //nextArrow: $('.popup_slide_ctrl .ctrl_box .popup_next'),
        responsive: [
					{
						breakpoint: 1281,
						settings: {
							slidesToShow: 2,
							slidesToScroll:1,
							dots: true,
						}
					},
					{
						breakpoint: 1025,
						settings: {
							slidesToShow: 2,
							slidesToScroll:1,
							dots: true,
						}
					},
					{
						breakpoint: 769,
						settings: {
							slidesToShow: 1,
							slidesToScroll:1,
							dots: true,
						}
					},
					{
						breakpoint: 641,
						settings: {
							slidesToShow: 1,
							slidesToScroll:1,
							dots: true,
						}
					}
					]
    			});
    
});