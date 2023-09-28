const UnsplashAPI_KEY = 'tJyOY44bLKmcDlsDIGTlm1AFSzLAYuHnfZmu5PbIzSk';
const UnsplashBASE_URL = 'https://api.unsplash.com/';
const UnsplashPHOTOS = UnsplashBASE_URL + 'photos?per_page=30&client_id=' + UnsplashAPI_KEY;
// const UnsplashRANDOM = UnsplashBASE_URL + 'photos/random?client_id=' + UnsplashAPI_KEY;

const flickrAPI_KEY = '9eaafec1284f432338233772900eb2f2';
const flickrBASE_URL = 'https://api.flickr.com/';
const flickrPHOTOS = flickrBASE_URL + 'services/rest/?method=flickr.photos.getRecent&api_key=' + flickrAPI_KEY + '&format=json&nojsoncallback=1';

const selectAPI = document.getElementById('select-api');

selectAPI.addEventListener('change', function() {
    const value = selectAPI.value;
    const IMG = document.querySelectorAll('.img');
    IMG.forEach((element) => {
        element.remove();
    });

    if(value === 'unsplash') {
        getData(UnsplashPHOTOS);
    } else if(value === 'flickr') {
        getData(flickrPHOTOS);
    }
});

const mainContainer = document.querySelector('.main-container');

async function getData(server) {
    const res = await fetch(server);
    const data = await res.json();

    if (server === flickrPHOTOS) {
        const photos = data.photos.photo;

        photos.forEach((photo) => {
            const farmId = photo.farm;
            const serverId = photo.server;
            const id = photo.id;
            const secret = photo.secret;
            const url = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;

            const IMG = document.createElement('div');
            mainContainer.appendChild(IMG);
            IMG.style.backgroundImage = `url(${url})`;
            IMG.classList.add('img');
        });
    }
    if (server === UnsplashPHOTOS) {
        for (let i = 0; i < data.length; i++) {
            const url = data[i].urls.regular;
            const IMG = document.createElement('div');
            mainContainer.appendChild(IMG);
            IMG.style.backgroundImage = `url(${url})`;
            IMG.classList.add('img');
        }
    }
}

getData(UnsplashPHOTOS);

// console.log(`
// 1. Вёрстка +10
//     ● на странице есть несколько фото и строка поиска +5
//     ● в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
// 2. При загрузке приложения на странице отображаются полученные от API изображения +10
// 3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
// 4. Поиск +30
//     ● при открытии приложения курсор находится в поле ввода +5
//     ● есть placeholder +5
//     ● автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
//     ● поисковый запрос можно отправить нажатием клавиши Enter +5
//     ● после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
//     ● в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
// 5. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
//     ● высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо`);
