const burger = document.querySelector('.burger');

burger.addEventListener('click', activeBurger);

function activeBurger() {
    burger.classList.toggle('active');
}
