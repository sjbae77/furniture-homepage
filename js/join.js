const form = document.querySelector("#signUp");
const btnSubmit = form.querySelector(".btnSubmit");
const termsWrap = form.querySelector(".terms-wrap");
const btnAllCheck = termsWrap.querySelector("[name=allAgree]");
const checkboxs = termsWrap.querySelectorAll("[type=checkbox]");

btnSubmit.addEventListener("click", e=>{
  if(!isTxt("user_id", 5)) e.preventDefault();
  if(!isPwd("user_pwd1", 8)) e.preventDefault();
  if(!isRePwd("user_pwd1","user_pwd2")) e.preventDefault();
  if(!isEmail("user_email", 5)) e.preventDefault();
  if(!isSelect("user_loc")) e.preventDefault();
  if(!isRadio("gender")) e.preventDefault();
  if(!isChecked("termsAgree","policyAgree")) e.preventDefault();
})

function checkSelectAll() {
  const checked = termsWrap.querySelectorAll("[type=checkbox]:checked");
  btnAllCheck.checked = (checkboxs.length === checked.length);
}

function selectAll(checkAll){
  checkboxs.forEach(checkbox=>{
    checkbox.checked = checkAll.checked;
  })
}

//체크박스 인증 함수
function isChecked(name1, name2){
  let input1 = form.querySelector(`[name=${name1}]`);
  let input2 = form.querySelector(`[name=${name2}]`);

  if(input1.checked && input2.checked) {
    const errMsgs1 = input1.closest(".agreement").querySelectorAll("p");
    const errMsgs2 = input1.closest(".agreement").querySelectorAll("p");
    if(errMsgs1.length > 0) input1.closest(".agreement").querySelector("p").remove();
    if(errMsgs2.length > 0) input2.closest(".agreement").querySelector("p").remove();

    return true;

  } else {
    const errMsgs1 = input1.closest(".agreement").querySelectorAll("p");
    const errMsgs2 = input2.closest(".agreement").querySelectorAll("p");

    if(errMsgs1.length > 0) input1.closest(".agreement").querySelector("p").remove();
    if(errMsgs2.length > 0) input2.closest(".agreement").querySelector("p").remove();

    const errMsg1 = document.createElement("p");
    const errMsg2 = document.createElement("p");
    errMsg1.append("약관에 동의해주세요");
    errMsg2.append("약관에 동의해주세요");
    input1.closest(".agreement").append(errMsg1);
    input2.closest(".agreement").append(errMsg2);

    return false;
  }
  
}

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

  if(items[0].checked || items[1].checked) {
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
}

//입력수 제한 함수
function numberMaxLength(e){
  if(e.value.length > e.maxLength){
    e.value = e.value.slice(0, e.maxLength);
  }
}