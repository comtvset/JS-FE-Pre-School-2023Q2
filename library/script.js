import bookInfo from './books.js';

//BURGER
const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const profile = document.querySelector('.profile');
const header = document.querySelector('header');
const overlay = document.createElement('div');
let burgerItems = document.querySelectorAll('.inter');

overlay.classList.add('overlay');
header.appendChild(overlay);
burger.addEventListener('click', activeBurger);
overlay.addEventListener('click', deactiveBurger);


burgerItems = [...burgerItems];
if (Array.isArray(burgerItems)) {
    burgerItems.map((item) => item.addEventListener('click', deactiveBurger));
} else {
    console.log("error: burgerItems is not an array!");
}


function activeBurger() {
    burger.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    profile.classList.toggle('active');
    header.classList.add('active');
    bodyLock();
}

function deactiveBurger() {
    burger.classList.remove('active');
    burgerMenu.classList.remove('active');
    profile.classList.remove('active');
    header.classList.remove('active');
    bodyUnlock();
}

function bodyLock() {
    document.body.classList.toggle('lock');
}

function bodyUnlock() {
    document.body.classList.remove('lock');
}


//SLIDER
const select1 = document.getElementById('select_1');
const select2 = document.getElementById('select_2');
const select3 = document.getElementById('select_3');
const select4 = document.getElementById('select_4');
const select5 = document.getElementById('select_5');
const slide = document.querySelector('.slide');
const check = document.querySelector('.new-radio');
const left = document.querySelector('.caret-left');
const right = document.querySelector('.caret-right');

function updateScreen() {
    const screenWidth = window.innerWidth;
    slide.style.left = '0px';
    check.checked = true;
    let count = 0;

    left.style.opacity = '0.5';
    right.style.opacity = '1';

    function opacity(count) {
        if(count == 0) {
            left.style.opacity = '0.5';
            right.style.opacity = '1';
        }
        if(count > 1) {
            left.style.opacity = '1';
            right.style.opacity = '1';
        }
        if(count > 2196) {
            left.style.opacity = '1';
            right.style.opacity = '0.5';
        }
    }

    select1.addEventListener('click', () => {
        slide.style.left = '0px';
        count = 0;
        opacity(count);
        });

    select2.addEventListener('click', () => {
        if (screenWidth >= 1440) {
            slide.style.left = '-475px';
        }
        if (screenWidth >= 1341 && screenWidth <= 1439) {
            slide.style.left = '-525px';
        }
        if (screenWidth <= 1340) {
            slide.style.left = '-732px';
            count = 732;
        }
        opacity(count);
      });

    select3.addEventListener('click', () => {
        if (screenWidth >= 1440) {
            slide.style.left = '-950px';
        }
        if (screenWidth >= 1341 && screenWidth <= 1439) {
            slide.style.left = '-1049px';
        }
        if (screenWidth <= 1340) {
            slide.style.left = '-1464px';
            count = 1464;
        }
        opacity(count);
    });

    select4.addEventListener('click', () => {
        if (screenWidth >= 1341 && screenWidth <= 1439) {
            slide.style.left = '-1575px';
        }
        if (screenWidth <= 1340) {
            slide.style.left = '-2196px';
            count = 2196;
        }
        opacity(count);
    });

    select5.addEventListener('click', () => {
        if (screenWidth <= 1340) {
            slide.style.left = '-2928px';
            count = 2928;
        }
        opacity(count);
    });

    right.addEventListener('click', () => {
        if(count < 2928) {
            for (let i = 0; i < 1; i++) {
                count += 732;
                slide.style.left = `-${count}px`;
                if(count == 732) {
                    select2.checked = true;
                    right.style.opacity = '1';
                }
                if(count == 1464) {
                    select3.checked = true;
                }
                if(count == 2196) {
                    select4.checked = true;
                }
                if(count == 2928) {
                    select5.checked = true;
                }
            }
            opacity(count);
        }
    });

    left.addEventListener('click', () => {
        if(count != 0) {
            for (let i = 0; i < 1; i++) {
                count -= 732;
                slide.style.left = `-${count}px`;
                if(count == 0) {
                    select1.checked = true;
                }
                if(count == 732) {
                    select2.checked = true;
                }
                if(count == 1464) {
                    select3.checked = true;
                }
                if(count == 2196) {
                    select4.checked = true;
                }
                if(count == 2928) {
                    select5.checked = true;
                }
            }
            opacity(count);
        }
    });

  }
updateScreen();
window.addEventListener('resize', updateScreen);

//SEASON
const book = document.querySelectorAll('.book');
const bookTitle = document.querySelectorAll('.book_title');
const author = document.querySelectorAll('.author');
const discription = document.querySelectorAll('.discription');

const winter = document.getElementById('winter');
const spring = document.getElementById('spring');
const summer = document.getElementById('summer');
const autumn = document.getElementById('autumn');

const disabled = document.querySelector('.gold-btn');

let entries = Object.entries(bookInfo);
const setTime = '200';

function seasons (countIMG, count) {
    for (let i = 0; i < book.length; i++) {
        book[i].style.opacity = '0';
        setTimeout(() => {
            book[i].children[1].firstElementChild.attributes[0].value = `./assets/image/book_${countIMG++}.png`
        }, setTime);
        setTimeout(() => {
            book[i].style.opacity = '1';
        }, setTime);
    }
    setTimeout(() => {
        for (let i = 0; i < bookTitle.length; i++) {
            bookTitle[i].innerHTML = entries[count][1].title;
            author[i].innerHTML = entries[count][1].author;
            discription[i].childNodes[1].innerHTML = entries[count][1].discription;
            count++;
        }
    }, setTime);
}

function addButton() {
    setTimeout(() => {
        disabled.setAttribute('disabled', 'disabled');
        disabled.innerHTML = 'Own';
        disabled.classList.add('gold-btn');
    }, setTime);
}

function removeButton() {
    setTimeout(() => {
        disabled.removeAttribute('disabled');
        disabled.innerHTML = 'Buy';
        disabled.classList.remove('gold-btn');
    }, setTime);
}
removeButton();

winter.addEventListener('click', function(event) {
    event.target.setAttribute('disabled', 'disabled');
    spring.removeAttribute('disabled');
    summer.removeAttribute('disabled');
    autumn.removeAttribute('disabled');
    seasons(1, 0);
    // addButton();
    removeButton();
});
spring.addEventListener('click', function(event) {
    event.target.setAttribute('disabled', 'disabled');
    winter.removeAttribute('disabled');
    summer.removeAttribute('disabled');
    autumn.removeAttribute('disabled');
    seasons(5, 4);
    // addButton();
    removeButton();
});
summer.addEventListener('click', function(event) {
    event.target.setAttribute('disabled', 'disabled');
    spring.removeAttribute('disabled');
    winter.removeAttribute('disabled');
    autumn.removeAttribute('disabled');
    seasons(9, 8);
    removeButton();
});
autumn.addEventListener('click', function(event) {
    event.target.setAttribute('disabled', 'disabled');
    spring.removeAttribute('disabled');
    summer.removeAttribute('disabled');
    winter.removeAttribute('disabled');
    seasons(13, 12);
    removeButton();
});

const seasonsContainer = document.querySelector('.seasons-container');

window.addEventListener('scroll', () => {
    const position = seasonsContainer.getBoundingClientRect();
    changeColor(position)
  });

  function changeColor(position) {
    const screenWidth = window.innerWidth;
    if(screenWidth <= 768) {
        if (position.top <= 10) {
            seasonsContainer.style.backgroundColor = 'rgba(187, 148, 95, 0.8)';
        } else {
            seasonsContainer.style.backgroundColor = 'transparent';
        }
    }
    if(screenWidth > 768) {
        seasonsContainer.style.backgroundColor = 'transparent';
    }
}





console.log(
    `
     Этап 1: Пользователь не зарегистрирован
      Ограниченная карусель в блоке About:
      - Карусель реагирует на нажатие кнопок (кнопки под каруселью и стрелочки слева и справа в мобильной версии) и происходит анимация перелистывания. +15 ✅
      - На экране шириной 1440px проверяем, чтобы было доступно 2 других скрытых картинки. При каждом нажатии выезжает следующая, и так до границ справа и слева. +2 ✅
      - Выделенные кнопки под каруселью (имеется ввиду кнопка соответствующая активному слайду и которая имеет коричневый цвет) - неактивные. +2 ✅
      - Если анимация карусели не успела завершиться, при этом нажата была следующая кнопка, то картинка не должна зависнуть в промежуточном состоянии. +2 🤪
      - На экране шириной 768px проверяем, чтобы было доступно 2 других скрытых картинки. Для этого меняем разрашение и перезагружаем страницу. Теперь доступных перемещений становится 5. +2 ✅
      - Неактивными становятся не только выделенные кнопки, но и стрелочки на границах карусели. +2 ✅
      Слайдер в блоке Favorites
      - Слайдер реагирует на нажатие кнопок панели навигации и происходит анимация затухания и проявления. +15 ✅
      - На любой ширине экрана все 4 карточки с книгами одновременно будут плавно затухать, а затем плавно проявляться следующие. +2 ✅
      - Анимация может быть прервана следующим нажатием на кнопку выбора поры года, но при этом анимация не должна застывать в промежуточном состояни. Должна отрабатывать до конца. +2 🤪
      - Во время анимаций высота блока Favorites не должна меняться. +2
      - Панель навигации слайдера сделана по технологии "styicky" для разрешений с одним рядом книг (768px и меньше), т.е. опускается вниз вместе скроллом страницы, прилипая к верхней части экрана, в рамках блока Favorites. +2 ✅
      До регистрации
      - Нажатие на кнопку Check the card ни к чему не приведет. ✅
      До авторизации
      - Иконка юзера в хедере отображается в виде силуэта. ✅
      - В блоке Favorites все кнопки должны иметь имя Buy, а не Own. +2 ✅
     `
)