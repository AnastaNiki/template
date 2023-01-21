import {getMusicCharts, getTrackCharts} from "./getMainData"
import {useState, useEffect} from 'react'

function HotRightNow() {
  const [data, setData] = useState(['','']);

  useEffect(() => {
    async function getData() {
      const musicCharts = await getMusicCharts();
      
        if (JSON.stringify(musicCharts) === '{}') {
            const template = `<li class="seacrh__message">No music found.</li>`;
            return {
              template
            };
        }
    
        let template0 = '';
        let template1 = '';
    
        musicCharts.forEach((music:any, index:number) => {
            let flagIndex = (index < 6) ? 0 : 1;
    
            //будет выведено столько тегов, сколько вернулось из запроса
            let liGenres = '';
            for (const element of musicCharts.tags[index]) {
                liGenres += `<li class="music__genresItem"><a href=${element.url} class="link">${element.name}</a></li>\n`;
            }
    
            if (flagIndex == 0) {
                template0 +=  `
                    <li class="music__hotNowItem" key=${index}>
                    <div class="music__hotNowImg"><a href=${music.url}><img src="${music.image[2]['#text']}" alt="Cover" class="music__imgHot"></a></div>
                    <h3 class="music__name"><a href=${music.url} class="link">${music.name}</a></h3>
                    <ul class="music__genres"> 
                        ${liGenres}
                    </ul>
                    </li>`;
            } else {
                template1 +=  `
                    <li class="music__hotNowItem" key=${index}
                    <div class="music__hotNowImg"><a href=${music.url}><img src="${music.image[2]['#text']}" alt="Cover" class="music__imgHot"></a></div>
                    <h3 class="music__name"><a href=${music.url} class="link">${music.name}</a></h3>
                    <ul class="music__genres"> 
                        ${liGenres}
                    </ul>
                    </li>`;
            }
          });

      setData([template0,template1]);
    };

    if (data[0] === '' && data[0] == data[1]) {
      getData();
    }
  }, []);

  return (
    <>
      <ol className="music__hotNow" dangerouslySetInnerHTML={{__html: data[0]}} ></ol>
      <ol className="music__hotNow" dangerouslySetInnerHTML={{__html: data[1]}} ></ol>
    </>
  );
}

function TrackCharts() {
  const [data, setData] = useState('');

  useEffect(() => {
    async function getData() {
      const trackCharts = await getTrackCharts();
      
    if (JSON.stringify(trackCharts) === '{}') {
        const template = `<span class="seacrh__message">No track found.</span>`;
        return template;
    }

    let template = '';

    trackCharts.forEach((track: { artist: { url: any; name: any; }; image: { [x: string]: any; }[]; url: any; name: any; }, index: string | number) => {
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

      setData(template);
    };

    if (!data) {
      getData();
    }
  }, []);

  return (
    <>
    <ol className="music__tracks" dangerouslySetInnerHTML={{__html: data}}></ol>
    </>
  );
}


export const Main = () => {
    return (
      <main className="content">
          <h1 className="content__header">Music</h1>
          <div className="music">
            <h2 className="music__titel">Hot right now</h2>
              <HotRightNow />
            <h2 className="music__titel">Popular tracks</h2>
              <TrackCharts />
          </div>
      </main>
    );
}

