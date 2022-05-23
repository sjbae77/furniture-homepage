const topBtn = document.querySelector("#topBtn");
const newsArticles = document.querySelectorAll("#news article");

const _top = document.querySelectorAll(".borderTop");
const _right = document.querySelectorAll(".borderRight");
const _bottom = document.querySelectorAll(".borderBottom");
const _left = document.querySelectorAll(".borderLeft");
const speed = 300;
const _unHover = [];

const clientSec = document.querySelector("#clients");
const prevBtn = clientSec.querySelector(".prev");
const nextBtn = clientSec.querySelector(".next");
let enableClick = true;
const clientSlideSpeed = 500;

const mainSecs = document.querySelectorAll("section");
const mainHd = document.querySelector(".main_hd");
const secPosArr = [];

const bannerSec = document.querySelector("#banner");
const mainBannerList = bannerSec.querySelector(".list");
const bannerPrev = bannerSec.querySelector(".prev");
const bannerNext = bannerSec.querySelector(".next");
let num = 0;
let wid = 0;
let timer = null;

createList("mainBannerData.json");

timer = setInterval(move, 50);

banner.addEventListener("mouseenter", ()=>{
  clearInterval(timer);
});
banner.addEventListener("mouseleave", ()=>{
  timer = setInterval(move, 50);
})

//동적으로 list 생성
function createList(url){
  fetch(url)
  .then(data => {
    return data.json();
  })
  .then(json => {
    let items = json.bannerImgSrc;
    

    let tags = '';

    items.forEach(item => {
      tags += `
        <li><a href=${item.img}><img src=${item.img}><span>CLICK</span></a></li>
      `;
    })

    mainBannerList.innerHTML = tags;

    initList();
  })
  .catch(err=>{
    console.log("데이터를 호출하는데 실패했습니다!");
  })
}

//동적으로 생성된 ul 스타일 제어 함수 
function initList() {
  const list_li = mainBannerList.querySelectorAll("li");
  const len = list_li.length;
  wid = parseInt(getComputedStyle(list_li[0]).width);
  mainBannerList.style.width = len * wid + "px";
  mainBannerList.style.marginLeft = -wid + "px";
  mainBannerList.prepend(mainBannerList.lastElementChild);
}

//num값을 list의 margin-left에 적용하여 앞으로 이동하는 함수 
function move() {
  //num값이 -480이 되면
  if (num < -wid * 2) {
    //num값을 -width 값으로 고정하고 
    num = -wid;
    //맨앞의 li를 list마지막으로 보냄 
    mainBannerList.append(mainBannerList.firstElementChild);
  } else {
    //num값이 -(width값 * 2)가 되기 전까지는 2씩 빼줌 
    num -= 2;
  }
  //num값을 list margin-left에 적용 
  mainBannerList.style.marginLeft = num + "px";
}

bannerPrev.addEventListener("click", e=>{
  e.preventDefault();

  if(enableClick){
    bannerPrevAni();
    enableClick = false;
  }
})

bannerNext.addEventListener("click", e=>{
  e.preventDefault();

  if(enableClick){
    bannerNextAni();
    enableClick = false;
  }
})

//동적으로 팝업 생성
mainBannerList.addEventListener("click", e=>{
  const imgSrc = e.target.parentElement.getAttribute("href");
  e.preventDefault();

  createPop(imgSrc);
})

//동적으로 생성된 팝업이므로
//이벤트 위임으로 팝업제거 이벤트 처리
document.body.addEventListener("click", e=>{
  removePop(e);
})

function createPop(imgSrc){
  const pop = document.createElement("aside");
  pop.classList.add("pop");

  pop.innerHTML = `
    <div class="pic">
      <img src=${imgSrc}>
    </div>
    <span>CLOSE</span>
  `;

  document.body.append(pop);

  new Anime(pop,{
    prop:"opacity",
    value:1,
    duration:500
  })

  document.querySelector("body").classList.add("on");
}

function removePop(e){
  const pop = document.querySelector("aside");
  
  //팝업이 생성된 상태라면
  if(pop){
    //span태그를 찾아서 close에 저장
    const close = pop.querySelector("span");
    
    //클릭한 요소가 close일때 팝업 remove
    if(e.target === close){
      new Anime(pop,{
        prop:"opacity",
        value:0,
        duration:500,
        callback:()=>{
          document.querySelector(".pop").remove();
          document.querySelector("body").classList.remove("on");
        }
      })
    }
  }
}

function bannerNextAni(){
  new Anime(mainBannerList,{
    prop:"margin-left",
    value:-wid * 2,
    duration: 500,
    callback:()=>{
      mainBannerList.append(mainBannerList.firstElementChild);
      mainBannerList.style.marginLeft = -wid + "px";
      enableClick = true;
    }
  })
}

function bannerPrevAni(){
  new Anime(mainBannerList, {
    prop:"margin-left",
    value:0,
    duration:500,
    callback:()=>{
      mainBannerList.prepend(mainBannerList.lastElementChild);
      mainBannerList.style.marginLeft = -wid +"px";
      enableClick = true;
    }
  })
}


//클라이언트 섹션 슬라이드
init(clientSec);

nextBtn.addEventListener("click",e=>{
  e.preventDefault();

  if(enableClick){
    enableClick = false; 
    nextSlide(clientSec);
  }

})
prevBtn.addEventListener("click",e=>{
  e.preventDefault();

  if(enableClick){
    enableClick = false; 
    prevSlide(clientSec);
  }

})

function init(frame){
  const ul = frame.querySelector("ul"); 
  const lis = ul.querySelectorAll("li"); 
  const len = lis.length; 

  ul.style.left = "-26%";    
  ul.style.width = `${26 * len}%`; 
  ul.prepend(ul.lastElementChild);
  lis.forEach((li)=>li.style.width = `${100 / len}%`);
}

function nextSlide(frame){
  const ul = frame.querySelector("ul");

  new Anime(ul,{
      prop:"left", 
      value:"-52%", 
      duration: clientSlideSpeed, 
      callback:()=>{
        ul.append(ul.firstElementChild); 
        ul.style.left = "-26%"; 
        enableClick = true; 
      }
  })
}

function prevSlide(frame){
  const ul = frame.querySelector("ul");

  new Anime(ul, {
      prop:"left", 
      value:"0%", 
      duration:clientSlideSpeed, 
      callback:()=>{
        ul.prepend(ul.lastElementChild);
        ul.style.left = "-27%"; 
        enableClick = true; 
      }
  })
}

for(let section of mainSecs){
  secPosArr.push(section.offsetTop);
}

//스크롤이벤트 - 탑버튼 추가, 헤더 on으로 활성화
window.addEventListener("scroll", ()=>{

  if(this.scrollY > secPosArr[1] -200) {
    topBtn.classList.add("on");
    mainHd.classList.add("on");
  } else {
    topBtn.classList.remove("on");
    mainHd.classList.remove("on");
  }
})

topBtn.addEventListener("click",e=>{
  e.preventDefault();

  new Anime(window,{
    prop:"scroll",
    value:0,
    duration:300
  })
})

//뉴스 섹션 보더 이벤트
newsArticles.forEach((el,index)=>{
  _unHover.push(false);

  el.addEventListener("mouseenter",()=>{
    _unHover[index] = false;

    borderDraw(index);
  })

  el.addEventListener("mouseleave",()=>{
    if(_unHover[index] == false)
      _unHover[index] = true;

    borderRemove(index);
  })
})

function ani(_dir, _idx, _prop, _value, _dur, _call) {
  if(_unHover[_idx] == true){
    
    borderRemove(_idx);
    return;
  }

  new Anime(_dir[_idx], {
    prop: _prop,
    value: _value,
    duration: _dur,
    callback: _call
  })
}

function borderDraw(index){
  newsArticles.forEach((el,idx)=>{
    if (index != idx){
      borderRemove(idx);
    }
  })

  ani(_top,
      index, 
      "width", 
      "100%",
      300,
      () => ani(_right,
                index, 
                "height",
                "100%",
                300,
                () => ani(_bottom,     
                          index, 
                          "width",
                          "100%",
                          300,
                          () => ani(_left,
                                    index, 
                                    "height",
                                    "100%",
                                    300
                                    ))));
}

// function borderDraw(index){
//   newsArticles.forEach((el,idx)=>{
//     if (index != idx)
//       borderRemove(idx);
//   })

//   new Anime(_top[index],{
//     prop:"width",
//     value:"100%",
//     duration: speed,
//     callback:()=>{
//       new Anime(_right[index],{
//           prop:"height", 
//           value:"100%",
//           duration: speed,
//           callback:()=>{
//               new Anime(_bottom[index],{
//                   prop:"width", 
//                   value:"100%",
//                   duration: speed,
//                   callback:()=>{
//                       new Anime(_left[index],{
//                           prop:"height", 
//                           value:"100%",
//                           duration: speed
//                       })
//                   } 
//               })
//           } 
//       })
//     }
//   })
// }

function borderRemove(index){
  new Anime(_left[index],{
    prop:"height",
    value:"0%",
    duration: speed,
  })

  new Anime(_bottom[index],{
      prop:"width", 
      value:"0%",
      duration: speed,
  })

  new Anime(_right[index],{
      prop:"height", 
      value:"0%",
      duration: speed,
  })

  new Anime(_top[index],{
      prop:"width", 
      value:"0%",
      duration: speed,
  })

}



