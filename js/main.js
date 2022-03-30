const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

const popup = document.querySelector("#popup");
const btnClose = popup.querySelector(".close");
const isCookie = document.cookie.indexOf("today=done");
let isOn;

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");

    menuMo.classList.toggle("on");
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
});


if(isCookie == -1){
    popup.style.display = "block";
}else{
    popup.style.display = "none";
}

btnClose.addEventListener("click", e=>{
    e.preventDefault();
    popup.style.display = "none";

    let isChecked = popup.querySelector("input[type=checkbox]").checked;
    if(isChecked) setCookie("today", "done", 1);
})

function setCookie(name, val, due){
    const today = new Date();
    const day = today.getDate();
    today.setDate(day + due);
    const duedate = today.toGMTString();

    document.cookie = `${name}=${val}; path=/; expires=${duedate}`;
}



