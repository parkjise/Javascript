/*
 스크롤 애니메이션과 섹션 활성화를 관리하는 함수들로 구성된 
 JavaScript/jQuery 코드입니다. 특정 버튼을 클릭하거나 
 사용자가 스크롤할 때 화면 요소를 표시하거나, 현재 활성화된 
 섹션을 강조하여 보여주는 기능을 구현
*/
// 스크롤 애니메이션 함수
let isClickLinkPlatform = false;

function goToPostPlatform() {
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

    $("html,body")
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
}

goToPostPlatform();

function activePostPlatform() {
  if (isClickLinkPlatform) return;
  let scrollTop = $(window).scrollTop();
  let distanceTop = parseInt($(".main_platform_post").eq(1).css("padding-top"));
  $(".main_platform_post").each(function () {
    let idControl = $(this).attr("id");
    let elOffsetTop = $(this).offset().top;

    if (elOffsetTop < scrollTop + $(window).innerHeight() + distanceTop + 120) {
      $(this).addClass("is_show");
      if ($(window).outerWidth() >= 1314 && $(this).index() == 0) {
        $(this).addClass("is_active");
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
    }
  });
}

$(".platform-area")
  .on("scroll touchmove wheel DOMMouseScroll", function () {
    activePostPlatform();
  })
  .scroll();
