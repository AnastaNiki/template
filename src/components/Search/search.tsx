import {getArtistSearch, getAlbumSearch, getTrackSearch} from "./getSearchData"
import {useState, useEffect} from 'react'
import {SearchForm} from "./searchForm";

let searchValue = (new URL(window.location.href)).searchParams.get('q');

function H1Search() {
    return (
        <h1 className="search__header">Search results “{searchValue}”</h1>
    );
}

function SearchNav() {
    return (
    <div className="search__nav">
        <ul className="search__navItems">
            <li className="search__navItem"><a href="" className="search__mainNavLink">Top Results</a></li>
        </ul>
    </div>
    );
}

function CoverImg(props:{image:string, searchValue:string}) {
    return (
        <div className="search__coverItemImg">
            <img src={props.image} alt={props.searchValue}/>
        </div>
    );
}

function CoverArtisText(props:{url:string, name:string, listeners:number}){
    return (
        <div className="search__coverItemText">
            <p className="search__coverItemTextMain"><a href={props.url} className="link">{props.name}</a></p>
            <span className="search__statName">{props.listeners} listeners</span>
        </div>
    );
}

function CoverAlbumText(props:{url:string, name:string, artist:string}){
    return (
        <div className="search__coverItemText">
            <p className="search__coverItemTextMain"><a href={props.url} className="link">{props.name}</a></p>
            <a href={props.url} className="search__singerLink link">{props.artist}</a>
        </div>
    );
}

function ArtistItem(props:{artist:{image:string, searchValue:string, url:string, name:string, listeners:number}}) {
    return (
        <li className="search__gridItem">
            <div className="search__covers">
                <div className="search__coverItem">
                <CoverImg image={props.artist.image} searchValue={props.artist.searchValue} />
                <CoverArtisText url={props.artist.url} name={props.artist.name} listeners={props.artist.listeners} />
                <a href="/search.html" className="search__linkBlock"></a>
                </div>
            </div>
        </li>      
    );
}


function AlbumItem(props: {album: {image:string, searchValue:string, url:string, name:string, artist:string}}) {
    return (
        <li className="search__gridItem">
            <div className="search__covers">
                <div className="search__coverItem">
                <CoverImg image={props.album.image} searchValue={props.album.searchValue} />
                <CoverAlbumText url={props.album.url} name={props.album.name} artist={props.album.artist} />
                <a href="/search.html" className="search__linkBlock"></a>
                </div>
            </div>
        </li>      
    );
}

function Artists(props: {artists: Array<{image:string, searchValue:string, url:string, name:string, listeners:number}>}){
    return (
        <ol className="search__gridItems">
            {props.artists.map((artist: {image:string, searchValue:string, url:string, name:string, listeners:number}) =>
             <ArtistItem artist={artist} key={artist.name} />)}
        </ol>
    );
}

function Albums(props: {albums: Array<{image:string, searchValue:string, url:string, name:string, artist:string}>}){
    return (
        <ol className="search__gridItems">
            {props.albums.map((album: {image:string, searchValue:string, url:string, name:string, artist:string}) => 
            <AlbumItem album={album} key={album.artist + album.name} />)}
        </ol>
    );
}

function TrackItem(props: {track: {url:string, image:string, name:string, artist:string}}) {
    return (
        <tr>
            <td><button type="submit" className="search__play-button"></button></td>
            <td><a><img className="search__tracksImg" src={props.track.image} alt={props.track.name}/></a></td>
            <td><a href={props.track.url} className="search__trackLinkSong link">{props.track.name}</a></td>
            <td><a href={props.track.url} className="search__trackLinkSinger link">{props.track.artist}</a></td>
        </tr>
    );
}

function Tracks(props: {tracks: Array<{url:string, image:string, name:string, artist:string}>}){
    return (
        <table className="search__tracksTable">
            <tbody>
                {props.tracks.map((track: {url:string, image:string, name:string, artist:string}) => 
                <TrackItem track={track} key={track.artist + track.name} />)}
            </tbody>
        </table>
    );
}

function ArtistSearch() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
          const artistSearch = await getArtistSearch(searchValue);
          setData(artistSearch);
        }
        getData();
      }, []); //пустой dependencies [] - эффект применится 1 раз
    return (
        <>
            <Artists artists={data}/>
        </>
    );
}

function AlbumSearch() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
          const albumSearch = await getAlbumSearch(searchValue);
          setData(albumSearch);
        }
        getData();
      }, []);
    return (
        <>
            <Albums albums={data}/>
        </>
    );
}

function TrackSearch() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
          const trackSearch = await getTrackSearch(searchValue);
          setData(trackSearch);
        }
        getData();
      }, []);
    return (
        <>
            <Tracks tracks={data}/>
        </>
    );
}

export const Search = () => {
    return (
        <main className="search">
            <div className = "search__top">
                <H1Search/>
                <SearchNav/>
            </div>

            <div className="search_content">
                <SearchForm/>
            
                <section>
                    <h2 className="search__titel">Artists</h2>
                    <ArtistSearch/>
                    <p  className="search__more"><a href="https://www.last.fm/search/artists?q=" className="search__moreLink link">More artists</a></p>
                </section>

                <section>
                    <h2 className="search__titel">Albums</h2>
                    <AlbumSearch/> 
                    <p  className="search__more"><a href="https://www.last.fm/search/albums?q=" className="search__moreLink link">More albums</a></p>
                </section>

                <section>
                    <h2 className="search__titel">Tracks</h2>
                    <TrackSearch/>
                    <p  className="search__more"><a href="https://www.last.fm/search/tracks?q=" className="search__moreLink link">More tracks</a></p>
                </section>
            
            </div>
        </main>
    )
}