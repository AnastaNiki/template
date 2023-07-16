import { useSearchParams, createSearchParams} from 'react-router-dom';

import logo from './header-img/logo.png'
import albumLogo from "./header-img/player_default_album.png"

const dataNavLinks = ['Live','Music','Charts','Event','Features']

function ItemNavLink(props: {name:string}) {
  return  <a href="/" className="header__navLink">{props.name}</a>
}

function NavLinks(props:{navLinks:Array<string>}){
  return (
    <>
      {props.navLinks.map((name:string) =>  <ItemNavLink name={name} key={name}/>)}
    </>
  );
}

function HeaderSearchForm() {
  const pathname = 'search';
  const [searchParams, setSearchParams] = useSearchParams({q:''});

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchParams({q: e.currentTarget.value});
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {

    const path = {
      pathname,
        search: createSearchParams(searchParams).toString()
      };
  
      event.preventDefault();
      window.location.href = path.pathname + "?" + path.search;
  };

  function handleClick(event: { preventDefault: () => void; }) {
    const path = {
      pathname,
      search: createSearchParams(searchParams).toString()
    };

    event.preventDefault();
    window.location.href = path.pathname + "?" + path.search;
}
  
    return (
      <form id="header__inputForm" onSubmit={handleSubmit}>
        <div className=" header__inputBlock">
            <input type="search" className="header__input" onChange={onChange} placeholder="Search for music..."/>
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
            <HeaderSearchForm />
          </div>
      
          <NavLinks navLinks={dataNavLinks}/>
  
        </div>
      </header>
    );
}