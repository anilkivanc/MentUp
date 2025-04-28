import { useState, useEffect } from "react";
import axios from 'axios';
import "./MenteeProfile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import NavBar2 from "../../components/NavBar2/Navbar2";

const MenteeProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    console.log("👉 Token bulundu mu:", token);
  
    if (!token) {
      window.location.href = "/login";
      return;
    }
  
    setTokenChecked(true);
  }, []);

  if (!tokenChecked) return <p>Yükleniyor...</p>;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="mentee-profile-container">
      <header>
        <NavBar2/>
      </header>

      <main>
        <div className="mentee-profile-form">
          <h1 className="mentee-profile-title">Ayarlar</h1>
          <div className="all-settings-form">
            <div className="photo-settings-card">
              <div className="profile-photo-card">
                <div>
                  <div className="profile-photo">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profil"
                        className="profile-photo-preview"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faCircleUser} className="profile-photo-icon" />
                    )}
                  </div>
                  <div className="profile-photo-text">
                    <h3 className="profile-photo-text-info">Profil Resmini Değiştir</h3>
                    <p className="profile-photo-text-constraint">
                      Resim
                      <strong className="text-grey"> .jpg </strong>
                      veya
                      <strong className="text-grey"> .png </strong>
                      formatında olmalıdır.
                    </p>
                  </div>
                  <div className="profile-photo-upload">
                    <button
                      className="profile-photo-button-upload"
                      onClick={handleButtonClick}
                    >
                      Resim Yükle
                    </button>
                    <input
                      id="fileInput"
                      type="file"
                      accept=".jpg,.png"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="profile-settings-bar">
                <div>
                  <a
                    className="profile-settings-bar-profile-option"
                    href="/menteeprofile"
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        marginRight: "16px",
                        color: "black",
                        fontSize: "20px",
                      }}
                    />
                    Profil Bilgileri
                  </a>
                  <a
                    className="profile-settings-bar-account-settings-option"
                    href="/accountsettings"
                  >
                    <FontAwesomeIcon
                      icon={faGear}
                      style={{
                        marginRight: "14px",
                        color: "black",
                        fontSize: "20px",
                      }}
                    />
                    Hesap Bilgileri
                  </a>
                  <a
                    className="profile-settings-bar-subscription-option"
                    href="#"
                  >
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      style={{
                        marginRight: "14px",
                        color: "black",
                        fontSize: "18px",
                      }}
                    />
                    Abonelik
                  </a>
                  <a
                    className="profile-settings-bar-payment-history-option"
                    href="#"
                  >
                    <FontAwesomeIcon
                      icon={faReceipt}
                      style={{
                        marginRight: "19px",
                        color: "black",
                        fontSize: "20px",
                      }}
                    />
                    Ödeme Geçmişi
                  </a>
                </div>
              </div>
            </div>
          
          <div>
            <div className="profile-settings-form">
              <h2 className="profile-settings-form-title">Profil Ayarları</h2>
              <h6 className="required-info-text">Yanında * sembolü olan yerlerin doldurulması zorunludur.</h6>
              <div className="profile-settings-infos">
                <div className="profile-settings-name-surname">
                  <div className="profile-settings-name">
                    <label className="profile-settings-name-label">İsim</label>
                    <span className="span-required"> *</span>
                    <div className="profile-settings-name-input-div">
                      <input type="text" className="profile-settings-name-input" placeholder="  John"></input>
                    </div>
                  </div>
                  <div className="profile-settings-surname">
                    <label className="profile-settings-surname-label">Soyisim</label>
                    <span className="span-required"> *</span>
                    <div className="profile-settings-surname-input-div">
                      <input type="text" className="profile-settings-surname-input" placeholder="  Doe"></input>
                    </div>
                  </div>
                </div>
                {/* <div className="profile-settings-display-name">
                  <label className="profile-settings-display-name-label">Görünen İsim</label>
                  <span className="span-required"> *</span>
                  <div className="profile-settings-display-name-input-div">
                    <input type="text" className="profile-settings-display-name-input" placeholder="  John_Doe"></input>
                  </div>
                </div> */}
                <div className="profile-settings-profession">
                  <label className="profile-settings-profession-label">Meslek</label>
                  {/* <span className="span-required"> *</span> */}
                  <div className="profile-settings-profession-input-div">
                    <input type="text" className="profile-settings-profession-input"></input>
                  </div>
                </div>
                <div className="profile-settings-hometown-location">
                  <div className="profile-settings-hometown">
                    <label className="profile-settings-hometown-label">Doğum Yeri</label>
                    <span className="span-required"> *</span>
                    {/* <input type="text" className="profile-settings-hometown-input"></input> */}
                    <select className="profile-settings-hometown-select">
                      <option value="" disabled selected >Ülke Seçin</option>
                      <option value="Türkiye">Türkiye</option>
                      <option value="Almanya">Almanya</option>
                    </select>
                  </div>
                  <div className="profile-settings-location">
                    <label className="profile-settings-location-label">Lokasyon</label>
                    <span className="span-required"> *</span>
                    {/* <input type="text" className="profile-settings-location-input"></input> */}
                    <select className="profile-settings-location-select">
                      <option value="" disabled selected >Ülke Seçin</option>
                      <option value="Türkiye">Türkiye</option>
                      <option value="Almanya">Almanya</option>
                    </select>
                  </div>
                </div>
                <div className="profile-settings-industries">
                  <label className="profile-settings-industries-label">Beceri Alanları</label>
                  <input type="text" className="profile-settings-industries-input"></input>
                </div>
                <div className="profile-settings-languages">
                  <label className="profile-settings-languages-label">Bilinen Diller</label>
                  <input type="text" className="profile-settings-languages-input"></input>
                </div>
                <div className="profile-settings-button-save-div">
                  <button type="save" className="profile-settings-button-save">Kaydet</button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    );
};

export default MenteeProfile;