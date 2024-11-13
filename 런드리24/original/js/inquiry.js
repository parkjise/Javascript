$(document).ready(function () {

    // 리퍼럴 세팅
    $('input[name="referrer"]').each(function() {
      $(this).val(document.referrer);
    });
    // 연락처 보내기 성공시 네이버 로그분석
    document.addEventListener('wpcf7mailsent', function(event) {

        if (window.wcs) {
            var formId = event.detail.contactFormId;
            alert("창업문의가 성공적으로 전송되었습니다.");
            // 창업 문의 보내기 성공
            if (formId == 712) {
                var _conv = {};
                _conv.type = "lead";
                _conv.items=[
                    {
                        name:"창업문의",
                    }
                ];
                // 네이버 프리미엄 로그분석 보내기
                wcs.trans(_conv);
            }

            else if (formId == 713) {
                // 하단 창업 문의 보내기 성공
                var _conv = {};
                _conv.type = "lead";
                _conv.items=[
                    {
                        name:"하단 창업문의",
                    }
                ];
                // 네이버 프리미엄 로그분석 보내기
                wcs.trans(_conv);
            }
        }
    }, false);


  // inquiry 창업 문의
  $("#inquiry .check-box .btn").on("click", function () {
    if ($(this).parent().siblings().hasClass("show")) {
      $(this).parent().siblings().removeClass("show");
      $(this).removeClass("clicked");
    } else {
      $(this).parent().siblings().addClass("show");
      $(this).addClass("clicked");
    }
  });

  // inquiry 창업 문의
  $("#inquiry .check-btn").on("click", function () {
    if ($(this).parent().hasClass("checked")) {
      $(this).parent().removeClass("checked");
    } else {
      $(this).parent().addClass("checked");
    }
  });

  // inquiry 문의하기 - 문의 내용 길이 체크
  $("#rq-command").keyup(function (e) {
    let content = $(this).val();
    if (content.length == 0 || content == "") {
      $(".textCount").text("0");
    } else {
      $(".textCount").text(content.length);
    }

    if (content.length > 2700) {
      $(this).val($(this).val().substring(0, 2700));
    }
  });

  // inquiry - select box
  /*  
    간단하게 값만 변경되도록 작업해두었습니다. 
    다른 방식으로 작업 예정이시라면 작업하시면서 변경하시면 될 것 같습니다.
  */

  $("#location-select").on("click", function () {
    $(this).find(".select-list").toggle();
    $("#where-select").find(".select-list").hide();
  });

  $("#location-select .select-list li").on("click", function () {
    $("#location-select .selected-item").text($(this).text());
  });

  $("#where-select").on("click", function () {
    $(this).find(".select-list").toggle();
    $("#location-select").find(".select-list").hide();
  });

  $("#where-select .select-list li").on("click", function () {
    $("#where-select .selected-item").text($(this).text());
  });

  /*  
    어떻게 작업하실지 몰라서 우선 아래와 같이 null체크만 해놨습니다.
    작업하시면서 불필요하다면 삭제해주시면 됩니다.
  */
  function handleCheckNull(val) {
    if (val === null) return true;
    if (val === "선택해 주세요") return true;
    if (val === "개설 희망지역") return true;
    if (val === "유입경로") return true;
    if (typeof val === "string" && val === "") return true;
    if (typeof val === "undefined") return true;
    return false;
  }

  // 창업문의 - 문의 접수하기 버튼
  $("#inquiry .submit-btn").on("click", function () {
    let flag = true;
    const name = $("#rq-name");
    const email = $("#rq-email");
    const phone = $("#rq-phone");
    const location = $("#location-select");
    const funnel = $("#where-select");
    const command = $("#rq-command");
    const privacy = $("#rq-privacy");

    // 이름
    if (handleCheckNull(name.val())) {
      name.addClass("error");
      flag = false;
    } else {
        name.removeClass("error");
    }
    // 이메일
    if (handleCheckNull(email.val())) {
          email.addClass("error");
          flag = false;
    } else {
        // 이메일 형식 정규식
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email.val())) {
            email.removeClass("error");
        } else {
            email.addClass("error");
            flag = false;
        }
    }
    // 연락처
    if (handleCheckNull(phone.val())) {
      phone.addClass("error");
      flag = false;
    } else {
        if(phone.val().length >= 8 && phone.val().length <= 11) {
            phone.removeClass("error");
        } else {
          phone.addClass("error");
          flag = false;
        }
    }
    // 개설 희망지역
    if (handleCheckNull(location.find("span").text())) {
        location.css("border","1px solid #ff4a55");
      flag = false;
    } else {
        location.css("border","");
    }
    // 유입경로
    if (handleCheckNull(funnel.find("span").text())) {
        funnel.css("border","1px solid #ff4a55");
      flag = false;
    } else {
        funnel.css("border","");
    }
    // 문의 내용
    if (handleCheckNull(command.val())) {
      command.addClass("error");
      flag = false;
    } else {
        command.removeClass("error");
    }
    // 개인정보 취급동의
    if (privacy.hasClass("checked")) {
        privacy.css("border","");
    } else {
      privacy.css("border","1px solid #ff4a55");
      flag = false;
    }

    if(flag){
      const $form = $('#inquiry1').closest('form');
      $form.find('input[name="inquiry-type"]').val("창업문의");
      $form.find('input[name="u-name"]').val(name.val());
      $form.find('input[name="u-tel"]').val(phone.val());
      $form.find('input[name="u-email"]').val(email.val());
      $form.find('input[name="u-location"]').val(location.find("span").text());
      $form.find('input[name="u-funnel"]').val(funnel.find("span").text());
      $form.find('textarea[name="u-message"]').val(command.val());
      $form.find('input[type="submit"]').click();
    } else {
        alert("필수값을 확인해주세요.");
    }
  });

  // 하단 창업문의
  // floating btn
  $(".floating-top").on("click", function () {
    $("html,body").animate({ scrollTop: $("html,body").offset().top }, 500);
  });

  $(".fixed-area").on("click", function (event) {
      if (!$(event.target).closest('.form-box').length) {
        if ($(this).find(".inner").hasClass("show")) {
          $(this).find(".inner").removeClass("show");
          $(".floating-top").removeClass("mo-top");
        } else {
          $(this).find(".inner").addClass("show");
          $(".floating-top").addClass("mo-top");
        }
      }
  });

  // 하단 창업문의 - 개인정보처리방침 popup
  $(".fixed-area .privacy-area .check-btn").on("click", function () {
    if ($(this).parent().hasClass("checked")) {
      $(this).parent().removeClass("checked");
    } else {
      $(this).parent().addClass("checked");
    }
  });

  // 하단 창업문의 - 창업 문의하기 버튼
  $(".fixed-area .form-box button").on("click", function () {
    const name = $("#fix-rq-name");
    const phone = $("#fix-rq-phone");
    const location = $("#fix-location-select");
    const funnel = $("#fix-where-select");

    if (handleCheckNull(name.val())) {
      alert("이름을 입력해주세요");
      name.focus();
      return;
    }
    if (handleCheckNull(phone.val())) {
      alert("연락처를 입력해주세요");
      phone.focus();
      return;
    }
    if(!(phone.val().length >= 8 && phone.val().length <= 11)) {
        alert("연락처를 확인해주세요");
      phone.focus();
      return;
    }
    if (handleCheckNull(location.find("span").text())) {
      alert("개설 희망지역을 선택해주세요");
      location.focus();
      return;
    }
    if (handleCheckNull(funnel.find("span").text())) {
      alert("유입경로를 선택해주세요");
      funnel.focus();
      return;
    }

    // 동의 체크 안되었을 때 alert 노출
    if (!$(".fixed-area .form-box .check-wrap").hasClass("checked")) {
      alert("개인정보수집관련 동의사항에 체크해주세요.");
      return;
    }

      const $form = $('#inquiry2').closest('form');
      $form.find('input[name="inquiry-type"]').val("창업문의 간소화");
      $form.find('input[name="u-name"]').val(name.val());
      $form.find('input[name="u-tel"]').val(phone.val());
      $form.find('input[name="u-location"]').val(location.find("span").text());
      $form.find('input[name="u-funnel"]').val(funnel.find("span").text());
      $form.find('input[type="submit"]').click();
  });

  // 하단 창업문의 -개인정보처리방침 popup
  $(".fixed-area .privacy-area .btn").on("click", function () {
    $(".privacy-popup").show();
  });
  $(".privacy-popup .btn").on("click", function () {
    $(".privacy-popup").hide();
  });
});
