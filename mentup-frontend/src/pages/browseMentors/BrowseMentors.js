import React, { useState, useRef, useEffect } from "react";
import "./BrowseMentors.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const BrowseMentors = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null); // Menülerin hangi index'inin açık olduğunu takip eder.
  const [selectedValues, setSelectedValues] = useState({
    price: "",
    sessionDuration: "",
    // Diğer menüler için buraya alanlar ekleyebilirsiniz.
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
      options: ["Web Geliştirme", "Oyun Geliştirme"],
      type: "skills",
    },
    {
      label: "Yazılım Dilleri",
      options: ["C", "C#", "C++", "Python"],
      type: "skills",
    },
    {
      label: "Fiyat",
      options: ["Ücretsiz", "<5$", "5-10$", ">10$"],
      type: "price",
    },
    {
      label: "Oturum Süresi",
      options: ["15 dk", "30 dk", "45 dk", "60 dk"],
      type: "sessionDuration",
    },
    {
      label: "Diller",
      options: ["Türkçe", "İngilizce", "Almanca", "Fransızca"],
      type: "language",
    },
    {
      label: "Ülke",
      options: ["Türkiye", "ABD", "Almanya", "Fransa"],
      type: "country",
    },
    {
      label: "Şehir",
      options: ["Ankara", "İstanbul", "Berlin", "Paris"],
      type: "city",
    },
  ];

  const handleSearch = () => {
    console.log("Arama işlemi başlatıldı!");
  };

  return (
    <div className="browse-mentors-container">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="browse-mentors-form-div">
          <div className="browse-mentors-form">
            <h2 className="browse-mentors-form-title">Mentorlar</h2>
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
                    <div key={index} className="menu-filter">
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
                        <ul className={`dropdown-menu-${menu.type}`}>
                          {menu.options.map((option, i) => (
                            <li
                              key={i}
                              onClick={() => handleSelection(menu.type, option)}
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseMentors;