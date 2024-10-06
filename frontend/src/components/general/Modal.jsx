import React from "react";
import ReactDom from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.css";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  // exit: { scale: 0.95, opacity: 0, y: -20 },
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
};

const Modal = ({ modalHandler, children }) => {
  return ReactDom.createPortal(
    <>
      {/* Framer Motion's AnimatePresence ensures smooth unmounting */}
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div
          className={styles.overlay2}
          key="overlay"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 1 }}
          onClick={modalHandler}
        ></motion.div>

        {/* Modal Content */}
        <motion.div
          className={`z-[1000] w-full  lg:w-[50%] ${styles.modal}`}
          variants={modalVariants}
          key="modal"
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
