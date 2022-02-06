const img_path = './assets/img/';
const svg_path = './assets/svg/';
const audio_path = './assets/audio/';

let isPlaying = false;

var myAudio = document.createElement('audio');
myAudio.src = `${audio_path}forest.mp3`;

const menu = document.querySelector('.menu');
menu.addEventListener('click', selectBirdMenu)

const screen = document.querySelector('.screen')

const playButton = document.querySelector('.play-button');
playButton.addEventListener('click', togglePlay)

const logo = document.querySelector('.logo')
logo.addEventListener('click', () => {
    screen.style.backgroundImage = `url(${img_path}forest.jpg)`
    myAudio.src = `${audio_path}forest.mp3`;
    resetMenu()
    isPlaying = true;
    changePlayButton()
    myAudio.play()

})

function selectBirdMenu() {
    resetMenu()
    event.target.classList.add('selected')
    screen.style.backgroundImage = `url(${img_path}${event.target.dataset.bird}.jpg)`
    myAudio.src = `${audio_path}${event.target.dataset.bird}.mp3`;
    isPlaying = true;
    changePlayButton()
    myAudio.play()

}

function resetMenu() {
    for (const bird of menu.children) {
        if (bird.matches('.selected')) {
            bird.classList.toggle('selected')
        }
    }
}

function togglePlay() {
    isPlaying = !isPlaying;
    changePlayButton()
    switch (isPlaying) {
        case true:
            myAudio.play();
            break;
        case false:
            myAudio.pause();
            break;
        default:
            break;
    }
}

function changePlayButton() {
    playButton.style.backgroundImage = 'url(' + svg_path + (isPlaying ? 'pause.svg' : 'play.svg') + ')';

}