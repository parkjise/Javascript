$(document).ready(function () {
  // nav의 ele 클릭시 이동
  const navList = $("nav .menu-list li");
  const mainSections = $("#main > section");

  navList.click(function () {
    const idx = $(this).index();
    const section = mainSections.eq(idx);
    const sectionDistance = section.offset().top;

    $("html,body")
      .stop()
      .animate({ scrollTop: sectionDistance + 1 });
  });

  // logo클릭시 최상단으로 이동
  $(".logo-black,.logo-white").on("click", function () {
    $("nav .menu-list li").filter(":first").addClass("on");
    $("html,body").animate({ scrollTop: 0 }, 500);
  });

  // spot에서 아래로 이동하기 버튼
  $(".move_to").on("click", function () {
    $("nav .menu-list li").filter(":first").addClass("on");
    $("html,body").animate({ scrollTop: $(this.hash).offset().top + 1 }, 500);
  });

  // 스크롤시, 동작 세팅
  $(window).scroll(function () {
    // #main 영역에 도달하면, 활성화 비활성화 되여야할 영역 세팅
    const mainTop = $("#main").offset().top;
    const height = $(document).scrollTop();
    if (mainTop == height) {
      $("nav li").filter(":first").addClass("on");
    } else if (mainTop <= height) {
      $("nav").addClass("fix");
      $(".fixed-area").show();
      $(".floating-top").show();
    } else if (mainTop > height) {
      $("nav").removeClass("fix");
      $("nav li").removeClass("on");
      $(".fixed-area").hide();
      $(".floating-top").hide();
    }

    // nav li active
    mainSections.each(function () {
      if ($(this).offset().top <= $(window).scrollTop() + 1) {
        const idx = $(this).index();
        navList.removeClass("on");
        navList.eq(idx).addClass("on");
      }
    });
  });

  function scrollOn() {
    $("body").css({ overflow: "hidden" });
    $("body").on("scroll touchmove mousewheel", function (e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }

  // 스크롤 제한 OFF
  function scrollOff() {
    $("body").css({ overflow: "initial" });
    $("body").off("scroll touchmove mousewheel");
  }

    const topMenuImages = [
        "https://laundry24.net/wp-content/themes/laundry/images/v2/menu_hbg_btn_white.svg"
        , "https://laundry24.net/wp-content/themes/laundry/images/v2/menu_btn_close_white.svg"
    ];

    const menuImages = [
        "https://laundry24.net/wp-content/themes/laundry/images/v2/menu_hbg_btn_black.svg"
        , "https://laundry24.net/wp-content/themes/laundry/images/v2/menu_btn_close_black.svg"
    ];

    let currentIndex = 0;
    $(".menu-btn").on("click", function () {
        if ($(".mobile-menu").is(":visible")) {
            $(".mobile-menu").hide();
            $(this).parents("nav").removeClass("on");
            scrollOff();
        } else {
            $(this).css('transform', 'scaleY(1)');
            $(".mobile-menu").show();
            $(this).parents("nav").addClass("on");
            scrollOn();
        }
        // 납작하게
        $(this).css('transform', 'scaleY(0.1)');
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % menuImages.length; // 다음 이미지로 변경
            if ($(this).closest('.fix').length == 0 && currentIndex == 0) {
                $(this).css('background-image', `url(${topMenuImages[currentIndex]})`); // 이미지 변경
            } else {
                $(this).css('background-image', `url(${menuImages[currentIndex]})`); // 이미지 변경
            }

            // 원래 크기로 복원
            $(this).css('transform', 'scaleY(1)');
            if(currentIndex == 0){
                $('nav .content .menu-btn').removeAttr('style');
                $('nav.on .content .menu-btn,  nav.fix .content .menu-btn').removeAttr('style');
            }
        }, 200); // 0.5초 후에 실행
    });

    $("nav .mobile-menu li").click(function () {
        const idx = $(this).index();
        const section = mainSections.eq(idx);
        const sectionDistance = section.offset().top;

        $("html,body").stop().animate({ scrollTop: sectionDistance });
        $(".mobile-menu").hide();
        scrollOff();
        $("nav").removeClass("on");

        // 납작하게
        $(".menu-btn").css('transform', 'scaleY(0.1)');
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % menuImages.length; // 다음 이미지로 변경
            if ($(".menu-btn").closest('.fix').length == 0 && currentIndex == 0) {
                $(".menu-btn").css('background-image', `url(${topMenuImages[currentIndex]})`); // 이미지 변경
            } else {
                $(".menu-btn").css('background-image', `url(${menuImages[currentIndex]})`); // 이미지 변경
            }

            // 원래 크기로 복원
            $(".menu-btn").css('transform', 'scaleY(1)');
            if(currentIndex == 0){
                $('nav .content .menu-btn').removeAttr('style');
                $('nav.on .content .menu-btn,  nav.fix .content .menu-btn').removeAttr('style');
            }
        }, 200); // 0.5초 후에 실행
    });

  // select box 노출
  $(".wrapper").on("click", function (event) {
    const tgPoint = $(event.target);
    const tgPointParent = $(event.target).parent(".select-box");
    const popCallBtn = tgPoint.hasClass("select-box");
    const popArea = tgPoint.hasClass("select-list");

    if (!popCallBtn && !popArea && tgPointParent.length == 0) {
      $(".select-list").hide();
    }
  });

  $(".fixed-area #fix-location-select").on("click", function () {
    $(this).find(".select-list").toggle();
    $("#fix-where-select").find(".select-list").hide();
  });

  $(".fixed-area #fix-location-select .select-list li").on(
    "click",
    function () {
      $("#fix-location-select .selected-item").text($(this).text());
    },
  );

  $(".fixed-area #fix-where-select").on("click", function () {
    $(this).find(".select-list").toggle();
    $("#fix-location-select").find(".select-list").hide();
  });

  $(".fixed-area #fix-where-select .select-list li").on("click", function () {
    $("#fix-where-select .selected-item").text($(this).text());
  });
});
