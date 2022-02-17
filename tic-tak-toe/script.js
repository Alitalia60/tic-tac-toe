const field = document.getElementById("field");
let gameIsRunning = false;
let step = 0;
let move = "0";
const cells = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};


document.addEventListener("DOMContentLoaded", init);
const backSound = document.createElement("audio");
const clickSound = document.createElement("audio");

let mute = true;

const btnMute = document.querySelector('.mute');
btnPlay.addEventListener('click', ()=>{
    mute = true;
    btnMute.style.backgroundImage='url()'
})

const btnPlay = document.querySelector('.btn_start_game');
btnPlay.addEventListener('click', playGame)
//=================================================
function init() {
    backSound.src = "./assets/audio/preview.mp3";
    backSound.volume = 0.1;
    clickSound.src = "/tic-tak-toe/assets/audio/click.wav";
}

//=================================================
function playGame() {
    clickSound.play();
    gameIsRunning = true;
  field.addEventListener("click", putLabel);
  step = 0;
  move = 0;
  backSound.play();
  hideInfoBox('')
}

//=================================================
function putLabel(e) {
    if (e.target.classList.contains("cell")) {
        clickSound.play();
        step++;
        let cell = e.target;
        if (cell.textContent == "") {
            if (move == "0") {
                cell.style.backgroundColor = "green";
                cell.textContent = 'O';
                cells[cell.id] = "0";
                cell.style.transform = "rotateX(180deg)";
            } else {
                cell.style.backgroundColor = "red";
                cell.textContent = 'X';
                cells[cell.id] = "X";
                cell.style.transform = "rotateZ(180deg)";
                cell.style.transform = "rotateY(180deg)";
                // cell.style.transform = 'rotateX(180deg)'
            }
            move = move == "0" ? "X" : "0";
            // console.log(cells[cell.id]);
        }
        checkWinner();
    }
}

//=================================================
function checkWinner(step) {
    if (step >= 9) {
        gameIsRunning = false;
        field.removeEventListener("click", putLabel);
        gameOver("No winner");
        return;
    }
    
    if (
        cells.a1 + cells.b2 + cells.c3 == "XXX" ||
        cells.a3 + cells.b2 + cells.c1 == "XXX" ||
        cells.a1 + cells.a2 + cells.a3 == "XXX" ||
        cells.b1 + cells.b2 + cells.b3 == "XXX" ||
        cells.c1 + cells.c2 + cells.c3 == "XXX" ||
        cells.a1 + cells.b1 + cells.b3 == "XXX" ||
        cells.a2 + cells.b2 + cells.c2 == "XXX" ||
        cells.a3 + cells.b3 + cells.c3 == "XXX"
        ) {
            gameIsRunning = false;
            field.removeEventListener("click", putLabel);
            gameOver("X - winner");
            return;
        };
    if (
            cells.a1 + cells.b2 + cells.c3 == "000" ||
            cells.a3 + cells.b2 + cells.c1 == "000" ||
            cells.a1 + cells.a2 + cells.a3 == "000" ||
            cells.b1 + cells.b2 + cells.b3 == "000" ||
            cells.c1 + cells.c2 + cells.c3 == "000" ||
            cells.a1 + cells.b1 + cells.b3 == "000" ||
            cells.a2 + cells.b2 + cells.c2 == "000" ||
            cells.a3 + cells.b3 + cells.c3 == "000"
        )
        {
                gameIsRunning = false;
                field.removeEventListener("click", putLabel);
                gameOver("O - winner");
                return;
        }
}

//=================================================
function gameOver(message) {
  showInfoBox(message)
}

function showInfoBox(message) {
    const gameOverBox = document.querySelector(".game_over");
    gameOverBox.style.transform = "translateY(400px)";
    const h2 = document.querySelector(".game_status");
    h2.textContent = message
}

function hideInfoBox(message) {
    const gameOverBox = document.querySelector(".game_over");
    gameOverBox.style.transform = "translateY(-330px)";
    const h2 = document.querySelector(".game_status");
    h2.textContent = message
    
}
