$(document).ready(function () {
  // about 이미지 슬라이드
  $("#about .nav li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  // about 이미지 슬라이드

  const merit_slide1 = $("#about .merit-slide1");
  const merit_slide1_btn = $("#about .slide1 .hash-btns .btn");

  const merit_slide2 = $("#about .merit-slide2");
  const merit_slide2_btn = $("#about .slide2 .hash-btns .btn");

  const merit_slide3 = $("#about .merit-slide3");
  const merit_slide3_btn = $("#about .slide3 .hash-btns .btn");

  merit_slide1
    .slick({
      dots: true,
      dotsClass: "slick-dots",
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: false,
      variableWidth: false,
      autoplay: true,
      autoplaySpeed: 7000,
    })
    .on("swipe afterChange", function (e, slick, d) {
      const slickList = slick.$dots[0].children;
      for (let slick of slickList) {
        if (slick.classList.contains("slick-active")) {
          handleChangeClass("slide1", slick.innerText - 1);
        }
      }
    });

  merit_slide2
    .slick({
      dots: true,
      dotsClass: "slick-dots",
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: false,
      variableWidth: false,
      autoplay: true,
      autoplaySpeed: 7000,
    })
    .on("swipe afterChange", function (e, slick, d) {
      const slickList = slick.$dots[0].children;
      for (let slick of slickList) {
        if (slick.classList.contains("slick-active")) {
          handleChangeClass("slide2", slick.innerText - 1);
        }
      }
    });

  merit_slide3
    .slick({
      dots: true,
      dotsClass: "slick-dots",
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: false,
      variableWidth: false,
      autoplay: true,
      autoplaySpeed: 7000,
    })
    .on("swipe afterChange", function (e, slick, d) {
      const slickList = slick.$dots[0].children;
      for (let slick of slickList) {
        if (slick.classList.contains("slick-active")) {
          handleChangeClass("slide3", slick.innerText - 1);
        }
      }
    });

  function handleChangeClass(slideName, index) {
    $("#about ." + slideName + " .hash-btns .btn")
      .eq(index)
      .addClass("on")
      .siblings()
      .removeClass("on");
  }

  // merit_slide1
  merit_slide1_btn.on("click", function () {
    if ($(this).hasClass("on")) {
      return;
    } else {
      $(this).addClass("on").siblings().removeClass("on");
    }

    const slideNo = $(this).index();
    merit_slide1.slick("slickGoTo", slideNo);
  });

  $("#about .slide1 .slick-dots li").on("click afterChange", function () {
    handleChangeClass("slide1", $(this).index());
  });

  // merit_slide2
  merit_slide2_btn.on("click", function () {
    if ($(this).hasClass("on")) {
      return;
    } else {
      $(this).addClass("on").siblings().removeClass("on");
    }

    const slideNo = $(this).index();
    merit_slide2.slick("slickGoTo", slideNo);
  });

  $("#about .slide2 .slick-dots li").on("click", function () {
    handleChangeClass("slide2", $(this).index());
  });

  // merit_slide3
  merit_slide3_btn.on("click", function () {
    if ($(this).hasClass("on")) {
      return;
    } else {
      $(this).addClass("on").siblings().removeClass("on");
    }

    const slideNo = $(this).index();
    merit_slide3.slick("slickGoTo", slideNo);
  });

  $("#about .slide3 .slick-dots li").on("click", function () {
    handleChangeClass("slide3", $(this).index());
  });

  // about 슬라이드
  const current = $("#about .slick-counter .current"),
    total = $("#about .slick-counter .total");
  $("#about .dry-area .slide")
    .on("init", function (event, slick) {
      current.text(slick.currentSlide + 1);
      total.text(Math.floor(slick.slideCount / 2));
    })
    .slick({
      dots: false,
      arrows: true,
      infinite: false,
      speed: 300,
      centerMode: false,
      variableWidth: true,
      slidesToShow: 3,
      slidesToScroll: 3,

      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    })
    .on("afterChange", function (event, slick, currentSlide, nextSlide) {
      if (currentSlide === 0) {
        $(".current").text(currentSlide + 1);
      } else {
        $(".current").text(Math.floor(slick.slideCount / 2));
      }
    });

  //  about - goToPostPlatform
  var isClickLinkPlatform = false;
  var goToPostPlatform = function () {
    $(".js_btn_link").on("click", function (e) {
      if ($(window).outerWidth() < 1314) return;
      e.preventDefault();
      isClickLinkPlatform = true;
      let idTarget = "#" + $(this).attr("aria-controls");
      $(".js_btn_link").removeClass("is_active");
      $(this).addClass("is_active");
      $(idTarget)
        .addClass("is_show is_active")
        .siblings()
        .removeClass("is_active");

      let move_to_target =
        idTarget == "#content1"
          ? $(idTarget).offset().top - 100
          : $(idTarget).offset().top + 20;

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: move_to_target,
          },
          {
            duration: 800,
            complete: function () {
              isClickLinkPlatform = false;
            },
          }
        );
    });
  };
  var activePostPlatform = function () {
    if (isClickLinkPlatform) return;
    let scrollTop = $(window).scrollTop(),
      distanceTop = parseInt($(".main_platform_post").eq(1).css("padding-top"));
    $(".main_platform_post").each(function () {
      let idControl = $(this).attr("id"),
        elOffsetTop = $(this).offset().top;

      if (
        elOffsetTop <
        scrollTop + $(window).innerHeight() + distanceTop + 120
      ) {
        $(this).addClass("is_show");
        if ($(window).outerWidth() >= 1314 && $(this).index() == 0) {
          $(this).addClass("is_active");
        }
      }
      if (
        $(window).outerWidth() >= 1314 &&
        scrollTop >= elOffsetTop - distanceTop
      ) {
        $(this).addClass("is_active").siblings().removeClass("is_active");
        $(".js_btn_link").removeClass("is_active");
        $(".js_btn_link[aria-controls=" + idControl + "]").addClass(
          "is_active"
        );
      }
    });
  };

  $(".platform-area")
    .on("scroll touchmove wheel DOMMouseScroll", function () {
      activePostPlatform();
    })
    .scroll();

  goToPostPlatform();

  setTimeout(function () {
    $(".laundry-room-area .slide").slick({
      dots: false,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      initialSlide: 0,
      // autoplay: true,
      // autoplaySpeed: 600000,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            arrows: false,
          },
        },
      ],
    });
  }, 100);
  setTimeout(function () {
    $(".laundry-room-area .slide").slick("slickGoTo", 0);
  }, 1000);
  setTimeout(function () {
    $(".laundry-room-area .slide").slick("slickGoTo", 0);
  }, 2000);

  $("#about .merit-area .items .hash-btns .btn").on("mouseover", function () {
    if (!isMobile()) {
      $(this).addClass("btn-hover");
    }
  });
  $("#about .merit-area .items .hash-btns .btn").on("mouseout", function () {
    if (!isMobile()) {
      $(this).removeClass("btn-hover");
    }
  });
});

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
