import React, { useState } from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleMentorLoginClick = () => {
    navigate('/mentorlogin');
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Bir hata oluştu.");
      }

      const data = await response.json();
      setMessage(data.message || "Giriş başarılı!");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/menteeprofile");
        window.location.reload();
      } else {
        setMessage("Token alınamadı.");
      }
    } catch (error) {
      setMessage(error.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='register-button-login-page-div'>
        <button className="mentor-button-login-page" onClick={handleMentorLoginClick}>Mentor Girişi</button>
        <button className="register-button-login-page" onClick={handleSignupClick}>Kaydol</button>
      </div>
      <div className="login-container">
        <div className='logo-name'>
          <a href='/home'>MentUp</a>
        </div>
        <div className="login-box">
          <h1 className="login-title">MentUp’a Mentee Girişi</h1>
          <form>
            <div className="input-group">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Şifre</label>
              <div className="password-wrapper-login-page">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={faEye} style={{ fontSize: '18px' }} />
                </button>
              </div>
            </div>
            <div className="options">
              <label className="remember-me">
                <input type="checkbox" /> Beni Hatırla
              </label>
              <a href="#" className="forgot-password">Şifremi unuttum?</a>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="login-button-login-page"
              disabled={isLoading}
            >
              {isLoading ? "Yükleniyor..." : "GİRİŞ YAP"}
            </button>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
