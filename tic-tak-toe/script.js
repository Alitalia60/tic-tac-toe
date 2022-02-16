const field = document.getElementById('field');
let gameIsRunning = false;
let step = 0;
let move = '0';
const cells = {
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    c1: '',
    c2: '',
    c3: ''
};

// const url = './assets/audio/preview.mp3';
backgroundMusic.volume = 0.2;


const click = new Audio('/tic-tak-toe/assets/audio/click.wav');

function playGame() {
    gameIsRunning = true
    field.addEventListener('click', putLabel);
    step = 0;
    move = 0;
}

window.onload = function() {
    const playPromise = document.querySelector('.background_music').play();
    if (condition) {

    }
    backgroundMusic.play()
    console.log('loaded');
}

function putLabel(e) {
    if (e.target.classList.contains('cell')) {
        click.play()
        step++;
        let cell = e.target;
        if (cell.textContent == '') {

            if (move == '0') {
                cell.style.backgroundColor = 'green';
                cells[cell.id] = '0';
                cell.style.transform = 'rotateX(180deg)'
            } else {
                cell.style.backgroundColor = 'red'
                cells[cell.id] = 'X'
                cell.style.transform = 'rotateZ(180deg)'
                cell.style.transform = 'rotateY(180deg)'
                    // cell.style.transform = 'rotateX(180deg)'

            }
            move = move == '0' ? 'X' : '0'
                // console.log(cells[cell.id]);

        }
        if (step >= 9) {
            gameIsRunning = false;
            field.removeEventListener('click', putLabel);
            console.log('no winner');
            return;
        }
        checkWinner()
    }
}

function checkWinner() {
    if ((cells.a1 + cells.b2 + cells.c3 == 'XXX') || (cells.a3 + cells.b2 + cells.c1 == 'XXX') ||
        (cells.a1 + cells.a2 + cells.a3 == 'XXX') || (cells.b1 + cells.b2 + cells.b3 == 'XXX') || (cells.c1 + cells.c2 + cells.c3 == 'XXX') ||
        (cells.a1 + cells.b1 + cells.b3 == 'XXX') || (cells.a2 + cells.b2 + cells.c2 == 'XXX') || (cells.a3 + cells.b3 + cells.c3 == 'XXX')) {
        gameIsRunning = false;
        field.removeEventListener('click', putLabel);
        console.log('X - winner');
        return
    }
    if ((cells.a1 + cells.b2 + cells.c3 == '000') || (cells.a3 + cells.b2 + cells.c1 == '000') ||
        (cells.a1 + cells.a2 + cells.a3 == '000') || (cells.b1 + cells.b2 + cells.b3 == '000') || (cells.c1 + cells.c2 + cells.c3 == '000') ||
        (cells.a1 + cells.b1 + cells.b3 == '000') || (cells.a2 + cells.b2 + cells.c2 == '000') || (cells.a3 + cells.b3 + cells.c3 == '000')) {
        gameIsRunning = false;
        field.removeEventListener('click', putLabel);
        console.log('0 - winner');
        return;
    }
}

playGame()