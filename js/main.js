const topBtn = document.querySelector("#topBtn");
const newsArticles = document.querySelectorAll("#news article");

const _top = document.querySelectorAll(".borderTop");
const _right = document.querySelectorAll(".borderRight");
const _bottom = document.querySelectorAll(".borderBottom");
const _left = document.querySelectorAll(".borderLeft");
const speed = 300;
const _unHover = [];

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

function ani(_dir, _idx, _prop, _value, _call) {
  // if(on == false)
  //   return;
  if(_unHover[_idx] == true){
    
    borderRemove(_idx);
    return;
  }

  new Anime(_dir[_idx], {
    prop: _prop,
    value: _value,
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
      () => ani(_right,
                index, 
                "height",
                "100%",
                () => ani(_bottom,     
                          index, 
                          "width",
                          "100%",
                          () => ani(_left,
                                    index, 
                                    "height",
                                    "100%"))));
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



// function borderRemove(index){
//   new Anime(_left[index],{
//     prop:"height",
//     value:"0%",
//     duration: speed,
//     callback:()=>{

//       new Anime(_bottom[index],{
//           prop:"width", 
//           value:"0%",
//           duration: speed,
//           callback:()=>{

//               new Anime(_right[index],{
//                   prop:"height", 
//                   value:"0%",
//                   duration: speed,
//                   callback:()=>{

//                       new Anime(_top[index],{
//                           prop:"width", 
//                           value:"0%",
//                           duration: speed,
//                       })
//                   } 
//               })
//           } 
//       })
//     }
//   })
// }



