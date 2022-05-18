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