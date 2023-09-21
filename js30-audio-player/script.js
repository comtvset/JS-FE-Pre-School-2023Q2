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
    rangeVolume = document.querySelector('.range-volume');

const songs = ['David Rawlings - Cumberland Gap', 'Rivière Monk - Voyage'];

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
initSong(songs[songIndex]);

function playSong() {
    disableButton();
    player.classList.add('play');
    tonearm.classList.add('play');
    tonearm.classList.remove('stop');

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
audio.addEventListener('timeupdate', setTime);

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
audio.addEventListener('durationchange', fullTimeFunction);
