const mapContainer = document.getElementById('map');
const branch_btns = document.querySelectorAll(".branch li");
const branch = Array.from(branch_btns);

mapOption = { 
  center: new kakao.maps.LatLng(37.4244, 126.8828), // 지도의 중심좌표
  level: 3 // 지도의 확대 레벨
};

let map = new kakao.maps.Map(mapContainer, mapOption);

let markerOptions = [
  {
    title: "광명점",
    latlng: new kakao.maps.LatLng(37.4244, 126.8828),
    imgSrc: "img/marker.png",
    imgSize: new kakao.maps.Size(50, 50),
    imgPos: { offset: new kakao.maps.Point(20, 50) },
    button: branch_btns[0],
    content: '<div>이케아 광명점</div>'
  },
  {
    title: "기흥점",
    latlng: new kakao.maps.LatLng(37.2228, 127.1161),
    imgSrc: "img/marker.png",
    imgSize: new kakao.maps.Size(50, 50),
    imgPos: { offset: new kakao.maps.Point(20, 50) },
    button: branch_btns[1],
    content: '<div>이케아 기흥점</div>'
  },
  {
    title: "고양점",
    latlng: new kakao.maps.LatLng(37.6301, 126.863),
    imgSrc: "img/marker.png",
    imgSize: new kakao.maps.Size(50, 50),
    imgPos: { offset: new kakao.maps.Point(20, 50) },
    button: branch_btns[2],
    content: '<div>이케아 고양점</div>'
  }
];

for (let i = 0; i < markerOptions.length; i++) {
  const marker = new kakao.maps.Marker({
    map: map,
    position: markerOptions[i].latlng,
    title: markerOptions[i].title,
    image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
  });

  const infowindow = new kakao.maps.InfoWindow({
    content: markerOptions[i].content
  });

  kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
  kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

  //branch 버튼 클릭시 지도이동 
  markerOptions[i].button.addEventListener("click", e => {
    e.preventDefault();
    for (let branch of branch_btns) {
      branch.classList.remove("on");
    }
    markerOptions[i].button.classList.add("on");
    moveTo(markerOptions[i].latlng)
  })
}

function setMapType(maptype) { 
  const roadmapControl = document.getElementById('btnRoadmap');
  const skyviewControl = document.getElementById('btnSkyview'); 
  if (maptype === 'roadmap') {
      map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
      roadmapControl.className = 'selected_btn';
      skyviewControl.className = 'btn';
  } else {
      map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);    
      skyviewControl.className = 'selected_btn';
      roadmapControl.className = 'btn';
  }
}

function zoomIn() {
  map.setLevel(map.getLevel() - 1);
}

function zoomOut() {
  map.setLevel(map.getLevel() + 1);
}

function makeOverListener(map, marker, infowindow) {
  return function() {
      infowindow.open(map, marker);
  };
}

function makeOutListener(infowindow) {
  return function() {
      infowindow.close();
  };
}

// //지도 컨트롤 보이기 
// var mapTypeControl = new kakao.maps.MapTypeControl();
// map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// //zoom 컨트롤 보이기 
// var zoomControl = new kakao.maps.ZoomControl();
// map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

function moveTo(target) {
  var moveLatLon = target;
  map.setCenter(moveLatLon);
}

