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

  ul.style.left = "-27%";    
  ul.style.width = `${25 * len}%`; 
  ul.prepend(ul.lastElementChild);
  lis.forEach((li)=>li.style.width = `${100 / len}%`)
}

function nextSlide(frame){
  const ul = frame.querySelector("ul");

  new Anime(ul,{
      prop:"left", 
      value:"-54%", 
      duration: clientSlideSpeed, 
      callback:()=>{
        ul.append(ul.firstElementChild); 
        ul.style.left = "-27%"; 
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


window.addEventListener("scroll", ()=>{
  if(this.scrollY > 900) {
    topBtn.classList.add("on");
  } else {
    topBtn.classList.remove("on");
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



