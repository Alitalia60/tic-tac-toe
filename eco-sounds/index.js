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

getScore()

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


function getScore() {
    console.log("   Ваша отметка - 60 балла(ов)");
    console.log("=====================");
    console.log("1. Вёрстка +10");
    console.log("   есть не меньше пяти интерактивных элементов, с которыми пользователи могут взаимодействовать.\n Изменение внешнего вида самого элемента и состояния курсора при наведении, плавные анимации +5")
    console.log("   в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения,\n логотип курса со ссылкой на курс +5")

    console.log("=====================");
    console.log("2. При кликах по интерактивным элементам меняется изображение +10")
    console.log("=====================");
    console.log("3. При кликах по интерактивным элементам меняется звук +10")
    console.log("=====================");
    console.log("4. Активный в данный момент интерактивный элемент выделяется стилем +10")
    console.log("=====================");
    console.log("5. Кнопка Play/Pause +20")
    console.log("   есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание звука +10")
    console.log("   внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент звук +10")
    }
