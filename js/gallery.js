/*
key: ac2a0a14b2c15e96b9b417eabf3b2694
https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value
flickr.interestingness.getList
flickr.photos.search
https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
buddy-
http://farm{icon-farm}.staticflickr.com/{icon-server}/buddyicons/{nsid}.jpg
https://www.flickr.com/images/buddyicon.gif

195772706@N08
*/


const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");
const input = document.querySelector("#search");
const btnSearch = document.querySelector(".btnSearch");

const key = "ac2a0a14b2c15e96b9b417eabf3b2694";
const base = "https://www.flickr.com/services/rest/?";
const method_interest = "flickr.interestingness.getList";
const method_search = "flickr.photos.search";
const per_page = 50;
const url = `${base}method=${method_interest}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;


//이름으로 찾기
const method3 = "flickr.people.getPhotos";
const username = "195772706@N08";
const urlName =`${base}method=${method3}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&user_id=${username}`;

callData(urlName);


/*
//좋아요 사진 찾기
const method4 = "flickr.favorites.getList";
const username = "195772706@N08";
const url4 =`${base}method=${method4}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&user_id=${username}`;

callData(url4);
*/

// const gallery ="72157720718987924";
// const method5 = "flickr.galleries.getPhotos";
// const username = "195772706@N08";
// const url5 =`${base}method=${method5}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&user_id=${username}&gallery_id=${gallery}`;

// callData(url5);


// callData(url);

//검색 버튼 클릭시 callData호출 
btnSearch.addEventListener("click", e => {
  let tag = input.value.trim();

  //if(!tag) return; //검색어 입력없이 버튼 클릭시 아래 코드를 실행하지 않고 중지

  if(tag){
    const errMsgs = input.parentElement.querySelectorAll("p");
    if(errMsgs.length > 0) errMsgs[0].remove();

    const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;
    
    callData(url);

  } else{
    frame.innerHTML = "";
    frame.style.height = "auto";

    const errMsgs = input.parentElement.querySelectorAll("p");
    if(errMsgs.length > 0) errMsgs[0].remove();

    const errMsg = document.createElement("p");
    errMsg.append("검색어를 입력하세요");
    input.parentElement.append(errMsg);
  }
  
});

input.addEventListener("keyup", e=>{
  if(e.key === "Enter"){
    let tag = input.value.trim();

  //if(!tag) return; //검색어 입력없이 버튼 클릭시 아래 코드를 실행하지 않고 중지

  if(tag){
    const errMsgs = input.parentElement.querySelectorAll("p");
    if(errMsgs.length > 0) errMsgs[0].remove();

    const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;
    
    callData(url);

  } else{
    //전에 호출했던 데이터 지우기
    frame.innerHTML = "";
    frame.style.height = "auto";

    const errMsgs = input.parentElement.querySelectorAll("p");
    if(errMsgs.length > 0) errMsgs[0].remove();

    const errMsg = document.createElement("p");
    errMsg.append("검색어를 입력하세요");
    input.parentElement.append(errMsg);
  }
  }
})



//#list li클릭시 팝업 생성 
frame.addEventListener("click", e => {
  e.preventDefault();

  let target = e.target.parentElement.querySelector("img");

  if (e.target == target) {

    let imgSrc = target.parentElement.getAttribute("href");

    let pop = document.createElement("aside");
    pop.classList.add("commonPop");
    let pops = `
          <div class="pic">
              <img src=${imgSrc}/>
          </div>
          <span class="close">close</span>
        `;
    pop.innerHTML = pops;
    document.body.append(pop);
    document.body.style.overflow = "hidden";
  }

});


//팝업 닫기 버튼 클릭시 팝업 제거 
document.body.addEventListener("click", e => {
  let pop = document.querySelector(".commonPop");

  if (pop) {
    const close = pop.querySelector("span");

    if (e.target == close) {
      pop.remove();
      document.body.style.overflow = "auto";
    }
  }
})


function callData(url) {

  loading.classList.remove("off");
  frame.classList.remove("on");

  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(json => {
      let items = json.photos.photo;
      console.log(items);

      if(items.length > 0){
        createList(items);
        imgLoaded();
      }else{
        console.log("해당하는 이미지가 없습니다.");

        const errMsg = document.createElement("p");
        errMsg.append("해당하는 이미지가 없습니다.");
        input.parentElement.append(errMsg);

        frame.classList.remove("on");
        loading.classList.add("off");

        frame.innerHTML = '';
        frame.style.height = "auto";
      }

    })
}

function createList(items) {
  let htmls = '';
  items.forEach(item => {

    let imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
    let imgSrcBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`;

    htmls += `
                <li class="item">
                    <div>
                        <a href=${imgSrcBig} class="pic">
                            <img src=${imgSrc} />
                        </a>
                        <p>${item.title}</p>
                        <span class="profile">
                            <img src="http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg"/>
                            <strong>${item.owner}</strong>
                        </span>
                    </div>
                </li>
        `;
  });

  frame.innerHTML = htmls;
}

function imgLoaded() {
  const thumb = document.querySelectorAll(".pic img");
  const len = thumb.length;
  let count = 0;

  //썸네일 이미지 엑박시 대체이미지로 변경         
  thumb.forEach(img => {
    //이미지가 하나씩 로딩이 완료될때마다 count값 1씩 증가 
    img.onload = () => {
      count++;
      //모든 thumb이미지가 로딩되면 isotope 적용 
      if (count == len) isoLayout();
    }
    img.onerror = () => {
      img.setAttribute("src", "img/default.jpg");
    }
  });

  //버디아이콘 엑박시 대체이미지로 변경 
  const buddies = document.querySelectorAll(".profile img");
  buddies.forEach(buddy => {
    buddy.onerror = () => {
      buddy.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
    }
  })
}

function isoLayout() {
  new Isotope("#list", {
    itemSelector: ".item",
    columnWidth: ".item",
    transitionDuration: "0.5s"
  });

  //모든 이미지 로딩완료후 모션처리 
  loading.classList.add("off");
  frame.classList.add("on");
}