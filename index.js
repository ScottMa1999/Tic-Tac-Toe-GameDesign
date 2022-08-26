
/* ------ container1 => container2 ------ */
let container1_btn = document.querySelectorAll('.btn');
let container1 = document.querySelector('.container1');
let container2 = document.querySelector('.container2');
let container3 = document.querySelector('.container3');
let container3_winnerText = document.getElementById('winningText');

container1_btn.forEach(btn => {
  btn.addEventListener("click",()=>{
    container1.classList.add("hidden");
    container2.classList.remove("hidden");
  })
})

/* ------ Start Plugging in items ------ */
const CLASSX = "x";
const CLASSO = "circle";
const box = document.getElementById("box");
const WINNING_COMBINATION = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
let cells = document.querySelectorAll('[data-cell]');
let turns;

startGame();

function startGame() {
  cells.forEach(cell => {
    cell.addEventListener("click", handleClick, {once:true});
  })

  // add hover effect to the first click
  setBoxHover();
}

// ************* Functions serve startGame() ************* //

// ******** handleClick ******** //
function handleClick(e){
  // place marks
  // ****** target specific clicked cell ****** //
  const cell = e.target;

  // ****** decide which turn it goes ****** //
  const currClass = turns ? CLASSO : CLASSX; 
  placeMark(cell,currClass);

  // check wins && check draws
  if(checkWins(currClass)){
    endGame(false);
  }
  else if(isDraw()){
    endGame(true);
  }
  else {
    // switch turns
    swapTurns();
    setBoxHover();
  }
}

// ************ Functions serve handleClick() ************ //

// ******** placeMark ******** //
function placeMark(cell, currClass){
  cell.classList.add(currClass);
}

// ******** swapTurns ******** //
function swapTurns() {
  turns = !turns;
}

// ******** setBoxHover ******** //
function setBoxHover(){
  box.classList.remove(CLASSO);
  box.classList.remove(CLASSX);
  if (turns) {
    box.classList.add(CLASSO);
  }
  else {
    box.classList.add(CLASSX);
  }
}

// ******** checkWins ******** //
function checkWins(currClass) {
  return WINNING_COMBINATION.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currClass);
    })
  })
}

// ******** endGame ******** //
function endGame(draw) {
  if (draw) {
    container2.classList.add('hidden');
    container3_winnerText.innerHTML = "Draw Happened!";
    container3.classList.remove('hidden');
  }
  else {
    container2.classList.add('hidden');
    container3_winnerText.innerHTML = `Congratulations! ${turns ? "O" : "X"} Wins!`;
    container3.classList.remove('hidden');
  }
}

// ******** isDraw ******** //
function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(CLASSO) || cell.classList.contains(CLASSX);
  })
}

// ******** RestartButton ******** // 
const restartButton = document.getElementById('RestartButton');

restartButton.addEventListener("click", ()=>{
  cells.forEach(cell => {
    cell.classList.remove(CLASSO);
    cell.classList.remove(CLASSX);
  })
  container3.classList.add('hidden');
  container2.classList.remove('hidden');
  startGame();
})

// ******** ResetButton ******** // 
const resetButton = document.getElementById('reset');

resetButton.addEventListener("click",()=>{
  cells.forEach(cell => {
    cell.classList.remove(CLASSO);
    cell.classList.remove(CLASSX);
  })
  startGame();
})