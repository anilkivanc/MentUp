import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ApplyMentorship.css'
import NavBar from "../../components/NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ApplyMentorship = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleCertificateClick = () => {
    // Butona tıklanıldığında dosya seçimini tetikleyin
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.filter(file => file.type === "application/pdf");

    if (newFiles.length !== files.length) {
      alert("Lütfen yalnızca PDF dosyası yükleyin.");
    }

    setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    fileInputRef.current.value = ""; // Aynı dosya tekrar seçilirse tetiklemek için temizle
  };

  const handleRemoveFile = (fileName) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };
  return (
    <div className="apply-mentorship-container">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="apply-mentorship-div">
          <h1 className="apply-mentorship-div-title">Mentorluk İçin Başvur</h1>
          <div className="apply-mentorship-form">
            <h2 className="apply-mentorship-form-title"></h2>
            <div className="apply-mentorship-infos">
              <div className="apply-mentorship-name">
                <label className="apply-mentorship-name-label">İsim</label>
                <input type="text" className="apply-mentorship-name-input"></input>
              </div>
              <div className="apply-mentorship-surname">
                <label className="apply-mentorship-surname-label">Soyisim</label>
                <input type="text" className="apply-mentorship-surname-input"></input>
              </div>
              <div className="apply-mentorship-age">
                <label className="apply-mentorship-age-label">Yaş</label>
                <input type="text" className="apply-mentorship-age-input"></input>
              </div>
              <div className="apply-mentorship-email">
                <label className="apply-mentorship-email-label">E-posta</label>
                <input type="text" className="apply-mentorship-email-input"></input>
              </div>
              <div className="apply-mentorship-exp">
                <label className="apply-mentorship-exp-label">Bilgisayar mühendisliği sektöründe kaç yıllık tecrübeniz var?</label>
                <input type="text" className="apply-mentorship-exp-input"></input>
              </div>
              <div className="apply-mentorship-why">
                <label className="apply-mentorship-why-label">Neden mentor olmak istiyorsunuz?</label>
                <input type="text" className="apply-mentorship-why-input"></input>
              </div>
              <div className="apply-mentorship-certificate">
                <label className="apply-mentorship-certificate-label">Bilgisayar mühendisliği alanında herhangi bir sertifikanız varsa yükleyin.</label>
                <button 
                  className="apply-mentorship-button-certificate" 
                  onClick={handleCertificateClick}
                >
                Dosya Seç
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="application/pdf"
                  multiple
                  onChange={handleFileChange}
                />
                {selectedFiles.length > 0 && (
                  <div className="selected-files-container">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="selected-file-item">
                        <span className="selected-file-name">{file.name}</span>
                        <button
                          className="remove-file-button"
                          onClick={() => handleRemoveFile(file.name)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}          
              </div>
              <div className="apply-mentorship-button-submit-div">
                <button type="submit" className="apply-mentorship-button-submit">Gönder</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    
  );
};
export default ApplyMentorship;