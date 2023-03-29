let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let player2Turn = false;
let players = [];
let playerOne = "";
let playerTwo = "";

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
const playerInfo = document.getElementById('player-info');


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



rollBtn.addEventListener('click', function(){
 const randomNumber = Math.floor((Math.random()*6)+1);

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

 if (player1Turn === true) {
  player1Turn = false;
  player2Turn = true;
  
 } else {
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
