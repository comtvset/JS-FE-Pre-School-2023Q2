import bookInfo from './books.js';

document.addEventListener('DOMContentLoaded', function() {
    let userLogin = localStorage.getItem('login');

//BURGER
const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
let profile = document.querySelectorAll('.profile');
const header = document.querySelector('header');
const overlay = document.createElement('div');
let burgerItems = document.querySelectorAll('.inter');

overlay.classList.add('overlay');
header.appendChild(overlay);

let stateBurger = false;

burger.addEventListener('click', function() {
    if(stateBurger == false) {
        activeBurger();
        stateBurger = true;
    } else {
        deactiveBurger();
        stateBurger = false;
    }
});
overlay.addEventListener('click', function() {
    deactiveBurger();
    stateBurger = false;
});


burgerItems = [...burgerItems];
if (Array.isArray(burgerItems)) {
    burgerItems.map((item) => item.addEventListener('click', function() {
        deactiveBurger();
        stateBurger = false;
    }))
} else {
    console.log("error: burgerItems is not an array!");
}

profile = [...profile];

function activeBurger() {
    burger.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    profile.map((item) => item.classList.toggle('active'));
    header.classList.add('active');
    divUser.classList.remove('active');
    bodyLock();
    if (!windowUser.classList.contains('hidden-start') && !windowUser.classList.contains('hidden')) {
        deactiveRegWindow();
        state = false;
    }
}

function deactiveBurger() {
    burger.classList.remove('active');
    burgerMenu.classList.remove('active');
    profile.map((item) => item.classList.remove('active'));
    header.classList.remove('active');
    bodyUnlock();
}

function bodyLock() {
    document.body.classList.add('lock');
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
    left.style.cursor = 'default';

    function opacity(count) {
        if(count == 0) {
            left.style.opacity = '0.5';
            right.style.opacity = '1';
            left.style.cursor = 'default';
        }
        if(count > 1) {
            left.style.opacity = '1';
            right.style.opacity = '1';
            left.style.cursor = 'pointer';
            right.style.cursor = 'pointer';
        }
        if(count > 2196) {
            left.style.opacity = '1';
            right.style.opacity = '0.5';
            right.style.cursor = 'default';
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

//---
const iconSvg = document.getElementById('icon_svg');
const iconRegUser = document.getElementById('icon-reg-user');
//---


//SEASON
const book = document.querySelectorAll('.book');
const bookTitle = document.querySelectorAll('.book_title');
const author = document.querySelectorAll('.author');
const discription = document.querySelectorAll('.discription');

const winter = document.getElementById('winter');
const spring = document.getElementById('spring');
const summer = document.getElementById('summer');
const autumn = document.getElementById('autumn');

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

winter.addEventListener('click', function(event) {
    event.target.setAttribute('disabled', 'disabled');
    spring.removeAttribute('disabled');
    summer.removeAttribute('disabled');
    autumn.removeAttribute('disabled');
    seasons(1, 0);
    setTimeout(() => {
        checkButton();
    }, 300);

});
spring.addEventListener('click', function(event) {
    event.target.setAttribute('disabled', 'disabled');
    winter.removeAttribute('disabled');
    summer.removeAttribute('disabled');
    autumn.removeAttribute('disabled');
    seasons(5, 4);
    setTimeout(() => {
        checkButton();
    }, 300);
});
summer.addEventListener('click', function(event) {
    event.target.setAttribute('disabled', 'disabled');
    spring.removeAttribute('disabled');
    winter.removeAttribute('disabled');
    autumn.removeAttribute('disabled');
    seasons(9, 8);
    setTimeout(() => {
        checkButton();
    }, 300);
});
autumn.addEventListener('click', function(event) {
    event.target.setAttribute('disabled', 'disabled');
    spring.removeAttribute('disabled');
    summer.removeAttribute('disabled');
    winter.removeAttribute('disabled');
    seasons(13, 12);
    setTimeout(() => {
        checkButton();
    }, 300);
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

//MENU AUTHORISATION
const windowUser = document.createElement('div');
const divUser = document.querySelector('.icon-user');
divUser.appendChild(windowUser);
windowUser.classList.add('registration-window');
windowUser.classList.add('hidden-start');
const windowUserOneField = document.createElement('div');
const windowUserTwoField = document.createElement('div');
const login = document.createElement('div');
const register = document.createElement('div');
windowUser.appendChild(windowUserOneField);
windowUser.appendChild(windowUserTwoField);
windowUser.appendChild(login);
windowUser.appendChild(register);
windowUserOneField.classList.add('one-field');
windowUserTwoField.classList.add('two-field');
login.classList.add('other-field');
login.setAttribute('id', 'login');
register.classList.add('other-field');
register.setAttribute('id', 'register');
windowUserOneField.innerHTML = 'Profile';
login.innerHTML = 'Log In';
register.innerHTML = 'Register';
const overlayTransparent = document.createElement('div');
overlayTransparent.classList.add('overlay-transparent');
header.appendChild(overlayTransparent);
let state = false;

function activeRegWindow() {
    windowUser.classList.add('visible');
    windowUser.classList.remove('hidden-start');
    windowUser.classList.remove('hidden');
    divUser.classList.add('active');

    setTimeout(() => {
        windowUserOneField.classList.remove('disabled-display');
        windowUserTwoField.classList.remove('disabled-display');
        login.classList.remove('disabled-display');
        register.classList.remove('disabled-display');
    }, 700);

    windowUserOneField.classList.add('disabled-display');
    windowUserTwoField.classList.add('disabled-display');
    login.classList.add('disabled-display');
    register.classList.add('disabled-display');
    profile.map((item) => item.classList.add('disabled-pointer'));
}

function deactiveRegWindow() {
    windowUser.classList.add('hidden');
    windowUser.classList.remove('visible');
    divUser.classList.remove('active');

    windowUserOneField.classList.add('disabled-display');
    windowUserTwoField.classList.add('disabled-display');
    login.classList.add('disabled-display');
    register.classList.add('disabled-display');
    profile.map((item) => item.classList.remove('disabled-pointer'));
}

//CLICK

divUser.addEventListener('click', function() {
    if(state == false) {
        activeRegWindow();
        state = true;
    } else {
        deactiveRegWindow();
        state = false;
    }
});

divUser.addEventListener('click', deactiveBurger);

overlayTransparent.addEventListener('click', function() {
    deactiveRegWindow();
    state = false;
});

//MODAL WINDOWS
const modalLogIn = document.querySelector('.modal-log-in');
const modalRegister = document.querySelector('.modal-register');
const modalWindows = document.querySelector('.modal-windows');
modalLogIn.classList.add('hidden-modal-start');
modalRegister.classList.add('hidden-modal-start');
const main = document.querySelector('main');
const overlayModal = document.createElement('div');
overlayModal.classList.add('overlay');
main.appendChild(overlayModal);
let cross = document.querySelectorAll('.cross');

const loginMain = document.getElementById('log-in-main');
const signUpMain = document.getElementById('sign-up-main');
const loginModal = document.getElementById('log-in-modal');
const signUpModal = document.getElementById('sign-up-modal');

let condition = true;

login.addEventListener('click', function() {
    if(condition == true) {
        choiceModal(modalLogIn);
        bodyLock();
        // console.log('I press: Log In')
    } else {
        // console.log('I press: My profile')
        openMyProfile();
        bodyLock();
    }
});

register.addEventListener('click', function() {
    if(condition == true) {
        choiceModal(modalRegister);
        bodyLock();
        // console.log('I press: Register')
    } else {
        // console.log('I press: Log Out')
        noAuthorisation();
        deactiveRegWindow();
    }
});


loginMain.addEventListener('click', function() {
    if(condition == true) {
        choiceModal(modalLogIn);
        bodyLock();
    } else {
        // console.log('I press: Profile')
        openMyProfile();
        bodyLock();
    }

});
signUpMain.addEventListener('click', function() {
    choiceModal(modalRegister);
    bodyLock();
});

loginModal.addEventListener('click', function() {
    choiceModal(modalLogIn, off);
    bodyLock();
});
signUpModal.addEventListener('click', function() {
    choiceModal(modalRegister, off);
    bodyLock();
});



let off = 0;

function choiceModal(el, off) {
    el.classList.add('visible-modal');
    overlayModal.style.zIndex = '3';
    toggleModal(el);


    if(off == 0) {
        if(el === modalLogIn) {
            overlayModal.style.zIndex = '3';
            toggleModal(modalRegister);
            modalWindows.classList.add('active');
        }
        if(el === modalRegister) {
            overlayModal.style.zIndex = '3';
            toggleModal(modalLogIn);
            modalWindows.classList.add('active');
        }
    }

    function toggleModal(event) {
        if(event.classList.contains('hidden-modal-start')) {
            event.classList.remove('hidden-modal-start');
            event.classList.add('visible-modal');
            modalWindows.classList.add('active');
            windowUser.classList.remove('active');
            deactiveRegWindow();
        }
        else if(event.classList.contains('hidden-modal')) {
            openModal(event)
        }
        else if(event.classList.contains('visible-modal')) {
            closeModal(event)
        }

        function openModal(event) {
            event.classList.remove('hidden-modal');
            event.classList.add('visible-modal');
            modalWindows.classList.add('active');
            windowUser.classList.remove('active');
            deactiveRegWindow();
        }

        function closeModal() {
            event.classList.add('hidden-modal');
            event.classList.remove('visible-modal');
            modalWindows.classList.remove('active');
            windowUser.classList.remove('active');
            deactiveRegWindow();
            resetForm();
        }
    }
}

overlayModal.addEventListener('click', function() {
    if(modalLogIn.classList.contains('visible-modal')) {
        choiceModal(modalLogIn);
        overlayModal.style.zIndex = '-1';
        bodyUnlock();
    }
    if(modalRegister.classList.contains('visible-modal')) {
        choiceModal(modalRegister);
        overlayModal.style.zIndex = '-1';
        bodyUnlock();
    }
    else {
        closeMyProfile();
        closeBuyCard();
    }
});

cross = [...cross];
if (Array.isArray(cross)) {
    cross.map((item) => item.addEventListener('click', function() {
        if(modalLogIn.classList.contains('visible-modal')) {
            choiceModal(modalLogIn);
            overlayModal.style.zIndex = '-1';
            bodyUnlock();
        }
        if(modalRegister.classList.contains('visible-modal')) {
            choiceModal(modalRegister);
            overlayModal.style.zIndex = '-1';
            bodyUnlock();
        } else {
            overlayModal.style.zIndex = '-1';
            closeBuyCard();
        }
    }));
}


//RESET FORM AFTER CLOSE
let form = document.querySelectorAll('.form');
function resetForm() {
    form = [...form];
    form.map((item) => item.reset());
}


//SUBMIT TO LOCALSTAGE
let user = {};
const formReg = document.getElementById('form-reg');
let bycard = '';

formReg.addEventListener("submit", function(event) {
    const range = '0123456789ABCDEF';
    let randomNumber = '';
    for (let i = 0; i < 9; i++) {
        const element = range[Math.floor(Math.random() * 16)];
        randomNumber += element;
    }

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email-reg').value;
    const password = document.getElementById('password-reg').value;
    event.preventDefault();
    user.name = firstName;
    user.lastname = lastName;
    user.email = email;
    user.password = password;
    user.number = randomNumber;
    user.books = {};
    bycard = false;

    localStorage.setItem('bycard', JSON.stringify(bycard));
    localStorage.setItem('user', JSON.stringify(user));

    alert('Registration successful');

    if(modalRegister.classList.contains('visible-modal')) {
        modalRegister.classList.add('hidden-modal');
        modalRegister.classList.remove('visible-modal');
        modalWindows.classList.remove('active');
        windowUser.classList.remove('active');
        overlayModal.style.zIndex = '-1';
        bodyUnlock();
    }

    authorisation();
})

//LIBRARY CARD
const userFullName = document.getElementById('user-full-name');
const cardNumber = document.getElementById('card-number');
const buttonCheckCard = document.getElementById('check-card');
const yourCard = document.querySelector('.your-card');
const infoUserByCard = document.createElement('div');
yourCard.appendChild(infoUserByCard);
infoUserByCard.classList.add('info-user-by-card');
infoUserByCard.style.display = 'none';

for (let i = 0; i < 3; i++) {
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');
    infoUserByCard.appendChild(iconContainer);
    const titleInfo = document.createElement('span');
    iconContainer.appendChild(titleInfo);
    titleInfo.classList.add('font-style');
    titleInfo.setAttribute('id', `title-info-${i+1}`)
    const img = document.createElement('img');
    iconContainer.appendChild(img);
    img.setAttribute('src', `./assets/icons/icon${i+1}.svg`);
    img.setAttribute('alt', `icon-${i+1}`);
    img.classList.add('size-img');
    const numInfo = document.createElement('span');
    iconContainer.appendChild(numInfo);
    numInfo.classList.add('font-style');
    numInfo.setAttribute('id', `num-info-${i+1}`);
}

const titleInfo1 = document.getElementById('title-info-1');
const titleInfo2 = document.getElementById('title-info-2');
const titleInfo3 = document.getElementById('title-info-3');

const numInfo1 = document.getElementById('num-info-1');
const numInfo2 = document.getElementById('num-info-2');
const numInfo3 = document.getElementById('num-info-3');

titleInfo1.innerText = 'Visits';
titleInfo2.innerText = 'Bonuses';
titleInfo3.innerText = 'Books';

numInfo1.innerText = '23';
numInfo2.innerText = '1240';
numInfo3.innerText = '0';


function libraryCard() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    userFullName.value = `${storedUser.name} ${storedUser.lastname}`;
    cardNumber.value = storedUser.number;

    buttonCheckCard.style.display = 'none';
    infoUserByCard.style.display = 'flex';
}
// libraryCard(); <--- PUSH IT FOR DEVELOP CARD

function removeLibraryCard() {
    userFullName.value = '';
    cardNumber.value = '';
    infoUserByCard.style.display = 'none';
    buttonCheckCard.style.display = 'block';
}

const titleFieldCard = document.getElementById('title-field-card');
const cardField1 = document.getElementById('card-field-1');
const cardField2 = document.querySelector('.reg-box');

function visit() {
    titleFieldCard.innerHTML = 'Your Library card';
    cardField1.innerHTML = 'Visit your profile';
    cardField2.innerHTML = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
    // signUpMain.style.opacity = '0';
    // signUpMain.style.pointerEvents = 'none';
    signUpMain.style.display = 'none';
    loginMain.innerHTML = 'Profile';
    loginMain.classList.add('text-btn');
}

function novisit() {
    titleFieldCard.innerHTML = 'Find your Library card';
    cardField1.innerHTML = 'Get a reader card';
    cardField2.innerHTML = 'You will be able to see a reader card after logging into account or you can register a new account';
    // signUpMain.style.opacity = '1';
    // signUpMain.style.pointerEvents = 'auto';
    signUpMain.style.display = 'block';
    loginMain.innerHTML = 'Log in';
}

buttonCheckCard.addEventListener('click', function(event) {
    event.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if(userFullName.value === `${storedUser.name} ${storedUser.lastname}` && cardNumber.value === storedUser.number) {
        libraryCard();

        setTimeout(() => {
            removeLibraryCard()
        }, 10000);
    }
})

//ICON CHANGE FOR AUTHORISATION
function iconChange() {
    iconSvg.style.display = 'none';
    iconRegUser.style.display = 'block';

    const storedUser = JSON.parse(localStorage.getItem('user'));

    const title = `${storedUser.name} ${storedUser.lastname}`;
    iconRegUser.setAttribute('title', title);

    const userRegistrationTitle = document.querySelector('.user-registration-title');
    userRegistrationTitle.innerHTML = (storedUser.name.split('').slice(0, 1)+storedUser.lastname.split('').slice(0, 1)).toUpperCase();

}

//CHANGE MENU AUTHORISATION
function authorisation() {
    login.innerHTML = 'My profile';
    register.innerHTML = 'Log Out';
    condition = false;
    iconChange();
    libraryCard();
    visit();


    const storedUser = JSON.parse(localStorage.getItem('user'));
    windowUserOneField.innerHTML = storedUser.number;
    windowUserOneField.classList.add('one-field-size');
    localStorage.setItem('login', 'true');
    if(storedUser.visit === undefined) {
        storedUser.visit = 1;
    } else {
        storedUser.visit++;
    }
    localStorage.setItem('user', JSON.stringify(storedUser));
    clickButton();
    counterVisitBottom();
    location.reload();
}

function noAuthorisation() {
    login.innerHTML = 'Log In';
    register.innerHTML = 'Register';
    iconSvg.style.display = 'block';
    iconRegUser.style.display = 'none';
    condition = true;
    removeLibraryCard();
    novisit();


    windowUserOneField.innerHTML = 'Profile';
    windowUserOneField.classList.remove('one-field-size');
    localStorage.setItem('login', 'false');
    clickButton();
    location.reload();
}

if (userLogin === 'true') {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    windowUserOneField.innerHTML = storedUser.number;
    windowUserOneField.classList.add('one-field-size');

    login.innerHTML = 'My profile';
    register.innerHTML = 'Log Out';
    condition = false;
    iconChange();
    libraryCard();
    visit();
}

//CLICK BUY ON THE FAVORITES
let buttonBuy = document.querySelectorAll('.btn-text');

function clickButton() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedBycard = JSON.parse(localStorage.getItem('bycard'));
    let current = [];
    let arrayBooks = [];

    buttonBuy = [...buttonBuy];
        buttonBuy.map((item) => item.addEventListener('click', function() {
            if(condition === true) {
                choiceModal(modalLogIn);
                bodyLock();
            }}))

    if (userLogin === 'true') {
        if(Object.keys(storedUser.books).length === 0) {
            arrayBooks = [];
        }
        if(Object.keys(storedUser.books).length > 0) {
            arrayBooks = storedUser.books;
            current = storedUser.current;
        }

        buttonBuy = [...buttonBuy];
        buttonBuy.map((item) => item.addEventListener('click', function() {
            if(condition === true) {
                choiceModal(modalLogIn);
                bodyLock();
                // console.log('I press when I not register: Buy')
            }
            if(storedBycard === true) {
                // console.log('I press when I register: Buy')
                current++;
                let currentBook = `${item.parentElement.children[2].children[0].innerHTML}, ${item.parentElement.children[2].children[1].innerHTML}`;

                for (let i = 0; i < 1; i++) {
                    arrayBooks.push(currentBook);
                }



                storedUser.books = arrayBooks;
                storedUser.current = current;
                localStorage.setItem('user', JSON.stringify(storedUser));

                item.classList.add('gold-btn');
                item.setAttribute('disabled', 'disabled');
                item.innerHTML = 'Own';

                counterBooksBotton();
            } else {
                // console.log('Please buy card')
                openBuyCard();
            }
        })
    );
    }
}
clickButton()

function checkButton() {
    let storedUser = JSON.parse(localStorage.getItem('user'));
    let memoryBooks = [];
    if (storedUser && storedUser.books && Object.keys(storedUser.books).length > 0) {
        memoryBooks = Object.values(storedUser.books);
    }

    let titleStorageArr = [];
    for (let i = 0; i < memoryBooks.length; i++) {
        let bookStorage = memoryBooks[i].split(',');
        let titleStorage = bookStorage[0].trim();
        titleStorageArr.push(titleStorage);
    }
    if (userLogin === 'true') {
        buttonBuy = [...buttonBuy];
        buttonBuy.forEach((item) => {
            const currentItem = item.parentNode.children[2].children[0].innerHTML;
            let bookOwned = false;

            for (let i = 0; i < titleStorageArr.length; i++) {
                if (currentItem.includes(titleStorageArr[i])) {
                    bookOwned = true;
                    break;
                }
            }

            if (bookOwned) {
                item.classList.add('gold-btn');
                item.setAttribute('disabled', 'disabled');
                item.innerHTML = 'Own';
            } else {
                item.classList.remove('gold-btn');
                item.removeAttribute('disabled');
                item.innerHTML = 'Buy';
            }
        });
    }

}
checkButton();

//MY PROFILE
const moadlProfile = document.querySelector('.modal-profile');
moadlProfile.classList.add('hidden-start');
function openMyProfile() {
    moadlProfile.classList.add('visible-modal');
    moadlProfile.classList.remove('hidden-start');
    modalWindows.classList.add('active');
    overlayModal.style.zIndex = '3';
    deactiveRegWindow();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const nameShort = document.querySelector('.name-short');
    nameShort.innerHTML = (storedUser.name.split('').slice(0, 1)+storedUser.lastname.split('').slice(0, 1)).toUpperCase();
    const nameFull = document.querySelector('.name-full');
    nameFull.innerHTML = `${storedUser.name} ${storedUser.lastname}`;
    const cardNum = document.getElementById('card-num');
    cardNum.innerHTML = storedUser.number;
    const bookCurrent = document.getElementById('num-info-details-3');
    const visit = document.getElementById('num-info-details-1');
    visit.innerHTML = storedUser.visit;

    if(storedUser.current === undefined) {
        bookCurrent.innerHTML = '0';
        numInfo3.innerHTML = '0';
    } else {
        bookCurrent.innerHTML = storedUser.current;
        numInfo3.innerHTML = storedUser.current;
    }


    let arrayBooks = storedUser.books;
    localStorage.setItem('user', JSON.stringify(storedUser));


    const liElement = document.querySelector('.books');
    while (liElement.firstChild) {
        liElement.removeChild(liElement.firstChild);
    }

    for (let i = 0; i < arrayBooks.length; i++) {
        const liElements = document.querySelector('.books');
        let addBook = document.createElement('li');
        liElements.appendChild(addBook);
        addBook.innerHTML = arrayBooks[i];
    }
}

function closeMyProfile() {
    moadlProfile.classList.remove('visible-modal');
    moadlProfile.classList.add('hidden-start');
    modalWindows.classList.remove('active');
    overlayModal.style.zIndex = '-1';
    bodyUnlock();
}

const crossProfile = document.querySelector('.cross-for-profile');
crossProfile.addEventListener('click', closeMyProfile);

function counterBooksBotton() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if(storedUser === null || storedUser.current === undefined) {
        numInfo3.innerHTML = '0';
    } else {
        numInfo3.innerHTML = storedUser.current;
    }
}
counterBooksBotton()

function counterVisitBottom() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if(storedUser === null || storedUser.visit === undefined) {
        numInfo1.innerHTML = '1';
    } else {
        numInfo1.innerHTML = storedUser.visit;
    }
}
counterVisitBottom()

const formLog = document.getElementById('form-log');

formLog.addEventListener("submit", function() {
    const emailLog = document.getElementById('email-log');
    const passwordLog = document.getElementById('password-log');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if(emailLog.value === storedUser.email && passwordLog.value === storedUser.password) {
        alert('Successfully');
        authorisation();
    } else {
        alert('Wrong e-mail or password');
    }
})

const modalBuyCard = document.querySelector('.modal-buy-a-card');
function openBuyCard() {
    modalBuyCard.classList.remove('hidden-start');
    modalWindows.classList.add('active');
    modalBuyCard.style.zIndex = '5';
    overlayModal.style.zIndex = '3';
    bodyLock();
}

function closeBuyCard() {
    modalBuyCard.classList.add('hidden-start');
    modalWindows.classList.remove('active');
    modalBuyCard.style.zIndex = '-1';
    bodyUnlock();
}

const formByCard = document.getElementById('form-buy-card');
let formField = document.querySelectorAll('.check-form');
let submit = document.getElementById('submit');

function checkForm() {
    let isFormValid = true;

    formField.forEach(item => {
        if (item.value === '') {
            isFormValid = false;
            return;
        }
    });

    if (isFormValid) {
        submit.classList.remove('disabled_button');
    } else {
        submit.classList.add('disabled_button');
    }
}

formField.forEach(item => {
    item.addEventListener('input', checkForm);
});

checkForm();

formByCard.addEventListener("submit", function() {
    localStorage.setItem('bycard', JSON.stringify(true));
});

//copy
const copy = document.querySelector('.copy');

copy.addEventListener('click', function(){
    const clipboard = navigator.clipboard;
    const numberCopy = cardNumber.value;
    clipboard.writeText(numberCopy)
})



});



console.log(
    `
     Этап 1: Пользователь не зарегистрирован
      Ограниченная карусель в блоке About:
      - Карусель реагирует на нажатие кнопок (кнопки под каруселью и стрелочки слева и справа в мобильной версии) и происходит анимация перелистывания. +15 ✅
      - На экране шириной 1440px проверяем, чтобы было доступно 2 других скрытых картинки. При каждом нажатии выезжает следующая, и так до границ справа и слева. +2 ✅
      - Выделенные кнопки под каруселью (имеется ввиду кнопка соответствующая активному слайду и которая имеет коричневый цвет) - неактивные. +2 ✅
      - Если анимация карусели не успела завершиться, при этом нажата была следующая кнопка, то картинка не должна зависнуть в промежуточном состоянии. +2 ✅
      - На экране шириной 768px проверяем, чтобы было доступно 2 других скрытых картинки. Для этого меняем разрашение и перезагружаем страницу. Теперь доступных перемещений становится 5. +2 ✅
      - Неактивными становятся не только выделенные кнопки, но и стрелочки на границах карусели. +2 ✅
      Слайдер в блоке Favorites:
      - Слайдер реагирует на нажатие кнопок панели навигации и происходит анимация затухания и проявления. +15 ✅
      - На любой ширине экрана все 4 карточки с книгами одновременно будут плавно затухать, а затем плавно проявляться следующие. +2 ✅
      - Анимация может быть прервана следующим нажатием на кнопку выбора поры года, но при этом анимация не должна застывать в промежуточном состояни. Должна отрабатывать до конца. +2 ✅
      - Во время анимаций высота блока Favorites не должна меняться. +2
      - Панель навигации слайдера сделана по технологии "styicky" для разрешений с одним рядом книг (768px и меньше), т.е. опускается вниз вместе скроллом страницы, прилипая к верхней части экрана, в рамках блока Favorites. +2 ✅
      До регистрации:
      - Нажатие на кнопку Check the card ни к чему не приведет. ✅
      До авторизации:
      - Иконка юзера в хедере отображается в виде силуэта. ✅
      - В блоке Favorites все кнопки должны иметь имя Buy, а не Own. +2 ✅

     Этап 2: Пользователь на этапе регистрации
      Меню авторизации при нажатии на иконку пользователя:
      - Нажатие на иконку пользователя в хедере открывает меню, которое должно оказаться под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. +2 ✅
      - На разрешении 768px при открытом бургер-меню, оно закрвывается и открывается меню авторизации. +2 ✅
      - То же верно и в обратную сторону, кнопка бургер-меню должна быть доступна при открытом меню авторизации. +2 ✅
      - Нажатие на любую область или элмемент вне меню приводят к закрытию меню авторизации. +2 ✅
      Модальное окно REGISTER:
      - Дизайн модального окна соотвествует макету. +15 (позже появятся пункты оценки по каждому элементу в отдельности). ✅
      - При нажатии на кнопку Register в открытом меню авторизации появляется модальное окно REGISTER, где есть поля First name, Last name, E-mail и Password. +2 ✅
      - При нажатии кнопки Sign Up в блоке Digital Library Cards также появляется модальное окно REGISTER. +2 ✅
      - Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2 ✅
      - При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2 ✅
      - В данном случае, ограничения по полям - все поля должны быть не пустыми. +2 ✅
      - Пароль должен быть не короче 8 символов. +2 ✅
      - В поле E-mail должна быть валидация типа email. +2 ✅
      Окончание регистрации:
      - Данные созраняются в хранилище localStorage, в том числе и пароль, хотя в реальной жизни так делать нельзя. +2 ✅
      - Иконка пользователя меняется на заглавные буквы имени. +2 ✅
      - Отображение страницы приходит в состояение после авторизации (этап 4). +2 ✅
      - Будет сгенерирован девятизначный Card Number случайным образом в формате 16-ричного числа. +2 ✅
      При наличии регистрации, но будучи не аторизованным:
      - Блок Digital Library Cards. Если введенные имя и номер карты совпадают с данными пользователя, то отображается панель с информацией, вместо кнопки Check the card на 10 секунд. +2 ✅
      - Там же после отображения информации, кнопка возвращается в прежнее состояние, а поля в форме сбрасываются. +2 ✅

     Этап 3: Пользователь на этапе входа в учетную запись после регистрации.
      Модальное окно LOGIN:
      - Дизайн модального окна соответствует макету. +15 (позже появятся пункты оценки по каждому элементу в отдельности). ✅
      - При нажатии на кнопку Log In появляется модальное окно LOGIN, где есть поля E-mail or readers card и Password. +2 ✅
      - При нажатии кнопки Log In в блоке Digital Library Cards также появляется модальное окно LOGIN. +2 ✅
      - Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2 ✅
      - При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2 ✅
      - Для авторизации все поля должны быть не пустыми. +2 ✅
      - Пароль должен быть не короче 8 символов. +2 ✅
      Блок Favorites:
      - Если пользователь еще не вошел в учетную запись, то при нажатии на любую кнопку Buy открывается модальное окно LOGIN. +2 ✅

     Этап 4: Пользователь после входа в учетную запись
     Меню профиля при нажатии на иконку с инициалами пользователя:
      - При наведении курсором на иконку пользователя должно отображаться полное имя пользователя (атрибут title). +2 ✅
      - Нажатие на иконку пользователя в хедере открывает меню, которое должно оказаться под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. +2 ✅
      - На разрешении 768px при открытом бургер-меню, оно закрывается и открывается меню авторизации. +2 ✅
      - То же верно и в обратную сторону, кнопка бургер-меню должна быть доступна. +2 ✅
      - Нажатие на любую область или элемент вне меню приводят к закрытию меню профиля. +2 ✅
      - Вместо надписи Profile отображается девятизначный Card Number. Для Card Number можно использовать меньший шрифт чтобы надпись вметилась в контейнер, +2 ✅
      - Нажатие на кнопку My Profile открывает модальное окно MY PROFILE. +2 ✅
      - Нажатие на кнопку Log Out приводит к выходу пользователю из состояния авторизации, возвращаемся к этапу #1. +2 ✅
     Модальное окно MY PROFILE:
      - Дизайн модального окна соответствует макету. +15 (позже появятся пункты оценки по каждому элементу в отдельности). ✅
      - В случае если имя и фамилия слешиком длинные и не влазят в блок то должен произойти перенос фамилии на следующую строку. ✅
      - Счетчик для Visits отображает, сколько раз пользователь проходил процесс авторизации, включая самый первый - регистрацию. +2 ✅
      - Счетчик для Books отображает, сколько у пользователя книг находятся в состоянии Own. Значение варьируется 0-16. +2 ✅
      - Рядом с Card Number есть кнопка, нажатие на которую копирует код карты клиента в буфер обмена. +2 ✅
      - Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2 ✅
      - При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2 ✅
     Блок Favorites:
      - При нажатии на любую кнопку Buy, еще до покупки абонемента, открывается модальное окно BUY A LIBRARY CARD. +2 ✅
      - При нажатии на любую кнопку Buy, после покупки абонемента, меняет вид кнопки на неактивную Own, добавляя единицу к счетчику книг в профиле. +2 ✅
      - Кроме того после нажатия обновляется не только счетчик, но и название книги должно отобразится в разделе Rented Books. Название формируется по принципу <название книги>, <автор книги>. В случае если название книги слишком длинное или список стал слишком большой список книг в блоке Rented Books становится скроллируемым (по необходимости горизонтально/ вертикально или оба скролла сразу) Тайтл Rented Books скроллироваться не должен +2 ✅
     Модальное окно BUY A LIBRARY CARD
      - Модальное окно нужно сделать шириной 640px. Будет это обрезка по 5px по бокам, или просто уменьшение длины с сохранением сетки - значения не имеет, хотя при правильной сеточной структуре, сделать это будет намного проще. +2 ✅
      - Дизайн модального окна соответствует макету. +15 (позже появятся пункты оценки по каждому элементу в отдельности). ✅
      - При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2 ✅
      - Для того, чтобы кнопка Buy была активна, все поля должны быть не пустыми. +2 ✅
      - Bank card number должен содержать 16 цифр. С пробелами каждые 4 символа или нет - значения не имеет. +2 ✅
      - Expiration code содержит 2 поля с ограничением в 2 цифры. +2 ✅
      - CVC должен содержать 3 цифры. +2 ✅
      - После удачного нажатия на кнопку Buy, окно закрывается, и больше мы к нему не возвращаемся. ✅
     Блок Digital Library Cards:
      - При наличии авторизации вместо кнопки Check the Card будут отображаться данные пользователя и бейджи, как на дизайне LibraryCard after login in account. +2 ✅
     `
)