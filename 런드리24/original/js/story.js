$(document).ready(function () {
  const slider = $("#story .youtube");
  const progressBar = $("#story .progressbar-fill");

  // story 슬라이드
  slider
    .on("init", function (event, slick, currentSlide, nextSlide) {
      const currentDot = $(".slick-dots .slick-active").index() + 1;
      const dots = slider.find(".slick-dots li").length;
      const calc = (currentDot / dots) * 100;

      progressBar
        .css("background-size", calc + "% 100%")
        .attr("aria-value", calc);
    })
    .slick({
      dots: true,
      infinite: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      variableWidth: true,
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
      const currentDot = $(".slick-dots .slick-active").index() + 1;
      const dots = slider.find(".slick-dots li").length;
      const calc = (currentDot / dots) * 100;

      const slickList = slick.$dots[0].children;
      for (let slick of slickList) {
        if (slick.classList.contains("slick-active")) {
          $("#story .boxs .txt-box")
            .eq(currentDot - 1)
            .addClass("on")
            .siblings()
            .removeClass("on");
        }
      }

      progressBar
        .css("background-size", calc + "% 100%")
        .attr("aria-value", calc);
      $(".now-count").text(`0${currentDot}`);
    })
    .on("click", function (event) {
    });
$(".swiper-button-prev").click()

  $("#story .swiper-button-prev").on("click", function () {
    $("#story .slick-prev").trigger("click");
    $("#story .youtube").slick("slickPlay");
  });
  $("#story .swiper-button-next").on("click", function () {
    $("#story .slick-next").trigger("click");
    $("#story .youtube").slick("slickPlay");
  });

  $(window).on("resize", function () {
    slider.slick("resize");
  });



});
    let players = {}; // 여러 동영상을 관리할 객체

    // IFrame API가 로드되면 호출되는 함수
    function onYouTubeIframeAPIReady() {
      // 각 동영상 플레이어 생성
      players.vid1 = createPlayer('vid1', 'W3BFmMtr7jE');
      players.vid2 = createPlayer('vid2', 'qZey3dVjR_M');
      players.vid3 = createPlayer('vid3', 'i9QzdmuZ7nM');
    }

    // 개별 동영상 플레이어를 생성하는 함수
    function createPlayer(elementId, videoId) {
      return new YT.Player(elementId, {
        videoId: videoId,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    // 플레이어가 준비되었을 때 실행되는 함수
    function onPlayerReady(event) {
      // console.log(`${event.target.getVideoData().title} 준비 완료`);
    }

    // 동영상 상태가 변경될 때 실행되는 함수
    function onPlayerStateChange(event) {
      const state = event.data;
      const videoTitle = event.target.getVideoData().title;

      switch (state) {
        case YT.PlayerState.PLAYING:
          // console.log(`${videoTitle} 재생 중`);
          $("#story .youtube").slick("slickPause");
          break;
        case YT.PlayerState.PAUSED:
          // console.log(`${videoTitle} 일시정지`);
          break;
        case YT.PlayerState.ENDED:
          // console.log(`${videoTitle} 종료`);
          break;
      }
    }