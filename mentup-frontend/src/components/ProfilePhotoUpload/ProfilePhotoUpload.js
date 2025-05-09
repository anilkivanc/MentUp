import React, { useState, useEffect } from "react";
import './ProfilePhotoUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const ProfilePhotoUpload = ({ onPhotoChange, profilePhoto }) => {  // props ile profilePhoto alıyoruz
  const [selectedPhoto, setSelectedPhoto] = useState(profilePhoto || null);

  useEffect(() => {
    setSelectedPhoto(profilePhoto);
  }, [profilePhoto]);

  // Fotoğraf değiştiğinde, üst bileşene fotoğraf URL'sini iletiyoruz
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const photoUrl = reader.result;
        setSelectedPhoto(photoUrl);  // Seçilen fotoğrafı state'e kaydediyoruz
        if (onPhotoChange) onPhotoChange(photoUrl);  // Fotoğrafı üst bileşene iletiyoruz
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-photo-card">
      <div>
        <div className="profile-photo">
          {selectedPhoto ? (
            <img src={selectedPhoto} alt="Profil" className="profile-photo-preview" />
          ) : (
            <FontAwesomeIcon icon={faCircleUser} className="profile-photo-icon" />
          )}
        </div>
        <div className="profile-photo-text">
          <h3 className="profile-photo-text-info">Profil Resmini Değiştir</h3>
          <p className="profile-photo-text-constraint">
            Resim
            <strong className="text-grey"> .jpg </strong>
            veya
            <strong className="text-grey"> .png </strong>
            formatında olmalıdır.
          </p>
        </div>
        <div className="profile-photo-upload">
          <button
            className="profile-photo-button-upload"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Resim Yükle
          </button>
          <input
            id="fileInput"
            type="file"
            accept=".jpg,.png"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
