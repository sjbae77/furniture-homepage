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

for(let section of mainSecs){
  secPosArr.push(section.offsetTop);
}
