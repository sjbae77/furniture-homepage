/* cookiePopup =================================================================*/
class CookiePop{
  constructor(opt){
    this.cookieName = opt.cookieName;
    this.popup = document.querySelector(opt.popup);
    this.btnClose = this.popup.querySelector(opt.close);
    this.isCookie = document.cookie.indexOf(this.cookieName);

    if (this.isCookie == -1) {
      this.popup.style.display = "block";
    } else {
      this.popup.style.display = "none";
    }

    this.btnClose.addEventListener("click", () => {
      let isChecked = this.popup.querySelector("input[type=checkbox]").checked;

      if (isChecked) this.setCookie(this.cookieName, 1);
      this.popup.style.display = "none";
    })
  }

  setCookie(cookieName, cookieValue, time) {
    const today = new Date();
    const date = today.getDate();
    today.setDate(date + time);
  
    const duedate = today.toGMTString();
  
    document.cookie = `${cookieName}=${cookieValue}; path="/"; expires=${duedate}`;
  }
  
}



