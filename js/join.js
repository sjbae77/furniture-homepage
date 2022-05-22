const form = document.querySelector("#signUp");
const btnSubmit = document.querySelector(".btnSubmit");

btnSubmit.addEventListener("click", e=>{
  if(!isTxt("user_id", 5)) e.preventDefault();
  if(!isPwd("user_pwd1", 8)) e.preventDefault();
  if(!isRePwd("user_pwd1","user_pwd2")) e.preventDefault();
  if(!isEmail("user_email", 5)) e.preventDefault();
  if(!isSelect("user_loc")) e.preventDefault();
  if(!isRadio("gender")) e.preventDefault();
})

//텍스트 인증 함수
function isTxt(name, len){
  let input = form.querySelector(`[name=${name}]`);
  let val = input.value;

  if(val.length >= len){
    const errMsgs = input.closest(".userInfo").querySelectorAll("p");
    if(errMsgs.length > 0) input.closest(".userInfo").querySelector("p").remove();

    return true;

  } else{
    const errMsgs = input.closest(".userInfo").querySelectorAll("p");
    if(errMsgs.length > 0) input.closest(".userInfo").querySelector("p").remove();

    const errMsg = document.createElement("p");
    errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
    input.closest(".userInfo").append(errMsg);

    return false;
  }
}

//비밀번호 인증 함수
function isPwd(name, len){
  let pwd1 = form.querySelector(`[name=${name}]`);
  let pwd1Val = pwd1.value;

  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[~!@#$%^&*()_+|\[\]]/;

  if(pwd1Val.length >= len && num.test(pwd1Val) && eng.test(pwd1Val) && spc.test(pwd1Val)){
    const errMsgs = pwd1.closest(".userInfo").querySelectorAll("p");
    if(errMsgs.length > 0) pwd1.closest(".userInfo").querySelector("p").remove();
    
    return true;

  }else{
    const errMsgs = pwd1.closest(".userInfo").querySelectorAll("p");
    if(errMsgs.length > 0) pwd1.closest(".userInfo").querySelector("p").remove();

    const errMsg = document.createElement("p");
    errMsg.append(`비밀번호는 ${len}글자 이상, 숫자,영문,특수문자를 포함하여 입력해주세요`);
    pwd1.closest(".userInfo").append(errMsg); 


    return false;
  }
}

//비밀번호 재확인 인증 함수
function isRePwd(name1, name2){
  let pwd1 = form.querySelector(`[name=${name1}]`);
  let pwd2 = form.querySelector(`[name=${name2}]`);

  let pwd1Val = pwd1.value;
  let pwd2Val = pwd2.value;

  if(pwd1Val === pwd2Val && pwd1Val !== ""){
    const errMsgs = pwd2.closest(".userInfo").querySelectorAll("p");
    if(errMsgs.length > 0) pwd2.closest(".userInfo").querySelector("p").remove();

    return true;

  }else{
    const errMsgs = pwd2.closest(".userInfo").querySelectorAll("p");
    if(errMsgs.length > 0) pwd2.closest(".userInfo").querySelector("p").remove();

    const errMsg = document.createElement("p");
    errMsg.append("비밀번호가 일치하지 않습니다");
    pwd2.closest(".userInfo").append(errMsg);

    return false;
  }
}

//이메일 인증 함수
function isEmail(name, len){
  let input = form.querySelector(`[name=${name}]`);
  let val = input.value;

  if(val.length > len && /@/.test(val)){
    const errMsgs = input.closest(".userInfo").querySelectorAll("p");
    if(errMsgs.length > 0) input.closest(".userInfo").querySelector("p").remove();

    return true;

  } else {
    const errMsgs = input.closest(".userInfo").querySelectorAll("p");
    if(errMsgs.length > 0) input.closest(".userInfo").querySelector("p").remove();

    const errMsg = document.createElement("p");
    errMsg.append(`이메일 주소를 ${len}글자 이상 '@'를 포함하여 입력해주세요`);
    input.closest(".userInfo").append(errMsg);

    return false;
  }
}

//셀렉트 인증 함수
function isSelect(name){
  let sel = form.querySelector(`[name=${name}]`); 
  let sel_index = sel.options.selectedIndex; 
  let val = sel[sel_index].value; 
  
  if(val !==""){
      const errMsgs = sel.closest(".userInfo").querySelectorAll("p"); 
      if(errMsgs.length >0) sel.closest(".userInfo").querySelector("p").remove();

      return true; 

  }else{
      const errMsgs = sel.closest(".userInfo").querySelectorAll("p"); 
      if(errMsgs.length >0) sel.closest(".userInfo").querySelector("p").remove(); 

      const errMsg = document.createElement("p"); 
      errMsg.append("항목을 선택해 주세요."); 
      sel.closest(".userInfo").append(errMsg); 

      return false; 
  }
}

//라디오 인증 함수
function isRadio(name){
  let items = form.querySelectorAll(`[name=${name}]`);

  items.forEach((el,index)=>{
    if(el.checked) {
      const errMsgs = items[0].closest(".userInfo").querySelectorAll("p"); 
      if(errMsgs.length > 0) items[0].closest(".userInfo").querySelector("p").remove(); 

      return true;

    }else{
      const errMsgs = items[0].closest(".userInfo").querySelectorAll("p"); 
      if(errMsgs.length > 0) items[0].closest(".userInfo").querySelector("p").remove(); 

      const errMsg = document.createElement("p"); 
      errMsg.append("항목을 선택해 주세요."); 
      items[0].closest(".userInfo").append(errMsg); 

      return false;
    }
  })
}