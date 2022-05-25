/* youtube
key:AIzaSyCNEFP7grGD77zUQvYF6Tg93dOjeA-mCjs
playlist:PLKoTiVSIVIvmIOTOJ5kgr1E14mbtOp1R4

url:https://www.googleapis.com/youtube/v3/playlistItems
*/

const vidList = document.querySelector(".vidList");
const key = "AIzaSyCNEFP7grGD77zUQvYF6Tg93dOjeA-mCjs";
const playlistId = "PLKoTiVSIVIvmIOTOJ5kgr1E14mbtOp1R4";
const num = 4;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;


createList(url);
vidList.addEventListener("click", e=> createPop(e));
document.body.addEventListener("click", e=> closePop(e));


function createList(url){
  //url 요청
  fetch(url)
  //요청한 url 받음(json 형태로)
  .then(data=>{
    return data.json();
  })
  .then(json=>{
    let items = json.items;
    console.log(items);

    let result = '';

    items.map(item=>{

      let title = item.snippet.title;
      if(title.length > 25) title = title.substr(0, 25)+"...";
      let desc = item.snippet.description;
      if(desc.length > 80) desc = desc.substr(0, 80)+"...";

      result+=`
        <article>
          <a href="#" data-vid=${item.snippet.resourceId.videoId} class="pic">
            <img src="${item.snippet.thumbnails.high.url}"/>
          </a>
          <div class="con">
            <h2>${title}</h2>
            <p>${desc}</p>
          </div>
        </article>
      `
    });

    vidList.innerHTML = result;
  })
}

function createPop(e){
  e.preventDefault();

  if(!e.target.closest("a")) return;
  const vidId = e.target.parentElement.getAttribute("data-vid");

  let pop = document.createElement("aside");
  pop.classList.add("commonPop");
  pop.innerHTML = `
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vidId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <span>CLOSE</span>
  `

  document.body.append(pop);

  new Anime(pop,{
    prop:"opacity",
    value:1,
    duration:500
  })
  document.body.classList.add("on");
}

function closePop(e){
  const pop = document.querySelector(".commonPop");

  if(pop){
    const close = pop.querySelector("span");
    if(e.target == close) {
      pop.remove();
      document.body.classList.remove("on");
    }
  }
}