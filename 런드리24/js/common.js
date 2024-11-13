// $(document).ready(function () {
//   const naviList = $("nav .menu-list li");
//   const mainSection = $("#main > section");

//   naviList.click(function () {
//     const idx = $(this).index();
//     const section = mainSection.eq(idx);
//     const sectionDistance = section.offset().top;

//     $("html, body")
//       .stop()
//       .animate({ scrollTop: sectionDistance + 1 });
//   });

//   $(window).scroll(function () {
//     const mainTop = $("#main").offset().top; // 페이지 높이
//     const height = $(document).scrollTop(); // 스크롤 높이
//     if (mainTop <= height) {
//       $(".nav").addClass("fix");
//     } else if (mainTop > height) {
//       $("nav li").removeClass("on");
//     }

//     // nav li active
//     mainSection.each(function () {
//       if ($(this).offset().top <= $(window).scrollTop() + 1) {
//         const idx = $(this).index();
//         naviList.removeClass("on");
//         naviList.eq(idx).addClass("on");
//       }
//     });
//     console.log(mainTop);
//     console.log(height);
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const naviList = document.querySelectorAll("nav .menu-list li");
  const mainSection = document.querySelectorAll("#main > section");
  const nav = document.querySelector(".nav");
  const main = document.querySelector("#main");

  naviList.forEach((navItem, index) => {
    navItem.addEventListener("click", function () {
      const section = mainSection[index];
      const sectionDistance = section.offsetTop;

      window.scrollTo({
        top: sectionDistance + 1,
        behavior: "smooth",
      });
    });
  });

  window.addEventListener("scroll", function () {
    const mainTop = main.offsetTop;
    const scrollTop = window.scrollY;

    if (mainTop <= scrollTop) {
      nav.classList.add("fix");
    } else if (mainTop > scrollTop) {
      naviList.forEach((item) => item.classList.remove("on"));
    }

    mainSection.forEach((section, idx) => {
      if (section.offsetTop <= window.scrollY + 1) {
        naviList.forEach((item) => item.classList.remove("on"));
        naviList[idx].classList.add("on");
      }
    });
  });
});

// 설명
// DOMContentLoaded:
// 문서가 로드된 후 코드를 실행하도록 DOMContentLoaded
// 이벤트를 사용했습니다.

// Scroll Event:
// window.addEventListener("scroll", ...)로 스크롤 이벤트를 감지합니다.

// mainTop 및 height:
// main.offsetTop으로 #main 섹션의 상단 위치를 가져오고, w
// indow.scrollY로 현재 스크롤 위치를 가져옵니다.

// Navigation Fix:
// 스크롤 높이에 따라 .nav에 fix 클래스를
//  추가하거나 제거합니다.

// Active 상태 설정:
// mainSection의 각 섹션을 확인하여
// 현재 화면에 표시된 섹션에 해당하는 메뉴 항목에 on 클래스를 추가합니다.
// naviList의 on 클래스는 먼저 모두 제거하고,
// 현재 활성화된 섹션의 인덱스를 기준으로 on 클래스를 추가합니다.

// 설명

// querySelectorAll 및 forEach 반복문:
// querySelectorAll로 naviList와 mainSection을 선택하고,
// forEach를 사용해 각 li 항목에 이벤트를 설정합니다.

// 부드러운 스크롤: scrollTo 메서드의 behavior: "smooth"
//  옵션으로 부드러운 스크롤을 구현합니다.

// scroll 이벤트:
// window.scrollY로 스크롤 위치를 가져오며,
// 각 섹션의 offsetTop을 비교하여 현재 스크롤 위치에 따라 nav 및
// naviList의 클래스(fix, on)를 업데이트합니다.

// 주요 기능
// 네비게이션 항목을 클릭하면 해당 섹션으로 부드럽게 스크롤됩니다.
// 페이지를 스크롤하면 현재 섹션에 해당하는 네비게이션 항목에 on 클래스가 추가되고,
// #main 위치를 기준으로 nav 요소에 fix 클래스가 추가됩니다.
