import React from "react";
import { useState } from "react";
import './ProfilePhotoUpload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const ProfilePhotoUpload = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handlePhotoButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-photo-card">
    <div>
      <div className="profile-photo">
        {profilePhoto ? (
          <img
            src={profilePhoto}
            alt="Profil"
            className="profile-photo-preview"
          />
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
          onClick={handlePhotoButtonClick}
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