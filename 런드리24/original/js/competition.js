$(document).ready(function () {
  // competition 이미지 슬라이드
  $("#competition .slide").slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: true,
  });

  // competition - 숫자 카운트
  const counters_target = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 모든 counter 요소를 가져옵니다.
          const counters = document.querySelectorAll(".counter");

          // 각각의 counter 요소에 대해 애니메이션을 적용합니다.
          counters.forEach(function (counterElement) {
            const countLimit = parseInt(
              counterElement.getAttribute("data-count"),
              10,
            );
            const duration = 1000; // 애니메이션 시간 (ms)
            let start = null;

            function step(timestamp) {
              if (!start) start = timestamp;
              const progress = timestamp - start;
              const percentage = Math.min(progress / duration, 1); // 진행률은 최대 1까지

              // data-count에 따라 최종 값 계산
              const currentValue = Math.floor(
                countLimit * percentage,
              ).toLocaleString();
              counterElement.textContent = currentValue;

              // 애니메이션 종료 조건
              if (progress < duration) {
                requestAnimationFrame(step);
              }
            }

            // 애니메이션 시작
            requestAnimationFrame(step);
          });
        }
      });
    },
    { threshold: 0.3 },
  );

  counters_target.forEach((counter) => {
    counterObserver.observe(counter);
  });
});
