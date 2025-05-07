import React, { useState } from 'react';
import './Navbar2.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Eğer logout endpoint’in varsa

const NavBar2 = () => {  
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5001/auth/logout',
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`  // Burada düzeltme yapıldı
          }
        }
      );
    } catch (e) {
      console.warn('Server logout hatası (yine de devam ediyoruz):', e);
    }

    // Client’ta token ve user bilgisini sil
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Giriş sayfasına yönlendir
    navigate('/login');
  };

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
        <div className="navbar-secondary-logo-name">
          <div className='navbar-secondary-logo-image'/>
          <a href="/home">MentUp</a>
        </div>
        <div className="navbar-secondary-apply-mentorship">
          <a href="/applymentorship">Mentorluk İçin Başvur</a>
        </div>
        <div className="navbar-secondary-items-right-col">
          <div className="navbar-secondary-items">
            <a href="/browsementors">Mentorlara Göz At</a>
            <a href="/mentors">Mentorlarımız</a>
            <a href="/appointments">Görüşmelerim</a>
            <a href="/contact">İletişim</a>
            <a href="/aboutus">Hakkımızda</a>
          </div>
          <div className="navbar-secondary-options">
            <button className="navbar-secondary-messages-button">
              <FontAwesomeIcon icon={faMessage} style={{ color: "white" }} />
            </button>
            <button className="navbar-secondary-notifications-button">
              <FontAwesomeIcon icon={faBell} style={{ color: "white" }} />
            </button>
            <div className="navbar-secondary-profile">
              <button
                className="navbar-secondary-profile-button"
                onClick={toggleDropdown}
              >
                <div className="navbar-secondary-profile-icon">
                  <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
                </div>
                <div className="navbar-secondary-arrow-down-icon">
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{ color: "white" }}
                  />
                </div>
              </button>
              {isDropdownVisible && (
                <ul className="navbar-secondary-dropdown-menu">
                  <li>
                    <a 
                      className="navbar-secondary-profile-info"
                      href='/menteeprofile'
                    >
                      <div className='navbar-secondary-profile-image'></div>
                        <div className="navbar-profile-details">
                          <span className="navbar-profile-name">Buğra Batur</span>
                          <p className="navbar-view-profile-link">Profili Görüntüle</p>
                        </div>
                    </a>
                  </li>
                  {/* Profil Bilgileri Üst Kısımda */}


                  {/* Menü Öğeleri */}
                  <li>
                    <a
                      className="navbar-secondary-dropdown-menu-settings"
                      href="/menteeProfile"
                    >
                      <FontAwesomeIcon
                        icon={faGear}
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Ayarlar
                    </a>
                  </li>
                  <li>
                    <a
                      className="navbar-secondary-dropdown-menu-logout"
                      href='/login'
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Çıkış Yap
                    </a>
                  </li>
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
