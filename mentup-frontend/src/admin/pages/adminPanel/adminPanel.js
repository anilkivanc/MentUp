import React from "react";
import "./adminPanel.css";

const AdminPanel = () => {
  return (
    <div className="admin-panel-container">
      <h1 className="admin-panel-title">Mentorluk Başvuruları</h1>

      <div className="admin-panel-form-card">
        <div className="admin-panel-form-item">
          <label>İsim:</label>
          <p>Ahmet</p>
        </div>

        <div className="admin-panel-form-item">
          <label>Soyisim:</label>
          <p>Yılmaz</p>
        </div>

        <div className="admin-panel-form-item">
          <label>Yaş:</label>
          <p>32</p>
        </div>

        <div className="admin-panel-form-item">
          <label>E-posta:</label>
          <p>ahmetyilmaz@example.com</p>
        </div>

        <div className="admin-panel-form-item">
          <label>Diploma Numarası:</label>
          <p>123456789</p>
        </div>

        <div className="admin-panel-form-item">
          <label>Bilgisayar mühendisliği sektöründe kaç yıllık tecrübeniz var?</label>
          <p>8 yıl</p>
        </div>

        <div className="admin-panel-form-item">
          <label>Neden mentor olmak istiyorsunuz?</label>
          <p>
            Genç yazılımcılara deneyimlerimi aktararak onlara rehberlik etmek
            istiyorum. Mentorluk kültürünün gelişmesini önemsiyorum.
          </p>
        </div>

        <div className="admin-panel-form-item">
          <label>Özgeçmiş (CV):</label>
          <a href="#" className="admin-panel-cv-link">CV'yi Görüntüle</a>
        </div>
        <div className="admin-panel-action-buttons">
          <button className="admin-button approve">Onayla</button>
          <button className="admin-button reject">Reddet</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
