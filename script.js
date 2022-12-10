const X_CLASS = "x";
const O_ClASS = "o"
// all win possibility
const WINNING_COMPINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[date-cell]');
const board = document.getElementById("board")
const winningMessageElement = document.getElementById("winning-message")
const resartbutton = document.getElementById("restartButton")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
let circleTurn;


startGame();

resartbutton.addEventListener("click", startGame)

function startGame() {
    circleTurn = false;     //to start game with player X
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)  //when restart game
        cell.classList.remove(O_ClASS)  //when restart game
        cell.removeEventListener('click' , handleClick)     //when restart game
        cell.addEventListener('click' , handleClick , {once:true}) 
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")
}


function handleClick (e) {
const cell = e.target;
const currentClass = circleTurn ? O_ClASS : X_CLASS;
palceMark(cell , currentClass)

if(checkWin(currentClass)){
    endGame(false)
}
else if(isDraw()){
    endGame(true)
}else {
    swapTurns();
    setBoardHoverClass();
}
}


function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = "Draw"
    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`
    }
    winningMessageElement.classList.add("show")
}


function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_ClASS)
    })
}


function palceMark(cell , currentClass) {
    cell.classList.add(currentClass)
}


function swapTurns () {
    circleTurn = !circleTurn
}


function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_ClASS)
    if(circleTurn) {
        board.classList.add(O_ClASS)
    }else {
        board.classList.add(X_CLASS)
    }
}


function checkWin (currentClass) {
    return WINNING_COMPINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}