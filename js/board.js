const tab = document.querySelector('.click');
const btns = tab.querySelectorAll('.btns li a');
const boxs = document.querySelectorAll('table');
console.log(boxs);

btns.forEach(function (btn, index) {
	btn.addEventListener('click', (e) => {
		activation(btns, index);
		activation(boxs, index);
	});
});

function activation(arr, index) {
	for (let el of arr) {
		el.classList.remove('on');
	}
	arr[index].classList.add('on');
}
