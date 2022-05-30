const topBtn = document.querySelector("#topBtn");
const newsArticles = document.querySelectorAll("#news article");

const _top = document.querySelectorAll(".borderTop");
const _right = document.querySelectorAll(".borderRight");
const _bottom = document.querySelectorAll(".borderBottom");
const _left = document.querySelectorAll(".borderLeft");
const borderSpeed = 300;
const _unHover = [];

const mainSecs = document.querySelectorAll("section");
const mainHd = document.querySelector(".main_hd");
const secPosArr = [];

/* youtube
key:AIzaSyCNEFP7grGD77zUQvYF6Tg93dOjeA-mCjs
playlist:PLKoTiVSIVIvmIOTOJ5kgr1E14mbtOp1R4

url:https://www.googleapis.com/youtube/v3/playlistItems
*/

const aboutSec = document.querySelector("#about");
const youtube = aboutSec.querySelector(".article2 .youtube");
const youtubeKey = "AIzaSyCNEFP7grGD77zUQvYF6Tg93dOjeA-mCjs";
const youtubePlaylistId = "PLKoTiVSIVIvmIOTOJ5kgr1E14mbtOp1R4";
const youtubeNum = 1;
const youtubeUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${youtubeKey}&playlistId=${youtubePlaylistId}&maxResults=${youtubeNum}`;

const skipNav_item = document.querySelectorAll("#skipNav li a");


for(let section of mainSecs){
  secPosArr.push(section.offsetTop);
}

/* skipNav =================================================================*/
for (let item of skipNav_item) {
  item.addEventListener("focusin", e => {
    item.classList.add("on");
  });

  item.addEventListener("focusout", e => {
    item.classList.remove("on");
  })
}

/* cookiePopup =================================================================*/
const cookiePop = document.querySelector("#cookiePop");
const btnCookiePopClose = cookiePop.querySelector(".close");
const isCookie = document.cookie.indexOf("today=done");

if (isCookie == -1) {
  cookiePop.style.display = "block";
} else {
  cookiePop.style.display = "none";
}

btnCookiePopClose.addEventListener("click", () => {
  let isChecked = cookiePop.querySelector("input[type=checkbox]").checked;

  if (isChecked) setCookie("today", "done", 1);
  cookiePop.style.display = "none";
})

function setCookie(cookieName, cookieValue, time) {
  const today = new Date();
  const date = today.getDate();
  today.setDate(date + time);

  const duedate = today.toGMTString();

  document.cookie = `${cookieName}=${cookieValue}; path="/"; expires=${duedate}`;
}


/* about =================================================================*/
createYoutubeList(youtubeUrl);

function createYoutubeList(youtubeUrl) {
  //url 요청
  fetch(youtubeUrl)
    //요청한 url 받음(json 형태로)
    .then(data => {
      return data.json();
    })
    .then(json => {
      let items = json.items;
      // console.log(items);

      let result = '';

      items.map(item => {

        let title = item.snippet.title;
        if (title.length > 25) title = title.substr(0, 25) + "...";
        let desc = item.snippet.description;
        if (desc.length > 80) desc = desc.substr(0, 80) + "...";

        result += `
        <article>
          <div class="pic">
            <img src="${item.snippet.thumbnails.maxres.url}"/>
          </div>
          <div class="con">
            <h2>${title}</h2>
            <p>${desc}</p>
          </div>
          <a href="#" class="youtubeBtn" data-vid=${item.snippet.resourceId.videoId}>
            <i class="fa-solid fa-play"></i>
          </a>
        </article>
      `
      });

      youtube.innerHTML = result;

      createYoutubePop();
    })
}

document.body.addEventListener("click", e => closecreateYoutubePop(e));

function createYoutubePop() {

  const youtubeBtn = document.querySelector(".youtubeBtn");

  youtubeBtn.addEventListener("click", e => {
    e.preventDefault();

    const vidId = e.target.parentElement.getAttribute("data-vid");

    let pop = document.createElement("aside");
    pop.classList.add("commonPop");
    pop.innerHTML = `
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vidId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <span>CLOSE</span>
      `;

    document.body.append(pop);

    new Anime(pop, {
      prop: "opacity",
      value: 1,
      duration: 500
    })

    document.body.classList.add("on");
  })
}

function closecreateYoutubePop(e) {
  const pop = document.querySelector(".commonPop");

  if (pop) {
    const close = pop.querySelector("span");
    if (e.target == close) {
      pop.remove();
      document.body.classList.remove("on");
    }
  }
}

/* news =====================================================================*/
//뉴스 섹션 보더 이벤트
newsArticles.forEach((el, index) => {
  _unHover.push(false);

  el.addEventListener("mouseenter", () => {
    _unHover[index] = false;

    borderDraw(index);
  })

  el.addEventListener("mouseleave", () => {
    if (_unHover[index] == false)
      _unHover[index] = true;

    borderRemove(index);
  })
})

function ani(_dir, _idx, _prop, _value, _dur, _call) {
  if (_unHover[_idx] == true) {

    borderRemove(_idx);
    return;
  }

  new Anime(_dir[_idx], {
    prop: _prop,
    value: _value,
    duration: _dur,
    callback: _call
  })
}

function borderDraw(index) {
  newsArticles.forEach((el, idx) => {
    if (index != idx) {
      borderRemove(idx);
    }
  })

  ani(_top,
    index,
    "width",
    "100%",
    300,
    () => ani(_right,
      index,
      "height",
      "100%",
      300,
      () => ani(_bottom,
        index,
        "width",
        "100%",
        300,
        () => ani(_left,
          index,
          "height",
          "100%",
          300
        ))));
}

function borderRemove(index) {
  new Anime(_left[index], {
    prop: "height",
    value: "0%",
    duration: borderSpeed,
  })

  new Anime(_bottom[index], {
    prop: "width",
    value: "0%",
    duration: borderSpeed,
  })

  new Anime(_right[index], {
    prop: "height",
    value: "0%",
    duration: borderSpeed,
  })

  new Anime(_top[index], {
    prop: "width",
    value: "0%",
    duration: borderSpeed,
  })

}

//스크롤이벤트 - 탑버튼 추가, 헤더 on으로 활성화
window.addEventListener("scroll", () => {

  if (this.scrollY > secPosArr[1] - 200) {
    topBtn.classList.add("on");
    mainHd.classList.add("on");
  } else {
    topBtn.classList.remove("on");
    mainHd.classList.remove("on");
  }
})

topBtn.addEventListener("click", e => {
  e.preventDefault();

  new Anime(window, {
    prop: "scroll",
    value: 0,
    duration: 300
  })
})


/* counter =================================================================*/
window.addEventListener("scroll", () => {
  if (this.scrollY > secPosArr[6] - 800) {
    counter(".num1", 15, 2000);
    counter(".num2", 25, 2000);
    counter(".num3", 1143, 2000);
    counter(".num4", 379, 2000);
  }
})

function counter(el, target, time) {
  const item = document.querySelector(el);
  let current = parseInt(item.innerText);
  let count = target - current;
  let interval = time / count;

  let timer = setInterval(() => {
    if (current === target) {
      clearInterval(timer);
      return;
    }

    current++;
    item.innerText = current;

  }, interval)
}
