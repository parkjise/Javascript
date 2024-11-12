$(function () {
  $(".tab-content > div").hide(); // 탭 콘텐츠를 모두 숨김
  $(".tab-nav a")
    .click(function () {
      $(".tab-content > div").hide().filter(this.hash).fadeIn(); // 클릭한 탭에 해당하는 콘텐츠를 표시
      $(".tab-nav a").removeClass("active"); // 모든 탭 링크에서 'active' 클래스를 제거
      $(this).addClass("active"); // 클릭한 탭 링크에 'active' 클래스 추가
      return false; // 기본 앵커 링크의 동작을 막음
    })
    .filter(":eq(0)")
    .click(); // 첫 번째 탭을 기본으로 클릭하여 초기화
});

/*
설명
$(".tab-content > div").hide();: 
.tab-content 요소의 직계 자식 div 요소들을 모두 숨깁니다. 
즉, 처음에는 모든 탭 콘텐츠가 표시되지 않습니다.

$(".tab-nav a").click(function() {...}): 
.tab-nav 안의 모든 a 요소(탭 링크)에 클릭 이벤트를 추가합니다. 
사용자가 탭 링크를 클릭할 때마다 다음과 같은 동작이 수행됩니다:

$(".tab-content > div").hide().filter(this.hash).fadeIn();: 
모든 탭 콘텐츠(.tab-content > div)를 숨기고, 클릭한 탭의 hash 
속성(예: #tab1)과 일치하는 콘텐츠만 찾아서 fadeIn()으로 표시합니다.

$(".tab-nav a").removeClass("active");: 
모든 탭 링크에서 active 클래스를 제거합니다.

$(this).addClass("active");: 
클릭한 탭 링크에 active 클래스를 추가하여 
현재 활성화된 탭을 시각적으로 구분합니다.

return false;: 앵커 태그(a)의 기본 동작을 막아, 
클릭 시 페이지가 이동하거나 리로드되지 않도록 합니다.
.filter(":eq(0)").click();: 탭 링크 중 첫 번째 요소를 찾아 
클릭 이벤트를 강제로 트리거합니다. 
이를 통해 페이지가 로드되면 첫 번째 탭 콘텐츠가 자동으로 표시되고, 
첫 번째 탭이 활성화됩니다.
*/
