$(function () {
  $(".fnq-list li").on("click", function () {
    const isShow = $(this).hasClass("show");
    if (isShow) {
      $(this).removeClass("show"); // 이미 show 클래스가 있으면 제거
    } else {
      $(".fnq-list li").removeClass("show"); // 다른 항목에서 show 클래스 제거
      $(this).addClass("show"); // 현재 항목에 show 클래스 추가
    }
  });
});

// $(function () {
//   $(".fnq-list li").on("click", function () {
//     const isShow = $(this).hasClass("show");
//     if (isShow) {
//       $(this).removeClass("show"); // 이미 show 클래스가 있으면 제거
//     } else {
//       $(this).siblings("li").removeClass("show"); // 다른 항목에서 show 클래스 제거
//       $(this).addClass("show"); // 현재 항목에 show 클래스 추가
//     }
//   });
// });
