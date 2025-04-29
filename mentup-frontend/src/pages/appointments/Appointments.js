import React from 'react';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için useNavigate
import './Appointments.css';
import NavBar2 from '../../components/NavBar2/Navbar2';

const Appointments = () => {
  const navigate = useNavigate(); // useNavigate hook'u

  const handleJoinMeeting = () => {
    // Görüşme sayfasına yönlendir
    navigate('/videochat'); // video-chat sayfasına yönlendireceğiz
  };

  const handleReviewClick = () => {
    navigate('/mentorreview')
  }

  return (
    <div className="appointments-container">
      <header>
        <NavBar2 />
      </header>
      <main>
        <div className="appointment-form-container">
          <div className="appointment-form-title-div">
            <h1 className="appointment-form-title">Planlanan Görüşmelerim</h1>
          </div>
          <div className="appointment-form">
            <h2 className="appointment-date-title">Nisan, 2025</h2>
            <div className="appointment-cards">
              <div className="appointment-card">
                <div className="appointment-image"></div>
                <div className="appointment-content">
                  <h3 className="appointment-title">
                    Yeni Web Sitemin Tasarımını Geliştirme
                  </h3>
                  <div className="appointment-mentor-details">
                    <p className="appointment-name">William Johnson</p>
                    <p className="appointment-job">Web Tasarımcı</p>
                  </div>
                  <div className="appointment-description">
                    <p className="appointment-date">
                      26 Nisan, Cumartesi, 19.00-19.30
                    </p>
                    <p className="appointment-time">30 dakika</p>
                    <p className="appointment-cost">Ücretsiz</p>
                    <div className="appointment-button-div">
                      <button className="message-button">Mesaj At</button>
                      <button
                        className="appointment-button"
                        onClick={handleJoinMeeting} // Butona tıklandığında handleJoinMeeting fonksiyonu çalışacak
                      >
                        Görüntülü Görüşmeye Katıl
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="appointment-form-container">
          <div className="appointment-form-title-div">
            <h1 className="appointment-form-title">Geçmiş Görüşmelerim</h1>
          </div>
          <div className="appointment-form">
            <h2 className="appointment-date-title">Mart, 2025</h2>
            <div className="appointment-cards">
              <div className="appointment-card">
                <div className="appointment-image"></div>
                <div className="appointment-content">
                  <h3 className="appointment-title">
                    Mobil oyunumun tasarımını geliştirme
                  </h3>
                  <div className="appointment-mentor-details">
                    <p className="appointment-name">Kyrie Irving</p>
                    <p className="appointment-job">Mobil Geliştirici</p>
                  </div>
                  <div className="appointment-description">
                    <p className="appointment-date">
                      14 Mart, Cuma, 18.00-18.30
                    </p>
                    <p className="appointment-time">30 dakika</p>
                    <p className="appointment-cost">Ücretsiz</p>
                    <div className="appointment-button-div">
                      <button
                        className="appointment-review-button"
                        onClick={handleReviewClick}
                      >
                        Görüşmeyi Değerlendir
                      </button>
                    </div>
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

export default Appointments;
