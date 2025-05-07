import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Başvuruların verisi (örnek)
  const applicants = [
    {
      id: 1,
      name: "William Johnson",
      age: "32 yaşında",
      email: "ahmetyilmaz@example.com",
      diploma_id: "123456789",
      industries: "Web Tasarım",
      languages: "Python",

    },
    // Diğer başvurular...
  ]; 

  const navigate = useNavigate();


  // const handleCardClick = (applicant) => {
  //   setSelectedApplicant(applicant);
  // };
  
  const handleCardClick = () => {
    navigate("/adminpanel");
  };

  return (
    <div className="admin-dashboard">
      <h2>Mentorluk Başvuruları</h2>
      <div className="applicant-cards">
        {applicants.map((applicant) => (
          <div 
            key={applicant.id}
            className="applicant-card"
            // onClick={() => handleCardClick(applicant)}
            onClick={handleCardClick}
          >
            <div className='applicant-card-image-content'>
              <div className='applicant-card-image'/>
              <div className='applicant-card-content'>
                <h3>{applicant.name}</h3>
                <p className='applicant-card-email'> {applicant.email}</p>
                <p>{applicant.age}</p>
                <p>{applicant.diploma_id}</p>
                <p>{applicant.exp}</p>
                <p>{applicant.industries}</p>
                <p>{applicant.languages}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detayları Göster */}
      {selectedApplicant && (
        <div className="applicant-details">
          <h3>Başvuru Detayları</h3>
          <p><strong>İsim:</strong> {selectedApplicant.name}</p>
          <p><strong>Soyisim:</strong> {selectedApplicant.title}</p>
          <p><strong>Yaş:</strong> 32</p>
          <p><strong>Email:</strong> {selectedApplicant.email}</p>
          <p><strong>Diploma Numarası:</strong> 123456789</p>
          <p><strong>Tecrübe:</strong> 8 yıl</p>
          <p><strong>CV:</strong> <a href={selectedApplicant.cv}>CV'yi Görüntüle</a></p>
          <p><strong>Başvuru Nedeni:</strong> {selectedApplicant.reason}</p>
          <button>Reddet</button>
          <button>Onayla</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
