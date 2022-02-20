let gameStatus = "ready";

const messages = {
    x_win: '"X" wins',
    o_win: '"O" wins',
    draw: "DRAW",
    ready: "READY",
    paused: "GAME PAUSED",
    over: "GAME OVER",
};
let step = 0;
let whoseMove = "X";
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

const colors = {
    colorCellX: 'yellow',
    colorCellO: 'cyan',
    colorOther: '#6c7375',
    colorText: 'white'

}

let gameCounter = 0;
let countDraw = 0;
let countWinsX = 0;
let countWinsO = 0;
let arrayOfScore = [];

const completedMoves = [];
const sounds = {
    urlBackSound0: "./assets/audio/preview.mp3",
    urlBackSound1: "./assets/audio/clowning-around_0104",
    urlClickSound0: "./assets/audio/click.wav",
    urlclickSound1: "./assets/audio/click-boom.mp3",
    // urlTadamSound0: "./assets/audio/kc78v26.mp3",
    urlTadamSound0: "./assets/audio/tuturu_1.mp3",
    urltadamSound1: "./assets/audio/tuturu_1.mp3",
    urlUpsSound: "./assets/audio/he-he-boy.mp3",
};


const BackSound = new Audio(sounds.urlBackSound0);
BackSound.volume = 0.1;
const clickSound = new Audio(sounds.urlClickSound0);
const tadamSound = new Audio(sounds.urlTadamSound0);
const upsSound = new Audio(sounds.urlUpsSound);

let isMusicMute = false;
let isSoundMute = false;

const field = document.getElementById("field");
//запрет прокрутки экрана
const switchMusicMute = document.querySelector(".music_mute");
switchMusicMute.addEventListener("click", toggleVolumeMusic);

const switchSoundMute = document.querySelector(".sound_mute");
switchSoundMute.addEventListener("click", toggleVolumeSound);

const gameOverBox = document.querySelector(".game_over_box");

const btnPlay = document.querySelector(".btn_start_game");

const btnClearHistory = document.getElementById('clear_history');
btnClearHistory.addEventListener('click', clearHistory)

document.addEventListener("DOMContentLoaded", init);

//=================================================
function toggleVolumeMusic() {
    isMusicMute = !isMusicMute;
    localStorage.setItem('isMusicMute', (isMusicMute ? '1' : '0'));
    switchMusicMute.classList.toggle("switch_off");
    playMusic();
}

//=================================================
function toggleVolumeSound() {
    isSoundMute = !isSoundMute;
    localStorage.setItem('isSoundMute', (isSoundMute ? '1' : '0'));
    playSound();
    switchSoundMute.classList.toggle('switch_off');
}

//=================================================
function init() {
    document.body.style.overflow = "hidden"; // do not scrolling

    btnPlay.addEventListener("click", changeAction);

    isMusicMute = localStorage.getItem('isMusicMute') == '1';
    if (isMusicMute) {
        switchMusicMute.classList.add('switch_off')
    }

    isSoundMute = localStorage.getItem('isSoundMute') == '1';
    if (isSoundMute) {
        switchSoundMute.classList.add('switch_off')
    }

    showInfoBox([messages.ready, "white"]);
    arrayOfScore.length = 0;
    showHistoryBox()
}

//=================================================
function changeAction() {
    switch (gameStatus) {
        case "running":
            gameStatus = "paused";
            showInfoBox([messages.paused, "green"]);
            field.removeEventListener("click", putLabel);
            btnPlay.textContent = "PRESS TO CONTINUE";
            break;
        case "paused":
            gameStatus = "running";
            hideInfoBox();
            field.addEventListener("click", putLabel);
            btnPlay.textContent = "PRESS TO PAUSE";
            break;
        case "ready":
            gameStatus = "running";
            completedMoves.length = 0;
            gameCounter++;
            step = 0;
            whoseMove = "X";
            field.addEventListener("click", putLabel);
            btnPlay.textContent = "PRESS TO START";
            hideInfoBox();
            clearField();
            showStatusBox();
            break;
        case "finished":
            gameStatus = "ready";
            changeAction();
            break;
        default:
            break;
    }
}

//=================================================
function playSound() {
    if (!isSoundMute) {
        clickSound.play();
    }
}
//=================================================
function playTadam() {
    if (!isSoundMute) {
        tadamSound.play();
    }
}
//=================================================
function playUps() {
    if (!isSoundMute) {
        upsSound.play();
    }
}

//=================================================
function playMusic() {
    if (!isMusicMute) {
        BackSound.play();
    } else {
        BackSound.pause();
    }
}

//===================================
function clearField() {
    document.querySelectorAll(".cell");

    for (const item of document.querySelectorAll(".cell")) {
        item.style.backgroundColor = null;
        item.classList.remove("cell_krug", "cell_krest");
    }
    for (let item in cells) {
        cells[item] = "";
    }
}

//===================================
function putLabel(ev) {
    if (gameStatus == "paused") {
        return;
    }
    if (ev.target.classList.contains("cell")) {
        let cell = ev.target;
        if (completedMoves.includes(cell.id)) {
            return;
        }
        completedMoves.push(cell.id);
        // console.log(completedMoves.length);
        playSound();
        step++;
        if (cell.textContent == "") {
            if (whoseMove == "0") {
                cell.style.backgroundColor = colors.colorCellO;
                cell.classList.add("cell_krug");
                cell.style.transform = "rotateX(180deg)";
                cells[cell.id] = "0";
            } else {
                cell.style.backgroundColor = colors.colorCellX;
                cell.classList.add("cell_krest");
                cell.style.transform = "rotateZ(180deg)";
                cells[cell.id] = "X";
                // cell.style.transform = 'rotateY(180deg)';
            }
            whoseMove = whoseMove == "0" ? "X" : "0";
        }
        showStatusBox();
        checkWinner();
    }
}

//=================================================
function checkWinner() {
    if (
        cells.a1 + cells.b2 + cells.c3 == "XXX" ||
        cells.a3 + cells.b2 + cells.c1 == "XXX" ||
        cells.a1 + cells.a2 + cells.a3 == "XXX" ||
        cells.b1 + cells.b2 + cells.b3 == "XXX" ||
        cells.c1 + cells.c2 + cells.c3 == "XXX" ||
        cells.a1 + cells.b1 + cells.c1 == "XXX" ||
        cells.a2 + cells.b2 + cells.c2 == "XXX" ||
        cells.a3 + cells.b3 + cells.c3 == "XXX"
    ) {
        countWinsX++;
        gameOver('x');
        showInfoBox([messages.over, "red"], [messages.x_win, "yellow"]);
        playTadam();
        return;
    }
    if (
        cells.a1 + cells.b2 + cells.c3 == "000" ||
        cells.a3 + cells.b2 + cells.c1 == "000" ||
        cells.a1 + cells.a2 + cells.a3 == "000" ||
        cells.b1 + cells.b2 + cells.b3 == "000" ||
        cells.c1 + cells.c2 + cells.c3 == "000" ||
        cells.a1 + cells.b1 + cells.c1 == "000" ||
        cells.a2 + cells.b2 + cells.c2 == "000" ||
        cells.a3 + cells.b3 + cells.c3 == "000"
    ) {
        countWinsO++;
        gameOver('o');
        showInfoBox([messages.over, "red"], [messages.o_win, "yellow"]);
        playTadam();
        return;
    }
    if (completedMoves.length >= 9) {
        countDraw++;
        gameOver('d');
        showInfoBox([messages.over, "red"], [messages.draw, "yellow"]);
        playUps();
        return;
    }
}

//=================================================
function gameOver(hwoWin) {
    arrayOfScore.push(hwoWin);
    if (arrayOfScore.length > 10) {
        arrayOfScore.shift();
    }

    console.log(arrayOfScore);
    localStorage.setItem('scoreHistory', arrayOfScore.toString());

    gameStatus = "finished";
    field.removeEventListener("click", putLabel);
    showStatusBox();
    showHistoryBox();
    btnPlay.textContent = "PRESS TO RESTART";
}


//=================================================
function showHistoryBox() {
    let fromHistory = localStorage.getItem("scoreHistory");
    if (fromHistory.length > 0) {
        arrayOfScore = fromHistory.split(',');
    }

    for (let i = 0; i < 10; i++) {
        switch (arrayOfScore[i]) {
            case 'x':
                document.getElementById(`td-r${i}-x`).textContent = '+';
                document.getElementById(`td-r${i}-x`).style.color = 'black';
                document.getElementById(`td-r${i}-x`).style.backgroundColor = colors.colorCellX;

                break;
            case 'o':
                document.getElementById(`td-r${i}-o`).textContent = '+';
                document.getElementById(`td-r${i}-o`).style.color = 'black';
                document.getElementById(`td-r${i}-o`).style.backgroundColor = colors.colorCellO;
                break;
            case 'd':
                document.getElementById(`td-r${i}-d`).textContent = '+';
                document.getElementById(`td-r${i}-d`).style.color = 'white';
                document.getElementById(`td-r${i}-d`).style.backgroundColor = colors.colorOther;
                break;

            default:
                break;
        }
    }
}

function clearHistory() {
    arrayOfScore.length = 0;
    for (let i = 0; i < 10; i++) {
        document.getElementById(`td-r${i}-x`).textContent = '.';
        document.getElementById(`td-r${i}-x`).style.color = null;
        document.getElementById(`td-r${i}-x`).style.backgroundColor = null;


        document.getElementById(`td-r${i}-o`).textContent = '.';
        document.getElementById(`td-r${i}-o`).style.color = null;
        document.getElementById(`td-r${i}-o`).style.backgroundColor = null;

        document.getElementById(`td-r${i}-d`).textContent = '.';
        document.getElementById(`td-r${i}-o`).style.color = null;
        document.getElementById(`td-r${i}-o`).style.backgroundColor = null;

    }

}

//=================================================
function showInfoBox(mes1, mes2) {
    gameOverBox.style.top = "0px";
    gameOverBox.style.cursor = "auto";
    btnPlay.style.transform = 'none'

    const h2_line_1 = document.querySelector(".status_line_1");
    h2_line_1.textContent = mes1[0];
    h2_line_1.style.color = mes1[1];

    const h2_line_2 = document.querySelector(".status_line_2");
    if (mes2) {
        h2_line_2.textContent = mes2[0];
        h2_line_2.style.color = mes2[1];
    } else {
        h2_line_2.textContent = "";
        h2_line_2.style.color = "none";
    }
    field.style.transform = 'translateY(165px)';

}

//=================================================
function hideInfoBox() {
    gameOverBox.style.cursor = "pointer";
    gameOverBox.style.top = "-280px";
    btnPlay.style.transform = 'translateY(72px)'
    btnPlay.textContent = "PRESS TO PAUSE";

    field.style.transform = 'none';
}

//=================================================
function showStatusBox() {
    document.querySelector(".score_game").textContent = "Game: " + gameCounter;
    document.querySelector(".score_step").textContent = "Moves: " + zero2dash(step);
    document.querySelector(".score_draw").textContent = "Draw: " + zero2dash(countDraw);
    document.querySelector(".score_x_wins").textContent = "X wins: " + zero2dash(countWinsX);
    document.querySelector(".score_o_wins").textContent = "O wins: " + zero2dash(countWinsO);
}

function zero2dash(x) {
    return x == 0 ? '' : x;
}