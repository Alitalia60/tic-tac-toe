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
const colorCellX = "yellow";
const colorCellO = "cyan";

let countDraw = 0;
let countWinsX = 0;
let countWinsO = 0;
const arrayOfScore = [];

const completedMoves = [];
const sounds = {
  backSound0: "./assets/audio/preview.mp3",
  backSound1: "./assets/audio/clowning-around_0104",
  clickSound0: "./assets/audio/click.wav",
  clickSound1: "./assets/audio/click-boom.mp3",
  tadamSound0: "./assets/audio/kc78v26.mp3",
  tadamSound1: "./assets/audio/tuturu_1.mp3",
  upsSound: "./assets/audio/he-he-boy.mp3",
};

document.addEventListener("DOMContentLoaded", init);

const backSound = new Audio();
// const backSound = document.createElement('audio');

const clickSound = new Audio();
// const clickSound = document.createElement('audio');

let soundMute = false;
let musicMute = false;

const field = document.getElementById("field");
//запрет прокрутки экрана
const switchMusicMute = document.querySelector(".music_mute");
switchMusicMute.addEventListener("click", toggleVolume);

const switchSoundMute = document.querySelector(".sound_mute");
switchSoundMute.addEventListener("click", toggleVolume);

const gameOverBox = document.querySelector(".game_over_box");

const btnPlay = document.querySelector(".btn_start_game");

//=================================================
function toggleVolume(ev) {
  switch (ev.target) {
    case switchMusicMute:
      musicMute = !musicMute;
      switchMusicMute.classList.toggle("switch_off");
      playMusic();
      break;
    case switchSoundMute:
      soundMute = !soundMute;
      switchSoundMute.classList.toggle("switch_off");
      playSound();
      break;
    default:
      break;
  }
}

//=================================================
function init() {
  document.body.style.overflow = "hidden";
  btnPlay.addEventListener("click", changeAction);
  backSound.src = sounds.backSound1;
  backSound.volume = 0.1;

  // clickSound.src = sounds.clickSound1;
  showInfoBox([messages.ready, "white"]);
  playMusic();
}

//=================================================
function changeAction() {
  if (gameStatus != "running") {
    gameStatus = "running";
    hideInfoBox();
    playGame();
  } else if (gameStatus == "running") {
    gameStatus = "paused";
    showInfoBox([messages.paused, "green"]);
    pauseGame();
  }
}

//=================================================
function playGame(ev) {
  field.addEventListener("click", putLabel);
  if (gameStatus != "paused") {
    // gameStatus = 'running';
    completedMoves.length = 0;
    clearField();
    playSound();
    playMusic();
    step = 0;
    showStatusBox();
  } else {
    hideInfoBox("");
  }
}

//=================================================
function playSound(url = "") {
  if (url == "") {
    url = sounds.clickSound0;
  }
  if (!soundMute) {
    clickSound.src = url;
    clickSound.play();
  }
  url = sounds.clickSound0;
}

//=================================================
function playMusic(url = "") {
  if (url == "") {
    url=sounds.backSound0;
    backSound.src = url;
  }
  if (!musicMute) {
    backSound.play();
  } else {
    backSound.pause();
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
        cell.style.backgroundColor = "cyan";
        cell.classList.add("cell_krug");
        cell.style.transform = "rotateX(180deg)";
        cells[cell.id] = "0";
      } else {
        cell.style.backgroundColor = "yellow";
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
    cells.a1 + cells.b1 + cells.b3 == "XXX" ||
    cells.a2 + cells.b2 + cells.c2 == "XXX" ||
    cells.a3 + cells.b3 + cells.c3 == "XXX"
  ) {
    countWinsX++;
    gameOver();
    showInfoBox([messages.over, "red"], [messages.x_win, "yellow"]);
    playSound(sounds.tadamSound1);
    return;
  }
  if (
    cells.a1 + cells.b2 + cells.c3 == "000" ||
    cells.a3 + cells.b2 + cells.c1 == "000" ||
    cells.a1 + cells.a2 + cells.a3 == "000" ||
    cells.b1 + cells.b2 + cells.b3 == "000" ||
    cells.c1 + cells.c2 + cells.c3 == "000" ||
    cells.a1 + cells.b1 + cells.b3 == "000" ||
    cells.a2 + cells.b2 + cells.c2 == "000" ||
    cells.a3 + cells.b3 + cells.c3 == "000"
  ) {
    countWinsO++;
    gameOver();
    showInfoBox([messages.over, "red"], [messages.o_win, "yellow"]);
    playSound(sounds.tadamSound0);
    return;
  }
  if (completedMoves.length >= 9) {
    countDraw++;
    gameOver();
    showInfoBox([messages.over, "red"], [messages.draw, "yellow"]);
    return;
  }
  if (
    cells.a1 + cells.b2 + cells.c3 == "000" ||
    cells.a3 + cells.b2 + cells.c1 == "000" ||
    cells.a1 + cells.a2 + cells.a3 == "000" ||
    cells.b1 + cells.b2 + cells.b3 == "000" ||
    cells.c1 + cells.c2 + cells.c3 == "000" ||
    cells.a1 + cells.b1 + cells.b3 == "000" ||
    cells.a2 + cells.b2 + cells.c2 == "000" ||
    cells.a3 + cells.b3 + cells.c3 == "000"
  ) {
    countWinsO++;
    gameOver([messages.gameOver, "red"], [messages.o_win, "yellow"]);
    playSound(sounds.upsSound);
    return;
  }
}

//=================================================
function gameOver() {
  gameStatus = "finished";
  field.removeEventListener("click", putLabel);
  showStatusBox();
  btnPlay.textContent = "PRESS TO RESTART";
  saveSession();
  //save to localStorage
}

//=================================================
function saveSession() {
  arrayOfScore.push(countWinsO + ";" + countWinsX + ";" + countDraw);
  if (arrayOfScore.length > 10) {
    arrayOfScore.shift();
  }
  localStorage.setItem("scoreHistory", arrayOfScore.join(" "));
  console.log(arrayOfScore);
}

function getSession() {
  let fromHistory = localStorage.getItem("scoreHistory");
  console.log(fromHistory.split(" "));
}
//=================================================
function showInfoBox(mes1, mes2) {
  gameOverBox.style.top = "150px";
  gameOverBox.style.cursor = "auto";

  btnPlay.style.bottom = "70px";

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
}

//=================================================
function hideInfoBox() {
  gameOverBox.style.cursor = "pointer";
  gameOverBox.style.top = "-370px";
  btnPlay.style.bottom = "-10px";
  btnPlay.textContent = "PRESS TO PAUSE";
}

//=================================================
function showStatusBox() {
  document.querySelector(".score_step").textContent = "Moves:" + step;
  document.querySelector(".score_draw").textContent = "Draw:" + countDraw;
  document.querySelector(".score_x_wins").textContent = "X wins:" + countWinsX;
  document.querySelector(".score_o_wins").textContent = "O wins:" + countWinsO;
}

//=================================================
function pauseGame(ev) {
  // musicMute = true;
  // playMusic()
  field.removeEventListener("click", putLabel);
  showInfoBox([messages.paused, "yellow"]);
  btnPlay.textContent = "PRESS TO CONTINUE";
}
