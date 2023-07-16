import logo from './footer-img/footer_logo.png'
import {footerLinks, Languages} from './footerData'

function Item(props: { link: string, name: string }) {
  return <li key={props.name} className="footer__li"><a href= {props.link} className="link">{props.name}</a></li>
}

function FooterTopLinks(props: {links: Array<{label:string, data: Array<{link: string, name: string}>}>}) {
  return (
  <div key = "footer__top" className="footer__top">
    {props.links.map((footerLink: {label:string, data: Array<{link: string, name: string}>}) => (
        <ul key = {footerLink.label} className="footer__topNav" aria-label="{footerLink.label}">
        <h2 className="footer__navHead">{footerLink.label}</h2>
        {footerLink.data.map((dataDetail) => <Item link={dataDetail.link} name={dataDetail.name} key={dataDetail.name} />)}
        </ul>
    ))}
  </div>
  );
}

function FooterLang(props: {currLang: string}) {
  return (<ul className="footer__navlang">
            <li className="footer__li"><a href="" className="footer__langLinkCurrent">{props.currLang}</a></li>
            {Languages.filter((lang => lang.name !== props.currLang)).map((lang) => <Item link={lang.link} name={lang.name} key={lang.num} />)}
          </ul>
  );
}

export const Footer = () => {
    return (
        <footer className="footer"> 
        <FooterTopLinks links={footerLinks}/>
        <div className="footer__bottom">
          <div className="footer__info">
          <FooterLang currLang="English" />
            <div className="footer__timeZone">
              Time zone: Europe/Moscow
            </div>
            <div className="footer__doc">CBS Interactive © 2022 Last.fm Ltd. All rights reserved · Terms of Use · Privacy ·
            Policy · Legal · Policies · Cookies · Policy · Cookie · Information · Jobs at ViacomCBS · Last.fm Music
            </div>
          </div>
            <div className="footer__logo">
              Audioscrobbler
              <img  src={logo} alt="logo" className="footer__logoImg"/>
            </div>
        </div>
      </footer>
    );
}