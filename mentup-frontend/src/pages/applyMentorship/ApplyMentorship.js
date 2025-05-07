import React, { useRef, useState } from "react";
import './ApplyMentorship.css'
import NavBar from "../../components/NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const ApplyMentorship = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null); // Menülerin hangi index'inin açık olduğunu takip eder.
  const [selectedSkill, setSelectedSkill] = useState(""); // Seçilen beceri
  const [selectedValues, setSelectedValues] = useState({
    price: "",
    sessionDuration: "",
  });

  const menuRef = useRef(null); // Menüleri kapsayan referans

  const menuData = [
    {
      label: "Beceri Alanları",
      options: ["Yazılım Geliştirme", "Web Teknolojileri" , "Mobil Teknolojiler","Oyun Geliştirme","Veritabanı ve Backend" , "Yapay Zeka & Veri Bilimi" , "Veri Analizi & BI" , "Tasarım & UI/UX" , "Pazarlama & İş Geliştirme"],
      type: "skills",
    },
    {
      label: "Yazılım Dilleri",
      options: ["C", "C++", "C#", "CSS", "HTML" , "Java" , "JavaScript" , "Kotlin" , "PHP" , "Python" , "R" , "TypeScript"] ,
      type: "skills",
    },
  ];

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index); // Aynı menüye tekrar tıklanırsa kapatılır
  };

  const handleSkillSelection = (menuType, value) => {
    console.log("Selected Skill:", value); // console.log ekleyerek hangi becerinin seçildiğini kontrol et
    setSelectedValues({
      ...selectedValues,
      [menuType]: value,
    });
    if (menuType === "skills") {
      setSelectedSkill(value); // Sadece beceri seçimi için ayrı takip
    }
    setOpenMenuIndex(null);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuIndex(null); // Menünün dışına tıklanınca menüyü kapat
    }
  };
  

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
            <div className="apply-mentorship-infos">
              <div className="apply-mentorship-name-surname-div">
                <div className="apply-mentorship-name">
                  <label className="apply-mentorship-name-label">İsim</label>
                  <input type="text" className="apply-mentorship-name-input"></input>
                </div>
                <div className="apply-mentorship-surname">
                  <label className="apply-mentorship-surname-label">Soyisim</label>
                  <input type="text" className="apply-mentorship-surname-input"></input>
                </div>
              </div>
              <div className="apply-mentorship-age-diploma-div">
                <div className="apply-mentorship-age">
                  <label className="apply-mentorship-age-label">Yaş</label>
                  <input type="text" className="apply-mentorship-age-input"></input>
                </div>
                <div className="apply-mentorship-diploma">
                  <label className="apply-mentorship-diploma-label">Diploma Numarası</label>
                  <input type="text" className="apply-mentorship-diploma-input"></input>
                </div>
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

                            <div className="apply-mentorship-search-filters" ref={menuRef}>
                              <div className="apply-mentorship-search-tags">
                                {menuData.map((menu, index) => (
                                  <div key={index} className="apply-mentorship-menu-filter">
                                    <button
                                      className={`apply-mentorship-search-tag-${menu.type}`}
                                      onClick={() => toggleMenu(index)}
                                    >
                                      <span>{menu.label}</span>
                                      <span>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                      </span>
                                    </button>
                                    {openMenuIndex === index && (
                                      <ul className={`apply-mentorship-dropdown-menu-${menu.type}`}>
                                        {menu.options.map((option, i) => (
                                          <li
                                            key={i}
                                            onClick={() => handleSkillSelection(menu.type, option)}
                                          >
                                            {option}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

              <div className="apply-mentorship-certificate">
                <label className="apply-mentorship-certificate-label">Lütfen Özgeçmişinizi(CV) yükleyiniz.</label>
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