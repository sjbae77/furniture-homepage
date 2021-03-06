// client slide
class MySlider{
  constructor(el){
    this.clientSec = document.querySelector(el);
    this.prevBtn = this.clientSec.querySelector(".prev");
    this.nextBtn = this.clientSec.querySelector(".next");
    this.enableClick = true;
    this.clientSlideSpeed = 500;

    this.init(this.clientSec);

    this.nextBtn.addEventListener("click",e=>{
      e.preventDefault();

      if(this.enableClick){
        this.enableClick = false; 
        this.nextSlide(this.clientSec);
      }

    })
    this.prevBtn.addEventListener("click",e=>{
      e.preventDefault();

      if(this.enableClick){
        this.enableClick = false; 
        this.prevSlide(this.clientSec);
      }

    })
  }

  init(frame){
    const ul = frame.querySelector("ul"); 
    const lis = ul.querySelectorAll("li"); 
    const len = lis.length; 
  
    ul.style.left = "-26%";    
    ul.style.width = `${26 * len}%`; 
    ul.prepend(ul.lastElementChild);
    lis.forEach((li)=>li.style.width = `${100 / len}%`);
  }
  
  nextSlide(frame){
    const ul = frame.querySelector("ul");
  
    new Anime(ul,{
        prop:"left", 
        value:"-52%", 
        duration: this.clientSlideSpeed, 
        callback:()=>{
          ul.append(ul.firstElementChild); 
          ul.style.left = "-26%"; 
          this.enableClick = true; 
        }
    })
  }
  
  prevSlide(frame){
    const ul = frame.querySelector("ul");
  
    new Anime(ul, {
        prop:"left", 
        value:"0%", 
        duration:this.clientSlideSpeed, 
        callback:()=>{
          ul.prepend(ul.lastElementChild);
          ul.style.left = "-27%"; 
          this.enableClick = true; 
        }
    })
  }
  
}



// banner slide
const bannerSec = document.querySelector("#banner");
const mainBannerList = bannerSec.querySelector(".list");
const bannerPrev = bannerSec.querySelector(".prev");
const bannerNext = bannerSec.querySelector(".next");
let num = 0;
let wid = 0;
let timer = null;

createBannerList("mainBannerData.json");

timer = setInterval(move, 50);

banner.addEventListener("mouseenter", ()=>{
  clearInterval(timer);
});
banner.addEventListener("mouseleave", ()=>{
  timer = setInterval(move, 50);
})

//???????????? list ??????
function createBannerList(url){
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
    console.log("???????????? ??????????????? ??????????????????!");
  })
}

//???????????? ????????? ul ????????? ?????? ?????? 
function initList() {
  const list_li = mainBannerList.querySelectorAll("li");
  const len = list_li.length;
  wid = parseInt(getComputedStyle(list_li[0]).width);
  mainBannerList.style.width = len * wid + "px";
  mainBannerList.style.marginLeft = -wid + "px";
  mainBannerList.prepend(mainBannerList.lastElementChild);
}

//num?????? list??? margin-left??? ???????????? ????????? ???????????? ?????? 
function move() {
  //num?????? -480??? ??????
  if (num < -wid * 2) {
    //num?????? -width ????????? ???????????? 
    num = -wid;
    //????????? li??? list??????????????? ?????? 
    mainBannerList.append(mainBannerList.firstElementChild);
  } else {
    //num?????? -(width??? * 2)??? ?????? ???????????? 2??? ?????? 
    num -= 2;
  }
  //num?????? list margin-left??? ?????? 
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

//???????????? ?????? ??????
mainBannerList.addEventListener("click", e=>{
  const imgSrc = e.target.parentElement.getAttribute("href");
  e.preventDefault();

  createPop(imgSrc);
})

//???????????? ????????? ???????????????
//????????? ???????????? ???????????? ????????? ??????
document.body.addEventListener("click", e=>{
  removePop(e);
})

function createPop(imgSrc){
  const pop = document.createElement("aside");
  pop.classList.add("commonPop");

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
  
  //????????? ????????? ????????????
  if(pop){
    //span????????? ????????? close??? ??????
    const close = pop.querySelector("span");
    
    //????????? ????????? close?????? ?????? remove
    if(e.target === close){
      new Anime(pop,{
        prop:"opacity",
        value:0,
        duration:500,
        callback:()=>{
          document.querySelector(".bannerPop").remove();
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