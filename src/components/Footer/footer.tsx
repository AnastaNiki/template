import logo from './footer-img/footer_logo.png'

export const Footer = () => {
    return (
        <footer className="footer"> 
        <div className="footer__top">
          <ul className="footer__topNav"  aria-label="Company">
            <h2 className="footer__navHead">Company</h2>
            <li className="footer__li"><a href="https://www.last.fm/about" className="link">About Last.fm</a></li>
            <li className="footer__li"><a href="https://www.last.fm/about/contact" className="link">Contact Us</a></li>
            <li className="footer__li"><a href="https://www.last.fm/about/jobs" className="link">Jobs</a></li>
          </ul>
          <ul className="footer__topNav"  aria-label="Help">
            <h2 className="footer__navHead">Help</h2>
            <li className="footer__li"><a href="https://www.last.fm/about/trackmymusic" className="link">Track My Music</a></li>
            <li className="footer__li"><a href="https://support.last.fm/" className="link">Community Support</a></li>
            <li className="footer__li"><a href="https://www.last.fm/help/guidelines" className="link">Community Guidelines</a></li>
            <li className="footer__li"><a href="https://www.last.fm/help/faq" className="link">Help</a></li>
          </ul>
          <ul className="footer__topNav"  aria-label="Goodies">
            <h2 className="footer__navHead">Goodies</h2>
            <li className="footer__li"><a href="https://www.last.fm/about/trackmymusic" className="link">Download Scrobbler</a></li>
            <li className="footer__li"><a href="https://www.last.fm/api" className="link">Developer API</a></li>
            <li className="footer__li"><a href="https://www.last.fm/music/+free-music-downloads" className="link">Free Music Downloads</a></li>
            <li className="footer__li"><a href="https://store.last.fm/" className="link">Merchandise</a></li>
          </ul>
          <ul className="footer__topNav"  aria-label="Account">
            <h2 className="footer__navHead">Account</h2>
            <li className="footer__li"><a href="https://www.last.fm/join" className="link">Sign Up</a></li>
            <li className="footer__li"><a href="https://www.last.fm/login" className="link">Log In</a></li>
            <li className="footer__li"><a href="https://www.last.fm/pro" className="link">Subscribe</a></li>
          </ul>
          <ul className="footer__topNav"  aria-label="Follow us">
            <h2 className="footer__navHead">Follow us</h2>
            <li className="footer__li"><a href="https://www.facebook.com/lastfm" className="link">Facebook</a></li>
            <li className="footer__li"><a href="https://twitter.com/lastfm" className="link">Twitter</a></li>
            <li className="footer__li"><a href="https://www.instagram.com/last_fm" className="link">Instagram</a></li>
            <li className="footer__li"><a href="https://www.youtube.com/user/lastfm" className="link">YouTube</a></li>
          </ul>
        </div>
        <div className="footer__bottom">
          <div className="footer__info">
            <ul className="footer__navlang">
              <li className="footer__li"><a href="" className="footer__langLinkCurrent">English</a></li>
              <li className="footer__li"><a href="" className="link">Deutsch</a></li>
              <li className="footer__li"><a href="" className="link">Español</a></li>
              <li className="footer__li"><a href="" className="link">Français</a></li>
              <li className="footer__li"><a href="" className="link">Italiano</a></li>
              <li className="footer__li"><a href="" className="link">日本語</a></li>
              <li className="footer__li"><a href="" className="link">Polski</a></li>
              <li className="footer__li"><a href="" className="link">Português</a></li>
              <li className="footer__li"><a href="" className="link">Русский</a></li>
              <li className="footer__li"><a href="" className="link">Svenska</a></li>
              <li className="footer__li"><a href="" className="link">Türkçe</a></li>
              <li className="footer__li"><a href="" className="link">简体中文</a></li>
            </ul>
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