$(function () {
  const el = $("main-quicknav");
  const btns = el.find("[data-target");
  const sections = $(".main-section");

  function checkActiveSection() {
    const scrolling = $(this).scrollTop();
    const scroll_id = undefined;

    if (scrolling + $(window).height() === $(document).height()) {
      btns.removeClass("on");
      $(".quick-list li:last-child a").addClass("on");
      return;

      for (let i = 0; i < sections.length; i++) {
        const offset = sections.eq(i).attr("data-offset") || +100;
        if (scrolling > sections.eq(i).offset().top - offset) {
          scroll_id = sections.eq(i).attr("id");
        }
      }
      if (scroll_id) {
        btns.removeClass("on");
        $('[data-target="#' + scroll_id + '"]').addClass("on");
      }
    }
  }
  checkActiveSection();
  $(window).on("scroll", checkActiveSection);
  $(window).on("resize", checkActiveSection);

  el.find("[data-target]").on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("data-target");
    var targetOffset = $(target).offset().top;

    $("html, body").animate(
      {
        scrollTop: targetOffset,
      },
      600
    );
  });

  function addTabIndex() {
    $(".main-section").each(function () {
      $(this).attr("tabindex", "0");
    });
  }
  function removeTabIndex() {
    $(".main-section").each(function () {
      $(this).removeAttr("tabindex");
    });
  }
});
