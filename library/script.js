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