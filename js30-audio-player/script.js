const backgroundBody = document.body,
    player = document.querySelector('.player'),
    playBtn = document.querySelector('.play-btn'),
    backBtn = document.querySelector('.back-btn'),
    forwardBtn = document.querySelector('.forward-btn'),
    audio = document.querySelector('.audio'),
    titel = document.querySelector('.title-song'),
    cover = document.querySelector('.cover-img'),
    tonearm = document.querySelector('.tonearm-img'),
    timeProgress = document.querySelector('.time-progress'),
    fullTime = document.querySelector('.time-full'),
    rangeVolume = document.querySelector('.range-volume'),
    progress = document.querySelector('.progress'),
    display = document.querySelector('.display'),
    displayVolume = document.querySelector('.display-volume'),
    volumeBtn = document.querySelector('.volume'),
    myCheckbox = document.getElementById('myCheckbox'),
    welcome = document.querySelector('.welcome');

const songs = [
    'Senbeï - Rain by Banzaï Lab',
    'Vandelux - Stimulus',
    'Rivière Monk - Voyage',
    'David Rawlings - Cumberland Gap',
];

let flag = true;

const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const audioContext = new window.AudioContext();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);

source.connect(analyser);
analyser.connect(audioContext.destination);

analyser.fftSize = 128;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const barWidth = (canvas.width / bufferLength) * 1.5;
let barHeight;
let x = 0;

function draw() {
    x = 0;
    analyser.getByteFrequencyData(dataArray);

    if (flag) {
        ctx.fillStyle = 'rgb(5, 71, 252)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = 'rgb(46, 46, 46)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 0.4;

        if (flag) {
        ctx.fillStyle = `rgb(220, 220, 220)`;
    } else {
        ctx.fillStyle = `rgb(46, 46, 46)`;
    }

        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);

        x += barWidth + 2;
    }

    requestAnimationFrame(draw);
}


setTimeout(function () {
    player.style.opacity = '1';
    welcome.style.opacity = '0';
    welcome.style.zIndex = '-1';
}, 2000);

function getRotationDegrees(matrix) {
    let angle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
}

function rotation() {
    let transformValue = window
        .getComputedStyle(cover, null)
        .getPropertyValue('transform');
    let transformMatrix = new DOMMatrix(transformValue);
    let rotationDegrees = getRotationDegrees(transformMatrix);

    return rotationDegrees;
}

let handler = true;

function disableButton() {
    playBtn.disabled = true;
    backBtn.disabled = true;
    forwardBtn.disabled = true;
    handler = false;

    setTimeout(enableButton, 2000);
}

function enableButton() {
    playBtn.disabled = false;
    backBtn.disabled = false;
    forwardBtn.disabled = false;
    handler = true;
}

document.querySelector('#volume').oninput = volume;

function volume() {
    let value = this.value;
    audio.volume = value / 100;
    rangeVolume.innerHTML = `${this.value}%`;
}

let songIndex = 0;

function initSong(song) {
    titel.innerHTML = song;
    audio.src = `./assets/audio/${song}.mp3`;
    backgroundBody.style.backgroundImage = `url(./assets/images/background_${
        songIndex + 1
    }.jpg)`;
}

function playSong() {
    disableButton();
    player.classList.add('play');
    tonearm.classList.add('play');
    tonearm.classList.remove('stop');
    playBtn.classList.remove('waiting');

    audioContext.resume().then(() => {
        draw();
    });

    myCheckbox.disabled = true;

    setTimeout(function () {
        myCheckbox.disabled = false;
    }, 2000);

    setTimeout(function () {
        cover.classList.add('active');
        audio.play();
    }, 2000);
}

function pauseSong() {
    disableButton();
    player.classList.remove('play');
    tonearm.classList.add('stop');
    tonearm.classList.remove('play');
    audio.pause();
    playBtn.classList.add('waiting');
    cancelAnimationFrame(draw);
}

function nextSong() {
    if (!handler) {
        return;
    } else {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }

        disableButton();
        myCheckbox.disabled = true;

        setTimeout(function () {
            myCheckbox.disabled = false;
        }, 4000);

        if (player.classList.contains('play')) {
            pauseSong();
            setTimeout(function () {
                initSong(songs[songIndex]);
                playSong();
            }, 2000);
        } else {
            initSong(songs[songIndex]);
            playSong();
        }
    }
}
forwardBtn.addEventListener('click', nextSong);

function backSong() {
    if (!handler) {
        return;
    } else {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }

        disableButton();
        myCheckbox.disabled = true;

        setTimeout(function () {
            myCheckbox.disabled = false;
        }, 4000);

        if (player.classList.contains('play')) {
            pauseSong();
            setTimeout(function () {
                initSong(songs[songIndex]);
                playSong();
            }, 2000);
        } else {
            initSong(songs[songIndex]);
            playSong();
        }
    }
}
backBtn.addEventListener('click', backSong);

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

function setTime() {
    let minutes = Math.floor(audio.currentTime / 60);
    if (minutes < 10) {
        minutes = '0' + String(minutes);
    }

    let seconds = Math.floor(audio.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + String(seconds);
    }

    timeProgress.innerHTML = `${minutes}:${seconds}`;
}

function fullTimeFunction() {
    let minutes = Math.floor(audio.duration / 60);
    if (minutes < 10) {
        minutes = '0' + String(minutes);
    }
    let seconds = Math.floor(audio.duration % 60);
    if (seconds < 10) {
        seconds = '0' + String(seconds);
    }
    fullTime.innerHTML = `${minutes}:${seconds}`;
}

function updateProgress(event) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    const clampedProgress = Math.min(Math.max(progressPercent, 0), 100);
    const numberOfDashes = Math.round((clampedProgress / 100) * 27);
    progress.innerHTML = '|'.repeat(numberOfDashes);
}

function setProgress(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

progress.addEventListener('click', setProgress);

myCheckbox.addEventListener('change', function () {
    if (myCheckbox.checked) {
        display.style.backgroundColor = 'rgb(5, 71, 252)';
        displayVolume.innerHTML = `Volume: `;
        rangeVolume.innerHTML = '100%';
        playBtn.style.border = '2px solid rgb(5, 133, 252)';
        playBtn.style.color = 'rgb(255, 255, 255)';
        backBtn.style.color = 'rgb(255, 255, 255)';
        forwardBtn.style.color = 'rgb(255, 255, 255)';

        initSong(songs[songIndex]);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('durationchange', fullTimeFunction);
        audio.addEventListener('timeupdate', setTime);
        audio.addEventListener('ended', nextSong);

        setTimeout(function () {
            playBtn.disabled = false;
            backBtn.disabled = false;
            forwardBtn.disabled = false;
        }, 2000);

        volumeBtn.disabled = false;
        myCheckbox.disabled = true;

        flag = true;
        audioContext.resume().then(() => {
            draw();
        });

        setTimeout(function () {
            myCheckbox.disabled = false;
            playBtn.classList.add('waiting');
        }, 2000);
    } else {
        greetings();
        let angle = rotation();
        cover.classList.remove('active');
        cover.style.transform = `rotate(${angle}deg)`;
    }
});

function greetings() {
    pauseSong();
    setTimeout(function () {
        // titel.innerHTML = 'He! Do you want to listen music?';
        // displayVolume.innerHTML = 'do it right';
        // timeProgress.innerHTML = 'now, turn "on"';
        titel.innerHTML = '';
        displayVolume.innerHTML = '';
        timeProgress.innerHTML = '';
        progress.innerHTML = '';
    }, 10);
    backgroundBody.style.backgroundImage = `url('./assets/images/background_default.jpg')`;
    display.style.backgroundColor = 'rgb(46, 46, 46)';
    fullTime.innerHTML = '';
    rangeVolume.innerHTML = '';
    volumeBtn.disabled = true;
    volumeBtn.value = '100';
    playBtn.style.border = '2px solid rgb(137, 0, 0)';
    playBtn.classList.remove('waiting');
    myCheckbox.disabled = true;
    cover.classList.add('start');
    flag = false;
    audioContext.resume().then(() => {
        draw();
    });

    setTimeout(function () {
        playBtn.disabled = true;
        backBtn.disabled = true;
        forwardBtn.disabled = true;
        myCheckbox.disabled = false;
        playBtn.style.border = '2px solid rgb(34, 34, 34)';
        playBtn.style.color = 'rgb(82, 82, 82)';
        backBtn.style.color = 'rgb(82, 82, 82)';
        forwardBtn.style.color = 'rgb(82, 82, 82)';
    }, 2000);
}
greetings();

console.log(`
1. Вёрстка +10
    ● вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков,
      прогресс-бар, отображается название и автор трека +5 ✅
    ● в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 ✅
2. Кнопка Play/Pause +10
    ● есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5 ✅
    ● внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5 ✅
3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10 ✅
4. При смене аудиотрека меняется изображение - обложка аудиотрека +10 ✅
5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10 ✅
6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10 ✅
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 ✅
    ● высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо`);
