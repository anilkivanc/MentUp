import React from "react";
import { useState } from "react";
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
      e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
  
      if (!email) {
        setMessage("Lütfen geçerli bir e-posta adresi girin.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5001/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMessage(data.message); // Başarı mesajı
        } else {
          setMessage(data.message || "Bir hata oluştu. Lütfen daha sonra tekrar deneyin."); // Hata mesajı
        }
      } catch (error) {
        console.error(error);
        setMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      }
    };

  return (
    <div className="forgot-password-container">
      <div className='forgot-password-logo-name'>
        <a href='/home'>MentUp</a>
      </div>
      <div className='forgot-password-box'>
        <h1>Şifreni Değiştir</h1>
        <h2>E-postanızı yazın, size şifrenizi sıfırlamanız için bir bağlantı göderelim</h2>
        <form>
          <div className="forgot-password-form-group">
            <label htmlFor="email">E-posta</label>
            <input 
              type="email"
              id="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresinizi girin"
              required
            ></input>
          </div>
          <button 
          type="submit" 
          className="forgot-password-reset-button"
          onClick={handleResetPassword}
          >Şifreyi Sıfırla</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;