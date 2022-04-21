import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "phosphor-react";
import React, { useState } from "react";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import styles from "./modal.module.scss";

const OpenModal = () => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.modal}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className={styles.stuff}>
            <motion.h1>{t("popupFront.pothole")}</motion.h1>
            <motion.img src="https://images.unsplash.com/photo-1617791160530-fb48acfc1658?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" />
          </motion.div>
          <motion.p>{t("popupFront.belowInfo")}</motion.p>
          <Button
            text={t("popupFront.continue")}
            icon={ArrowRight}
            iconWt="bold"
            onClick={close}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpenModal;
