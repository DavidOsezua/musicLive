import React, { useState } from "react";
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
import ShareX from "../SVGcomponent/ShareX";
import ShareFacebook from "../SVGcomponent/ShareFacebook";
import ShareWhatsApp from "../SVGcomponent/ShareWhatsApp";
import ShareEmail from "../SVGcomponent/ShareEmail";
import ShareReddit from "../SVGcomponent/ShareReddit";
import SharePinterest from "../SVGcomponent/SharePinterest";
import ShareThread from "../SVGcomponent/ShareThread";
import ShareClose from "../SVGcomponent/ShareClose";
import Button from "../general/Button";

const ShareComponent = ({ cancel }) => {
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
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://x.com/intent/post?url=https%3A%2F%2Fmusiclivewebsite.netlify.app%2F&text=`,
      "_blank"
    );
  };

  const handleEmailShare = () => {
    window.open(
      `mailto:?subject=Your%20Subject&body=Check%20out%20this%20link:%20${shareUrl}`,
      "_blank"
    );
  };

  const shareOnReddit = () => {
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
      shareUrl
    )}&title=${encodeURIComponent("Check out this awesome website!")}`;
    window.open(redditUrl, "_blank");
  };

  const shareOnPinterest = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      shareUrl
    )}&media=${encodeURIComponent("")}&description=${encodeURIComponent(
      "Check out this awesome website!"
    )}`;
    window.open(pinterestUrl, "_blank");
  };

  const shareOnThreads = () => {
    const threadsUrl = `https://www.threads.net/share?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(threadsUrl, "_blank");
  };

  // Clipboard functionality
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className={styles.cardContainer}>
      <div className="flex justify-between">
        <p>Share</p>
        <button onClick={cancel}>
          <ShareClose />
        </button>
      </div>
      <div className="flex gap-5 flex-wrap w-full justify-center">
        <button
          onClick={handleWhatsAppShare}
          // className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
        >
          <ShareWhatsApp />
        </button>
        <button
          onClick={handleMessengerShare}
          // className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <ShareFacebook />
        </button>
        <button onClick={handleTwitterShare}>
          <ShareX />
        </button>
        <button onClick={handleEmailShare}>
          <ShareEmail />
        </button>
        <button onClick={shareOnReddit}>
          <ShareReddit />
        </button>
        <button onClick={shareOnPinterest}>
          <SharePinterest />
        </button>
        <button onClick={shareOnThreads}>
          <ShareThread />
        </button>
      </div>

      <div className={`flex flex-col gap-2 justify-center md:flex-row`}>
        <p
          className={`${styles.link} text-[0.7rem] md:text-[1rem] text-[#BDBDBD]`}
        >
          {shareUrl}
        </p>
        <Button
          colored
          text={copied ? "Copied" : "Copy Url"}
          radius={`rounded-md`}
          width={`md:w-[30%]`}
          clickFunction={handleCopy}
        />
      </div>
    </div>
  );
};

export default ShareComponent;
