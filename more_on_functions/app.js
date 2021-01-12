const startGameBtn = document.getElementById('start-game-btn');

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = "ROCK";
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WIN = "PLAYER_WIN";
const RESULT_COMPUTE_WIN = "COMPUTER_WIN";

let gameIsRunning = false;

const getPlayerChoice = function () {
  const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, "").toUpperCase();
  if (
    selection !== ROCK && 
    selection !== PAPER && 
    selection !== SCISSORS
  ) {
    alert(`Invalid choice! We chose ${ROCK} for you!`);
    return; 
  } 
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34){
    return ROCK;
  } else if (randomValue < 0.67){
    return PAPER;
  } else {
    return SCISSORS;
  };
}
const add = (a, b) => a+b

const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) => 
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK) ||
      (cChoice === ROCK && pChoice === PAPER)
    ? RESULT_PLAYER_WIN
    : RESULT_COMPUTE_WIN;
 
startGameBtn.addEventListener("click", () => {
  if(gameIsRunning){
    return;
  }
  gameIsRunning = true;
  console.log("Game is starting ..."); 
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  let winner;
  if (playerChoice){
    winner = getWinner(computerChoice, playerChoice);
  } else {
    winner = getWinner(computerChoice, playerChoice);  
  }
  let message = `You picked ${playerChoice || DEFAULT_USER_CHOICE}, computer picked ${computerChoice}, therefore you`;  
  if (winner === RESULT_DRAW) {
    message =  message + " had a draw.";
  } else if (winner === RESULT_PLAYER_WIN) {
    message =  message + " win.";
  } else {
    message =  message + " lost.";
  }
  alert(message)
  gameIsRunning = false;

});

// not related to game

const sumUp = (...numbers) => {
  
  const validatenumber = (number) =>{
    return isNaN(number) ? 0 : number
  };  
  
  let sum = 0;
    for (const n of numbers) {
      sum += n
    }
    return sum;
}

const subUp = (...numbers) => {
  
  const validatenumber = (number) =>{
    return isNaN(number) ? 0 : number
  };  
  
  let sum = 0;
    for (const n of numbers) {
      sum -= n
    }
    return sum;
}

console.log(sumUp)