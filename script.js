const gameContainer = document.getElementById('game');

const COLORS = [
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'black',
	'teal',
	'magenta',
	'coral',
	'violet',
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'black',
	'teal',
	'magenta',
	'coral',
	'violet'
];

// const IMAGENAMES = [
// 	'chillies.png',
// 	'christmas-dog.jpg',
// 	'christmas-dog2.jpg',
// 	'coffee.png',
// 	'computer.png',
// 	'cup-of-latte.jpg',
// 	'golden-retriever.jpg',
// 	'lady-dog.jpg',
// 	'lazy-dog.jpg',
// 	'milktea.JPG',
// 	'chillies.png',
// 	'christmas-dog.jpg',
// 	'christmas-dog2.jpg',
// 	'coffee.png',
// 	'computer.png',
// 	'cup-of-latte.jpg',
// 	'golden-retriever.jpg',
// 	'lady-dog.jpg',
// 	'lazy-dog.jpg',
// 	'milktea.JPG'
// ];

let clickCounter = 0;
let colorMatchArray = [];
const matchedColor = [];
let yourScore = 0;
let unmatchedCount = 0;
let bestScore = localStorage.getItem('bestScore');
console.log(bestScore);
document.getElementById('bestScore').innerText = bestScore;

let shuffledColors = shuffle(COLORS);
// when the DOM loads
createDivsForColors(shuffledColors);

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.appendChild(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked

	// count how many unmatched cards left
	let leftCard = countUnmatchedCards();
	clickCounter++;
	if (leftCard !== 0) {
		if (clickCounter <= 2) {
			// console.log('you just clicked', event.target);
			const color = event.target.className;
			if (event.target.style.backgroundColor !== color) {
				yourScore++;
				document.getElementById('yourScore').innerText = yourScore;
				event.target.classList.add('clicked');
				event.target.style.backgroundColor = color;
				console.log('card faced up', event.target);
				if (colorMatchArray.length < 2) {
					colorMatchArray.push(event.target.className);
					//	console.log(colorMatchArray);
				}

				if (colorMatchArray.length === 2) {
					if (colorMatchArray[0] === colorMatchArray[1]) {
						matchedColor.push(colorMatchArray[0]);
						// console.log(colorMatchArray);
						// console.log('matchedColor:', matchedColor);
					}
				}
				console.log(colorMatchArray);

				setTimeout(function() {
					if (matchedColor.includes(event.target.className)) {
						event.target.style.backgroundColor = event.target.className;
						event.target.className = 'matched';
						// console.log(event.target, 'matched');
						colorMatchArray = [];
						leftCard = countUnmatchedCards();
						if (leftCard === 0) {
							if (bestScore === null || bestScore > yourScore) {
								bestScore = yourScore;
								localStorage.setItem('bestScore', bestScore);
								alert(`You Won! Best score: ${yourScore}`);
							} else {
								alert(`your score: ${yourScore}`);
							}
							document.getElementById('yourScore').innerText = yourScore;
							document.getElementById('bestScore').innerText = bestScore;
						}
						//	console.log(colorMatchArray);
					} else {
						colorMatchArray = [];
						const selectedCards = document.querySelectorAll('.clicked');
						event.target.classList.remove('clicked');
						for (let card of selectedCards) {
							card.style.backgroundColor = '';
						}

						// console.log(event.target, 'NOT matched');
						// const cards = gameContainer.children;
						// for (let card of cards) {
						// 	if (card.tagName === 'DIV' && card.className !== 'matched') {
						// 		card.style.backgroundColor = '';
						// 		colorMatchArray = [];
						// 	}
						// }
					}
					clickCounter--;
				}, 1200);

				//if all the card's class name==="matched", then Game over
			} else {
				clickCounter--;
			}
		} else {
			clickCounter--;
		}
	}
}

function countUnmatchedCards() {
	const cards = gameContainer.children;
	let leftCardCount = 0;
	for (let card of cards) {
		if (card.tagName === 'DIV' && card.className !== 'matched') {
			leftCardCount++;
		}
	}
	return leftCardCount;
}
