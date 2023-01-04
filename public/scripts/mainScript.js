const APIkey = "ed48f5fc3bc871362430fba857a3a411";
const buttonSearch = document.querySelector('.header__buttonSearch');
const headerInputForm = document.getElementById('header__inputForm');
const inputPlace = document.querySelector('.header__input');
const musicHotNow = document.querySelectorAll('.music__hotNow');
const trackHotNow = document.querySelector('.music__tracks');

/**
 * Запрашивает данные о популярных исполнителях по API last.fm.
 * 
 * Подробнее: https://www.last.fm/api/show/chart.getTopArtists
 * https://www.last.fm/api/show/artist.getTopTags
 * 
 * chart.gettopartists - запрос исполнителей, часть ответа записывает в musicCharts
 * artist.gettoptags - запрос тегов для исполнителя, часть ответа записывает в musicCharts.tags
 * 
 * Возвращает массив: 
 * 12 объектов с полями: image(5 шт:size,#text),listeners,mbid,name,streamable,url; 
 * tags: Массив из 12 массивов с объектами (по <= 3 шт), поля: count,name,url
 * 
 * @returns {Array<Object(12), Array<Array<Object>>} 
 */
async function getMusicCharts() {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${APIkey}&format=json&limit=12&page=1`);
        let data = await response.json()
        if (response.status === 200) {
            let musicCharts = data.artists.artist;
    
            let topTagsUrls = [];
            for (const element of musicCharts) {
                topTagsUrls.push(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags
                &artist=${encodeURIComponent(element.name)}&api_key=${APIkey}&format=json`);
            }

            musicCharts.tags = await Promise.all(topTagsUrls.map(url => fetch(url))).then(
                responses => Promise.all(responses.map(r => r.json()))).then(
                    responses => (responses.map(r => r.toptags.tag.slice(0,3))));
        
            return musicCharts;
        } else {
            throw new Error(`${data.error}. Message: ${data.message}.`);
        }
    } catch(err) {
        alert(err + '\n' + 'Возникла ошибка при обращении к API, попробуйте обновить страницу.');
        return {};
    }
}

/**
 * Запрашивает данные о популярных треках по API last.fm.
 * 
 * Подробнее: https://www.last.fm/api/show/chart.getTopTracks
 * https://www.last.fm/api/show/track.getTopTags
 * 
 * chart.gettoptracks () - запрос треков, часть ответа записывает в trackCharts
 * track.gettoptags () - запрос тегов для треков, часть ответа записывает в topTrackTags
 * 
 * Возвращает массив: 
 * 18 объектов с полями: image(5 шт:size,#text),artist,duration.image.listeners,mbid,name,streamable,url; 
 * tags: Массив из 18 массивов с объектами (по <= 3 шт), поля: count,name,url
 * 
 * @returns {Array<Object(18), Array<Array<Object>>} 
 */
async function getTrackCharts() {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${APIkey}&format=json&limit=18&page=1`);
        let data = await response.json()
        if (response.status === 200) {
            let trackCharts = data.tracks.track;

            let topTagsUrls = [];
            for (const element of trackCharts) {
                topTagsUrls.push(`http://ws.audioscrobbler.com/2.0/?method=track.gettoptags
                &artist=${encodeURIComponent(element.artist.name)}&track=${encodeURIComponent(element.name)}&api_key=${APIkey}&format=json`);
            }

            trackCharts.tags = await Promise.all(topTagsUrls.map(url => fetch(url))).then(
                responses => Promise.all(responses.map(r => r.json()))).then(
                    responses => (responses.map(r => r.toptags.tag.slice(0,3))));
    
            return trackCharts;
        } else {
            throw new Error(`${data.error}. Message: ${data.message}.`);
        }
    } catch(err) {
        alert(err + '\n' + 'Возникла ошибка при обращении к API, попробуйте обновить страницу.');
        return {};
    }
}

/**
 * Добавляет отображение популярных испольнителей на страницу
 * на основе результата запроса данных по API last.fm в функции getMusicCharts()
 * 
 * @param {Array<Object(12), Array<Array<Object>>} 
 */
function hotNowToUi(musicCharts) {
    if (JSON.stringify(musicCharts) === '{}') {
        const template = `<li class="seacrh__message">No music found.</li>`;
        musicHotNow[0].insertAdjacentHTML('beforeend', template);
        return;
    }

    let template0 = '';
    let template1 = '';

    musicCharts.forEach((music, index) => {
        let flagIndex = (index < 6) ? 0 : 1;

        //будет выведено столько тегов, сколько вернулось из запроса
        let liGenres = '';
        for (const element of musicCharts.tags[index]) {
            liGenres += `<li class="music__genresItem"><a href=${element.url} class="link">${element.name}</a></li>\n`;
        }

        if (flagIndex == 0) {
            template0 +=  `
                <li class="music__hotNowItem">
                <div class="music__hotNowImg"><a href=${music.url}><img src="${music.image[2]['#text']}" alt="Cover" class="music__imgHot"></a></div>
                <h3 class="music__name"><a href=${music.url} class="link">${music.name}</a></h3>
                <ul class="music__genres"> 
                    ${liGenres}
                </ul>
                </li>`;
        } else {
            template1 +=  `
                <li class="music__hotNowItem">
                <div class="music__hotNowImg"><a href=${music.url}><img src="${music.image[2]['#text']}" alt="Cover" class="music__imgHot"></a></div>
                <h3 class="music__name"><a href=${music.url} class="link">${music.name}</a></h3>
                <ul class="music__genres"> 
                    ${liGenres}
                </ul>
                </li>`;
        }
    });

    musicHotNow[0].insertAdjacentHTML('beforeend', template0);
    musicHotNow[1].insertAdjacentHTML('beforeend', template1);
}

/**
 * Добавляет отображение популярных треков на страницу
 * на основе результата запроса данных по API last.fm в функции getTrackCharts()
 * 
 * @param {Array<Object(18), Array<Array<Object>>} 
 */
function tracksToUi(trackCharts) {
    if (JSON.stringify(trackCharts) === '{}') {
        const template = `<span class="seacrh__message">No track found.</span>`;
        trackHotNow.insertAdjacentHTML('beforeend', template);
        return;
    }

    let template = '';

    trackCharts.forEach((track, index) => {
        //будет выведено столько тегов, сколько вернулось из запроса
        let liGenres = '';
        for (const element of trackCharts.tags[index]) {
            liGenres += `<li class="music__genresItem"><a href="${element.url}" class="link">${element.name}</a></li>\n`;
        }

        template +=  `
            <li class="music__trackItem">
            <div class="music__trackImg"><a href="${track.artist.url}"><img src="${track.image[1]['#text']}" alt="Album"></a></div>
            <div class="music__name2"><a href="${track.url}" class="link">${track.name}</a></div>
            <div class="music__artist"><a href="${track.artist.url}" class="link">${track.artist.name}</a></div>
            <ul class="music__genres"> 
                ${liGenres}
            </ul>
            </li>`;
    });

    trackHotNow.insertAdjacentHTML('beforeend', template);
}

/**
 * Добавляет обработку события 'click' для кнопки поиска с классом .header__buttonSearch.
 * Строит url со значением поиска, перенаправляет на страницу с результатами поиска.
 */
buttonSearch.addEventListener('click', ()=> {
    window.location.href = window.location.href + "search.html?q=" + inputPlace.value;
})

/**
 * Добавляет обработку события 'sumbit' для формы поиска header__inputForm.
 * Строит url со значением поиска, перенаправляет на страницу с результатами поиска.
 */
headerInputForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    window.location.href = window.location.href + "search.html?q=" + inputPlace.value;
})

/**
 * Основная функция 
 */
async function main() {
    const musicCharts = await getMusicCharts();
    const trackCharts = await getTrackCharts();
    hotNowToUi(musicCharts);
    tracksToUi(trackCharts);
}

main();