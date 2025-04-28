import React from "react";
import './AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faUserGraduate, faHandshake, faLightbulb, faUsers } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../../components/NavBar/NavBar';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="about-us-div">
          <h1 className="about-us-div-title">Hakkımızda</h1>
          <div className="about-us-form">
            <section className="about-us-section">
              <h2 className="about-us-form-mission-title">
                <FontAwesomeIcon icon={faLightbulb} style={{ marginRight: "10px", color: "#6938ef" }} />
                Misyon
              </h2>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faCircle} className="list-icon" />
                  Eğitim ve rehberlik alanında mentorlarla öğrencileri bir araya getirerek, öğrencilere kişisel ve profesyonel gelişimlerinde destek sağlamak.
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} className="list-icon" />
                  Herkesin eşit fırsatlarla ilham alabileceği ve kendini geliştirebileceği bir mentorluk platformu sunmak.
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} className="list-icon" />
                  Öğrencilerin kariyer hedeflerine ulaşmasını kolaylaştırırken, mentorlara bilgi ve deneyimlerini paylaşma fırsatı vermek.
                </li>
              </ul>
            </section>

            <section className="about-us-section">
              <h2 className="about-us-form-vision-title">
                <FontAwesomeIcon icon={faUserGraduate} style={{ marginRight: "10px", color: "#6938ef" }} />
                Vizyon
              </h2>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faCircle} className="list-icon" />
                  Küresel çapta lider bir mentorluk platformu haline gelerek, milyonlarca öğrenciye ve mentora ulaşmak.
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} className="list-icon" />
                  Eğitim ve kariyer alanında fırsat eşitliğini destekleyen, güvenilir ve yenilikçi bir platform oluşturmak.
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} className="list-icon" />
                  Teknoloji ve insan bağlantısını birleştirerek, mentorluk süreçlerini daha etkili ve erişilebilir kılmak.
                </li>
              </ul>
            </section>

            <section className="about-us-section">
              <h2 className="about-us-form-values-title">
                <FontAwesomeIcon icon={faHandshake} style={{ marginRight: "10px", color: "#6938ef" }} />
                Değerlerimiz
              </h2>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faCircle} className="list-icon" />
                  Şeffaflık: İş süreçlerinde açık ve dürüst iletişim.
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} className="list-icon" />
                  Çeşitlilik: Tüm bireylere eşit fırsatlar sunma.
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircle} className="list-icon" />
                  Yenilikçilik: Teknolojik gelişmeleri yakından takip ederek sürekli gelişim sağlama.
                </li>
              </ul>
            </section>

            <section className="about-us-section">
              <h2 className="about-us-form-team-title">
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: "10px", color: "#6938ef" }} />
                Ekibimiz
              </h2>

              <ul>
                <li><strong>Anıl Kıvanç Özçelik</strong></li>
                <li><strong>Buğra Batur</strong></li>
                <li><strong>Doğukan Hayvar</strong></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;