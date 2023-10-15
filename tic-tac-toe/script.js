const timer = document.querySelector('.timer');
let cell = document.querySelectorAll('.cell');
const field = document.querySelector('.field-of-game');
const modalButton = document.getElementById('modal-button');
const windowInfo = document.querySelector('.window-info');
const info = document.querySelector('.info');

modalButton.addEventListener('click', function () {
    windowInfo.style.display = 'none';
});

let intervalTimer;
let intervalFlash;
let time = 59;
let start = false;
let textInfo = '';

field.addEventListener('click', function () {
    if (!start) {
        intervalTimer = setInterval(runTimer, 1000);
        start = true;
    }
});

function runTimer() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    timer.innerHTML = `0${minutes}:${seconds}`;

    if (time === 15) {
        intervalFlash = setInterval(function () {
            timer.classList.toggle('flash');
        }, 500);
    }

    if (time === 0) {
        gameEnd();
    }
    time--;
}

function gameEnd() {
    clearInterval(intervalTimer);
    clearInterval(intervalFlash);
    timer.classList.remove('flash');
    field.classList.add('disable');
    textInfo = 'Your time is over';
    setInfo(textInfo);
}

let step = 0;
let allSteps = 0;
let arrX = [];
let arrO = [];

cell = [...cell];
cell.map((item, index) =>
    item.addEventListener('click', function () {
        function steps() {
            if (step === 0) {
                item.innerHTML = 'x';
                item.classList.add('disable');
                arrX.push(index);
                step++;
                allSteps++;
            } else {
                item.innerHTML = 'o';
                item.classList.add('disable');
                arrO.push(index);
                step--;
                allSteps++;
            }
        }

        if (index <= 2) {
            steps();
        }
        if (index >= 3 && index <= 5) {
            steps();
        }
        if (index >= 6) {
            steps();
        }

        check(arrX, 'X');
        check(arrO, 'O');
    })
);

function check(arr, name) {
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [6, 4, 2],
    ];

    for (let i = 0; i < win.length; i++) {
        let guess = [];
        for (let j = 0; j < arr.length; j++) {
            if (win[i].includes(arr[j])) {
                guess.push(arr[j]);
            }
        }
        if (guess.length === 3) {
            victory(name, allSteps, time, guess);
        }
    }

    if(arrX.length >= 5 || arrO.length >= 5) {
        gameEnd();
        textInfo = 'Draw in the game';
        setInfo(textInfo);
        cell.map((item) => {
            item.classList.add('draw');
        });

    }
}

function victory(name, allSteps, time, guess) {
    clearInterval(intervalTimer);
    gameTime = 59 - time;
    const minutes = Math.floor(gameTime / 60);
    let seconds = gameTime % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    showTime = `0${minutes}:${seconds}`;

    gameEnd()
    textInfo = `Won '${name}' in ${allSteps} moves. Game time: ${showTime}`;
    setInfo(textInfo)

    for (let i = 0; i < cell.length; i++) {
        for (let j = 0; j < guess.length; j++) {
            if ([i].includes(guess[j])) {
                cell[i].classList.add('win');
            }
        }
    };
}

function setInfo(textInfo) {
    modalButton.innerHTML = 'Try again';

    modalButton.addEventListener('click', function () {
        windowInfo.style.display = 'none'
        reset();
    });

    info.innerHTML = textInfo;

    setTimeout(function(){
        windowInfo.style.display = 'flex';
    }, 2000)
}

function reset() {
    cell.map((item) => {
        item.innerHTML = '';
        item.classList.remove('disable');
        item.classList.remove('win');
        item.classList.remove('draw');
    });

    field.classList.remove('disable');
    step = 0;
    allSteps = 0;
    arrX = [];
    arrO = [];
    timer.innerHTML = `01:00`;
    time = 59;
    start = false;
}


// console.log(`
// 1. Вёрстка +10
//     ● реализован интерфейс игры +5 ✅
//     ● в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 ✅
// 2. При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10 ✅
// 3. Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10 ✅
// 4. По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10 ✅
// 5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10 ❌
// 6. Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10 ✅
// 7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 ❌
//     ● высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
// `)
