// HeroPanel.jsx

import React, { useState } from "react";
import styles from "./HeroPanel.module.css";
import { IoIosVolumeLow } from "react-icons/io";
import { IoIosVolumeMute } from "react-icons/io";
import homexvideo from "../../../assets/video/homexvideo.mp4";
import { useNavigate } from "react-router-dom";

const HeroPanel = () => {
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  const videoSource = homexvideo;
  const posterSource =
    "https://www.gordonmac.com/wp-content/uploads/storm-1.png";

    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/products");
    };
  return (
    <div className={styles.heropanel}>
      <video
        autoPlay
        loop={true}
        muted={isMuted}
        poster={posterSource}
        className={styles.video}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.content}>
        {/* 
        <h1 className={styles.title}>
          <a href="/" rel="home" className={styles.link}>
            Title
          </a>
        </h1> */}

        <h1 className={styles.HeroSection_heading}>
          H<span className={styles.HomexO}>O</span>MEX SMART HOME SOLUTIONS
        </h1>
        <p className={styles.HeroSection_overlay_text_paragraph}>
          Homex Smar t Home Solution is an advanced and intuitive home
          automation system t hat seamlessly integrates technology to enhance
          your living environment
        </p>
        <button onClick={handleClick} className={styles.explore_btn}>EXPLORE</button>

        {/* <p className={styles.subtitle}>Subtitle</p> */}
      </div>
      <button className={styles.muteButton} onClick={handleToggleMute}>
        {isMuted ? <IoIosVolumeMute size={30} /> : <IoIosVolumeLow size={30} />}
      </button>
    </div>
  );
};

export default HeroPanel;
