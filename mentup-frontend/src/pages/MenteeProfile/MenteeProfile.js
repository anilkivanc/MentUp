import { useState, useEffect } from "react";
import axios from 'axios';
import "./MenteeProfile.css";
import NavBar2 from "../../components/NavBar2/Navbar2";
import ProfileSettingsBar from "../../components/ProfileSettingsBar/ProfileSettingsBar";
import ProfilePhotoUpload from "../../components/ProfilePhotoUpload/ProfilePhotoUpload";

const MenteeProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  // const [user, setUser] = useState(null);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [occupation, setOccupation] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const [skills, setSkills] = useState("");

  const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
    "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
    "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri",
    "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
    "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
    "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
    "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
    "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye",
    "Düzce"
  ];
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
  
    axios
      .get("http://localhost:5001/profile/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const user = res.data;
        const profile = user.profile || {};
  
        setName(user.name || "");
        setSurname(user.surname || "");
        setOccupation(profile.occupation || "");
        setBirthPlace(profile.birth_place || "");
        setLocation(profile.location || "");
        setLanguages(profile.languages || "");
        setProfilePhoto(profile.photo_url || null);
        setTokenChecked(true);
      })
      .catch((err) => {
        console.error("Profil verisi alınamadı:", err);
      });
  }, []);
  

  if (!tokenChecked) return <p>Yükleniyor...</p>;

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put("http://localhost:5001/profile/me", {
        photo_url: profilePhoto, // 👈 burada ekledik
        occupation,
        birth_place: birthPlace,
        location,
        languages,
        skills
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      alert("Profil güncellendi");
    } catch (err) {
      // console.error("Profil güncelleme hatası:", err);
      console.error("Profil güncelleme hatası:", err.response?.data || err.message);
      alert("Hata oluştu");
    }
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

  const handlePhotoButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="mentee-profile-container">
      <header>
        <NavBar2/>
      </header>

      <main>
        <div className="mentee-profile-form">
          <h1 className="mentee-profile-title">Ayarlar</h1>
          <div className="all-settings-form">
            <div className="photo-settings-card">
              <ProfilePhotoUpload/>
              <ProfileSettingsBar/>
            </div>  
          <div>
            <div className="profile-settings-form">
              <h2 className="profile-settings-form-title">Profil Ayarları</h2>
              <h6 className="required-info-text">Yanında * sembolü olan yerlerin doldurulması zorunludur.</h6>
              <div className="profile-settings-infos">
                <div className="profile-settings-name-surname">
                  <div className="profile-settings-name">
                    <label className="profile-settings-name-label">İsim</label>
                    <span className="span-required"> *</span>
                    <div className="profile-settings-name-input-div">
                      <input 
                      type="text" 
                      className="profile-settings-name-input" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder = " John"
                      ></input>
                    </div>
                  </div>
                  <div className="profile-settings-surname">
                    <label className="profile-settings-surname-label">Soyisim</label>
                    <span className="span-required"> *</span>
                    <div className="profile-settings-surname-input-div">
                      <input 
                      type="text" 
                      className="profile-settings-surname-input" 
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="  Doe"></input>
                    </div>
                  </div>
                </div>
                {/* <div className="profile-settings-display-name">
                  <label className="profile-settings-display-name-label">Görünen İsim</label>
                  <span className="span-required"> *</span>
                  <div className="profile-settings-display-name-input-div">
                    <input type="text" className="profile-settings-display-name-input" placeholder="  John_Doe"></input>
                  </div>
                </div> */}
                <div className="profile-settings-profession">
                  <label 
                  className="profile-settings-profession-label"
                  >Okuduğunuz/Mezun Olduğunuz Okul</label>
                  {/* <span className="span-required"> *</span> */}
                  <div className="profile-settings-profession-input-div">
                    <input 
                    type="text" 
                    value={occupation}
                    className="profile-settings-profession-input"
                    onChange={(e) => setOccupation(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="profile-settings-hometown-location">
                  <div className="profile-settings-location">
                    <label className="profile-settings-location-label">Yaşadığınız Şehir</label>
                    <span className="span-required"> *</span>
                    {/* <input type="text" className="profile-settings-location-input"></input> */}
                    <select 
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="profile-settings-industries-input"
                    >
                    <option value="" disabled>Şehir Seçin</option>
                      {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  </div>
                </div>
                <div className="profile-settings-industries">
                  <label className="profile-settings-industries-label">Yazılım Dilleri</label>
                  <select 
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="profile-settings-industries-input"
                  >
                    <option value="" disabled>Yazılım Dillerinizi Seçin</option>
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                    <option value="C#">C#</option>
                    <option value="CSS">CSS</option>
                    <option value="HTML">HTML</option>
                    <option value="Java">Java</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="PHP">PHP</option>
                    <option value="Python">Python</option>
                    <option value="R">R</option>
                    <option value="TypeScript">TypeScript</option>
                  </select>
                </div>
                <div className="profile-settings-languages">
                <label className="profile-settings-languages-label">Bilinen Diller</label>
                <select 
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="profile-settings-languages-input"
                >
                  <option value="" disabled>Bir Dil Seçin</option>
                  <option value="Almanca">Almanca</option>
                  <option value="Arapça">Arapça</option>
                  <option value="Çince">Çince (Mandarin)</option>
                  <option value="Fransızca">Fransızca</option>
                  <option value="Hintçe">Hintçe</option>
                  <option value="İngilizce">İngilizce</option>
                  <option value="İspanyolca">İspanyolca</option>
                  <option value="İtalyanca">İtalyanca</option>
                  <option value="Japonca">Japonca</option>
                  <option value="Korece">Korece</option>
                  <option value="Portekizce">Portekizce</option>
                  <option value="Rusça">Rusça</option>
                  <option value="Türkçe">Türkçe</option>
                </select>
              </div>
                <div className="profile-settings-button-save-div">
                  <button type="button" className="profile-settings-button-save"
                  onClick={handleSaveClick}
                  >Kaydet</button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    );
};

export default MenteeProfile;