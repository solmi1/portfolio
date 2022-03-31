var mapContainer = document.getElementById('map');
const branch_btns = document.querySelectorAll(".branch li"); 

 
mapOption = { 
    center: new kakao.maps.LatLng(37.56682420267543, 126.978652258823), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


var markerOptions =[
    {
        title : "서울지사", 
        latlng : new kakao.maps.LatLng(37.56682420267543, 126.978652258823), 
        imgSrc : "img/marker1.png", 
        imgSize : new kakao.maps.Size(99,99), 
        imgPos : {offset : new kakao.maps.Point(50,75)}, 
        button : branch_btns[0] 
    },

    {
        title : "청주지사", 
        latlng : new kakao.maps.LatLng(36.642492995513585, 127.48901907523596), 
        imgSrc : "img/marker2.png", 
        imgSize : new kakao.maps.Size(99,99), 
        imgPos : {offset : new kakao.maps.Point(50,75)},
        button : branch_btns[1]
    }
]; 

//반복을 돌면서 마커를 특정 이미지로 특정 위치에 배치
for(let i=0; i< markerOptions.length; i++){
    new kakao.maps.Marker({
        map : map, 
        position: markerOptions[i].latlng, 
        title : markerOptions[i].title, 
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    });

    //branch 버튼 클릭 이벤트 연결 
    markerOptions[i].button.addEventListener("click", e=>{
        e.preventDefault(); 

        for(let btn of branch_btns){
            btn.classList.remove("on");
        }
        branch_btns[i].classList.add("on");

        moveTo(markerOptions[i].latlng);
    });
}

//리사이즈 시 현재 활성화되어 있는 버튼의 data-index 값을 구해서
//setCenter의 인수값으로 적용
window.addEventListener("resize", ()=>{
    let active_btn = document.querySelector(".branch li.on");
    let active_index = active_btn.getAttribute("data-index");
    console.log(active_index);

    map.setCenter(markerOptions[active_index].latlng);
})


//지도이동함수 
function moveTo(target){
    var moveLatLon = target; 

    map.setCenter(moveLatLon); 
}