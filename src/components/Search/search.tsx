import { useSearchParams, createSearchParams, useNavigate} from 'react-router-dom';
import {getArtistSearch, getAlbumSearch, getTrackSearch} from "./getSearchData"
import {useState, useEffect} from 'react'

let searchValue = (new URL(window.location.href)).searchParams.get('q');

function H1Search() {
    return (
        <h1 className="search__header">Search results “{searchValue}”</h1>
    );
}

function SearchForm() {
    const navigate = useNavigate();

    const pathname = '';
    const [searchParams, setSearchParams] = useSearchParams({q:''});

    const handleChange = (event: { target: { value: any; }; }) => {
        setSearchParams({q:event.target.value});
      };


    const handleSubmit = function (event: { preventDefault: () => void; }) {

        const path = {
            pathname,
            search: createSearchParams(searchParams).toString()
        };

        event.preventDefault();
        navigate(path);
        window.location.reload();
    };

    const handleClick = (event: { preventDefault: () => void; }) => {
        const path = {
            pathname,
            search: createSearchParams(searchParams).toString()
          };
    
        event.preventDefault();
        navigate(path);
        window.location.reload();
    };
  
    return (
      <form id="search__inputForm" onSubmit={handleSubmit} >
            <div className="search__inputBlock">
                <input type="search" className="search__input" onChange={handleChange} placeholder="Search for music..."/>
                    <a><button type="submit" className="search__buttonSearch" onClick={handleClick}></button></a>
                </div>
        </form> 
    );

  }

function ArtistSearch() {
    const [data, setData] = useState('');

    useEffect(() => {
        async function getData() {
            const artistSearch = await getArtistSearch(searchValue);
          
            if (JSON.stringify(artistSearch) === '{}' || artistSearch.length == 0) {
                const template = `<li class="seacrh__message">No artists found.</li>`;
                return template;
            }
        
            let template = '';
        
            artistSearch.forEach(function (artist: { image: { [x: string]: any; }[]; url: any; name: any; listeners: any; }, index: any) {
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
        <ol className="search__gridItems" dangerouslySetInnerHTML={{__html: data}}></ol>
        </>
      );
}
    

function AlbumSearch(){
    const [data, setData] = useState('');

    useEffect(() => {
        async function getData() {
            const albumSearch = await getAlbumSearch(searchValue);
          
            if (JSON.stringify(albumSearch) === '{}' || albumSearch.length == 0) {
                const template = `<li class="seacrh__message">No albums found.</li>`;
                return template;
            }
        
            let template = '';
        
            albumSearch.forEach((album: { image: { [x: string]: any; }[]; url: any; name: any; artist: any; }) => {
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
          setData(template);
        };
    
        if (!data) {
          getData();
        }
      }, []);
    
      return (
        <>
        <ol className="search__gridItems" dangerouslySetInnerHTML={{__html: data}}></ol>
        </>
      );
}  

function TrackSearch(){
    const [data, setData] = useState('');

    useEffect(() => {
        async function getData() {
            const trackSearch = await getTrackSearch(searchValue);
          
            if (JSON.stringify(trackSearch) === '{}' || trackSearch.length == 0) {
                const template = `<span class="seacrh__message">No tracks found.</span>`;
                return template;
            }
        
            let template = '';
        
            trackSearch.forEach((track: { image: { [x: string]: any; }[]; name: any; url: any; artist: any; }) => {
                template += `                    
                <tr>
                    <td><button type="submit" class="search__play-button"></button></td>
                    <td><a><img class="search__tracksImg" src="${track.image[0]['#text']}" alt="${track.name}"></a></td>
                    <td><a href="${track.url}" class="search__trackLinkSong link">${track.name}</a></td>
                    <td><a href="${track.url}" class="search__trackLinkSinger link">${track.artist}</a></td>
                </tr>`
            });
          setData(template);
        };
    
        if (!data) {
          getData();
        }
      }, []);
    
      return (
        <>
        <table className="search__tracksTable" dangerouslySetInnerHTML={{__html: data}}></table>
        </>
      );
}  

export const Search = () => {
    return (
        <main className="search">
            <div className = "search__top">
                <H1Search/>
                <div className="search__nav">
                    <ul className="search__navItems">
                        <li className="search__navItem"><a href="" className="search__mainNavLink">Top Results</a></li>
                        <li className="search__navItem"><a href="" className="search__navLink">Artists</a></li>
                        <li className="search__navItem"><a href="" className="search__navLink">Albums</a></li>
                        <li className="search__navItem"><a href="" className="search__navLink">Tracks</a></li>
                    </ul>
                </div>
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
                    <h2 className="search__titel">Tracs</h2>
                    <TrackSearch/>
                    <p  className="search__more"><a href="https://www.last.fm/search/tracks?q=" className="search__moreLink link">More tracks</a></p>
                </section>
            
            </div>
        </main>
    )
}