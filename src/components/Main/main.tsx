import {getMusicCharts, getTrackCharts} from "./getMainData"
import {useState, useEffect} from 'react'

function MusicImg(props: {url:string, image:string}) {
  return <div className="music__hotNowImg"><a href={props.url}><img src={props.image} alt="Cover" className="music__imgHot"/></a></div>
}

function MusicName(props: {url:string, name:string}) {
  return <h3 className="music__name"><a href={props.url} className="link">{props.name}</a></h3>
}

function GenreItem(props: {url:string, name:string}) {
  return <li className="music__genresItem"><a href={props.url} className="link">{props.name}</a></li>
}

function Genres(props: {tags: Array<{url:string, name:string}>}) {
  return (<ul className="music__genres"> 
            {props.tags.map((genre) => <GenreItem url={genre.url} name={genre.name} key={genre.name}/>)}
          </ul>                         
  );
}

function HotNowMusicItem(props: {music: {url:string, name:string, image:string, tags:Array<{url:string, name:string}>}}) {
  return (<li className="music__hotNowItem" key={props.music.name}>
            <MusicImg url={props.music.url} image={props.music.image} />
            <MusicName url={props.music.url} name={props.music.name} />
            <Genres tags={props.music.tags} />
          </li>
  );
}

function MusicRaw(props: {charts:Array<{url:string, name:string, image:string, tags:Array<{url:string, name:string}>}>}) {
  return (
    <>
      <ol className="music__hotNow" >
        {props.charts.map((music:{url:string, name:string, image:string, tags:Array<{url:string, name:string}>}) =>
         <HotNowMusicItem music={music} key={music.name} />)}
      </ol>
    </>
  );
}

function HotRightNow() {
    // начальное состояние useState(initalState); 
    const [data, setData] = useState([]);
    useEffect(() => {
      async function getData() {
        const musicCharts = await getMusicCharts();
        setData(musicCharts);
      }
      getData();
    }, []);

  return (
    <>
      <MusicRaw charts={data.slice(0,6)} />
      <MusicRaw charts={data.slice(6)} />
    </>
  );
}

function TrackImg(props: {url:string, image:string}) {
  return <div className="music__trackImg"><a href={props.url}><img src={props.image} alt="Album" /></a></div>
}

function TrackName(props: {url:string, name:string}) {
  return <div className="music__name2"><a href="{props.url}" className="link">{props.name}</a></div>
}

function TrackArtist(props: {url:string, name:string}) {
  return <div className="music__artist"><a href="{props.url}" className="link">{props.name}</a></div>
}

function HotNowTrackItem(props: {track: {url:string, artist:{name:string, url:string},
   name:string, image:string, tags:Array<{url:string, name:string}>}}) {
  return (<li className="music__trackItem" key={props.track.name}>
            <TrackImg url={props.track.artist.url} image={props.track.image} />
            <TrackName url={props.track.url} name={props.track.name} />
            <TrackArtist url={props.track.artist.url} name={props.track.artist.name} />
            <Genres tags={props.track.tags} />
          </li>
  );
}

function HotNowTrack(props: {tracks:Array<{url:string, artist:{name:string, url:string},
   name:string, image:string, tags:Array<{url:string, name:string}>}>}) {
  return (
    <ol className="music__tracks">
      {props.tracks.map(
        (track:{url:string,  artist:{name:string, url:string}, name:string, image:string, 
          tags:Array<{url:string, name:string}>}) => 
        <HotNowTrackItem track={track} key={track.name} />)}
    </ol>
  )
}

function TrackCharts() {
    // начальное состояние useState(initalState); 
    const [data, setData] = useState([]);
    useEffect(() => {
      async function getData() {
        const trackCharts = await getTrackCharts();
        setData(trackCharts);
      }
      getData();
    }, []);

  return (
    <>
      <HotNowTrack tracks={data}/> 
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

