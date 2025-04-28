import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {  
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLoginClick = () => {
      navigate('/login');
  };

  async function handleSignUp(e) {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

    setMessage(""); // Önceki mesajı temizle

    const response = await fetch("http://localhost:5001/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            email: email,
            password: password
        })
    });
    if (!response.ok) {
        console.log("Fetch atarken hata geldi!");
    }
    // Kayıt olduktan sonra yapılacak işlemler buraya eklenir

    const data = await response.json();
    setMessage(data.message || "Kayıt Başarılı!");
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <div className='login-button-signup-page-div'>
        <button className="login-button-signup-page" onClick={handleLoginClick}>Giriş Yap</button>
      </div>
      <div className="signup-container">
        <div className='logo-name'>
          <a href='/home'>MentUp</a>
        </div>
        <div className="signup-box">
          <h2>MentUp&#39;a Kaydol</h2>
          <form>
            <div className="form-group">
            <label htmlFor="name">Ad</label>
              <input 
              type="text" 
              id="name" 
              value={name} onChange={(e) => setName(e.target.value)} 
              placeholder="John"
              required />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Soyad</label>
              <input 
              type="text" 
              id="surname" 
              value={surname} onChange={(e) => setSurName(e.target.value)} 
              placeholder="Doe"
              required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Posta</label>
              <input 
              type="email"
              id="email" 
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com" 
              required
               />
            </div>
            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <div className="password-wrapper-signup-page">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={faEye} style={{fontSize: '18px' }}/>
                </button>
              </div>
            </div>
            <div className="form-group-checkbox">
              <input type="checkbox" id="terms" required />
              <a href="#">Hizmet Şartlarını ve Gizlilik Politikasını kabul ediyorum</a>
            </div>
            <button type="submit" className="register-button-signup-page" onClick={handleSignUp}>KAYDOL</button>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;