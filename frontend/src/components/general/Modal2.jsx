import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";
import AddBand from "../Dashboard/AddBand";
import AddLocation from "../Dashboard/AddLocation";
import { motion, AnimatePresence } from "framer-motion";
import AddAds from "../Dashboard/AddAds";
import AddGenre from "../Dashboard/AddGenre";
import AddType from "../Dashboard/AddType";
import { useModal } from "@/App";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { scale: 0.95, opacity: 0, y: -20 },
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { scale: 0.95, opacity: 0, y: -20 },
};

const Modal2 = ({ selectedCard, modalHandler }) => {
  return ReactDom.createPortal(
    <>
      {/* Framer Motion's AnimatePresence ensures smooth unmounting */}
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div
          className={styles.overlay2}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        ></motion.div>

        {/* Modal Content */}
        <motion.div
          className={`z-[1000] w-full  lg:w-[50%] ${styles.modal}`}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div onClick={modalHandler}>close</div>
        </motion.div>
      </AnimatePresence>
    </>,
    document.getElementById("portal")
  );
};

export default Modal2;
