$(function(){

	var Global_UI = {
        gnbIsOpen: false,
        gnbCloseAction: null,
    };

    function gnb_init() {
        var $header = $("#header .header_wrap");
        var $menu = $("#gnb .mn_l1");
        var $gnb = $("#gnb");
        var headerHeight = "118px";
        var gnbHeight;
        var gnbLastFocusItem = $("#gnb .mn_l1:last-child .depth2 .mn_l2:last-child .mn_a2");

        updateGnbHeight();
        $(window).on("resize", function () {
            updateGnbHeight();
            $header.height(headerHeight);
        });

        $menu.on("mouseenter focusin", function () {
            updateGnbHeight();
            $header.addClass("open");
            Global_UI.gnbIsOpen = true;
            $header.height(gnbHeight);
        });

        $header.on("mouseleave", function () {
            $header.removeClass("open");
            Global_UI.gnbIsOpen = false;
            $header.height(headerHeight);
        });

        gnbLastFocusItem.on("focusout", function () {
            $header.removeClass("open");
            Global_UI.gnbIsOpen = false;
            $header.height(headerHeight);
        });

        function updateGnbHeight() {
            gnbHeight = $gnb.height();
        }

        Global_UI.gnbCloseAction = function (callback) {
            $header.removeClass("open");
            Global_UI.gnbIsOpen = false;
            $header.height(headerHeight);

            if (callback) {
                setTimeout(callback, 250);
            }
        };
    }

	// GNB focus in/out
	/*$(function(){
		$('#gnb .nav .mn_dp1').focus(function(){
			$(this).siblings('.top_mn2').addClass('active');
		})
		$('#gnb .nav .mn_dp2').focus(function(){
			$(this).parents('.top_mn2').addClass('active');
		})
		$('#gnb .dropdown a').focusout(function(){
			$('.top_mn2').removeClass('active');
		})
	});*/
    
    // GNB focus in/out 수정
    $(function() {
        // .mn_dp1에 포커스가 가면 하위 메뉴 열기
        $('#gnb .nav .mn_dp1').focus(function() {
            $(this).siblings('.top_mn2').addClass('active');
        });

        // .mn_dp2에 포커스가 가면 해당 부모 메뉴 열기
        $('#gnb .nav .mn_dp2').focus(function() {
            $(this).parents('.top_mn2').addClass('active');
        });

        // 포커스를 잃으면 하위 메뉴 닫기
        $('#gnb .dropdown a').focusout(function() {
            $('.top_mn2').removeClass('active');
        });

        // .mn_dp1을 클릭하면 하위 메뉴를 토글
        $('#gnb .nav .mn_dp1').on('click', function() {
            $(this).siblings('.top_mn2').toggleClass('active');  // 클래스 토글
            console.log('클릭');
        });

        // .mn_dp2를 클릭하면 해당 부모 메뉴를 토글
        $('#gnb .nav .mn_dp2').on('click', function() {
            $(this).parents('.top_mn2').toggleClass('active');  // 클래스 토글
        });

        // 하위 메뉴 외부 영역을 클릭할 때 메뉴 닫기
        $('#gnb .dropdown a').on('click', function() {
            $('.top_mn2').removeClass('active');  // 메뉴 닫기
        });
    });
	
	
	
	// mnb menu on/off
	$('.rnb .utill .mobile_btn').click(function() {
        $('.mobiledim').fadeIn();
        $('#mobile-nav').animate({
            right : 0
        }, 300);
        $('#mobile-nav').css('position', 'fixed');
        $('#wrap').css('position', '');
    });
    $('.close-mnb-btn, .mobiledim').click(function() {
        $('.mobiledim').fadeOut();
        $('#mobile-nav').animate({
            right : -320
        }, 300);
        $('#mobile-nav').css('position', '');
        $('#wrap').css('position', '');

        return false;
    });
    
    // mobile menu toggle
    $('.mb_ml1 .mb_ma1').on('click', function(){
		$(this).parent().parent().find('.mb_mdp2').not(
                $(this).siblings(".mb_mdp2")).slideUp(300);
        $(this).siblings(".mb_mdp2").slideToggle(300);
		return false;
	});

	function footer_init(){
		// footer family_site
		$('.family_site .family_site_btn').on('click', function(){
			var select = $(this).siblings('.family_list')
			if($(this).hasClass('open')){
				select.slideUp(300);
				$(this).removeClass('open');
				$(this).attr('title', '닫힘')
			}else{
				$(this).addClass('open')
				select.slideDown(300);
				$(this).attr('title', '열림')
			}

			return false;
	    });

	    // footer select tab focus in/out
		$('.family_list .family_item:last-child .family_link').focusout(function(){
			$('.family_list').stop().slideUp(200);
			$('.family_site_btn').removeClass('open').attr('title', '닫힘')
		})
		
		$(document).on('click', function(e){
			if($(e.target).closest('.family_list').length && !$('.family_site_box .family_list').is(':visible')){
				return;
			}
			$('.family_list').stop().slideUp(200);
			$('.family_site_btn').removeClass('open').attr('title', '닫힘')
		})
	}

	function sitemap_init() {
        $('.rnb .utill .sitemap').click(function(){
            $('#sitemap').fadeIn();
        })
        $('#sitemap .close-btn').click(function(){
            $('#sitemap').fadeOut();
        })
    }
	
	function init(){
		gnb_init();
		footer_init();
		sitemap_init();
	}
	init();

});

// top 버튼
// 페이지 로드 후 실행
window.onload = function () {
    const goTopButton = document.getElementById('gnb-gotop');

//    // 스크롤 이벤트 핸들러
//    window.addEventListener('scroll', function () {
//        // 스크롤을 어느 정도 했을 때 버튼을 보여줌
//        if (window.scrollY > 100) {
//            goTopButton.style.display = 'block'; // 버튼 표시
//        } else {
//            goTopButton.style.display = 'none';  // 버튼 숨김
//        }
//    });

    // 버튼 클릭 시 페이지 상단으로 이동
    goTopButton.querySelector('.gotop-btn').addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드럽게 이동
        });
    });
};