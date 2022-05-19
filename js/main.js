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
  lis.forEach((li)=>li.style.width = `${100 / len}%`)
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



