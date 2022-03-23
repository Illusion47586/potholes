import React from "react";
import styles from "./ContactBox.module.css";
import {
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  LinkedinLogo,
} from "phosphor-react";

const ContactBox = () => {
  return (
    <div className={styles.contactUsBox}>
      <div className={styles.emailPhone}>
        <div className={styles.email}>
          <span className={styles.emailId}>Email</span>
          <br />
          <span className={styles.emailValue}>potholes@gmail.com</span>
        </div>
        <div className={styles.email}>
          <span className={styles.emailId}>Phone</span>
          <br />
          <span className={styles.emailValue}>+91-1234567890</span>
        </div>
      </div>
      <div className={styles.connectWithUs}>
        <h2 className={styles.socialHeading}>Connect with Us</h2>
        <div className={styles.unorderedList}>
          <InstagramLogo size={32} className={styles.socialIcons} />
          <FacebookLogo size={32} className={styles.socialIcons} />
          <TwitterLogo size={32} className={styles.socialIcons} />
          <LinkedinLogo size={32} className={styles.socialIcons} />
        </div>
      </div>
    </div>
  );
};

export default ContactBox;
