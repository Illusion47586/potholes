import React from "react";
import styles from "./ContactUs.module.css";
import ContactIcon from "../../images/contact.jpg";
import ContactBox from "./ContactBox";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.outerContainerContactUs}>
        <div className={styles.headText}>
          <div className={styles.upperText}>{t("contactUs.stillHave")}</div>
          <br />
          <div className={styles.lowerText}>{t("contactUs.moreQuestions")}</div>
        </div>
        <img className={styles.contactIcon} src={ContactIcon} alt="contact" />
      </div>
      <ContactBox />
    </div>
  );
};

export default ContactUs;
