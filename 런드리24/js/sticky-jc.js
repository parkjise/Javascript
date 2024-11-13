const btnLinks = document.querySelectorAll(".js_btn_link");

// let isClickLinkPlatform = false;

function goToPostPlatform() {
  btnLinks.forEach((btnlink) => {
    btnlink.addEventListener("click", function (e) {
      e.preventDefault();
      let idTarget = this.getAttribute("aria-controls");
      let targetEl = document.querySelector(`#${idTarget}`);
      btnLinks.forEach((btn) => {
        btn.classList.remove("is_active");
      });
      this.classList.add("is_active");

      let move_to_target =
        idTarget == "content1"
          ? targetEl.offsetTop - 100
          : targetEl.offsetTop - 20;
      window.scrollTo({
        top: move_to_target,
        behavior: "smooth",
      });
    });
  });
}

goToPostPlatform();
