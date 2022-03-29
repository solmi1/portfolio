const body = document.querySelector("body");
const inner = document.querySelector(".inner");
const frame = document.querySelector(".box");
const input = document.querySelector("#search");
const btnSearch = document.querySelector(".btnSearch");
const base = "https://www.flickr.com/services/rest/?";
const method_interest = "flickr.interestingness.getList";
const method_search = "flickr.photos.search";
const key = "aada8cf9764c34d5f330e551b1dbc6c3";
const per_page = 20;
const url = `${base}method=${method_interest}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;



callData(url);



btnSearch.addEventListener("click", e=>{
    let tag = input.value;

    const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

    callData(url);
});


input.addEventListener("keyup", e=>{
    if(e.key === "Enter"){
        let tag = input.value;

        const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

        callData(url);
    }
})



frame.addEventListener("click", e=>{
    e.preventDefault();
    
    //다른 곳 클릭했을 때가 아닌 썸네일만 클릭했을 때 팝업창이 뜨게
    let target = e.target.closest(".item").querySelector(".pic img"); //썸네일 이미지 선택

    //썸네일을 클릭했을 때만 코드 실행
    if(e.target === target){
        //클릭한 썸네일의 부모 a에서 href속성 구하기
        let imgSrc = target.parentElement.getAttribute("href");

        //팝업 생성
        let pop = document.createElement("aside");
        pop.classList.add("pop");
        let pops = `
            <div class="con">
                <img src="${imgSrc}">
            </div>
            <span class="close">close</span>
        `;

        
        pop.innerHTML = pops;

        inner.append(pop);

        inner.style.overflow = "hidden";
    }
})

inner.addEventListener("click", e=>{
    let pop = inner.querySelector(".pop");

    //팝업이 있을 경우에만 코드 실행
    if(pop){ 
        let close = pop.querySelector(".close");
        //close 버튼을 클릭했을 때만 코드 실행 ?? 왜 안되지
        if(e.target == close){
            pop.remove();
            body.style.overflow = "auto";
        }
    }
})

//검색했을때
function callData(url){
    fetch(url)
    .then(data=>{
        return data.json();
    })
    .then(json=>{
        const items = json.photos.photo;
        createList(items);
        imgLoaded();    
    })
}



function createList(items){
    let htmls = "";

    items.forEach(data=>{
        htmls += `
            <article class="item">
                <div>
                    <a class="pic" href="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg">

                        <img src="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg">

                    </a>
                    <p>${data.title}</p>
                    <div class="profile">
                        <img src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">

                        <span>${data.owner}</span>
                    </div>
                </div>
            </article>
        `
    })

    frame.innerHTML = htmls;

}



function imgLoaded(){
    
    const thumbs = document.querySelectorAll(".pic img");
    const len = thumbs.length;
    let count = 0;

    
    thumbs.forEach(thumb=>{
        
        thumb.onerror = ()=>{
            thumb.setAttribute("src", "img/k1.jpg");
        }
        //이미지를 모두 로딩 완료 후 isotope 적용
        thumb.onload = ()=>{
            count++;
            if(count === len){
                new Isotope(frame,{
                    itemSelector : ".item",
                    columnWidth : ".item",
                    transitionDuration : "0.8s",
                })
            }
        }
    });

    //버디아이콘 엑박시 대체 이미지로 변경
    const buddies = document.querySelectorAll(".profile img");
    buddies.forEach(buddy=>{
        buddy.onerror = ()=>{
            buddy.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
        }
    })
}


