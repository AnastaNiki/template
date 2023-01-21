const APIkey = "ed48f5fc3bc871362430fba857a3a411";

/**
 * По API last.fm запрашивает данные об исполнителях на основе значения поля поиска.
 * Подробнее: https://www.last.fm/api/show/artist.search
 * artist.search - запрос исполнителей, возвращает нужную часть ответа
 * 
 * Возвращает: 
 * Массив из 8 объектов с полями: image(5:size, #text),listeners,mbid,name,streamable,url
 *
 */
export async function getArtistSearch(searchValue:string|null) {
    try {
        let toSearch = '';
        if (searchValue) {
            toSearch = searchValue;
        }
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(toSearch)}
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
 */
export async function getAlbumSearch(searchValue:string|null) {
    try {
        let toSearch = '';
        if (searchValue) {
            toSearch = searchValue;
        }
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(toSearch)}
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
 */
export async function getTrackSearch(searchValue:string|null) {
    try {
        let toSearch = '';
        if (searchValue) {
            toSearch = searchValue;
        }
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(toSearch)}
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

