import React from "react";
import "./Pricing.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from "../../components/NavBar/NavBar";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
// import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons/faMoneyCheckDollar";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

const Pricing = () => {
  return (
    <div className="membership-container-all">
      <header>
        <NavBar/>
      </header>
    <div className="membership-container">
      <h1>Üyeliklerimiz</h1>
      <div className="membership-cards">
        <div className="membership-card-free">
          <h2>Ücretsiz</h2>
          <p className="membership-free-p">$0<span>/ay</span></p>
          <h3>Platformu deneyimlemek için harika bir seçenek!</h3>
          <ul>
            <li><FontAwesomeIcon icon={faMicrophone} style={{color: 'black', fontSize: '16px', marginRight: '6px' }} />Aylık 2 görüşme hakkı</li>
            <li><FontAwesomeIcon icon={faComments} style={{color: 'black', fontSize: '16px' }} /> Mentor ile mesajlaşma desteği</li>
            <li><FontAwesomeIcon icon={faVideo} style={{color: 'black', fontSize: '16px', marginRight: '6px' }}/>Mentor ile görüntülü görüşme desteği</li>
          </ul>
          <button className= "membership-button-free">Başlayın</button>
        </div>

        {/* <div className="membership-card-premium">
          <h2>Premium</h2>
          <p className="membership-premium-p">$30<span>/ay</span></p>
          <h3>Sınırsız ve ücretsiz görüşme imkanı!</h3>
          <ul>
            <li><FontAwesomeIcon icon={faMicrophone} style={{color: 'white', fontSize: '16px', marginRight: '6px' }} />Sınırsız görüşme hakkı</li>
            <li><FontAwesomeIcon icon={faComments} style={{color: 'white', fontSize: '16px', marginRight: '6px' }} />Mentor ile mesajlaşma desteği</li>
            <li><FontAwesomeIcon icon={faVideo} style={{color: 'white', fontSize: '16px', marginRight: '6px' }}  />Mentor ile görüntülü görüşme desteği</li>
            <li><FontAwesomeIcon icon={faMoneyCheckDollar} style={{color: 'white', fontSize: '16px', marginRight: '6px' }} />Ücretli görüşmelere ücretsiz katılım</li>
          </ul>
          <button className= "membership-button-premium">Başlayın</button>
        </div> */}
      </div>
    </div>
  </div>

  );
};

export default Pricing;
