import React from "react";
import styles from "./ContactUs.module.css";
import ContactIcon from "../../images/contact.jpg";
import ContactBox from "./ContactBox";

const ContactUs = () => {
  return (
    <div className={styles.bodyContainer}>
      <div className={styles.outeContainerContactUs}>
        <div className={styles.headText}>
          <span className={styles.upperText}>Still have</span>
          <br />
          <span className={styles.lowerText}>more questions?</span>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageInnerContainer}>
            <img
              className={styles.contactIcon}
              src={ContactIcon}
              alt="contact"
            />
          </div>
        </div>
      </div>
      <ContactBox />
    </div>
  );
};

export default ContactUs;
