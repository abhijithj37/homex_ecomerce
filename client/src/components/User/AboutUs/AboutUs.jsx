import React, { useState, useRef } from "react";
import style from "./AboutUs.module.css";
import { CiGlobe, CiMail } from "react-icons/ci";
import aboutVideo from "../../../assets/video/pexels-diva-plavalaguna-6985519 (2160p).mp4";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { AiOutlineWhatsApp } from "react-icons/ai";
import ReactWhatsapp from "react-whatsapp";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMailClick = () => {
    // Replace 'email@example.com' with the actual email address
    console.log("handleMailClick");

    const email = "ananthus.ann@gmail.com";
    const subject = "im interested in this product";
    const body = "Body of the email...........";


    const gmailComposeLink = `    https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    window.open(gmailComposeLink, "_blank");
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/about-us");
  };
  return (
    <div className={style.about_us_container}>
      <div className={style.video_contaier}>
        <video
          ref={videoRef}
          src={aboutVideo}
          className={`${style.video_element} ${isPlaying ? style.playing : ""}`}
        />
        <div className={style.play_button} onClick={togglePlay}>
          {isPlaying ? (
            "Pause"
          ) : (
            <BsFillPlayCircleFill
              className={style.play_btn}
              size={90}
              color="var(--main-text-color)"
            />
          )}
        </div>
      </div>

      <div className={style.about_container}>
        <p className={style.aboutus_text}>
          ABOUT <span className={style.us_text}>US</span>{" "}
        </p>
        <p className={style.aboutus_disc}>
          At Homex, we are dedicated to revolutionizing the way people interact
          with their homes. As a leading provider of smart home solutions, we
          strive to create intelligent, intuitive, and interconnected ecosystems
          that enhance everyday living.
        </p>
        <div className={style.btns_contaier}>
          <button className={style.knowmore_btn} onClick={handleClick}>Know more</button>
          <ReactWhatsapp
            number="9746821964"
            message="Hello World!!!"
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <AiOutlineWhatsApp size={35} />
          </ReactWhatsapp>

          <div onClick={handleMailClick}  style={{
         
              cursor: "pointer",
            }}>
            <CiMail size={35} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
//
