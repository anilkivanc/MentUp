import React from "react";
import './ProfileSettingsBar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const ProfileSettingsBar = () => {
  return (
    <div className="profile-settings-bar">
    <div>
      <a
        className="profile-settings-bar-profile-option"
        href="/menteeprofile"
      >
        <FontAwesomeIcon
          icon={faUser}
          style={{
            marginRight: "16px",
            color: "white",
            fontSize: "20px",
          }}
        />
        Profil Bilgileri
      </a>
      <a
        className="profile-settings-bar-account-settings-option"
        href="/accountsettings"
      >
        <FontAwesomeIcon
          icon={faGear}
          style={{
            marginRight: "14px",
            color: "white",
            fontSize: "20px",
          }}
        />
        Hesap Bilgileri
      </a>
    </div>
  </div>
  )
};

export default ProfileSettingsBar;