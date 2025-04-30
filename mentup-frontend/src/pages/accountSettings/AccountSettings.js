import { useState } from "react";
import './AccountSettings.css'
import NavBar2 from "../../components/NavBar2/Navbar2";
import ProfilePhotoUpload from "../../components/ProfilePhotoUpload/ProfilePhotoUpload";
import ProfileSettingsBar from "../../components/ProfileSettingsBar/ProfileSettingsBar";

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
              <ProfilePhotoUpload/>
              <ProfileSettingsBar/>
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