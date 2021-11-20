const letters = document.querySelectorAll('.letters');
document.getElementById('bestScore').innerText = localStorage.getItem('bestScore');

for (let letter of letters) {
	setInterval(function() {
		letter.style.color = randomColor();
	}, 1000);
}

function randomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `rgb(${r},${g},${b})`;
}
