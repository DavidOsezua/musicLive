import React from "react";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaTwitter,
  FaLinkedin,
  FaRegClipboard,
  FaClipboardCheck,
  FaShare,
} from "react-icons/fa";
import styles from "./ShareComponent.module.css";
import XSvg from "../SVGcomponent/XSvg";

const ShareComponent = () => {
  const shareUrl = "https://musiclivewebsite.netlify.app/";
  const title = "Check out this awesome website!";

  // Social media share handlers
  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      "Check out this awesome website: " + shareUrl
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleMessengerShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=https://musiclivewebsite.netlify.app/`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://x.com/intent/post?url=https%3A%2F%2Fmusiclivewebsite.netlify.app%2F&text=`,
      "_blank"
    );
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=https://musiclivewebsite.netlify.app/`,
      "_blank"
    );
  };

  return (
    <div className={styles.cardContainer}>
      <button
        onClick={handleWhatsAppShare}
        className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
      >
        <FaWhatsapp size={24} />
      </button>
      <button
        onClick={handleMessengerShare}
        className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        <FaFacebookMessenger size={24} />
      </button>
      <button onClick={handleTwitterShare}>
        <XSvg />
      </button>
      <button
        onClick={handleLinkedInShare}
        className="flex items-center justify-center p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
      >
        <FaLinkedin size={24} />
      </button>
    </div>
  );
};

export default ShareComponent;
