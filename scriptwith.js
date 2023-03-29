let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let player2Turn = false;    /*Writing this line of code might not be neccessary because if the player1Turn is true, by extension, the player2Turn would be false as it is a boolean logic. However, we may state this explicitly to remove ambiguity from the game state. */

// The above are the game states.

const message = document.getElementById('message');
const container = document.getElementById('container');
const player1 = document.getElementById('player1');
const player1Scoreboard = document.getElementById('player1Scoreboard');
let player1Dice = document.getElementById('player1Dice');
const player2 = document.getElementById('player2');
const player2Scoreboard = document.getElementById('player2Scoreboard');
let player2Dice = document.getElementById('player2Dice');
const rollBtn = document.getElementById('rollBtn');
const resetBtn = document.getElementById('resetBtn');
const formContainer = document.getElementById('form-container');
const playerA = document.getElementById('playerA');
const playerB = document.getElementById('playerB');

//The above are the DOM References (grabbing the DOM elements needed for manipulation)

let players = [];
let playerOne = "";
let playerTwo = "";
let playerInfo = document.getElementById('player-info');
playerInfo.addEventListener ('submit', function (event){
 event.preventDefault();
 const formInfo = new FormData(playerInfo);
 const playerNameA = formInfo.get('playerA');
 const playerNameB = formInfo.get('playerB');
 players.push(playerNameA);
 players.push(playerNameB);
 randominizePlayers();
 message.textContent = `${playerOne}'s Turn`;
 
 
 setTimeout (function(){
  formContainer.style.display = 'none';
 }, 500)
 
});

// Function to randominize the players to ensure fairness as playerNameA has a high probability of winning the game if one player always enters his/her name first 

function randominizePlayers () {
 const randomNumber = Math.floor(Math.random()*players.length);
 for (let i = 0; i < players.length; i++) {
  if (i === randomNumber){
   playerOne = players[0]
   playerTwo = players[1]
  } else {
   playerOne = players[1];
   playerTwo = players[0]
  }
 }
};


// Roll Dice Button 
rollBtn.addEventListener('click', function(){
 // We can use a const as the value chnages on hitting the rollDice button and there is no global scope to keep track of the dice value. 

 const randomNumber = Math.floor((Math.random()*6)+1);

 // Writing the game logic once the game state is ascertained 
 if (player1Turn === true) {
  player1Dice.classList.remove('active');
  player2Dice.classList.add('active');
  message.innerHTML = `${playerTwo}'s Turn`;
  player1Dice.innerHTML = randomNumber;
  player1Score += randomNumber;
  player1Scoreboard.innerHTML = player1Score;
 } else {
  player2Dice.classList.remove('active');
  player1Dice.classList.add('active');
  message.innerHTML = `${playerOne}'s Turn`;
  player2Dice.innerHTML = randomNumber;
  player2Score += randomNumber;
  player2Scoreboard.innerHTML = player2Score;
 };

 if (player1Score > 21){
  message.innerHTML = `${playerOne} has won game 🤣`;
  showResetBtn();
 } else if (player2Score > 21) {
  message.innerHTML = `${playerTwo} has won game 🤣`;
  showResetBtn();
 }

 // Switching the states between player 1 and player 2. Note if you write the switch before the game logic, player 2 will start the game and not player 1 because the reading would start from the local scope before looking for meaning from the global scope. 

 if (player1Turn === true) {
  // On clicking the button change the player1Turn to false and player2Turn to true
  player1Turn = false;
  player2Turn = true;
  
 } else {
  // Once the button is clicked again, just flip the values to the initial state
  player1Turn = true;
  player2Turn = false;
  
 };

})

resetBtn.addEventListener('click', function(){
 resetBtn.style.display = 'none';
 rollBtn.style.display = 'block';
 player1Turn = true;
 player1Dice.classList.add('active');
 player2Dice.classList.remove('active');
 message.textContent = "Player's Turn";
 player1Score = 0;
 player2Score = 0;
 player1Dice.innerHTML = 0;
 player2Dice.innerHTML = 0;
 player1Scoreboard.innerHTML = 0;
 player2Scoreboard.innerHTML = 0;
 formContainer.style.display = 'flex';
 players = [];
 playerA.value = "";
 playerB.value = "";
});

function showResetBtn(){
 resetBtn.style.display = 'block'
 rollBtn.style.display = 'none'
}

// Add a double or nothing button 
// Make the game fair because statistically, the first player usually wins the game always.
// Add animation 
// Add a flying cow that periodically flys past the game and steals point from random players. 
// Be comfortable sharing your code as it is part of growing as a developer. 