import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useViewportScroll,
  AnimateSharedLayout,
} from "framer-motion";
import { MagnifyingGlass, DotsThreeOutlineVertical, X } from "phosphor-react";
import UseAnimations from "react-useanimations";
import menu from "react-useanimations/lib/menu4";

import useWindowDimensions from "../../hooks/windowDimensions";
import classes from "./navbar.module.scss";

const Navbar = () => {
  const { isPerfect } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useViewportScroll();
  scrollYProgress.onChange(() => setIsScrolled(scrollYProgress.get() > 0.01));

  return (
    <Fragment>
      <motion.nav
        data-expanded={`${!isPerfect}`}
        data-scrolled={`${isScrolled}`}
        layout
        transition={{ duration: 0.3 }}
        onClick={isScrolled || isPerfect ? () => setIsOpen(!isOpen) : () => {}}
      >
        {!isScrolled && !isPerfect && (
          <>
            <h3 className={classes.no_margin}>
              SIH <span style={{ color: "#f3095b" }}>Project</span>
            </h3>
            <ul className={classes.no_margin}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/report">Report Pothole</Link>
              </li>
              <li>
                <Link to="/us">Contact Us</Link>
              </li>
            </ul>
          </>
        )}
        {!isPerfect && !isScrolled ? null : (
          <UseAnimations
            animation={menu}
            size={40}
            reverse={isOpen}
            strokeColor="black"
            speed={2}
          />
        )}
      </motion.nav>

      {/* menu for mobile devices */}
      <AnimatePresence>
        {isPerfect && isOpen && (
          <motion.div
            className={classes.menu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <ul className={classes.no_margin}>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
              >
                <a href="/">Home</a>
              </motion.li>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
              >
                <a href="/">Add pothole</a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default Navbar;
