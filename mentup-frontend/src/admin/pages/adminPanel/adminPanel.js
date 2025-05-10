import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./adminPanel.css";

const AdminPanel = () => {
  const [applicants, setApplicants] = useState([]); // Başvuru verileri
  const [selectedApplicant, setSelectedApplicant] = useState(null); // Seçilen başvuru
  const [loading, setLoading] = useState(true); // Yüklenme durumu

  // Backend'den başvuru verilerini al
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:5001/admin/applications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Token ekleniyor
          },
        });
        setApplicants(response.data); // Başvuru verilerini kaydet
        setLoading(false);
      } catch (err) {
        console.error('Başvuru verileri alınamadı:', err);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []); // Boş dependency array ile sadece bir kere çalıştırılır

  const handleCardClick = (applicant) => {
    setSelectedApplicant(applicant); // Tıklanan başvuruyu seç
  };

  const handleCloseDetails = () => {
    setSelectedApplicant(null); // Detayları kapat
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('applicant-details')) {
      handleCloseDetails();
    }
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="admin-panel">
      <h2>Mentorluk Başvuruları</h2>
      <div className="applicant-cards">
        {applicants.map((applicant) => (
          <div 
            key={applicant.id}
            className="applicant-card"
            onClick={() => handleCardClick(applicant)}
          >
            <div className="applicant-card-image-content">
              <img 
                className="applicant-card-image" 
                src={applicant.profile?.photo_url || '/default-profile.png'} // Profil resmi
                alt={`${applicant.name} ${applicant.surname}`} 
              />
              <div className="applicant-card-content">
                <div className='applicant-card-name-age-div'>
                  <h3>{applicant.name}</h3>
                  <p>{applicant.age} yaşında</p>
                </div>
                <p className="applicant-card-email">{applicant.email}</p>
                <p>{applicant.skills}</p>
                <p>{applicant.languages}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detayları Göster */}
      {selectedApplicant && (
        <div className="applicant-details" onClick={handleOutsideClick}>
          <div className="admin-panel-form-card">
            {/* Sağ üstte X ikonu */}
            <button className="close-button" onClick={handleCloseDetails}>
              &times;
            </button>

            <div className="admin-panel-form-item">
              <label>İsim:</label>
              <p>{selectedApplicant.name}</p>
            </div>

            <div className="admin-panel-form-item">
              <label>Soyisim:</label>
              <p>{selectedApplicant.surname || "Belirtilmemiş"}</p>
            </div>

            <div className="admin-panel-form-item">
              <label>Yaş:</label>
              <p>{selectedApplicant.age}</p>
            </div>

            <div className="admin-panel-form-item">
              <label>E-posta:</label>
              <p>{selectedApplicant.email}</p>
            </div>

            <div className="admin-panel-form-item">
              <label>Diploma Numarası:</label>
              <p>{selectedApplicant.diploma_id}</p>
            </div>

            <div className="admin-panel-form-item">
              <label>Bilgisayar mühendisliği sektöründe kaç yıllık tecrübeniz var?</label>
              <p>{selectedApplicant.experience_years}</p>
            </div>

            <div className="admin-panel-form-item">
              <label>Neden mentor olmak istiyorsunuz?</label>
              <p>{selectedApplicant.why_mentor}</p>
            </div>

            <div className="admin-panel-form-item">
              <label>Özgeçmiş (CV):</label>
              <a href={selectedApplicant.cv_url} className="admin-panel-cv-link" target="_blank" rel="noopener noreferrer">
                CV'yi Görüntüle
              </a>
            </div>

            <div className="admin-panel-action-buttons">
              <button className="admin-button reject">Reddet</button>
              <button className="admin-button approve">Onayla</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
