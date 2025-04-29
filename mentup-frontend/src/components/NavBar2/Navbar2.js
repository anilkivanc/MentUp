import React, { useState } from 'react';
import './Navbar2.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const NavBar2 = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest('.navbar-secondary-profile')) {
      setDropdownVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);
  return (

    <nav className="navbar-secondary">
      <div className="navbar-secondary-content">
        <div className='navbar-secondary-logo-name'>
          <a href='/home'>MentUp</a>
        </div>
        <div className='navbar-secondary-apply-mentorship'>
          <a href="/applymentorship">Mentorluk İçin Başvur</a>
        </div>
        <div className='navbar-secondary-items-right-col'>
          <div className="navbar-secondary-items">
            <a href="/browsementors">Mentorlara Göz At</a>
            <a href="/aboutus">Hakkımızda</a>
            <a href="/contact">İletişim</a>
            <a href="/mentors">Mentorlarımız</a>
            <a href="/pricing">Fiyatlar</a>
            <a href="/appointments">Görüşmelerim</a>
          </div>
          <div className="navbar-secondary-options">
            <button className="navbar-secondary-messages-button">
              <FontAwesomeIcon icon={faMessage} style={{color:"white"}}/>
            </button>
            <button className="navbar-secondary-notifications-button">
              <FontAwesomeIcon icon={faBell} style={{color:"white"}}/>
            </button>
            <div className="navbar-secondary-profile">
              <button
                className="navbar-secondary-profile-button"
                onClick={toggleDropdown}
              >
              <div className="navbar-secondary-profile-icon">
                <FontAwesomeIcon icon={faUser} style={{color:"white"}}/>
                </div>
              <div className="navbar-secondary-arrow-down-icon">
                <FontAwesomeIcon icon={faAngleDown} style={{color:"white"}}/>
              </div>
              </button>
                {isDropdownVisible && (
                <ul className="navbar-secondary-dropdown-menu">
                  <li>
                    <a className='navbar-secondary-dropdown-menu-settings' href="/menteeProfile">
                      <FontAwesomeIcon icon={faGear} style={{color:"black", marginRight:"10px"}} />
                      Ayarlar</a></li>
                  <li><a className='navbar-secondary-dropdown-menu-logout' href="/login">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} style={{color:"black", marginRight:"10px"}}/>
                  Çıkış Yap</a></li>
                </ul>
                )}
            </div>
          </div>
        </div>
      </div>   
    </nav>

  );
};
export default NavBar2;