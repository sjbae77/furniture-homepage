const tab = document.querySelector("#aboutTab");
const btns = tab.querySelectorAll("dt");
const boxs = tab.querySelectorAll("dd");
const btns_a = document.querySelectorAll("dt>a");

const company = document.querySelector(".company")
const articles = company.querySelectorAll("article");
const svgTxt = company.querySelector("svg text");
const banner = company.querySelector(".banner");
let posArr = null;

const memberList = document.querySelector(".member-wrap")

setPos();
createList("data.json");

//웹접근성 개선
btns_a.forEach((el,idx)=>{
    el.addEventListener("focusin", ()=>{
        activation(btns, idx);
        activation(boxs, idx);
    })
})

//탭메뉴 구현
btns.forEach((el,index)=>{
  el.addEventListener("click", e=>{
      e.preventDefault();
      let isOn = e.currentTarget.classList.contains("on");
      if(isOn) return;

      activation(btns, index);
      activation(boxs, index);
  })
})

//브라우저 스크롤시 현재의 스크롤 거리값 출력
// company section의 article들 offset값을 구하여 svg모션,banner scale 구현
window.addEventListener("scroll", e=>{
  let scroll = window.scrollY || window.pageYOffset;

  //두번째 article에 스크롤이 도달했을 때
  if(scroll >= posArr[1] -600 ){
    let startOffset = scroll - posArr[1]; //전체 스크롤값에서 첫번째 높이값만큼 빼서 0으로 초기화
    let result = 465 - (startOffset*1.5) // 스크롤값을 빼줘서 0으로 도달하게

    if(result < 0) result = 0; //스크롤값이 strokeoffset보다 커져서 음수값이 되면 0으로 고정 
    if(result >= 465) result = 465;
    svgTxt.style.strokeDashoffset = result; //스크롤 함에 따라 그려지는 모션
  }

  //세번째 article에 스크롤이 도달했을 때
  if(scroll >= posArr[2] -200) banner.classList.add("on");
  else if(scroll < posArr[2] || scroll > posArr[2]) banner.classList.remove("on");
})

function activation(arr, index){
  for(const item of arr) item.classList.remove("on");
  arr[index].classList.add("on");
}

function setPos(){
  posArr = [];
  //각 article 세로위치값 구해서 저장
  for(let article of articles){
    posArr.push(article.offsetTop);
  }
}

//데이터 호출 함수
function createList(url){
  fetch(url)
  .then(data => {
    return data.json();
  })
  .then(json => {

    let items = json.memberImgSrc;

    let tags = '';

    items.forEach((item,idx) =>{
      tags += `
      <div class="member">
        <img src=${item.img}>
        <div class="text">
          <h2>${item.name}</h2>
          <p>${item.text}</p>
        </div>
      </div>
      `;

      if(idx === items.length-2){
        tags += `
          <div class="member noMember">
            <div class="text">
              <span>2022</span>
              <h2>
                We're always looking<br/>
                for new member
              </h2>
              <a href="#">VIEW MORE</a>
            </div>
          </div>
        `;
      }
    })

    memberList.innerHTML = tags;
  })
  .catch(err=>{
    console.log("데이터를 호출하는데 실패하였습니다.");
  })
}
