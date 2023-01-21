import { useSearchParams, createSearchParams, useNavigate} from 'react-router-dom';

import logo from './header-img/logo.png'
import albumLogo from "./header-img/player_default_album.png"

function SearchForm() {
    const navigate = useNavigate();

    const pathname = 'search';
    const [searchParams, setSearchParams] = useSearchParams({q:''});

    const handleChange = (event: { target: { value: any; }; }) => {
        setSearchParams({q:event.target.value});
      };


    const handleSubmit = (event: { preventDefault: () => void; }) => {

        const path = {
            pathname,
            search: createSearchParams(searchParams).toString()
          };
    
        event.preventDefault();
        navigate(path);
        window.location.reload();
    };

    const handleClick = function (event: { preventDefault: () => void; }) {
      const path = {
        pathname,
        search: createSearchParams(searchParams).toString()
      };

      event.preventDefault();
      navigate(path);
      window.location.reload();
    };
  
    return (
      <form id="header__inputForm" onSubmit={handleSubmit}>
        <div className=" header__inputBlock">
            <input type="search" className="header__input" onChange={handleChange} placeholder="Search for music..."/>
          <a href="/"><button type="submit" className="header__buttonCloseSearch"></button></a>
          <a><button type="submit" className="header__buttonSearch" onClick={handleClick}></button></a>
        </div>     
      </form>
    );
  }

export const Header = () => {
    return (
        <header className="header">
        <img src={albumLogo} height="60" width="60" alt="album"/>
        <a href="/" className="header__logo"><img src={logo} height="34" width="105" alt="Last.fm"/></a>
        <div className="header__nav">
          <div className="wrapper">
            <div><button type="submit" className="header__buttonSearchToggler"></button></div>
            <SearchForm />
          </div>
      
          <a href="/" className="header__navLink">Live</a>
          <a href="/" className="header__navLink">Music</a>
          <a href="/" className="header__navLink">Charts</a>
          <a href="/" className="header__navLink">Event</a>
          <a href="/" className="header__navLink">Features</a>
    
        </div>
      </header>
    );
}