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

// const target = document.querySelector('body');
// target.addEventListener('click', function(event) {
//     console.dir(event.target);
// });


//SLIDER
const select1 = document.getElementById('select_1');
const select2 = document.getElementById('select_2');
const select3 = document.getElementById('select_3');
const select4 = document.getElementById('select_4');
const select5 = document.getElementById('select_5');
const slide = document.querySelector('.slide');
const check = document.querySelector('.new-radio');

function updateScreen() {
    const screenWidth = window.innerWidth;
    slide.style.left = '0px';
    check.checked = true;

    select1.addEventListener('click', () => {
        slide.style.left = '0px';
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
        }
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
        }
    });

    select4.addEventListener('click', () => {
        if (screenWidth >= 1341 && screenWidth <= 1439) {
            slide.style.left = '-1575px';
        }
        if (screenWidth <= 1340) {
            slide.style.left = '-2196px';
        }
    });

    select5.addEventListener('click', () => {
        if (screenWidth <= 1340) {
            slide.style.left = '-2928px';
        }
    });
  }
  updateScreen();
  window.addEventListener('resize', updateScreen);


// console.log(
//     `
//     1. Вёрстка соответствует макету. Ширина экрана 768px +26.
//         - блок <header> +2
//         - секция Welcome +2
//         - секция About +2
//         - секция Favorites +4
//         - секция CoffeShop +4
//         - секция Contacts +4
//         - секция LibraryCard +4
//         - блок <footer> + 2
//     2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12
//         - нет полосы прокрутки при ширине страницы от 1440рх до 640рх +4
//         - элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх +4
//         - элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх +4
//         - !!!все что будет происходить на ширине свыше 1440px - не оценивается!!!
//     3. На ширине экрана 768рх реализовано адаптивное меню +12 (Рекомендуется сделать появление бургер-меню на ширине 1024px):
//         - при нажатии на бургер-иконку плавно появляется адаптивное меню +4
//         - при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +4
//         - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается +4
//     `
// )