import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./ApplyMentorship.css";

const CustomDropdown = ({ options, selectedOptions, setSelectedOptions, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".custom-dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="custom-dropdown">
      <label className="custom-dropdown-label">{label}</label>
      <div className="custom-dropdown-input" onClick={toggleDropdown}>
        {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Seçim yapın"}
      </div>
      {isOpen && (
        <div className="custom-dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className={`custom-dropdown-option ${
                selectedOptions.includes(option) ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ApplyMentorship = () => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [degreeNumber, setDegreeNumber] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [whyMentor, setWhyMentor] = useState("");
  const [hasApplied, setHasApplied] = useState(false);

  const skillOptions = [
    "Yazılım Geliştirme",
    "Web Teknolojileri",
    "Mobil Teknolojiler",
    "Oyun Geliştirme",
    "Veritabanı ve Backend",
    "Yapay Zeka & Veri Bilimi",
    "Veri Analizi & BI",
    "Tasarım & UI/UX",
    "Pazarlama & İş Geliştirme",
  ];

  const languageOptions = [
    "C",
    "C++",
    "C#",
    "CSS",
    "HTML",
    "Java",
    "JavaScript",
    "Kotlin",
    "PHP",
    "Python",
    "R",
    "TypeScript",
  ];

  // Kullanıcı bilgilerini backend'den al
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

        // Kullanıcının başvuru durumu kontrolü
    axios
      .get("http://localhost:5001/mentor/check-application", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setHasApplied(response.data.hasApplied);
      })
      .catch((err) => {
        console.error("Başvuru durumu alınamadı:", err);
      });

    axios
      .get("http://localhost:5001/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data;
        const profile = user.profile || {};

        setName(user.name || "");
        setSurname(user.surname || "");
        setEmail(user.email || "");
      })
      .catch((err) => {
        console.error("Kullanıcı bilgileri alınamadı:", err);
      });
  }, []);

  const handleCertificateClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.filter((file) => file.type === "application/pdf");

    if (newFiles.length !== files.length) {
      alert("Lütfen yalnızca PDF dosyası yükleyin.");
    }

    setSelectedFiles(newFiles); // Sadece bir dosya seçildiği için önceki dosyaları temizliyoruz
    fileInputRef.current.value = ""; // Aynı dosya tekrar seçilirse tetiklemek için temizle
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFiles.length === 0) {
      alert("Lütfen bir CV dosyası yükleyin.");
      return;
    }

    if (hasApplied) {
      alert("Daha önce başvuru yapmışsınız.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("degree_number", degreeNumber);
    formData.append("experience_years", experienceYears);
    formData.append("why_mentor", whyMentor);
    formData.append("skills", JSON.stringify(selectedSkills)); // Array'i JSON string'e dönüştür
    formData.append("languages", JSON.stringify(selectedLanguages)); // Array'i JSON string'e dönüştür
    formData.append("cv", selectedFiles[0]); // İlk dosyayı ekle

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5001/mentor/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Başvurunuz başarıyla gönderildi!");
      console.log("Başvuru yanıtı:", response.data);
    } catch (err) {
      console.error("Başvuru gönderilemedi:", err.response?.data || err.message);
      alert("Başvuru sırasında bir hata oluştu.");
    }
  };

  const handlCancelApplication = async () => {

  }

  return (
    <div className="apply-mentorship-container">
      <header>
      </header>
      <main>
        <div className="apply-mentorship-div">
          {hasApplied ? (
            <div className="apply-mentorship-div-title">
              <h1>
                Zaten bir başvuru yaptınız. Yeni bir başvuru yapamazsınız.
              </h1>
              <p>
                Değişiklik yapmak isterseniz mentup24@gmail.com mail adresine mail atabilirsiniz.
              </p>

              <button
                onClick={handlCancelApplication}
              >
                Başvurumu İptal Et
              </button>
            </div>
                       
          ) : (
            <form className="apply-mentorship-form" onSubmit={handleSubmit}>
              <div className="apply-mentorship-infos">
                <div className="apply-mentorship-name-surname-div">
                  <div className="apply-mentorship-name">
                    <label className="apply-mentorship-name-label">İsim</label>
                    <input
                      type="text"
                      className="apply-mentorship-name-input"
                      value={name}
                      readOnly // Değiştirilemez
                    />
                  </div>
                  <div className="apply-mentorship-surname">
                    <label className="apply-mentorship-surname-label">Soyisim</label>
                    <input
                      type="text"
                      className="apply-mentorship-surname-input"
                      value={surname}
                      readOnly // Değiştirilemez
                    />
                  </div>
                </div>
                <div className="apply-mentorship-email">
                  <label className="apply-mentorship-email-label">E-posta</label>
                  <input
                    type="text"
                    className="apply-mentorship-email-input"
                    value={email}
                    readOnly // Değiştirilemez
                  />
                </div>

                <div className="apply-mentorship-age-diploma-div">
                  <div className="apply-mentorship-age">
                    <label className="apply-mentorship-age-label">Yaş</label>
                    <input
                      type="text"
                      className="apply-mentorship-age-input"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="apply-mentorship-diploma">
                    <label className="apply-mentorship-diploma-label">Diploma Numarası</label>
                    <input
                      type="text"
                      className="apply-mentorship-diploma-input"
                      value={degreeNumber}
                      onChange={(e) => setDegreeNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="apply-mentorship-exp">
                  <label className="apply-mentorship-exp-label">
                    Bilgisayar mühendisliği sektöründe kaç yıllık tecrübeniz var?
                  </label>
                  <input
                    type="text"
                    className="apply-mentorship-exp-input"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                  />
                </div>
                <div className="apply-mentorship-why">
                  <label className="apply-mentorship-why-label">Neden mentor olmak istiyorsunuz?</label>
                  <input
                    type="text"
                    className="apply-mentorship-why-input"
                    value={whyMentor}
                    onChange={(e) => setWhyMentor(e.target.value)}
                  />
                </div>

                {/* Beceri Alanları */}
                <CustomDropdown
                  options={skillOptions}
                  selectedOptions={selectedSkills}
                  setSelectedOptions={setSelectedSkills}
                  label="Beceri Alanları"
                />

                {/* Yazılım Dilleri */}
                <CustomDropdown
                  options={languageOptions}
                  selectedOptions={selectedLanguages}
                  setSelectedOptions={setSelectedLanguages}
                  label="Yazılım Dilleri"
                />

                <div className="apply-mentorship-certificate">
                  <label className="apply-mentorship-certificate-label">
                    Lütfen Özgeçmişinizi(CV) yükleyiniz.
                  </label>
                  <button
                    className="apply-mentorship-button-certificate"
                    type="button"
                    onClick={handleCertificateClick}
                  >
                    Dosya Seç
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                  {selectedFiles.length > 0 && (
                    <div className="selected-files-container">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="selected-file-item">
                          <span className="selected-file-name">{file.name}</span>
                          <button
                            className="remove-file-button"
                            type="button"
                            onClick={() => setSelectedFiles([])}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="apply-mentorship-button-submit-div">
                  <button type="submit" className="apply-mentorship-button-submit">
                    Gönder
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default ApplyMentorship;