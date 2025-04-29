import React from "react";
import './MentorReview.css';
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
      <p className="mentor-review-info-text">
        Aşağıdaki soruları değerlendirirken lütfen her bir madde için 1 ile 5 arasında bir puan verin. 
        <br />
        <strong>1 = Çok Kötü</strong>,
        <strong> 2 = Kötü</strong>,
        <strong> 3 = Orta</strong>,
        <strong> 4 = İyi</strong>,
        <strong> 5 = Çok İyi</strong>
      </p>
      <div className="mentor-review-infos">

        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className={`mentor-review-q${num}`}>
            <label className={`mentor-review-q${num}-label`}>
              {[
                "Mentorun iletişim becerilerini nasıl değerlendirirsiniz? (açıklık, anlaşılabilirlik, samimiyet vb.)",
                "Mentor, deneyimlerini ve bilgilerini sizinle etkili bir şekilde paylaştı mı?",
                "Görüşme süresi verimli bir şekilde kullanıldı mı?",
                "Görüşme sizin için faydalı oldu mu?",
                "Görüşme sırasında yönlendirmeler ve öneriler ne kadar yararlıydı?",
                "Gelecekte bu mentorla tekrar görüşmeyi ister misiniz?",
              ][num - 1]}
            </label>
            <div className="mentor-review-radio-group">
              {[1, 2, 3, 4, 5].map((val) => (
                <label key={val} className="radio-option">
                  <input
                    type="radio"
                    name={`q${num}`}
                    value={val}
                  />
                  {val}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="mentor-review-q7">
          <label className="mentor-review-q7-label">
            Görüşme hakkında eklemek istediğiniz herhangi bir şey var mı?
          </label>
          <textarea className="mentor-review-q7-textarea" rows="4" placeholder="Yorumunuzu yazın..." />
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