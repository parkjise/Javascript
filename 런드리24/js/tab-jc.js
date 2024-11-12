// Java Script

document.addEventListener("DOMContentLoaded", function () {
  const tabContents = document.querySelectorAll(".tab-content > div");
  const tabLinks = document.querySelectorAll(".tab-nav li a");

  // tabContents.forEach((tabContent) => {
  //   tabContent.style.display = "none";
  // });
  tabLinks.forEach((link, idx) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // 모든 탭 콘텐츠를 숨기고, 클릭한 탭의 콘텐츠만 표시합니다.
      tabContents.forEach((tabContent) => {
        tabContent.style.display = "none";
      });
      const target = document.querySelector(this.hash);
      if (target) {
        target.style.display = "block";
      }
      // 모든 탭 링크에서 'active' 클래스를 제거하고, 클릭한 탭 링크에 'active' 클래스를 추가합니다.
      tabLinks.forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    });
    // 첫 번째 탭을 기본으로 클릭하여 초기화합니다.
    if (idx === 0) {
      link.click();
    }
  });
});

/*
설명
DOMContentLoaded 이벤트: 
문서가 로드된 후에 스크립트가 실행되도록 DOMContentLoaded 
이벤트를 사용합니다.

모든 콘텐츠 숨기기: 
document.querySelectorAll(".tab-content > div")로 
.tab-content의 모든 자식 div를 선택하고, forEach를 사용해 
각 div의 display 스타일을 none으로 설정하여 콘텐츠를 숨깁니다.

탭 링크 클릭 이벤트: 
querySelectorAll(".tab-nav a")로 
.tab-nav의 모든 a 요소를 선택한 후, f
orEach로 각 링크에 클릭 이벤트를 추가합니다.

기본 동작 방지: event.preventDefault()를 통해 클릭 시 페이지가 
이동하지 않도록 기본 앵커 동작을 막습니다.
콘텐츠 토글: 모든 div 요소를 다시 숨긴 후, 클릭된 링크의 
hash(예: #tab1)에 해당하는 요소만 찾아 display를 block으로 설정하여 표시합니다.
활성 클래스 관리: 모든 링크에서 active 클래스를 제거하고, 
클릭된 링크에 active 클래스를 추가합니다.
첫 번째 탭 초기화: forEach에서 첫 번째 a 요소에 대해 강제로 
클릭 이벤트를 트리거하여 초기 상태를 설정합니다.
*/
