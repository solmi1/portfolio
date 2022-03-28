const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");


var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
});

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");

    menuMo.classList.toggle("on");
}





