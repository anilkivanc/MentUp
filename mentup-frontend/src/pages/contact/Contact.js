import React from "react";
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFaceGrinBeam } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="contact-container">
      <header>
      </header>
      <main>
        <div className="contact-div">
          <h1 className="contact-title">İletişim Bilgilerimiz</h1>
          <div className="contact-form">
            <h2 className="contact-form-title">Bizimle İletişime Geç!</h2>
            <h3 className="contact-form-info-text">
              Herhangi bir sorunuz, yaşadığınız bir problem ya da öneriniz varsa bizimle iletişime geçmekten çekinmeyin. Size en kısa sürede yardımcı olmaktan mutluluk duyarız.
            </h3>

            <div className="contact-form-section">
              <h4>E-Posta</h4>
              <a>mentup24@gmail.com</a>
            </div>

            <div className="contact-form-section">
              <h4>Telefon</h4>
              <a>0544 899 27 05</a>
            </div>

            <div className="contact-form-section">
              <h4>Sosyal Medya</h4>
              <div className="contact-form-social-media">
                <a href="#" >
                  <FontAwesomeIcon icon={faInstagram} />
                  Mentup
                </a>
                <a href="#" >
                  <FontAwesomeIcon icon={faTwitter} />
                  Mentup
                </a>
              </div>
            </div>

            <div className="contact-form-office-hours">
              <a>Destek ekibimiz haftaiçi 09:00 - 18:00 saatleri arasında hizmetinizdedir.</a>
              <a>Mesajlarınız en geç 24 saat içerisinde yanıtlanacaktır.</a>
            </div>

            <div className="contact-form-thanks">
              <a>Teşekkürler! <FontAwesomeIcon icon={faFaceGrinBeam} /></a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;