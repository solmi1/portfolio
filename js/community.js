const body = document.querySelector(".community .inner");
const main = document.querySelector(".mv");
const key = "AIzaSyBVwYJUnAqD52l07QdQxyBTARq6SOpwgmA";
const palyListId = "PLP1K1O_EnQH8JMRalZtLZYTS2yFF-pC_f";
const num = 2;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${palyListId}&maxResults=${num}`;

fetch(url)
.then(data=>{
    return data.json();
})

.then(json =>{
    let items = json.items;
    console.log(items);

    let result = "";

    items.forEach(item =>{
        let tit = item.snippet.title;

        if(tit.length > 50) tit = tit.substr(0,50)+"...";

        let date = item.snippet.publishedAt.split("T")[0];
        console.log(date);

        result +=`
            <article>
                <a class="pic" href="#" data-vid="${item.snippet.resourceId.videoId}">
                    <img src="${item.snippet.thumbnails.standard.url}">
                </a>
                <div class="con">
                    <h2 data-vid="${item.snippet.resourceId.videoId}">${tit}</h2>
                </div>
            </article>
        `;
    })

    main.innerHTML = result;
});


main.addEventListener("click", e=> creatPop(e));

body.addEventListener("click", e=>{
    removePop(e);
});



function creatPop(e){
    e.preventDefault();

    if(!e.target.closest("a")) return;
    const vidId = e.target.closest("a").getAttribute("data-vid");
    

    let pop = document.createElement("aside");
    pop.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose">close</span>
    `;
    body.append(pop);
}

function removePop(e){
    const pop = document.querySelector("aside");
    if(pop == null) return;

    const close = pop.querySelector("span");
    if(e.target == close) e.target.closest("aside").remove();
}
