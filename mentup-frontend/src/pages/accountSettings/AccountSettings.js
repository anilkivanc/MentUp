import { useState } from "react";
import './AccountSettings.css'
import { useNavigate } from "react-router-dom";
import NavBar2 from "../../components/NavBar2/Navbar2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";

const AccountSettings = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result); // Resmin Base64 formatında URL'sini saklar.
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };
  return (

    <div className="account-settings-profile-container">
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
                <a className="profile-settings-bar-profile-option" href="/menteeprofile">
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: '16px', color: 'black', fontSize: '20px'}} />
                  Profil Bilgileri</a>
                <a className="profile-settings-bar-account-settings-option" href="/accountsettings">
                  <FontAwesomeIcon icon={faGear} style={{ marginRight: '14px', color: 'black', fontSize: '20px'}}/>
                  Hesap Bilgileri</a>
                <a className="profile-settings-bar-subscription-option" href="#">
                  <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '14px', color: 'black', fontSize: '18px'}}/>
                  Abonelik</a>
                <a className="profile-settings-bar-payment-history-option" href="#">
                  <FontAwesomeIcon icon={faReceipt} style={{ marginRight: '19px', color: 'black', fontSize: '20px'}}/>
                  Ödeme Geçmişi</a>
              </div>
            </div>
          </div>
          
          <div>
            <div className="account-settings-form">
              <h2 className="account-settings-form-title">Hesap Ayarları</h2>
              <div className="account-settings-infos">
                <div className="account-settings-email">
                  <label className="account-settings-email-label">E-posta</label>
                  <input type="text" className="account-settings-email-input" placeholder=" johndoe@example.con"></input>
                </div>
                <div className="account-settings-current-password">
                  <label className="account-settings-password-label">Mevcut Şifre</label>
                  <input type="text" className="account-settings-password-input"></input>
                </div>
                <div className="account-settings-new-password">
                  <label className="account-settings-new-password-label">Yeni Şifre</label>
                  <input type="text" className="account-settings-new-password-input"></input>
                </div>
                <div className="account-settings-confirm-password">
                  <label className="account-settings-confirm-password-label">Tekrar Yeni Şifre</label>
                  <input type="text" className="account-settings-confirm-password-input"></input>
                </div>
                <div className="account-settings-button-save-div">
                  <button type="save" className="account-settings-button-save">Kaydet</button>
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
export default AccountSettings;