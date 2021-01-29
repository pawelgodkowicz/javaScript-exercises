var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var leftPlayer = "images/dice" + randomNumber1 + ".png";
var rightPlayer = "images/dice" + randomNumber2 + ".png";

var diceImage1 = document.querySelector('.img1');
var diceImage2 = document.querySelector('.img2');
var ourHeadingText = document.querySelector("h1");

diceImage1.setAttribute("src", leftPlayer);
diceImage2.setAttribute("src", rightPlayer);

if (randomNumber1 === randomNumber2) {
  ourHeadingText.textContent = "DRAW"
} else if (randomNumber1 > randomNumber2) {
  ourHeadingText.textContent = "🚩Player 1 Wins"
} else {
  ourHeadingText.textContent = "Player 2 Wins🚩"
}

