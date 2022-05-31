const faq = document.querySelectorAll(".toggle_faq");
const faq_a = document.querySelectorAll(".toggle_faq_a");

faq.forEach((el,idx)=>{
  el.addEventListener("click", (e)=>{
    const index = idx;

    el.classList.toggle("on");

    faq_a.forEach((el,idx)=>{
      if(index === idx) {
        el.classList.toggle("on");
      }
    })
  })
})