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
    myCheckbox = document.getElementById('myCheckbox');

const songs = [
    'Senbeï - Rain by Banzaï Lab',
    'Vandelux - Stimulus',
    'Rivière Monk - Voyage',
    'David Rawlings - Cumberland Gap',
];

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
    // progress.value = (audio.currentTime / audio.duration) * 100
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
    const numberOfDashes = Math.round((clampedProgress / 100) * 8);
    progress.innerHTML = '-'.repeat(numberOfDashes);
}

// function setProgress(event) {
//     const width = this.clientWidth
//     const clickX = event.offsetX
//     const duration = audio.duration
//     audio.currentTime = (clickX / width) * duration
// }
//   progressContainer.addEventListener('click', setProgress)



myCheckbox.addEventListener('change', function () {
    if (myCheckbox.checked) {
        display.style.backgroundColor = 'rgb(5, 71, 252)';
        displayVolume.innerHTML = `Volume: `;
        rangeVolume.innerHTML = '100%';
        playBtn.style.border = '2px solid rgb(5, 133, 252)';
        initSong(songs[songIndex]);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('durationchange', fullTimeFunction);
        audio.addEventListener('timeupdate', setTime);
        audio.addEventListener('ended', nextSong);
        playBtn.disabled = false;
        backBtn.disabled = false;
        forwardBtn.disabled = false;
        volumeBtn.disabled = false;
        myCheckbox.disabled = true;
        playBtn.classList.add('waiting');
        setTimeout(function () {
            myCheckbox.disabled = false;
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
    }, 10);
    backgroundBody.style.backgroundImage = `url('./assets/images/background_default.jpg')`;
    display.style.backgroundColor = 'rgb(46, 46, 46)';
    fullTime.innerHTML = '';
    progress.innerHTML = '';
    rangeVolume.innerHTML = '';
    volumeBtn.disabled = true;
    volumeBtn.value = '100';
    playBtn.style.border = '2px solid rgb(34, 34, 34)';
    playBtn.classList.remove('waiting');
    myCheckbox.disabled = true;
    cover.classList.add('start');

    setTimeout(function () {
        playBtn.disabled = true;
        backBtn.disabled = true;
        forwardBtn.disabled = true;
        myCheckbox.disabled = false;
    }, 2000);
}
greetings();
