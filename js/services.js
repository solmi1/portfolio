const tab = document.querySelector("#plan");
const btns = tab.querySelectorAll(".btns li a");
const boxs = tab.querySelectorAll("div");

btns.forEach(function(btn, index){
    btn.addEventListener("click", e=>{
        activation(btns, index);
        activation(boxs, index);
    })
});

function activation(arr, index){
    for(let el of arr){
        el.classList.remove("on");
    }
    arr[index].classList.add("on");
}