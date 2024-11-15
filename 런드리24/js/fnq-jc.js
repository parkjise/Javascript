const fnqList = document.querySelectorAll("li");

fnqList.forEach((list) => {
  list.addEventListener("click", function () {
    const isShow = this.classList.contains("show");
    if (isShow) {
      // 이미 show 클래스가 있으면 제거
      this.classList.remove("show");
    } else {
      // 다른 항목에서 show 클래스 제거
      fnqList.forEach((link) => {
        link.classList.remove("show");
      });
      // 현재 항목에 show 클래스 추가
      this.classList.add("show");
    }
  });
});

// const fnqList = document.querySelectorAll("li");

// fnqList.forEach((list) => {
//   list.addEventListener("click", function (e) {
//     const isShow = e.target.classList.contains("show");
//     if (isShow) {
//       // 이미 show 클래스가 있으면 제거
//       e.target.classList.remove("show");
//     } else {
//       // 다른 항목에서 show 클래스 제거
//       fnqList.forEach((link) => {
//         link.classList.remove("show");
//       });
//       // 현재 항목에 show 클래스 추가
//       e.target.classList.add("show");
//     }
//   });
// });
