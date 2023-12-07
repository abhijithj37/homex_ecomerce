import React, { useEffect } from "react";
import style from "./AboutUspage.module.css";
function AboutUspage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <p className={style.heading}>
        ABOUT <span className={style.heading_span}>US</span>
      </p>
      <div className={style.about_us}>
        <p>
          <p className={style.sub_heading}>
            Welcome to Homex Smart Home Solutions
          </p>
          At H<span className={style.homex_o}>o</span>mex, we embark on a
          mission to redefine the very essence of home living. As a prominent
          innovator in the realm of smart home solutions, we are committed to
          reshaping the way individuals experience and interact with their
          living spaces. Our dedication lies in crafting sophisticated,
          intelligent, and seamlessly interconnected ecosystems that elevate the
          overall quality of daily life.
        </p>
        <div>
          At Homex, we're on a mission to make your home smarter and life
          simpler. As leaders in smart home solutions, we're all about creating
          easy-to-use systems that make your daily living a breeze.
        </div>

        <div>
          <p className={style.sub_heading}>Innovation at Every Turn</p>
          We love thinking smart. From cool tech to simple designs, we aim to
          bring you the best. Our goal is to go beyond your expectations and
          make your home adapt to your lifestyle effortlessly.
        </div>

        <div>
          <p className={style.sub_heading}>Making Life Better Every Day</p>
          Homex believes that smart homes should make your life better. We're
          here to give you comfort, security, and efficiency in a way that feels
          just right for you.
        </div>

        <div>
          <p className={style.sub_heading}>Excellence in Everything We Do</p>
          Homex doesn't just stop at great technology; we're also committed to
          giving you the best experience. Our team is here to help you explore
          and enjoy the world of smart living. Trust us to keep your home on the
          cutting edge of technology.
        </div>
        <br />
        <hr />
        <br />
        <div>
          Awafi future Building 1/98 Al Ghubra south Muscat Oman <br /> Company
          mail - sales@homexsolution.com{" "}
        </div>
      </div>
    </div>
  );
}

export default AboutUspage;
