import React from "react";
import styles from "./ContactUs.module.css";
import ContactIcon from "../../images/contact.jpg";
import ContactBox from "./ContactBox";

const ContactUs = () => {
  return (
    <div className={styles.outeContainerContactUs}>
      <div className={styles.headText}>
        <span className={styles.upperText}>Still have</span>
        <br />
        <span className={styles.lowerText}>more questions?</span>
        <ContactBox />
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.contactIcon}
          src={ContactIcon}
          alt="contact"
        ></img>
      </div>
    </div>
  );
};

export default ContactUs;
