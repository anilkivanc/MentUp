import React, { useState } from "react";
import './MentorReview.css';

const MentorReview = () => {
  // Sorulardan gelen cevaplar için state'ler
  const [answers, setAnswers] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
    q6: 0,
  });

  const [comment, setComment] = useState(''); // Açık uçlu soru cevabı

  // Puanları değiştiren fonksiyon
  const handleAnswerChange = (question, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: value,
    }));
  };

  // Ortalama ratingi hesaplayan fonksiyon
  const calculateRating = () => {
    const total = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    return (total / 6).toFixed(2); // 6 soru olduğu için 6'ya böleceğiz
  };

  // Tüm soruların cevaplanıp cevaplanmadığını kontrol eden fonksiyon
  const areAllQuestionsAnswered = () => {
    return Object.values(answers).every((value) => value > 0); // Tüm cevaplar 0'dan büyük olmalı
  };

  // Kaydet butonuna basıldığında çalışacak fonksiyon
  const handleSubmit = () => {
    if (!areAllQuestionsAnswered()) {
      alert("Lütfen tüm soruları cevaplayın.");
      return;
    }

    // Eğer tüm sorular cevaplanmışsa, burada backend'e veri gönderme işlemi yapılabilir
    alert("Değerlendirme başarıyla gönderildi!");
    console.log("Cevaplar:", answers);
    console.log("Yorum:", comment);
  };

  return (
    <div className="mentor-review-container">
      <header></header>
      <main>
        <div className="mentor-review-form-div">
          <h1 className="mentor-review-form-div-title">Mentor Değerlendirme</h1>
          <div className="mentor-review-form">
            <h2 className="mentor-review-form-title">
              Görüşmeniz hakkında geri bildirimde bulunun
            </h2>
            <p className="mentor-review-info-text">
              Aşağıdaki soruları değerlendirirken lütfen her bir madde için 1
              ile 5 arasında bir puan verin.
              <br />
              <strong>1 = Çok Kötü</strong>,<strong> 2 = Kötü</strong>,
              <strong> 3 = Orta</strong>,<strong> 4 = İyi</strong>,
              <strong> 5 = Çok İyi</strong>
            </p>
            <div className="mentor-review-infos">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className={`mentor-review-q${num}`}>
                  <label className={`mentor-review-q${num}-label`}>
                    {
                      [
                        "Mentorun iletişim becerilerini nasıl değerlendirirsiniz? (açıklık, anlaşılabilirlik, samimiyet vb.)",
                        "Mentor, deneyimlerini ve bilgilerini sizinle etkili bir şekilde paylaştı mı?",
                        "Görüşme süresi verimli bir şekilde kullanıldı mı?",
                        "Görüşme sizin için faydalı oldu mu?",
                        "Görüşme sırasında yönlendirmeler ve öneriler ne kadar yararlıydı?",
                        "Gelecekte bu mentorla tekrar görüşmeyi ister misiniz?",
                      ][num - 1]
                    }
                  </label>
                  <div className="mentor-review-radio-group">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <label key={val} className="radio-option">
                        <input
                          type="radio"
                          name={`q${num}`}
                          value={val}
                          onChange={() => handleAnswerChange(`q${num}`, val)}
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
                <textarea
                  className="mentor-review-q7-textarea"
                  rows="4"
                  placeholder="Yorumunuzu yazın..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div className="mentor-review-button-div">
                <button
                  className="mentor-review-button-submit"
                  onClick={handleSubmit}
                >
                  Gönder
                </button>
              </div>

              <div className="mentor-review-rating">
                <h3>Değerlendirme Ratingi: {calculateRating()} / 5</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorReview;
