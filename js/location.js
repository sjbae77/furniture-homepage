class Location{
  constructor(frame, opt){
    this.mapContainer = document.getElementById(frame);
    this.branch = document.querySelector(opt.branchName);
    this.branch_btns = this.branch.querySelectorAll("li");

    this.mapOption = { 
      center: new kakao.maps.LatLng(opt.branch1.latlng[0],opt.branch1.latlng[1]), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    this.map = new kakao.maps.Map(this.mapContainer, this.mapOption);

    this.markerOptions = [
      {
        title: opt.branch1.title,
        latlng: new kakao.maps.LatLng(opt.branch1.latlng[0],opt.branch1.latlng[1]),
        imgSrc: opt.branch1.imgSrc,
        imgSize: new kakao.maps.Size(50, 50),
        imgPos: { offset: new kakao.maps.Point(20, 50) },
        button: this.branch_btns[0],
        content: opt.branch1.content
      },
      {
        title: opt.branch2.title,
        latlng: new kakao.maps.LatLng(opt.branch2.latlng[0], opt.branch2.latlng[1]),
        imgSrc: opt.branch2.imgSrc,
        imgSize: new kakao.maps.Size(50, 50),
        imgPos: { offset: new kakao.maps.Point(20, 50) },
        button: this.branch_btns[1],
        content: opt.branch2.content
      },
      {
        title: opt.branch3.title,
        latlng: new kakao.maps.LatLng(opt.branch3.latlng[0],opt.branch3.latlng[1]),
        imgSrc: opt.branch3.imgSrc,
        imgSize: new kakao.maps.Size(50, 50),
        imgPos: { offset: new kakao.maps.Point(20, 50) },
        button: this.branch_btns[2],
        content: opt.branch3.content
      }
    ];

    for (let i = 0; i < this.markerOptions.length; i++) {
      const marker = new kakao.maps.Marker({
        map: this.map,
        position: this.markerOptions[i].latlng,
        title: this.markerOptions[i].title,
        image: new kakao.maps.MarkerImage(this.markerOptions[i].imgSrc, this.markerOptions[i].imgSize, this.markerOptions[i].imgPos)
      });

      //branch 버튼 클릭시 지도이동 
      this.markerOptions[i].button.addEventListener("click", e => {
        e.preventDefault();
        for (let branch of this.branch_btns) {
          branch.classList.remove("on");
        }
        this.markerOptions[i].button.classList.add("on");
        this.moveTo(this.markerOptions[i].latlng)
      })
    }

    window.addEventListener("resize",()=>{
      let active = document.querySelector(".branch li.on");

      const branch = Array.from(this.branch_btns);
      let active_index = branch.indexOf(active);

      this.map.setCenter(this.markerOptions[active_index].latlng);
    })
  }

  setMapType(maptype) { 
    const roadmapControl = document.getElementById('btnRoadmap');
    const skyviewControl = document.getElementById('btnSkyview'); 
    if (maptype === 'roadmap') {
        this.map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
        roadmapControl.className = 'selected_btn';
        skyviewControl.className = 'btn';
    } else {
        this.map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);    
        skyviewControl.className = 'selected_btn';
        roadmapControl.className = 'btn';
    }
  }

  zoomIn() {
    this.map.setLevel(map.getLevel() - 1);
  }
  
  zoomOut() {
    this.map.setLevel(map.getLevel() + 1);
  }
  
  moveTo(target) {
    var moveLatLon = target;
    this.map.setCenter(moveLatLon);
  }
  
}




