const btnCall = document.querySelector(".btnCall");

const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");

    menuMo.classList.toggle("on");
}


// 서비스 페이지에 들어왔을 때 특정 스크롤 위치에서 박스가 차례대로 나오게
const btn = document.querySelector(".btn");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const img1 = box1.querySelector(".img");
const img2 = box2.querySelector(".img");

btn.addEventListener("click", ()=>{
    new Anim(box1,{
        prop:"left",
        value:0,
        duration:700,
        callback:()=>{
            new Anim(img1,{
                prop:"left",
                value:826,
                duration:700,
                callback:()=>{
                    new Anim(box2,{
                        prop:"right",
                        value:0,
                        duration:700,
                        callback:()=>{
                            new Anim(img2,{
                                prop:"left",
                                value:0,
                                duration:700,
                            })
                        }
                    })
                }
            })
        }
    })
})

