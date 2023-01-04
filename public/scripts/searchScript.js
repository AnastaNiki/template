const APIkey = "ed48f5fc3bc871362430fba857a3a411";
const searchValue = (new URL(window.location.href)).searchParams.get('q');
const headerInputForm = document.getElementById('header__inputForm');
const searchInputForm = document.getElementById('search__inputForm');
const headerInputPlace = document.querySelector('.header__input');
const searchInputPlace = document.querySelector('.search__input');
const gridItems = document.querySelectorAll('.search__gridItems');
const trackTable = document.querySelector('.search__tracksTable');
const buttonSearch = document.querySelector('.header__buttonSearch');
const mainButtonSearch = document.querySelector('.search__buttonSearch');
const mainInputPlace = document.querySelector('.search__input');

/**
 * Формирование заголовка
 */
const h1 = document.querySelector('.search__header');
h1.innerHTML += `“${searchValue}”`;

/**
 * Добавляет обработку события 'click' для кнопки поиска с классом .header__buttonSearch.
 * Строит url со значением поиска, перенаправляет на страницу с результатами поиска.
 */
buttonSearch.addEventListener('click', ()=> {
    window.location.href = window.location.origin + window.location.pathname + "?q=" + inputPlace.value;
})

/**
 * Добавляет обработку события 'sumbit' для формы поиска header__inputForm.
 * Строит url со значением поиска, перенаправляет на страницу с результатами поиска.
 */
headerInputForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    window.location.href = window.location.origin + window.location.pathname + "?q=" + headerInputPlace.value;
})

/**
 * Добавляет обработку события 'sumbit' для формы поиска search__inputForm.
 * Строит url со значением поиска, перенаправляет на страницу с результатами поиска.
 */
searchInputForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    window.location.href = window.location.origin + window.location.pathname + "?q=" + searchInputPlace.value;
})

/**
 * Добавляет обработку события 'click' для кнопки поиска с классом .search__buttonSearch.
 * Строит url со значением поиска, перенаправляет на страницу с результатами поиска.
 */
mainButtonSearch.addEventListener('click', ()=> {
    window.location.href = window.location.origin + window.location.pathname + "?q=" + mainInputPlace.value;
})

/**
 * По API last.fm запрашивает данные об исполнителях на основе значения поля поиска.
 * Подробнее: https://www.last.fm/api/show/artist.search
 * artist.search - запрос исполнителей, возвращает нужную часть ответа
 * 
 * Возвращает: 
 * Массив из 8 объектов с полями: image(5:size, #text),listeners,mbid,name,streamable,url
 *
 * @returns {Array<Object(8)>} 
 */
async function getArtistSearch() {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(searchValue)}
        &api_key=${APIkey}&format=json&limit=8&page=1`);
        let data = await response.json();
        if (response.status === 200) {
            return data.results.artistmatches.artist;
        } else {
            throw new Error(`${data.error}. Message: ${data.message}.`);
        }
    } catch(err) {
        alert(err + '\n' + 'Возникла ошибка при обращении к API, попробуйте обновить страницу.');
        return {};
    }
}

/**
 * По API last.fm запрашивает данные об альбомах на основе значения поля поиска.
 * Подробнее: https://www.last.fm/api/show/album.search
 * album.search - запрос альбомов, возвращает нужную часть ответа
 * 
 * Возвращает: 
 * Массив из 8 объектов с полями: artist,image(4:size, #text),mbid,name,streamable,url
 *
 * @returns {Array<Object(8)>} 
 */
async function getAlbumSearch() {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(searchValue)}
        &api_key=${APIkey}&format=json&limit=8&page=1`);
        let data = await response.json();
        if (response.status === 200) {
            return data.results.albummatches.album;
        } else {
            throw new Error(`${data.error}. Message: ${data.message}.`);
        }
    } catch(err) {
        alert(err + '\n' + 'Возникла ошибка при обращении к API, попробуйте обновить страницу.');
        return {};
    }
}

/**
 * По API last.fm запрашивает данные о треках на основе значения поля поиска.
 * Подробнее: https://www.last.fm/api/show/track.search
 * track.search - запрос треков, возвращает нужную часть ответа
 * 
 * Возвращает: 
 * Массив из 8 объектов с полями: artist,image(4:size, #text),listeners,mbid,name,streamable,url
 *
 * @returns {Array<Object(10)>} 
 */
async function getTrackSearch() {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(searchValue)}
        &api_key=${APIkey}&format=json&limit=10&page=1`);
        let data = await response.json();
        if (response.status === 200) {
            return data.results.trackmatches.track;
        } else {
            throw new Error(`${data.error}. Message: ${data.message}.`);
        }
    } catch(err) {
        alert(err + '\n' + 'Возникла ошибка при обращении к API, попробуйте обновить страницу.');
        return {};
    }
}

/**
 * Добавляет отображение найденных артистов на страницу
 * на основе результата запроса данных по API last.fm в функции getArtistSearch()
 * 
 * @param {Array<Object(8)>} 
 */
function artistSearchToUi(artistSearch) {
    if (JSON.stringify(artistSearch) === '{}' || artistSearch.length == 0) {
        const template = `<li class="seacrh__message">No artists found.</li>`;
        gridItems[0].insertAdjacentHTML('beforeend', template);
        return;
    }

    let template = '';

    artistSearch.forEach((artist, index) => {
        template += `
            <li class="search__gridItem">
                <div class="search__covers">
                    <div class="search__coverItem">
                        <div class="search__coverItemImg">
                            <img src="${artist.image[2]['#text']}" alt="${searchValue}">
                        </div>
                        <div class="search__coverItemText">
                            <p class="search__coverItemTextMain"><a href="${artist.url}" class="link">${artist.name}</a></p>
                            <span class="search__statName">${artist.listeners} listeners</span>
                        </div>
                        <a href="/search.html" class="search__linkBlock"></a>
                    </div>
                </div>
            </li>`
    });

    gridItems[0].insertAdjacentHTML('beforeend', template);
}

/**
 * Добавляет отображение найденных альбомов на страницу
 * на основе результата запроса данных по API last.fm в функции getAlbumSearch()
 * 
 * @param {Array<Object(8)>} 
 */
function albumSearchToUi(albumSearch) {
    if (JSON.stringify(albumSearch) === '{}' || albumSearch.length == 0) {
        const template = `<li class="seacrh__message">No albums found.</li>`;
        gridItems[1].insertAdjacentHTML('beforeend', template);
        return;
    }

    let template = '';

    albumSearch.forEach(album => {
        template += `
        <li class="search__gridItem">
        <div  class="search__covers">
            <div class="search__coverItem">
                <div class="search__coverItemImg">
                    <img src="${album.image[2]['#text']}" alt="${searchValue}">
                </div>
                <div class="search__coverItemText">
                    <p class="search__coverItemTextMain"><a href="${album.url}" class="link">${album.name}</a></p>
                    <a href="${album.url}" class="search__singerLink link">${album.artist}</a>
                </div>
                <a href="/search.html" class="search__linkBlock"></a>
                </div>
            </div>
        </li>
        `
    });

    gridItems[1].insertAdjacentHTML('beforeend', template);
}

/**
 * Добавляет отображение найденных треков на страницу
 * на основе результата запроса данных по API last.fm в функции getTrackSearch()
 * 
 * @param {Array<Object(10)>}
 */
function trackSearchToUi(trackSearch) {
    if (JSON.stringify(trackSearch) === '{}' || trackSearch.length == 0) {
        const template = `<span class="seacrh__message">No tracks found.</span>`;
        trackTable.insertAdjacentHTML('afterbegin', template);
        return;
    }

    let template = '';

    trackSearch.forEach(track => {
        template += `                    
        <tr>
            <td><button type="submit" class="search__play-button"></button></td>
            <td><a><img class="search__tracksImg" src="${track.image[0]['#text']}" alt="${track.name}"></a></td>
            <td><a href="${track.url}" class="search__trackLinkSong link">${track.name}</a></td>
            <td><a href="${track.url}" class="search__trackLinkSinger link">${track.artist}</a></td>
        </tr>`
    });
    
    trackTable.insertAdjacentHTML('beforeend', template);
}

/**
 * Основная функция 
 */
async function search() {
    const artistSearch = await getArtistSearch();
    artistSearchToUi(artistSearch);

    const albumSearch = await getAlbumSearch();
    albumSearchToUi(albumSearch);
    
    const trackSearch = await getTrackSearch();
    trackSearchToUi(trackSearch);
}

search();