const webNav = document.querySelector("#navWeb");
const webNav_lis = webNav.querySelectorAll("li");

const btnCall = document.querySelector(".btnCall");
const moNav = document.querySelector("#navMo");
const bg = document.querySelector(".bg");

const subMenu = document.querySelector(".subMenu");

/* nav =================================================================*/
webNav_lis.forEach((li) => {
  li.addEventListener("mouseenter", (e) => {
    const sub = e.currentTarget.querySelector(".sub");
    li.querySelector("a").classList.add("on");

    if (sub) {
      sub.style.top = "71px";
      sub.style.opacity = "1";
    }
  });

  li.addEventListener("mouseleave", (e) => {
    const sub = e.currentTarget.querySelector(".sub");
    li.querySelector("a").classList.remove("on");

    if (sub) {
      sub.style.top = "0";
      sub.style.opacity = "0";
    }
  });

  //포커스 이벤트
  li.addEventListener("focusin", (e) => {
    const sub = e.currentTarget.querySelector(".sub");
    li.querySelector("a").classList.add("on");

    if (sub) {
      sub.style.top = "71px";
      sub.style.opacity = "1";
    }
  });

  li.addEventListener("focusout", (e) => {
    const sub = e.currentTarget.querySelector(".sub");
    li.querySelector("a").classList.remove("on");

    if (sub) {
      sub.style.top = "0";
      sub.style.opacity = "0";
    }
  });
});

btnCall.addEventListener("click", (e) => {
  e.preventDefault();

  btnCall.classList.toggle("on");
  moNav.classList.toggle("on");
  bg.classList.toggle("on");
});

subMenu.addEventListener("click", () => {
  subMenu.classList.toggle("on");
});
