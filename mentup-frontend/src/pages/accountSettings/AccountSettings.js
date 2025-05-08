import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import './AccountSettings.css'
import NavBar2 from "../../components/NavBar2/Navbar2";
import ProfilePhotoUpload from "../../components/ProfilePhotoUpload/ProfilePhotoUpload";
import ProfileSettingsBar from "../../components/ProfileSettingsBar/ProfileSettingsBar";

const AccountSettings = () => {
  const [email, setEmail] = useState("");  // Destructuring düzeltildi
  const [currentPassword, setCurrentPassword] = useState(""); // Mevcut şifre için state
  const [newPassword, setNewPassword] = useState(""); // Yeni şifre için state
  const [confirmPassword, setConfirmPassword] = useState(""); // Yeni şifre (tekrar) için state
  const [passwordError, setPasswordError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
  
    // E-posta bilgisini almak için GET isteği
    axios
      .get("http://localhost:5001/accountSettings/getEmail", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data;
        setEmail(user.email);
      })
      .catch((err) => {
        console.error("E-posta verisi alınamadı:", err);
      });
  }, []);

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");

    try {
      // Şifre doğrulama
      const res = await axios.post("http://localhost:5001/accountSettings/checkPassword", {
        currentPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.isValid) {
        // Yeni şifre kontrolü
        if (newPassword.length < 6) {
          setPasswordError("Yeni şifre en az 6 karakter olmalı.");
          return;
        }

        if (newPassword !== confirmPassword) {
          setPasswordError("Yeni şifreler eşleşmiyor.");
          return;
        }

        setPasswordError(""); // Hata yoksa sıfırla

        // Şifreyi güncelleme işlemi
        const updateRes = await axios.post("http://localhost:5001/accountSettings/changePassword", {
          currentPassword,
          newPassword,
          confirmPassword
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        alert("Şifre başarıyla güncellendi");
      } else {
        setCurrentPasswordError("Mevcut şifre yanlış.");
      }

    } catch (err) {
      console.error("Şifre doğrulama hatası:", err.response?.data || err.message);
      alert("Bir hata oluştu");
    }
  };
  
  
  
  return (
    <div className="account-settings-profile-container">
      <header>
        <NavBar2 />
      </header>

      <main>
        <div className="mentee-profile-form">
          <h1 className="mentee-profile-title">Ayarlar</h1>
          <div className="all-settings-form">
            <div className="photo-settings-card">
              <ProfilePhotoUpload />
              <ProfileSettingsBar />
            </div>
            <div>
              <div className="account-settings-form">
                <h2 className="account-settings-form-title">Hesap Ayarları</h2>
                <div className="account-settings-infos">
                  <div className="account-settings-email">
                    <label className="account-settings-email-label">
                      E-posta
                    </label>
                    <input
                      type="text"
                      className="account-settings-email-input"
                      placeholder=" johndoe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="account-settings-current-password">
                    <label className="account-settings-password-label">
                      Mevcut Şifre
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      className="account-settings-password-input"
                      placeholder="Mevcut şifreniz"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {currentPasswordError && (
                      <div style={{ color: "red", marginTop: "10px" }}>
                        {currentPasswordError}
                      </div>
                    )}

                  </div>
                  <div className="account-settings-new-password">
                    <label className="account-settings-new-password-label">
                      Yeni Şifre
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      className="account-settings-new-password-input"
                      placeholder="Yeni şifreniz"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="account-settings-confirm-password">
                    <label className="account-settings-confirm-password-label">
                      Yeni Şifre(Tekrar)
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      className="account-settings-confirm-password-input"
                      placeholder="Yeni şifreniz(tekrar)"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordError && (
                      <div style={{ color: "red", marginTop: "10px" }}>
                        {passwordError}
                      </div>
                    )}
                  </div>
                  <div className="account-settings-button-save-div">
                    <button
                      type="button"
                      className="account-settings-button-save"
                      onClick={handleSaveClick}
                    >
                      Kaydet
                    </button>
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