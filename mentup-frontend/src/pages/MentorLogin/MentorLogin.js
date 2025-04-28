import React, { useState } from 'react';
import "./MentorLogin.css";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const MentorLogin = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  return (

    <div>
      <div className="mentor-login-container" >
        <div className="logo-name">
          <a href="/home">MentUp</a>
        </div>
        <div className="mentor-login-box">
          <h1 className="mentor-login-title">Mentor Girişi</h1>
          <form>
            <div className="form-group-mentor-login">
              <label htmlFor="email">E-posta</label>
              <input type="email" id='email' required></input>
            </div>
            <div className="form-group-mentor-login">
              <label htmlFor="password">Şifre</label>
              <div className='password-wrapper-mentor-page'>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
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
            <button type="submit" className="login-button-mentor-page">Giriş Yap</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default MentorLogin;