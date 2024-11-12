  const panel = document.querySelector('.panel')
  //선택지를 모두 가져온다
  const panelLi = document.querySelectorAll('li')

  console.log(panelLi)
//배열로 저장되기 때문에 forEach로 하나씩 이벤트를 등록해준다.
  panelLi.forEach((item) => {
    item.addEventListener('click',(e) => {
      panelLi.forEach((e) => {
         //하나만 선택되도록 기존의 효과를 지워준다.
        e.classList.remove('active')
      })
      // 선택한 그 아이만 효과를 추가해준다.
      item.classList.add('active')
      // 선택을 하면 다음으로 넘어갈 수 있는 버튼이 활성화 되도록 한다.
      // document.getElementById('next').style.display='block';
    })
  })



//선택지를 모두 가져온다
const items = document.querySelectorAll(".select_item");
//배열로 저장되기 때문에 forEach로 하나씩 이벤트를 등록해준다.
items.forEach((item)=>{
    item.addEventListener('click',()=>{
        items.forEach((e)=>{
          //하나만 선택되도록 기존의 효과를 지워준다.
            e.classList.remove('active');
        })
      // 선택한 그 아이만 효과를 추가해준다.
        item.classList.add('active');
      // 선택을 하면 다음으로 넘어갈 수 있는 버튼이 활성화 되도록 한다.
        document.getElementById('next').style.display='block';
    })
})