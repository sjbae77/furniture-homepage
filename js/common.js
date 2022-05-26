const webNav = document.querySelector("#webNav");
const webNav_lis = webNav.querySelectorAll("li");


/* nav =================================================================*/
webNav_lis.forEach(li=>{
  li.addEventListener("mouseenter", e=>{
    const sub = e.currentTarget.querySelector(".sub");

    li.querySelector("a").classList.add("on");

    if(sub) {
      sub.style.top = "71px";
      sub.style.opacity = "1";
    } 
  })

  li.addEventListener("mouseleave", e=>{
    const sub = e.currentTarget.querySelector(".sub");
    li.querySelector("a").classList.remove("on");

    if(sub) {
      sub.style.top = "0";
      sub.style.opacity = "0";
    } 
  })

})