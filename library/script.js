const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const profile = document.querySelector('.profile');
const header = document.querySelector('header');
const burgerItems = document.querySelector('.burger-items');
const overlay = document.createElement('div');

overlay.classList.add('overlay');
header.appendChild(overlay);
burger.addEventListener('click', activeBurger);
overlay.addEventListener('click', deactiveBurger);
burgerItems.addEventListener('click', deactiveBurger);


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

console.log(
    `
    1. Вёрстка соответствует макету. Ширина экрана 768px +26.
        - блок <header> +2
        - секция Welcome +2
        - секция About +2
        - секция Favorites +4
        - секция CoffeShop +4
        - секция Contacts +4
        - секция LibraryCard +4
        - блок <footer> + 2
    2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12
        - нет полосы прокрутки при ширине страницы от 1440рх до 640рх +4
        - элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх +4
        - элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх +4
        - !!!все что будет происходить на ширине свыше 1440px - не оценивается!!!
    3. На ширине экрана 768рх реализовано адаптивное меню +12 (Рекомендуется сделать появление бургер-меню на ширине 1024px):
        - при нажатии на бургер-иконку плавно появляется адаптивное меню +4
        - при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +4
        - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается +4
    `
)