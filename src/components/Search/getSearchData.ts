const APIkey = "ed48f5fc3bc871362430fba857a3a411";

function deleteProps (obj:any, prop:any) {
    for (const p of prop) {
       delete obj[p];
    }    
}

export async function getSearchData(searchName:string, searchValue:string|null) {
    //searchName: album, track, artist
    try {
        let toSearch = '';
        if (searchValue) {
            toSearch = searchValue;
        }
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=${searchName}.search&${searchName}=${encodeURIComponent(toSearch)}
        &api_key=${APIkey}&format=json&limit=8&page=1`);
        let data = await response.json();
        if (response.status === 200) {
           switch(searchName) { 
                case "album": { 
                    data.results.albummatches.album.forEach((music:any) => {
                        music.image = music.image[2]['#text']
                        deleteProps(music, ['streamable', 'mbid'])
                    });
                    return data.results.albummatches.album;
                } 
                case "artist": {
                    data.results.artistmatches.artist.forEach((music:any) => {
                        music.image = music.image[2]['#text']
                        deleteProps(music, ['streamable', 'mbid'])
                    });
                    return data.results.artistmatches.artist;
                }
                case "track": { 
                    data.results.trackmatches.track.forEach((music:any) => {
                        music.image = music.image[0]['#text']
                        deleteProps(music, ['streamable', 'mbid'])
                    });
                    return data.results.trackmatches.track;
                } 
                default: { 
                    alert('\n'+ 'Возникла ошибка при обращении к API.');
                    return {};
                } 
            } 
        } else {
            throw new Error(`${data.error}. Message: ${data.message}.`);
        }
    } catch(err) {
        alert(err + '\n'+ 'Возникла ошибка при обращении к API, попробуйте обновить страницу. ' + searchName);
        return {};
    }
}

/**
 * По API last.fm запрашивает данные об исполнителях на основе значения поля поиска.
 * Подробнее: https://www.last.fm/api/show/artist.search
 * Возвращает: массив из 8 объектов с полями: image(5:size, #text),listeners,mbid,name,streamable,url
 */

export async function getArtistSearch(searchValue:string|null) {
    return await getSearchData("artist", searchValue);
}

/**
 * По API last.fm запрашивает данные об альбомах на основе значения поля поиска.
 * Подробнее: https://www.last.fm/api/show/album.search
 * Возвращает: массив из 8 объектов с полями: artist,image(4:size, #text),mbid,name,streamable,url
 */
export async function getAlbumSearch(searchValue:string|null) {
    return await getSearchData("album", searchValue);
}

/**
 * По API last.fm запрашивает данные о треках на основе значения поля поиска.
 * Подробнее: https://www.last.fm/api/show/track.search
 * Возвращает: массив из 8 объектов с полями: artist,image(4:size, #text),listeners,mbid,name,streamable,url
 */
export async function getTrackSearch(searchValue:string|null) {
    return await getSearchData("track", searchValue);
}