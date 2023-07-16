const APIkey = "ed48f5fc3bc871362430fba857a3a411";

function deleteProps (obj:any, prop:any) {
    for (const p of prop) {
       delete obj[p];
    }    
}

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
 */
export async function getMusicCharts() {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${APIkey}&format=json&limit=12&page=1`);
        let data = await response.json()
        if (response.status === 200) {
            let musicCharts = data.artists.artist;
    
            let topTagsUrls:string[] = [];
            for (const element of musicCharts) {
                topTagsUrls.push(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags
&artist=${encodeURIComponent(element.name)}&api_key=${APIkey}&format=json`);
            }

            const tags = await Promise.all(topTagsUrls.map(url => fetch(url))).then(
                responses => Promise.all(responses.map(r => r.json()))).then(
                    responses => (responses.map(r => r.toptags.tag.slice(0,3))));
            
            musicCharts.forEach((music:any) => {
                music.image = music.image[2]['#text']
                deleteProps(music, ['listeners', 'playcount', 'streamable', 'mbid'])
            });

            tags.forEach((tags:Array<object>, index:number) => {
                tags.forEach((tag:any) => {delete tag.count});
                musicCharts[index].tags = tags
            });

            return musicCharts;
        } else {
            throw new Error(`${data.error}. Message: ${data.message}.`);
        }
    } catch(err) {
        alert(err + '\n Возникла ошибка при обращении к API, попробуйте обновить страницу.');
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
 */
export async function getTrackCharts() {
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

            const tags = await Promise.all(topTagsUrls.map(url => fetch(url))).then(
                responses => Promise.all(responses.map(r => r.json()))).then(
                    responses => (responses.map(r => r.toptags.tag.slice(0,3))));

            trackCharts.forEach((track:any) => {
                track.image = track.image[1]['#text']
                deleteProps(track.artist, ['mbid'])
                deleteProps(track, ['listeners', 'playcount', 'streamable', 'mbid', 'duration'])
            });
            
            tags.forEach((tags:Array<object>, index:number) => {
                tags.forEach((tag:any) => {deleteProps(tag, ['count'])});
                trackCharts[index].tags = tags
            });
            
            return trackCharts;
        } else {
            throw new Error(`${data.error}. Message: ${data.message}.`);
        }
    } catch(err) {
        alert(err + '\n Возникла ошибка при обращении к API, попробуйте обновить страницу.');
        return {};
    }
}