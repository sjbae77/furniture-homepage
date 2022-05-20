const form = document.querySelector("#signUp");
const btnSubmit = document.querySelector(".btnSubmit");

btnSubmit.addEventListener("click", e=>{
  if(!isTxt("user_id", 5)) e.preventDefault();
  if(!isPwd("user_pwd1","user_pwd2", 8)) e.preventDefault();
  if(!isEmail("user_email", 5)) e.preventDefault();
  if(!isSelect("user_loc")) e.preventDefault();
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
function isPwd(name1, name2, len){
  let pwd1 = form.querySelector(`[name=${name1}]`);
  let pwd2 = form.querySelector(`[name=${name2}]`);

  let pwd1Val = pwd1.value;
  let pwd2Val = pwd2.value;

  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[~!@#$%^&*()_+|\[\]]/;

  if(pwd1Val === pwd2Val && pwd1Val.length >= len && num.test(pwd1Val) && eng.test(pwd1Val) && spc.test(pwd1Val)){
    const errMsgs = pwd1.closest(".userInfo").querySelector("p");
    if(errMsgs > 0) pwd1.closest(".userInfo").querySelector("p").remove();
    
    return true;

  }else{
    const errMsgs = pwd1.closest(".userInfo").querySelector("p");
    if(errMsgs > 0) pwd1.closest(".userInfo").querySelector("p").remove();

    const errMsg = document.createElement("p");
    errMsg.append(`비밀번호는 ${len}글자 이상, 숫자,영문,특수문자를 포함하여 동일하게 입력해주세요`);
    pwd1.closest(".userInfo").append(errMsg); 

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

  console.log(sel_index);
  
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