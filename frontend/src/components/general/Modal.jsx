import React from "react";
import ReactDom from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.css";
import { FaTimes } from "react-icons/fa";
import { useModal } from "@/App";

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

const Modal = ({ children, modalHandler }) => {
  // const { modal, modalHandler } = useModal() || {};
  return ReactDom.createPortal(
    <>
      {/* Framer Motion's AnimatePresence ensures smooth unmounting */}
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div
          className={`${styles.overlay2}`}
          key="overlay"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={modalHandler}
          transition={{ duration: 1 }}
        ></motion.div>
        {/* 
        <motion.button
          className="absolute top-[10%] right-[5%] z-[1000] "
          key="overlay"
          variants={backdropVariants}
          initial="hidden"
          transition={{ duration: 1 }}
          animate="visible"
          exit="exit"
          onClick={modalHandler}
        >
          <FaTimes className="text-[2rem]" />
        </motion.button> */}
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
          {/* <button className="absolute top-0 right-">
            <FaTimes />
          </button> */}
          {children}
        </motion.div>
      </AnimatePresence>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
