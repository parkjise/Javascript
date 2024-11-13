$(document).ready(function () {
  // fnq 자주 묻는 질문
  $("#fnq .question").on("click", function () {
    if ($(this).parent().hasClass("show")) {
      $(this).parent().removeClass("show").siblings().removeClass("show");
    } else {
      $(this).parent().addClass("show").siblings().removeClass("show");
    }
  });
});
