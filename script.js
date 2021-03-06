const gameContainer = document.getElementById("game");
const startBtn = document.getElementById("start")
let first = null;
let second = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

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

let shuffledColors = shuffle(COLORS);
let attempts

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }

}

function makeGame() {
  gameContainer.innerHTML = ""
  createDivsForColors(shuffledColors)

  // Score tracker
  attempts = 0
  const tracker = document.createElement('p')
  tracker.classList.add('score')
  tracker.innerText = `Your attempts: ${attempts}`
  gameContainer.append(tracker)

  // Record
  if (localStorage.getItem('record')) {
  const highScore = document.createElement('p')
  highScore.classList.add('highScore')
  highScore.innerText = `Your record: ${localStorage.getItem('record')}`
  gameContainer.append(highScore) 
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!first || !second) {
    currentCard.classList.add("flipped")
    first = first || currentCard;
    second = currentCard === first ? null : currentCard
  }

  if (first && second) {
    noClicking = true;
    let gif1 = first.className
    let gif2 = second.className

    if (gif1 === gif2) {
      cardsFlipped += 2;
      first.removeEventListener('click', handleCardClick);
      second.removeEventListener('click', handleCardClick);
      first = null;
      second = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        alert('Incorrect match!');
      }, 3)
      setTimeout(function() {
        first.style.backgroundColor = "";
        second.style.backgroundColor = "";
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        first = null;
        second = null;
        noClicking = true;
      }, 1000);
      noClicking = false;
      attempts++
      document.querySelector('.score').innerText = `Your attempts: ${attempts}`
    }
  }
  
  if (cardsFlipped === COLORS.length) {
    setTimeout(function() {
      alert('You won!');
    }, 2)
    
    // If new record, store in localStorage
    const record = localStorage.getItem('record')
    if (attempts < record || !record) localStorage.setItem('record', attempts)

    // Create restart button
    const restartBtn = document.createElement('button')
    restartBtn.innerText = 'Restart'
    restartBtn.addEventListener("click", makeGame)
    gameContainer.append(restartBtn)
  };
}
// when the DOM loads
startBtn.addEventListener('click', makeGame)