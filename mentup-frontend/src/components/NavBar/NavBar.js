import React from "react";
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
      navigate('/login');
  };

  const handleSignupClick = () => {
      navigate('/signup');
  };
  return (

    <nav className="navbar-first">
      <div className="navbar-first-content">
        <div className='navbar-first-logo-name'>
          <a href='/home'>MentUp</a>
        </div>
        <div className='navbar-first-apply-mentorship'>
          <a href="/applymentorship">Mentorluk İçin Başvur</a>
        </div>
        <div className='navbar-first-items-right-col'>
          <div className="navbar-first-items">
            <a className="navbar-first-items-browse-mentors" href="/browsementors">Mentorlara Göz At</a>
            <a className="navbar-first-items-about-us" href="/aboutus">Hakkımızda</a>
            <a className="navbar-first-items-contact" href="/contact">İletişim</a>
            <a className="navbar-first-items-mentors" href="#">Mentorlerimiz</a>
            <a className="navbar-first-items-pricing" href="/pricing">Üyelikleri Görüntüle</a>
          </div>
          <div className="navbar-first-auth-buttons">
            <button className="navbar-first-login-button" onClick={handleLoginClick}>Giriş Yap</button>
            <button className="navbar-first-register-button" onClick={handleSignupClick}>Kayıt Ol</button>
          </div>
        </div>
      </div>   
    </nav>

  );
};
export default NavBar;