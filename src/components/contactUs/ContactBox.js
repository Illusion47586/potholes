import React from "react";
import styles from "./ContactBox.module.css";
import Wave from "../../images/wave.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ContactBox = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.contactUsBox}>
      <img className={styles.wave} src={Wave} alt="wave-img"></img>
      <div className={styles.iconContent}>
        <div style={{ marginTop: "5%" }}>
          <div className={styles.icons}>
            <img
              className={styles.icon}
              src="https://img.icons8.com/fluency/48/000000/facebook-new.png"
              alt="facebook"
            />
          </div>
        </div>
        <div style={{ marginTop: "12%", marginRight: "30%" }}>
          <div className={styles.icons}>
            <img
              className={styles.icon}
              src="https://img.icons8.com/fluency/48/000000/instagram-new.png"
              alt="instagram"
            />
          </div>
        </div>
        <div style={{ marginTop: "21%" }}>
          <div className={styles.icons}>
            <img
              className={styles.icon}
              src="https://img.icons8.com/fluency/48/000000/linkedin.png"
              alt="linkedin"
            />
          </div>
        </div>
        <div style={{ marginTop: "24%", marginRight: "4%" }}>
          <div className={styles.icons}>
            <img
              className={styles.icon}
              src="https://img.icons8.com/windows/32/ffffff/twitter.png"
              alt="twitter"
            />
          </div>
        </div>
      </div>
      <div className={styles.headText}>
        <div>
          <span className={styles.upperText}>{t("contactUs.needHelp")}</span>
          <br />
          <span className={styles.lowerText}>{t("contactUs.withAny")}</span>
        </div>
        <div>
          <span className={styles.hearAboutUs}>
            {t("contactUs.hear")} <Link to="/us">{t("navbar.contact")}</Link>
          </span>
        </div>
      </div>
      <div className={styles.connectUsContent}>
        <div className={styles.emailPhone}>
          <div className={styles.email}>
            <span className={styles.emailId}>{t("contactUs.phone")}</span>
            <br />
            <span className={styles.emailValue}>+91-1234567890</span>
          </div>
          <div className={styles.email}>
            <span className={styles.emailId}>{t("contactUs.email")}</span>
            <br />
            <span className={styles.emailValue}>potholes@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBox;
