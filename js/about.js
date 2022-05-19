const tab = document.querySelector("#aboutTab");
const btns = tab.querySelectorAll("dt");
const boxs = tab.querySelectorAll("dd");
const btns_a = document.querySelectorAll("dt>a");

btns_a.forEach((el,idx)=>{
    el.addEventListener("focusin", ()=>{
        activation(btns, idx);
        activation(boxs, idx);
    })
})

btns.forEach((el,index)=>{
  el.addEventListener("click", e=>{
      e.preventDefault();
      let isOn = e.currentTarget.classList.contains("on");
      if(isOn) return;

      activation(btns, index);
      activation(boxs, index);
  })
})

function activation(arr, index){
  for(const item of arr) item.classList.remove("on");
  arr[index].classList.add("on");
}

// company section의 article들 offset값을 구하여 svg모션,banner scale 구현
const company = document.querySelector(".company")
const articles = company.querySelectorAll("article");
const svgTxt = company.querySelector("svg text");
const banner = company.querySelector(".banner");
let posArr = null;

setPos();

console.log(posArr);

//브라우저 스크롤시 현재의 스크롤 거리값 출력
window.addEventListener("scroll", e=>{
  let scroll = window.scrollY || window.pageYOffset;

  //두번째 article에 스크롤이 도달했을 때
  if(scroll >= posArr[1] -800){
    let startOffset = scroll - posArr[1]; //전체 스크롤값에서 첫번째 높이값만큼 빼서 0으로 초기화
    let result = 465 - (startOffset*3) // 스크롤값을 빼줘서 0으로 도달하게
    if(result < 0) result = 0; //스크롤값이 strokeoffset보다 커져서 음수값이 되면 0으로 고정 
    if(result >= 465) result = 465;
    svgTxt.style.strokeDashoffset = result; //스크롤 함에 따라 그려지는 모션
  }

  //세번째 article에 스크롤이 도달했을 때
  if(scroll >= posArr[2] -200) banner.classList.add("on");
  else if(scroll < posArr[2] || scroll > posArr[2]) banner.classList.remove("on");
})

function setPos(){
  posArr = [];
  //각 article 세로위치값 구해서 저장
  for(let article of articles){
    posArr.push(article.offsetTop);
  }
}