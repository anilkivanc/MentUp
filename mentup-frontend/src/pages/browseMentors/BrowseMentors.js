import React, { useState, useRef, useEffect } from "react";
import "./BrowseMentors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../../components/NavBar/NavBar";

const BrowseMentors = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null); // Menülerin hangi index'inin açık olduğunu takip eder.
  const [selectedSkill, setSelectedSkill] = useState(""); // Seçilen beceri
  const [selectedValues, setSelectedValues] = useState({
    price: "",
    sessionDuration: "",
  });
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    month: "",
    day: "",
    time: "",
  });

  const menuRef = useRef(null); // Menüleri kapsayan referans

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index); // Aynı menüye tekrar tıklanırsa kapatılır
  };

  const handleSelection = (menuType, value) => {
    setSelectedValues({
      ...selectedValues,
      [menuType]: value,
    });
    setOpenMenuIndex(null); // Seçim yapıldığında menüyü kapat
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuIndex(null); // Menünün dışına tıklanınca menüyü kapat
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    {
      label: "Diller",
      options: ["Almanca" , "Arapça" , "Çince (Mandarin)" , "Fransızca" , "Hintçe" , "İngilizce" , "İspanyolca" , "İtalyanca" , "Japonca" , "Korece" , "Portekizce" , "Rusça" , "Türkçe"],
      type: "language",
    },
  ];

  const gameMentors = [
    {
      name: "William Johnson",
      title: "Web Geliştirici",
      description: "Unity ve Unreal Engine'de deneyimli, mobil ve PC oyunları geliştirmiştir.",
      image: require("../../images/mentor.png"), // kendi resim yolunuza göre ayarlayın
    },
  ];

  const handleSearch = () => {
    console.log("Arama işlemi başlatıldı!");
  };

  const handleScheduleClick = () => {
    setShowScheduler(!showScheduler); // Görüşme planla paneli açma/kapama
  };

  const handleDateChange = (e) => {
    setSelectedDate({
      ...selectedDate,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = () => {
    console.log("Planlanan Görüşme:", selectedDate);
    setShowScheduler(false);
  };

  // selectedSkill'in doğru şekilde ayarlandığını kontrol et
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

  return (
    <div className="browse-mentors-container">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="browse-mentors-form-div">
          <div className="browse-mentors-form">
            <h2 className="browse-mentors-form-title">Mentor Ara</h2>
            <div className="browse-mentors-search-bar">
              <div className="browse-mentors-search-input-wrapper">
                <input
                  type="text"
                  placeholder="Ada veya anahtar kelimeye göre arama yapın"
                />
                <button
                  className="browse-mentors-search-icon"
                  onClick={handleSearch}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: "black", fontSize: "16px" }}
                  />
                </button>
              </div>
              <div className="browse-mentors-search-filters" ref={menuRef}>
                <div className="browse-mentors-search-tags">
                  {menuData.map((menu, index) => (
                    <div key={index} className="browse-mentors-menu-filter">
                      <button
                        className={`browse-mentors-search-tag-${menu.type}`}
                        onClick={() => toggleMenu(index)}
                      >
                        <span>{menu.label}</span>
                        <span>
                          <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                      </button>
                      {openMenuIndex === index && (
                        <ul className={`browse-mentors-dropdown-menu-${menu.type}`}>
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
            </div>

            {/* Web Geliştirme seçildiğinde mentorların gözükmesini sağla */}
            {selectedSkill === "Web Geliştirme" && (
              <div className="mentor-list-container">
                {gameMentors.map((mentor, index) => (
                  <div key={index} className="mentor-card" style={{ display: "flex", gap: "16px" }}>
                    <div
                      className="mentor-image"
                      style={{ backgroundImage: `url(${mentor.image})` }}
                    ></div>
                    <div className="mentor-info">
                      <h3>{mentor.name}</h3>
                      <p className="mentor-title">{mentor.title}</p>
                      <p className="mentor-description">{mentor.description}</p>
                    </div>

                    {/* Görüşme Planla Butonu ve Seçim Alanı */}
                    <div className="mentor-actions">
                      <button onClick={handleScheduleClick} className="schedule-button">
                        Görüşme Planla
                      </button>

                      {showScheduler && (
                        <div className="scheduler-panel">
                          <select name="month" onChange={handleDateChange} defaultValue="">
                            <option value="" disabled>Ay Seç</option>
                            <option value="Nisan">Nisan</option>
                            <option value="Mayıs">Mayıs</option>
                          </select>

                          <select name="day" onChange={handleDateChange} defaultValue="">
                            <option value="" disabled>Gün Seç</option>
                            {[...Array(31)].map((_, i) => (
                              <option key={i} value={i + 1}>{i + 1}</option>
                            ))}
                          </select>

                          <select name="time" onChange={handleDateChange} defaultValue="">
                            <option value="" disabled>Saat Seç</option>
                            <option value="10:00">10:00-10.30</option>
                            <option value="13:00">13:00-13.30</option>
                            <option value="16:00">16:00-16.30</option>
                            <option value="19:00">19:00-19.30</option>
                          </select>

                          <button onClick={handleConfirm}>Onayla</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseMentors;
