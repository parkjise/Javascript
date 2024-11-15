const btnLinks = document.querySelectorAll(".js_btn_link");
const platformArea = document.querySelector(".platform-area");
let isClickLinkPlatform = false;

// 클릭시 스크롤 이동
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

// 스크롤시 해당 섹션 활성화
function activePostPlatform() {
  if (isClickLinkPlatform) return;

  // 현재 스크롤 위치
  let scrollTop = window.scrollY;

  // 두 번째 .main_platform_post 요소의 padding-top 값 가져오기
  const secondPost = document.querySelectorAll(".main_platform_post")[1];
  let distanceTop = secondPost
    ? parseInt(window.getComputedStyle(secondPost).paddingTop)
    : 0;

  // 모든 .main_platform_post 요소에 대해 반복
  document.querySelectorAll(".main_platform_post").forEach((post, index) => {
    let idControl = post.getAttribute("id");
    let elOffsetTop = post.offsetTop;

    // 현재 요소가 화면에 나타나는지 확인
    if (elOffsetTop < scrollTop + window.innerHeight + distanceTop + 120) {
      post.classList.add("is_show");

      // 화면 너비가 1314 이상이고 첫 번째 요소일 때 is_active 클래스 추가
      if (window.outerWidth >= 1314 && index === 0) {
        post.classList.add("is_active");
      }

      // 화면 너비가 1314 이상이고, 스크롤 위치가 요소의 오프셋 위치에 도달할 때
      if (window.outerWidth >= 1314 && scrollTop >= elOffsetTop - distanceTop) {
        post.classList.add("is_active");

        // 다른 형제 요소에서 is_active 제거
        document.querySelectorAll(".main_platform_post").forEach((sibling) => {
          if (sibling !== post) sibling.classList.remove("is_active");
        });

        // 모든 .js_btn_link에서 is_active 제거
        document.querySelectorAll(".js_btn_link").forEach((link) => {
          link.classList.remove("is_active");
        });

        // 현재 idControl과 일치하는 버튼에 is_active 추가
        const activeBtn = document.querySelector(
          `.js_btn_link[aria-controls="${idControl}"]`
        );
        if (activeBtn) {
          activeBtn.classList.add("is_active");
        }
      }
    }
  });
}

function handleScrollEvents() {
  activePostPlatform();
}

// 스크롤 및 터치 이벤트 추가
["scroll", "touchmove", "wheel", "DOMMouseScroll"].forEach((event) => {
  platformArea.addEventListener(event, handleScrollEvents);
});

// 페이지 로드 시 초기 실행
handleScrollEvents();
platformArea.addEventListener("scroll", () => {
  activePostPlatform();
});
