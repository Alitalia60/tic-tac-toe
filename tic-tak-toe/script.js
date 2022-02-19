let gameStatus = 'ready';

const messages = {
  x_win: '"X" wins',
  o_win: '"O" wins',
  noWinner: 'NO WINNER',
  ready: 'READY',
  paused: 'GAME PAUSED',
  over: 'GAME OVER',
};
let step = 0;
let 
whoseMove = '0';
const cells = {
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: '',
};
const colorCellX = 'yellow';
const colorCellO = 'cyan';

let countWinsX = 0;
let countWinsO = 0;
const completedMoves = [];

document.addEventListener('DOMContentLoaded', init);
const backSound = document.createElement('audio');
const clickSound = document.createElement('audio');

let soundMute = false;
let musicMute = false;

const field = document.getElementById('field');

const switchMusicMute = document.querySelector('.music_mute');
switchMusicMute.addEventListener('click', toggleVolume);

const switchSoundMute = document.querySelector('.sound_mute');
switchSoundMute.addEventListener('click', toggleVolume);

const gameOverBox = document.querySelector('.game_over_box');

const btnPlay = document.querySelector('.btn_start_game');

//=================================================
function toggleVolume(ev) {
  switch (ev.target) {
    case switchMusicMute:
      musicMute = !musicMute;
      switchMusicMute.classList.toggle('switch_off');
      playMusic();
      break;
    case switchSoundMute:
      soundMute = !soundMute;
      switchSoundMute.classList.toggle('switch_off');
      playSounds();
      break;
    default:
      break;
  }
}

//=================================================
function init() {
  btnPlay.addEventListener('click', playGame);
  backSound.src = './assets/audio/preview.mp3';
  backSound.volume = 0.1;
  clickSound.src = '/tic-tak-toe/assets/audio/click.wav';
}

//=================================================
function playGame(ev) {
  if (ev.target != btnPlay) {
    return;
  }
  field.addEventListener('click',putLabel)
  if (gameStatus == 'ready' || gameStatus == 'finished') {
    gameStatus = 'running';
    completedMoves.length = 0;
    clearField();
    playSounds();
    playMusic();
    step = 0;
    showStatusBox();
    gameOverBox.addEventListener('click', pauseGame);
  } else if (gameStatus == 'paused') {
    gameStatus = 'running';
  }
  
  hideInfoBox('');
}

//=================================================
function playSounds() {
  if (!soundMute) {
    clickSound.play();
  }
}

//=================================================
function playMusic() {
  if (!musicMute) {
    backSound.play();
  } else {
    backSound.pause();
  }
}

//===================================
function clearField() {
  document.querySelectorAll('.cell');

  for (const item of document.querySelectorAll('.cell')) {
    item.style.backgroundColor = null;
    item.classList.remove('cell_krug', 'cell_krest');
  }
  for (let item in cells) {
    cells[item] = '';
  }
}

//===================================
function putLabel(ev) {
  if (gameStatus == 'paused') {
    return;
  }
  if (ev.target.classList.contains('cell')) {
    let cell = ev.target;
    if (completedMoves.includes(cell.id)) {
      return;
    }
    completedMoves.push(cell.id);
    // console.log(completedMoves.length);
    playSounds();
    step++;
    if (cell.textContent == '') {
      if (
whoseMove == '0') {
        cell.style.backgroundColor = 'cyan';
        cell.classList.add('cell_krug');
        cells[cell.id] = '0';
        cell.style.transform = 'rotateX(180deg)';
      } else {
        cell.style.backgroundColor = 'yellow';
        cell.classList.add('cell_krest');
        cells[cell.id] = 'X';
        cell.style.transform = 'rotateZ(180deg)';
        // cell.style.transform = 'rotateY(180deg)';
      }
      
whoseMove = 
whoseMove == '0' ? 'X' : '0';
    }

    showStatusBox();
    checkWinner();
  }
}

//=================================================
function checkWinner() {
  if (completedMoves.length >= 9) {
      gameOver([messages.gameOver, 'red'],[messages.noWinner, 'yellow']);
    return;
  } else {
    if (
      cells.a1 + cells.b2 + cells.c3 == 'XXX' ||
      cells.a3 + cells.b2 + cells.c1 == 'XXX' ||
      cells.a1 + cells.a2 + cells.a3 == 'XXX' ||
      cells.b1 + cells.b2 + cells.b3 == 'XXX' ||
      cells.c1 + cells.c2 + cells.c3 == 'XXX' ||
      cells.a1 + cells.b1 + cells.b3 == 'XXX' ||
      cells.a2 + cells.b2 + cells.c2 == 'XXX' ||
      cells.a3 + cells.b3 + cells.c3 == 'XXX'
    ) {
      countWinsX++;
      gameOver([messages.gameOver, 'red'],[messages.x_win, 'yellow']);
      return;
    }
    if (
      cells.a1 + cells.b2 + cells.c3 == '000' ||
      cells.a3 + cells.b2 + cells.c1 == '000' ||
      cells.a1 + cells.a2 + cells.a3 == '000' ||
      cells.b1 + cells.b2 + cells.b3 == '000' ||
      cells.c1 + cells.c2 + cells.c3 == '000' ||
      cells.a1 + cells.b1 + cells.b3 == '000' ||
      cells.a2 + cells.b2 + cells.c2 == '000' ||
      cells.a3 + cells.b3 + cells.c3 == '000'
    ) {
      countWinsO++;
      gameOver([messages.gameOver, 'red'],[messages.o_win, 'yellow']);
      return;
    }
  }
}

//=================================================
function gameOver(arrayMessage) {
  gameStatus = 'finished';
  field.removeEventListener('click', putLabel);
  showStatusBox();
  showInfoBox([messages.over, 'yellow']);
  btnPlay.textContent = 'PRESS TO RESTART';
}

function showInfoBox(arrayMessage) {
  gameOverBox.style.top = '150px';
  gameOverBox.style.cursor = 'auto';
  showMessage(arrayMessage)
}

function hideInfoBox() {
  gameOverBox.style.cursor = 'pointer';
  gameOverBox.style.top = '-400px';

}

function showStatusBox() {
  document.querySelector('.score_step').textContent = 'Moves:' + step;
  document.querySelector('.score_x_wins').textContent = 'X wins:' + countWinsX;
  document.querySelector('.score_o_wins').textContent = 'O wins:' + countWinsO;
}

function pauseGame(ev) {
  if (ev.target != gameOverBox) {
    return;
  }
  musicMute = true;
  playMusic()
  field.removeEventListener('click',putLabel)
  gameStatus = 'paused';

  showInfoBox([messages.paused, 'yellow']);
  btnPlay.textContent = 'PRESS TO CONTINUE';
}


function showMessage(arrayMessage){
  const h2 = document.querySor('.game_status');
  arrayMessage.forEach(lineMessage => {
      h2.textContent += lineMessage[0];
      h2.style.color = lineMessage[1]
  });
   
}