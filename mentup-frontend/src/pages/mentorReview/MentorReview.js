import React from "react";
import './MentorReview.css';
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const MentorReview = () => {
  return (
    <div className="mentor-review-container">
      <header>
        <NavBar/>
      </header>
      <main>
        <div className="mentor-review-form-div">
          <h1 className="mentor-review-form-div-title">Mentor Değerlendirme</h1>
          <div className="mentor-review-form">
            <h2 className="mentor-review-form-title">Görüşmeniz hakkında geri bildirimde bulunun</h2>
            <div className="mentor-review-infos">
              <div className="mentor-review-q1">
                <label className="mentor-review-q1-label">Mentorun iletişim becerilerini nasıl değerlendirirsiniz? (açıklık, anlaşılabilirlik, samimiyet vb.)</label>
                <input className="mentor-review-q1-input"></input>
              </div>
              <div className="mentor-review-q2">
                <label className="mentor-review-q2-label">Mentor, deneyimlerini ve bilgilerini sizinle etkili bir şekilde paylaştı mı?</label>
                <input className="mentor-review-q2-input"></input>
              </div>
              <div className="mentor-review-q3">
                <label className="mentor-review-q3-label">Görüşme süresi verimli bir şekilde kullanıldı mı?</label>
                <input className="mentor-review-q3-input"></input>
              </div>
              <div className="mentor-review-q4">
                <label className="mentor-review-q4-label">Görüşme sizin için faydalı oldu mu?</label>
                <input className="mentor-review-q4-input"></input>
              </div>
              <div className="mentor-review-q5">
                <label className="mentor-review-q5-label">Görüşme sırasında yönlendirmeler ve öneriler ne kadar yararlıydı?</label>
                <input className="mentor-review-q5-input"></input>
              </div>
              <div className="mentor-review-q6">
                <label className="mentor-review-q6-label">Gelecekte bu mentorla tekrar görüşmeyi ister misiniz?</label>
                <input className="mentor-review-q6-input"></input>
              </div>
              <div className="mentor-review-q7">
                <label className="mentor-review-q7-label">Görüşme hakkında eklemek istediğiniz herhangi bir şey var mı?</label>
                <input className="mentor-review-q7-input"></input>
              </div>
              <div className="mentor-review-button-div">
                <button className="mentor-review-button-submit">Gönder</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default MentorReview;