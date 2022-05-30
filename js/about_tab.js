class MyTab {
  constructor(el) {
    this.tab = document.querySelector(el);
    this.btns = this.tab.querySelectorAll("dt");
    this.boxs = this.tab.querySelectorAll("dd");
    this.btns_a = this.tab.querySelectorAll("dt>a");

    //웹접근성 개선
    this.btns_a.forEach((el, idx) => {
      el.addEventListener("focusin", () => {
        this.activation(this.btns, idx);
        this.activation(this.boxs, idx);
      })
    })

    //탭메뉴 구현
    this.btns.forEach((el, index) => {
      el.addEventListener("click", e => {
        e.preventDefault();
        let isOn = e.currentTarget.classList.contains("on");
        if (isOn) return;

        this.activation(this.btns, index);
        this.activation(this.boxs, index);
      })
    })
  }

  activation(arr, index) {
    for (const item of arr) item.classList.remove("on");
    arr[index].classList.add("on");
  }
}